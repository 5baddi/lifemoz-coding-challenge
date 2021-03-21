<?php

namespace App\Services;

use InvalidArgumentException;
use Illuminate\Support\Collection;
use App\Http\Resources\RoomResource;
use Illuminate\Support\Facades\Auth;
use App\Repositories\RoomsRepository;
use Illuminate\Support\Facades\Validator;

class RoomService
{
    /**
     * Room repository
     *
     * @var \App\Repositories\RoomsRepository
     */
    protected $roomRepository;

    /**
     * Constructor
     *
     * @param \App\Repositories\RoomsRepository $roomRepository
     */
    public function __construct(RoomsRepository $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    /**
     * Fetch all rooms
     * 
     * @return \Illuminate\Support\Collection
     */
    public function all() : Collection
    {
        return $this->roomRepository->allWithUser();
    }

    /**
     * Create new room
     * 
     * @param array $data Room details
     * @return \App\Http\Resources\RoomResource
     */
    public function create(array $data) : RoomResource
    {
        // Validate data
        $validator = Validator::make(
            $data, 
            [
                'name'  =>  'required|string|unique:rooms,name',
            ],
            [
                'name.required'  =>  __('messages.room_name'),
                'name.unique'    =>  __('messages.room_name_exists'),
            ]
        );

        // Break if data not valid
        if($validator->fails())
            throw new InvalidArgumentException($validator->errors()->first(), 400);

        // Get validated data
        $data = $validator->validated();

        // Store room
        $room = $this->roomRepository->create([
            'name'          =>  $data['name'],
            'user_id'       =>  Auth::id()
        ]);

        return new RoomResource($room->load('user'));
    }
}