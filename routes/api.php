<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// version 1 of auth module routes
Route::prefix('v1')->group(function(){
    // Public routes
    Route::post('/signup', [AuthController::class, 'signUp']);
    Route::post('/signin', [AuthController::class, 'signIn']);
    Route::post('/reset/password', [AuthController::class, 'resetPassword']);
    Route::post('/verify/token', [AuthController::class, 'verifyToken']);

    // Private routes
    Route::middleware('auth:sanctum')->group(function(){
        Route::post('/signout', [AuthController::class, 'signOut']);
        Route::post('/{user}/profile/', [UserController::class, 'updateProfile']);
    });
});
