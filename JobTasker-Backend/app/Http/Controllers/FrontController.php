<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash, Validator, Helper, Auth, DB, Gate, App, Mail;
use App\Http\Helpers\Response as R;
use App\Mail\GeneralEmail;
use App\Models\User;

class FrontController extends Controller
{
    
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function Email()
    {
        $user = User::with('profile')->first();

        dd($user);

        // $msg = '<p>Welcome to the JobTasker</p>';
        // Mail::to('umair.waseem.q@gmail.com')->send(new GeneralEmail(['name' =>'New Template','to' =>'Umair'],' JobTasker', $msg));
    }
   
}
