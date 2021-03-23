<?php

namespace App\Services;

use DatePeriod;
use DateInterval;
use Carbon\Carbon;
use InvalidArgumentException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ReservationResource;
use App\Repositories\ReservationsRepository;

class ReservationService
{
    /**
     * Reservation repository
     *
     * @var \App\Repositories\ReservationsRepository
     */
    protected $reservationRepository;

    /**
     * Constructor
     *
     * @param \App\Repositories\ReservationsRepository $reservationRepository
     */
    public function __construct(ReservationsRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    /**
     * Fetch all reservations
     * 
     * @return \Illuminate\Support\Collection
     */
    public function all() : Collection
    {
        return $this->reservationRepository->allWithRelationships();
    }
    
    /**
     * Fetch all reservations for current year
     * 
     * @return array
     */
    public function getReservationsByThisYear() : array
    {
        // Fetch all reservations for current year
        $reservations = $this->reservationRepository->getReservationsByThisYear();

        // List of months in current year
        $from = Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s', strtotime("January 1st")));
        $to = Carbon::createFromFormat('Y-m-d H:s:i', date('Y-m-d H:i:s', strtotime('last day of this month')));
        $diffInMonths = $to->diffInMonths($from);
        $listOfMonths = [];

        $interval = DateInterval::createFromDateString('1 month');
        $period   = new DatePeriod($from, $interval, $to);
        foreach ($period as $month) {
            $listOfMonths[] = Carbon::parse($month)->format("F");
        }

        return [
            'reservations'  =>  ReservationResource::collection($reservations),
            'months'        =>  $listOfMonths
        ];
    }

    /**
     * Create new reservation
     * 
     * @param array $data Reservation details
     * @return \App\Http\Resources\RoomResource
     */
    public function create(array $data) : ReservationResource
    {
        // Validate data
        $validator = Validator::make(
            $data, 
            [
                'name'          =>  'required|string',
                'room_id'       =>  'required|integer|exists:rooms,id',
                'start_date'    =>  'required',
                'end_date'      =>  'required',
                'description'   =>  'nullable|string',
            ],
            [
                'name.required'     =>  __('messages.reservation_name'),
                'room_id.required'  =>  __('messages.reservation_room_id'),
            ]
        );

        // Break if data not valid
        if($validator->fails())
            throw new InvalidArgumentException($validator->errors()->first(), 400);

        // Get validated data
        $data = $validator->validated();
        $data['user_id'] = Auth::id();

        // Store reservation
        $reservation = $this->reservationRepository->create($data);

        return new ReservationResource($reservation->load(['room', 'user']));
    }
}