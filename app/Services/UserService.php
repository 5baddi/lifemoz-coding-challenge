<?php

namespace App\Services;

use App\Models\User;
use InvalidArgumentException;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Repositories\UsersRepository;
use Illuminate\Support\Facades\Validator;

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

    /**
     * Sign in with user credentials
     * 
     * @param array $data user credentials
     * @return array
     */
    public function signIn(array $data)
    {
        // Validate data
        $validator = Validator::make(
            $data, 
            [
                'email'     =>  'required|email',
                'password'  =>  'required|string',
            ],
            [
                'email.required'     =>  __('auth.signup_email_field'),
                'password.required'  =>  __('auth.signup_password_field')
            ]
        );

        // Break if data not valid
        if($validator->fails())
            throw new InvalidArgumentException($validator->errors()->first(), 400);

        // Get validated data
        $data = $validator->validated();

        // Load user
        $user = User::where('email', $data['email'])->first();

        // Verify credentials
        if(!$user || !Hash::check($data['password'], $user->password))
            throw new InvalidArgumentException(__("auth.failed"), 404);

        // Generate new token
        $token = $user->createToken(env('APP_NAME'))->plainTextToken;

        // Update last login
        $user->update(['last_login' => now()]);

        return [
            'user'      => new UserResource($user),
            'token'     => $token
        ];
    }
}