<?php

namespace App\Repositories;

use App\Models\Room;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Torann\LaravelRepository\Repositories\AbstractRepository;

class RoomsRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\Models\Room::class;

    /**
     * Fetch all rooms with user relationship
     * 
     * @return \Illuminate\Support\Collection
     */
    public function allWithUser() : Collection
    {
        return Room::with('user')->where('user_id', Auth::id())->get();
    }
}