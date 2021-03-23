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
use Exception;

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
        $from = Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s', strtotime('January 1st')));
        $to = Carbon::createFromFormat('Y-m-d H:s:i', date('Y-m-d H:i:s', strtotime('last day of this month')));
        $listOfMonths = [];
        $rates = [];

        $interval = DateInterval::createFromDateString('1 month');
        $period   = new DatePeriod($from, $interval, $to);
        $listOfMonths = [];
        $rates= [];
        

        foreach($reservations as $reservation){
            foreach($period as $item){
                $month = Carbon::parse($item)->format('F');
                if(!in_array($month, $listOfMonths)){
                    $listOfMonths[] = $month;
                }

                if($reservation->start_date->format('F') === $month){
                    $bookedDays = $reservation->end_date->diffInDays($reservation->start_date);
                    $rate = ceil(($bookedDays / cal_days_in_month(CAL_GREGORIAN, $reservation->start_date->format('m'), date('Y'))) * 100);
                    $rates[] = ['room' => $reservation->room->name, 'rate' => $rate];
                }else{
                    $rates[] = ['room' => $reservation->room->name, 'rate' => 0];
                }
            }
        }

        return [
            'months'        =>  $listOfMonths,
            'rates'         =>  $rates
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

        // Check if already booked
        if($this->reservationRepository->checkIfAlreadyBooked($data['room_id'], $data['start_date'], $data['end_date'])){
            throw new Exception(__('messages.room_already_booked') . $data['start_date'] . ' : ' . $data['end_date'], 400);
        }

        // Get validated data
        $data = $validator->validated();
        $data['user_id'] = Auth::id();

        // Store reservation
        $reservation = $this->reservationRepository->create($data);

        return new ReservationResource($reservation->load(['room', 'user']));
    }
}