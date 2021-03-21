<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class ReservationsRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\Models\Reservation::class;
}