<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use Exception;
use Illuminate\Http\Request;
use InvalidArgumentException;
use App\Services\ReservationService;

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
     * Store new reservation
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            // create new reservation
            $createdRoom = $this->reservationService->create($request->input());

            return response()->success(
                __('messages.reservation_created'),
                $createdRoom,
                201
            );
        }catch(InvalidArgumentException $ex){
            dd($ex);
            return response()->error(
                __('auth.signup_fields'),
                [$ex->getMessage()],
                $ex->getCode()
            );
        }catch(Exception $ex){
            dd($ex);
            return response()->error(
                __('messages.error'),
                [$ex->getMessage()],
                500
            );
        }
    }
}
