<?php

namespace App\Repositories;

use App\Models\Reservation;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Torann\LaravelRepository\Repositories\AbstractRepository;

class ReservationsRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\Models\Reservation::class;

    /**
     * Fetch all reservations with relationships
     * 
     * @return \Illuminate\Support\Collection
     */
    public function allWithRelationships() : Collection
    {
        return Reservation::with(['user', 'room'])->where('user_id', Auth::id())->get();
    }

    /**
     * Fetch all reservations for current year
     * 
     * @return \Illuminate\Support\Collection
     */
    public function getReservationsByThisYear() : Collection
    {
        // Current year
        $startYear = date("Y-m-d H:i:s", strtotime("January 1st"));
        $endYear = date("Y-m-d H:i:s",strtotime("last day of this month"));;

        return Reservation::whereBetween('start_date',[$startYear, $endYear])
                    ->whereBetween('end_date',[$startYear, $endYear])
                    ->get();
    }
}