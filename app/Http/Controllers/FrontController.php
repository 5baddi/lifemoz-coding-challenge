<?php

namespace App\Http\Controllers;

class FrontController extends Controller
{
    public function __invoke()
    {
        return view('app');
    }
}
