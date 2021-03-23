<?php

namespace App\Services;

use InvalidArgumentException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ReservationResource;
use App\Repositories\ReservationsRepository;
use Carbon\Carbon;

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
                'start_date'    =>  'required|date',
                'end_date'      =>  'required|date',
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