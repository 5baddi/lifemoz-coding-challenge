<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'      =>  'Mohamed Baddi',
            'email'     =>  'project@baddi.info',
            'password'  =>  'baddi@dev',
            'timezone'  =>  'Europe/Paris',
        ]);
    }
}
