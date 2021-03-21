<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use InvalidArgumentException;
use App\Services\ReservationService;

class RservationController extends Controller
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
