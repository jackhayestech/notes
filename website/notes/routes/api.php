<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('notes/getmeta/{user_id}','NoteWriterController@getNotesMeta');
Route::get('notes/getcontent/{note_id}','NoteWriterController@getNoteContent');

Route::post('notes/createnote/{user_id}','NoteWriterController@createNote');
Route::post('notes/updatenote/{note_id}','NoteWriterController@updateNote');
Route::post('notes/deletenote/{note_id}','NoteWriterController@deleteNote');