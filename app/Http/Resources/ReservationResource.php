<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'uuid'              =>  $this->uuid,
            'name'              =>  $this->name,
            'description'       =>  $this->description,
            'start_date'        =>  Carbon::parse($this->start_date)->setTimezone(Auth::user()->timezone ?? config('app.timezone'))->format('Y-m-d H:i:s'),
            'end_date'          =>  Carbon::parse($this->end_date)->setTimezone(Auth::user()->timezone ?? config('app.timezone'))->format('Y-m-d H:i:s'),
            'user'              =>  $this->user ?? null,
            'room'              =>  $this->room ?? null,
            'booking'           =>  Carbon::parse($this->start_date)->format('H:i d/m/Y') . ' > ' . Carbon::parse($this->end_date)->format('H:i d/m/Y'),
            'updated_at'        =>  Carbon::parse($this->updated_at)->format('H:i d/m/Y'),
            'created_at'        =>  Carbon::parse($this->created_at)->format('H:i d/m/Y'),
        ];
    }
}
