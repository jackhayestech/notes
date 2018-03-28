import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Sidebar} from './components/sidebar/Sidebar'
import {MainContent} from './components/maincontent/MainContent'
import update from 'immutability-helper';


class App extends Component
{
    constructor()
    {
        super();

        this.state = {
            newNoteID : 1,
            notes : [
                // {id : 1, data:{
                //     title : "Note 1",
                //     content : "Note 1 content"
                // }},
                // {
                //     id : 2,
                //     title : "Note 2",
                //     content : "Note 2 content"
                // },
                // {
                //     id : 3,
                //     title : "Note 3",
                //     content : "Note 3 content"
                // },
                // {
                //     id : 4,
                //     title : "Note 4",
                //     content : "Note 4 content"
                // }
            ],
            selectedNote : {
                id : 0,
                data : {
                    title : "",
                    content : ""
                },
                tags : []
            },
            tags: [],
        }
    }

    setSelectedNote(id)
    {
        this.state.notes.forEach((note) => {
            if (note.id == id)
            {
                this.setState({selectedNote : note});
            }
        });
    }

    saveNote(argNote)
    {
        this.state.notes.forEach((note) => {
            if (note.id == argNote.id)
            {
                note.data.title = argNote.data.title;
                note.data.content = argNote.data.content;
                note.tags = argNote.tags;
            }
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
                data : {
                    title : "",
                    content : ""
                },
                tags : []
            }
        });
    }

    newNote()
    {
        var newNote = {
            id : this.state.newNoteID,
            data : {
                title : "New Note Title",
                content : ""
            },
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
