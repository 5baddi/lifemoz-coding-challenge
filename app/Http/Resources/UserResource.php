<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email'             =>  $this->email,
            'name'              =>  $this->name,
            'timzezone'         =>  $this->timezone,
            'last_login'        =>  $this->last_login ? Carbon::parse($this->last_login)->format('H:i d/m/Y') : null,
        ];
    }
}
