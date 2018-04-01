<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;

class NoteWriterController extends Controller
{
    // Gets a users note meta to pass to the react app
    public function getNotesMeta($session_id)
    {
        //Gets the user ID from the given session id
        $results = DB::select('select user_id from sessions where id = ?', [$session_id]);
        $user_id = $results[0]->user_id;
        
        //Gets the note meta for the users notes
        $results = DB::select('select id, title, tags from notes where userid = ?', [$user_id]);

        echo json_encode($results);
    }
}
