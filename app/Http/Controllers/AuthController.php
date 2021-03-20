<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use Exception;
use InvalidArgumentException;

class AuthController extends Controller
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
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Sign in
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function signIn(Request $request)
    {
        try{
            // Authenticate user
            $authenticatedUser = $this->userService->signIn($request->input());

            return response()->success(
                __('auth.signin'),
                $authenticatedUser
            );
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

    /**
     * Sign up
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function signUp()
    {

    }

    /**
     * Sign out
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function signOut(Request $request)
    {
        // Revoke the token
        $request->user()->currentAccessToken()->delete();

        return response()->success(
            __('auth.signout')
        );
    }
}
