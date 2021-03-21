<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use InvalidArgumentException;

class UserController extends Controller
{
    /**
     * User service
     *
     * @var \App\Service\UserService
     */
    protected $userService;

    /**
     * Constructor
     *
     * @param \App\Service\UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    
    /**
     * Update profile
     * 
     * @param \App\Models\User $user
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function updateProfile(User $user, Request $request)
    {
        try{
            // Update profile
            $profileUpdated = $this->userService->updateProfile($user, $request->input());

            if($profileUpdated !== false)
                return response()->success(__('auth.profile_updated'), $profileUpdated);
        }catch(InvalidArgumentException $ex){
            return response()->error(
                __('auth.signup_fields'),
                [$ex->getMessage()],
                $ex->getCode()
            );
        }catch(Exception $ex){
            return response()->error(
                __('messages.error'),
                [$ex->getMessage()],
                500
            );
        }
    }
}
