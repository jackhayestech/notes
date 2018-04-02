import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Sidebar} from './components/sidebar/Sidebar'
import {MainContent} from './components/maincontent/MainContent'
import update from 'immutability-helper';
import * as laravelCon from './libs/laravalconnector.js';

class App extends Component
{
    constructor()
    {
        super();

        this.state = {
            sessionID : document.body.dataset.sessionId,
            newNoteID : 1,
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
        fetch("http://localhost/api/notes/getmeta/" + 'ruIKlqKkkz9B1VPHukdK0yyM9sRSGPUBXVs2a8wB')
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
        data.forEach((notedata)=>{
            note = {
                id : notedata.id,
                title : notedata.title,
                tags : notedata.tags.split(",")
            };
            // Adds the note tags to the state
            note.tags.forEach((tag)=>{
                this.addTag(tag)
            })

            newNotes.push(note);
        });

        // Updates the new note id number
        this.setState({newNoteID : note.id + 1})

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

        this.setState({notes : updatedNotes});

        this.refs.sidebar.forceUpdate();

        this.setState({
            selectedNote : {
                id : 0,
                title : "",
                tags : []
            }
        });
    }

    newNote()
    {
        var newNote = {
            id : this.state.newNoteID,
            title : "New Note Title",
            tags : []
        };

        var newNotes = update(this.state.notes,{$push: [newNote]});
        this.setState({notes : newNotes});

        setTimeout(function() {
            this.setSelectedNote(this.state.newNoteID);
            this.setState({newNoteID : this.state.newNoteID + 1});
        }.bind(this), 10);
    }

    addTag(tag)
    {
        var newTags = update(this.state.tags,{$push: [tag]});
        this.setState({tags : newTags});
    }

    render()
    {
        var divPageWrapper = {
            height: '100vh',
            display: 'flex',
        };

        return (
            <div style={divPageWrapper}>
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
