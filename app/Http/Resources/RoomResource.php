<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
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
            'user'              =>  $this->user,
            'updated_at'        =>  Carbon::parse($this->updated_at)->format('H:i d/m/Y'),
            'created_at'        =>  Carbon::parse($this->created_at)->format('H:i d/m/Y'),
        ];
    }
}
