<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use InvalidArgumentException;
use App\Services\ReservationService;
use App\Http\Resources\ReservationResource;
use App\Http\Resources\ReservationCalendarResource;

class ReservationController extends Controller
{
    /**
     * Reservation service
     *
     * @var \App\Service\ReservationService
     */
    protected $reservationService;

    /**
     * Constructor
     *
     * @param \App\Service\ReservationService $reservationService
     */
    public function __construct(ReservationService $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    /**
     * Get all reservation
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch all reservations
        $reservations = $this->reservationService->all();

        return response()->success(
            __('messages.reservations_fetched'),
            ReservationResource::collection($reservations)
        );
    }
    
    /**
     * Get rate of all reservations in current year
     * 
     * @return \Illuminate\Http\Response
     */
    public function rate()
    {
        // Fetch all reservations for current year
        $reservations = $this->reservationService->getReservationsByThisYear();

        return response()->success(
            __('messages.reservations_fetched'),
            $reservations
        );
    }

    /**
     * Store new reservation
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            // create new reservation
            $createdReservation = $this->reservationService->create($request->input());

            return response()->success(
                __('messages.reservation_created'),
                $createdReservation,
                201
            );
        }catch(InvalidArgumentException $ex){
            return response()->error(
                __('auth.signup_fields'),
                [$ex->getMessage()],
                $ex->getCode()
            );
        }catch(Exception $ex){
            return response()->error(
                __('messages.error'),
                [$ex->getMessage()],
                500
            );
        }
    }
}
