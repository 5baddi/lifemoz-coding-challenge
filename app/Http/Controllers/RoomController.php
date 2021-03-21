<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
use Exception;
use Illuminate\Http\Request;
use App\Services\RoomService;
use InvalidArgumentException;

class RoomController extends Controller
{
    /**
     * Room service
     *
     * @var \App\Service\RoomService
     */
    protected $roomService;

    /**
     * Constructor
     *
     * @param \App\Service\RoomService $roomService
     */
    public function __construct(RoomService $roomService)
    {
        $this->roomService = $roomService;
    }

    /**
     * Get all rooms
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch all rooms
        $rooms = $this->roomService->all();

        return response()->success(
            __('messages.rooms_fetched'),
            RoomResource::collection($rooms)
        );
    }

    /**
     * Store new room
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            // create new room
            $createdRoom = $this->roomService->create($request->input());

            return response()->success(
                __('messages.room_created'),
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
