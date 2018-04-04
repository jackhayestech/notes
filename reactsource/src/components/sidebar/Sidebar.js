import React, { Component } from 'react';

import {NoteSelector} from './elements/NoteSelector'
import {TopBar} from './elements/TopBar'
import '../../styles/sidebar/sidebar.css';

export class Sidebar extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            filter : ""
        }
    }

    setSelectedNote(id)
    {
        this.props.setSelectedNote(id);
    }

    newNote()
    {
        this.props.newNote();
    }

    filterNotes(newfilter)
    {
        this.setState({filter : newfilter});
        this.forceUpdate();
    }

    render()
    {
        const rows = [];
        
        this.props.notes.forEach((note) => {
            var match = 0;
            var tagsText = "";
            var tag;

            if (note.title.search(this.state.filter) != -1)
            {
                match = 1;
            }

            for(var i = 0; i < note.tags.length; i++)
            {
                tag = note.tags[i];

                if (typeof tag === 'string')
                {
                    if (tag.search(this.state.filter) != -1)
                    {
                        match = 1;
                    }

                    tagsText += note.tags[i];

                    if (i != note.tags.length)
                    {
                        tagsText += " ";
                    }
                }
            }

            if (match === 1)
            {
                rows.push(
                    <NoteSelector
                        note={note}
                        setSelectedNote={this.setSelectedNote.bind(this)}
                        tags={tagsText}
                        key={note.id}
                        deleteNote={this.props.deleteNote}/>
                );
            }
        });

        return (
            <div id="divSideBar">
                <TopBar
                    newNote={this.newNote.bind(this)}
                    filterNotes={this.filterNotes.bind(this)}/>
                    
                <div id="divSelectNoteContainer">
                    {rows}
                </div>
            </div>
        );
    }
}
