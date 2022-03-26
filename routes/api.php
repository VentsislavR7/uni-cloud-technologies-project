<?php

use Doctrine\Inflector\Rules\Ruleset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\TodosController;

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

Route::post('/login', [ApiController::class, 'login']);

Route::middleware('auth:sanctum')->group(function()
{
    Route::get('/todos', [TodosController::class, 'index']);
    Route::post('/todos', [TodosController::class, 'store']);
    Route::put('/todos/{todoId}', [TodosController::class, 'update']);
    Route::get('/logout', [ApiController::class, 'logout']);
    Route::delete('/todos/{todoId}', [TodosController::class, 'destroy']);
});
