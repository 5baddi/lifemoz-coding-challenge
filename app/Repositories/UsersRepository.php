<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Torann\LaravelRepository\Repositories\AbstractRepository;

class UsersRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\Models\User::class;

    /**
     * Create reset password
     * 
     * @param array $attributes
     * @return bool
     */
    public function createResetToken(array $attributes) : bool
    {
        return DB::table('password_resets')->insert($attributes);
    }
    
    /**
     * Get reset password entity
     * 
     * @param string $email
     * @param string $token
     * @return mixed
     */
    public function getResetToken(string $email, string $token)
    {
        return DB::table('password_resets')
                ->where(['email' => $email, 'token' => $token])
                ->first();
    }
    
    /**
     * Delete reset password entity
     * 
     * @param string $email
     * @return bool
     */
    public function deleteResetToken(string $email)
    {
        return DB::table('password_resets')->where(['email' => $email])->delete();
    }
}