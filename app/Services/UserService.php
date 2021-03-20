<?php

namespace App\Services;

use App\Models\User;
use App\Mail\WelcomeMail;
use InvalidArgumentException;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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

    /**
     * Sign up & create new account
     * 
     * @param array $data user details
     * @return \App\Http\Resources\UserResource
     */
    public function signUp(array $data) : UserResource
    {
        // Validate data
        $validator = Validator::make(
            $data, 
            [
                'fullname'  =>  'required|string',
                'email'     =>  'required|email|unique:users,email',
                'password'  =>  'required|string',
                'timezone'  =>  'nullable|string',
            ],
            [
                'fullname.required'  =>  __('auth.signup_fullname_field'),
                'email.required'     =>  __('auth.signup_email_field'),
                'email.unique'       =>  __('auth.signup_email_exists'),
                'password.required'  =>  __('auth.signup_password_field'),
            ]
        );

        // Break if data not valid
        if($validator->fails())
            throw new InvalidArgumentException($validator->errors()->first(), 400);

        // Get validated data
        $data = $validator->validated();

        // Store user
        $user = User::create([
            'name'          => $data['fullname'],
            'email'         => $data['email'],
            'password'      => $data['password'],
            'timezone'      => $data['timezone'] ?? config('app.timezone'),
        ]);

        // Send welcome mail
        Mail::to($user->email)->send(new WelcomeMail($user));

        return new UserResource($user);
    }
}