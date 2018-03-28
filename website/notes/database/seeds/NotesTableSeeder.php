<?php

use Illuminate\Database\Seeder;
use App\User;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notes')->insert([
            'userid' => User::where('email','demo@gmail.com') -> first()->id,
            'title' => 'test',
            'tags' => 'test',
            'content' => 'This is a test note'
        ]);
    }
}
