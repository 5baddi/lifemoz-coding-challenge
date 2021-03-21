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
     * @param \App\Service\UserService $userService
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
    public function signUp(Request $request)
    {
        try{
            // create new account
            $signedUser = $this->userService->signUp($request->input());

            return response()->success(
                __('auth.registered'),
                $signedUser,
                201
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
     * Reset password
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function resetPassword(Request $request)
    {
        try{
            // Send reset password mail
            $passwordReseted = $this->userService->resetPassword($request->input());

            if($passwordReseted)
                return response()->success(__('auth.reset_password_sent'));
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
     * Verify token
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function verifyToken(Request $request)
    {
        try{
            // Send change password
            $passwordChanged = $this->userService->changePassword($request->input());

            if($passwordChanged)
                return response()->success(__('auth.password_updated'));
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
            __('auth.signout'),
            [],
            204
        );
    }
}
