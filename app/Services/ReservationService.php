<?php

namespace App\Services;

use App\Repositories\ReservationsRepository;

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
}