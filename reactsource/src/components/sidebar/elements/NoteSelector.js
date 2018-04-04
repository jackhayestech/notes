import React, { Component } from 'react';
import Radium from 'radium';
import {DeleteConfirmationMessage} from './DeleteConfirmationMessage'

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
        var styles = {

            divNoteSelector: {
                margin : '10px 0px',
                padding: '10px',
                cursor: 'pointer',
                border: '1px solid',
                position: 'relative',

                ':hover': {
                    background : '#efecec',
                },
            },

            pNoteTitle: {
                fontSize: '18px',
                fontWeight: '600',
                marginTop: '0px',
            },

            pNoteContent: {
                fontSize: '16px',
                marginTop: '15px',
                marginBottom: '0px'
            },

            divDeleteNote: {
                position: 'absolute',
                right: '5px',
                top: '5px',
                width: '15px',
                height: '15px',
                padding: '5px',
                textAlign: 'center',
                lineHeight: '15px',

                ':hover': {
                    background : '#d2d2d2',
                },
            },

           
        }

        return (
            <div key={this.props.note.id}
            style={styles.divNoteSelector}
            onMouseDown={this.select}>
                <p style={styles.pNoteTitle}>
                    {this.props.note.title}
                </p>
                <div
                style={styles.divDeleteNote}
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
