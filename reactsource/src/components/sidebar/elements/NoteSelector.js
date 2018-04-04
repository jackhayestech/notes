import React, { Component } from 'react';
import Radium from 'radium';

import {DeleteConfirmationMessage} from './DeleteConfirmationMessage'
import '../../../styles/sidebar/elements/noteselector.css';

export class NoteSelector extends Component
{
    constructor(props)
    {
        super(props);

        this.select = this.select.bind(this);
        this.toggleDeleteNoteDisplay = this.toggleDeleteNoteDisplay.bind(this)
        this.deleteNote = this.deleteNote.bind(this)

        this.state = {
            displayConfirmDelete : false
        }
    }

    select()
    {
        this.props.setSelectedNote(this.props.note.id);
    }

    toggleDeleteNoteDisplay(e)
    {
        this.setState({displayConfirmDelete : !this.state.displayConfirmDelete})
    }

    confirmDivStopProp(e)
    {
        e.stopPropagation();
    }

    deleteNote(e)
    {
        this.props.deleteNote(this.props.note.id);
    }

    render()
    {

        return (
            <div key={this.props.note.id}
            className="divNoteSelector"
            onMouseDown={this.select}>
                <p className="pNoteTitle">
                    {this.props.note.title}
                </p>
                <div
                className="divDeleteNote"
                onMouseDown={this.toggleDeleteNoteDisplay.bind(this)}>
                    x
                </div>
                <p>
                    {this.props.tags}
                </p>

                <DeleteConfirmationMessage
                    display={this.state.displayConfirmDelete}
                    note={this.props.note}
                    deleteNote={this.deleteNote}
                    toggleDeleteNoteDisplay={this.toggleDeleteNoteDisplay}/>
            </div>
            
        );
    }
}

NoteSelector = Radium(NoteSelector);
