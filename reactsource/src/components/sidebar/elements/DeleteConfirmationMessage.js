import React, { Component } from 'react';
import Radium from 'radium';

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
        var styles = {
            divDeleteNoteOverlay: {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },

            divConfirmDelete : {
                width: '300px',
                height: '150px',
                position: 'absolute',
                left: '0',
                right: '0',
                top: '30%',
                bottom: '70%',
                margin: 'auto',
                backgroundColor: '#ffffff',
                textAlign: 'center',
            },

            spanTextButton : {
                width: '30px',
                height: '15px',
                display: 'inline-block',
                padding: '10px',
                margin: '0px 5px',

                ':hover': {
                    background : '#d2d2d2',
                },
            },

        }

        if (this.props.display)
        {
            return (
                <div style={styles.divDeleteNoteOverlay}
                    onMouseDown={this.props.toggleDeleteNoteDisplay}>
                    <div style={styles.divConfirmDelete}
                    onMouseDown={this.confirmDivStopProp}>
                        Are you sure you want to delete: <br/>
                        {this.props.note.title}?<br/>
                        <span key={'btn1'}
                        style={styles.spanTextButton}
                        onMouseDown={this.deleteNote.bind(this)}>
                            Yes
                        </span>
                        <span key={'btn2'}
                        style={styles.spanTextButton}
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
