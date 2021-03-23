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
            'id'                =>  $this->id,
            'uuid'              =>  $this->uuid,
            'name'              =>  $this->name,
            'user'              =>  $this->user ?? null,
            'updated_at'        =>  Carbon::parse($this->updated_at)->format('H:i d/m/Y'),
            'created_at'        =>  Carbon::parse($this->created_at)->format('H:i d/m/Y'),
        ];
    }
}
