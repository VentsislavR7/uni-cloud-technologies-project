<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{   
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            abort(401, 'Invalid email or password!');
        }

        if (!Auth::attempt($request->all())) {
            return abort(401, 'Invalid email or password!');
        }

        return [
            'token' => Auth::user()->createToken('API Token')->plainTextToken,
        ];
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return ['message' => 'Tokens Revoked'];
    }


}
