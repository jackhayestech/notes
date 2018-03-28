import React, { Component } from 'react';
import {NoteSelector} from './elements/NoteSelector'
import {TopBar} from './elements/TopBar'

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
        var divSideBar = {
            flex: '0 0 20%',
            border: '1px solid',
            marginRight: '10px',
            padding: '10px',
        };

        var divSelectNoteContainer = {
            overflowY: 'scroll',
            height: '93%',
        }

        this.props.notes.forEach((note) => {
            var match = 0;
            var tagsText = "";
            var tag;

            if (note.data.title.search(this.state.filter) != -1)
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
                        deleteNote={this.props.deleteNote}/>
                );
            }
        });

        return (
            <div style={divSideBar}>
                <TopBar
                    newNote={this.newNote.bind(this)}
                    filterNotes={this.filterNotes.bind(this)}/>
                <div style={divSelectNoteContainer}>
                    {rows}
                </div>
            </div>
        );
    }
}
