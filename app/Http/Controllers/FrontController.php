<?php

namespace App\Http\Controllers;

class FrontController extends Controller
{
    public function __invoke()
    {
        return view('app');
    }

    /**
     * Get time zones list
     * 
     * @return \Illuminate\Http\Response
     */
    public function timeZones()
    {
        $timezoneArray = collect(timezone_identifiers_list());
        $timezoneList = [];
        $timezoneArray->map(function($value, $key) use(&$timezoneList){
            $timezoneList[] = $value;
        });
        

        return response()->success(
            __('messages.timezones_fetched'),
            $timezoneList
        );
    }
}
