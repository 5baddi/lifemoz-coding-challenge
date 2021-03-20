<?php

namespace App\Services;

use App\Repositories\UsersRepository;

class UserService
{
    /**
     * User repository
     *
     * @var \App\Repositories\UsersRepository
     */
    protected $userRepository;

    /**
     * Constructor
     *
     * @param UsersRepository $userRepository
     */
    public function __construct(UsersRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
}