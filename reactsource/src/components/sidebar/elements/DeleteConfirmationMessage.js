import React, { Component } from 'react';
import Radium from 'radium';

import '../../../styles/sidebar/elements/deleteconfirmationmessage.css';

export class DeleteConfirmationMessage extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    deleteNote()
    {
        this.props.toggleDeleteNoteDisplay();
        this.props.deleteNote();
    }

    confirmDivStopProp(e)
    {
        e.stopPropagation();
    }

    render()
    {
        if (this.props.display)
        {
            return (
                <div id="divDeleteNoteOverlay"
                    onMouseDown={this.props.toggleDeleteNoteDisplay}>
                    <div id="divConfirmDelete"
                    onMouseDown={this.confirmDivStopProp}>
                        Are you sure you want to delete: <br/>
                        {this.props.note.title}?<br/>
                        <span key={'btn1'}
                        className="spanTextButton"
                        onMouseDown={this.deleteNote.bind(this)}>
                            Yes
                        </span>
                        <span key={'btn2'}
                        className="spanTextButton"
                        onMouseDown={this.props.toggleDeleteNoteDisplay}>
                            No
                        </span>
                    </div>
                </div>
            );
        }
        else
        return (null)
    }
}

DeleteConfirmationMessage = Radium(DeleteConfirmationMessage);
