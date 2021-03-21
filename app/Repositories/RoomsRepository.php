<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class RoomsRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\Models\Room::class;
}