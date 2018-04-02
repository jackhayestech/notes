import React, { Component } from 'react';
import Radium from 'radium';

export class NoteSelector extends Component
{
    constructor(props)
    {
        super(props);

        this.select = this.select.bind(this);

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

    deleteNote()
    {
        this.toggleDeleteNoteDisplay();
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

        if (this.state.displayConfirmDelete === false)
        {
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
                </div>
            );
        }
        else
        {
            return (
                <div
                key={this.props.note.id} 
                style={styles.divNoteSelector}
                onMouseDown={this.select}>
                    <p style={styles.pNoteTitle}>
                        {this.props.note.title}
                    </p>
                    <div style={styles.divDeleteNote}
                    onMouseDown={this.toggleDeleteNoteDisplay.bind(this)}>
                        x
                    </div>
                    <p>
                        {this.props.tags}
                    </p>
                    <div style={styles.divDeleteNoteOverlay}
                        onMouseDown={this.toggleDeleteNoteDisplay.bind(this)}>
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
                            onMouseDown={this.toggleDeleteNoteDisplay.bind(this)}>
                                No
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

NoteSelector = Radium(NoteSelector);
