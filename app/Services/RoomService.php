<?php

namespace App\Services;

use App\Repositories\RoomsRepository;

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
}