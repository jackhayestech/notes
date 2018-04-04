import React, { Component } from 'react';
import update from 'immutability-helper';

import logo from './logo.svg';
import './App.css';
import './styles/main.css?v=1';
import {Sidebar} from './components/sidebar/Sidebar'
import {MainContent} from './components/maincontent/MainContent'

class App extends Component
{
    constructor()
    {
        super();

        this.state = {
            sessionID : document.body.dataset.sessionId,
            notes : [
            ],
            selectedNote : {
                id : 0,
                title : "",
                content : "",
                tags : []
            },
            tags: [],
        }
    }

    componentDidMount()
    {
        //Gets note data
        fetch("http://localhost/api/notes/getmeta/" + 'QqxBhMC8e2x9JLFssQ5v3k7i6jFViHzo8S9sOfob')
        .then(res => res.json())
        .then(
            (result) => {
                this.loadNotes(result)
            },
            (error) => {
                console.log("Error somthing went wrong getting the note data from laravel");
            }
        )
    }

    //Loads the notes returned from the laravel database
    loadNotes(data)
    {
        var newNotes = [];
        var note = {};
        var tmpTags = [];
        data.forEach((notedata)=>{
            tmpTags = ((notedata.tags != "") ? notedata.tags.split(",") : [] ); 
            note = {
                id : notedata.id,
                title : notedata.title,
                tags : tmpTags
            };
            // Adds the note tags to the state
            note.tags.forEach((tag)=>{
                this.addTag(tag)
            })

            newNotes.push(note);
        });

        this.setState({notes : newNotes});
    }

    setSelectedNote(id)
    {
        var tmpNote = [];
        this.state.notes.forEach((note) => {
            if (note.id == id)
            {
                tmpNote = note;
            }
        });

        fetch("http://localhost/api/notes/getcontent/" + id)
        .then(res => res.json())
        .then(
            (result) => {
                tmpNote.content = result;
                this.setState({selectedNote : tmpNote});
            },
            (error) => {
                console.log("Error somthing went wrong getting the note content from laravel");
            }
        )
    }

    saveNote(argNote)
    {
        this.state.notes.forEach((note) => {
            if (note.id == argNote.id)
            {
                note.title = argNote.title;
                note.tags = argNote.tags;
            }
        });

        fetch("http://localhost/api/notes/updatenote/" + argNote.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                title: argNote.title,
                tags: argNote.tags.toString(),
                content: argNote.content
            })
        });

        this.refs.sidebar.forceUpdate();
    }

    deleteNote(noteID)
    {
        var updatedNotes = []

        this.state.notes.forEach((note) => {
            if (note.id != noteID)
            {
                updatedNotes.push(note)
            }
        });

        fetch("http://localhost/api/notes/deletenote/" + noteID, {
            method: 'POST'
        });

        this.setState({notes : updatedNotes});

        this.setState({
            selectedNote : {
                id : 0,
                title : "",
                tags : []
            }
        });

        this.refs.sidebar.forceUpdate();
    }

    newNote()
    {
        fetch("http://localhost/api/notes/createnote/" + 'QqxBhMC8e2x9JLFssQ5v3k7i6jFViHzo8S9sOfob', {
            method: 'POST'
        })
        .then(res => res.json())
        .then(
            (result) => {
                var note_id = result;

                var newNote = {
                    id : note_id,
                    title : "New Note Title",
                    tags : []
                };
        
                var newNotes = update(this.state.notes,{$push: [newNote]});
                this.setState({notes : newNotes});
        
                setTimeout(function() {
                    this.setSelectedNote(note_id);
                }.bind(this), 10);
            },
            (error) => {
                console.log("Error somthing went wrong creating the note from laravel");
            }
        );
    }

    addTag(tag)
    {
        var newTags = update(this.state.tags,{$push: [tag]});
        this.setState({tags : newTags});
    }

    render()
    {
        return (
            <div id="divPageWrapper">
                <Sidebar
                    ref="sidebar"
                    setSelectedNote={this.setSelectedNote.bind(this)}
                    newNote={this.newNote.bind(this)}
                    notes={this.state.notes}
                    deleteNote={this.deleteNote.bind(this)}/>

                <MainContent
                    key={this.state.selectedNote.id}
                    selectedNote={this.state.selectedNote}
                    saveNote={this.saveNote.bind(this)}
                    tags={this.state.tags}
                    addTag={this.addTag.bind(this)}/>
            </div>
        );
    }
}

export default App;
