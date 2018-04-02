<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;

class NoteWriterController extends Controller
{
    private function getUserID($session_id)
    {
        //Gets the user ID from the given session id
        $results = DB::select('select user_id from sessions where id = ?', [$session_id]);
        return $results[0]->user_id;
    }

    private function generateNoteID()
    {
        return uniqid();
    }

    // Gets a users note meta to pass to the react app
    public function getNotesMeta($session_id)
    {
        $user_id = $this->getUserID($session_id);
        
        //Gets the note meta for the users notes
        $results = DB::select('select id, title, tags from notes where userid = ?', [$user_id]);

        echo json_encode($results);
    }

    // Gets the content from a specific note
    public function getNoteContent($note_id)
    {      
        //Gets the note meta for the users notes
        $results = DB::select('select content from notes where id = ?', [$note_id]);
        
        echo json_encode($results[0]->content);
    }

    // creates new note
    public function createNote($session_id)
    {
        $user_id = $this->getUserID($session_id);
        $note_id = $this->generateNoteID();

        DB::table('notes')
            ->insert(['id'=>$note_id,'userid'=>$user_id,'title'=>'New Note Title','tags'=>'','content'=>'']);

        echo json_encode($note_id);
    }

    // Saves the changes made to the note
    public function updateNote(Request $request,$note_id)
    {
        $title = $request->input('title') ?? "";
        $tags = $request->input('tags') ?? "";
        $content = $request->input('content') ?? "";

        DB::table('notes')
            ->where('id',$note_id)
            ->update(['title'=>$title,'tags'=>$tags,'content'=>$content]);
    }

    public function deleteNote($note_id)
    {
        DB::table('notes')
            ->where('id',$note_id)
            ->delete();
    }
}
