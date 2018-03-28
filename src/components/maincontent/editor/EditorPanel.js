import React, { Component } from 'react';
import {EditorSettings} from './editorsettings/EditorSettings'
import {Tags} from './editorpanelelements/Tags'
import {TitleInput} from './editorpanelelements/TitleInput'
import {NoteEditor} from './editorpanelelements/NoteEditor'
import update from 'immutability-helper';
import {convertToRaw, RichUtils, EditorState} from 'draft-js';

export class EditorPanel extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            editorState: this.props.selectedNote.data.content,
            noteTitle: this.props.selectedNote.data.title,
            noteTags : this.props.selectedNote.tags
        };

        this.toggleEditorSettings = this.toggleEditorSettings.bind(this);
    }

    saveNote()
    {

        var contentState = this.state.editorState.getCurrentContent();

        console.log(JSON.stringify(convertToRaw(contentState)));

        var note = {
            id : this.props.selectedNote.id,
            data : {
                title : this.state.noteTitle,
                content:  JSON.stringify(convertToRaw(contentState))
            },
            tags : this.state.noteTags,
        };

        setTimeout(function() {
            this.props.saveNote(note);
        }.bind(this), 10);
    }

    toggleEditorSettings(Setting)
    {
        this.refs.editor.toggleEditorSettings(Setting);
    }

    updateNoteTitle(title)
    {
        this.setState({noteTitle : title})

        setTimeout(function() {
            this.saveNote();
        }.bind(this), 10);
    }

    updateNoteTags(tags)
    {
        this.setState({noteTags : tags})

        setTimeout(function() {
            this.saveNote();
        }.bind(this), 10);
    }

    updateNoteContent(content)
    {
        this.setState({editorState : content})

        setTimeout(function() {
            this.saveNote();
        }.bind(this), 10);
    }

    setColour(r,g,b)
    {

    }

    render()
    {
        var divEditor = {
            border: '1px solid',
            padding: '10px',
            flex: 1,
        }

        var divEditorContainer = {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }

        if (this.props.selectedNote.id != 0)
        {
            return (
                <div style={divEditorContainer}>
                    <EditorSettings
                        settings={this.state.editorSettings}
                        toggleEditorSettings={this.toggleEditorSettings.bind(this)}
                        setColour={this.setColour.bind(this)}/>

                    <div style={divEditor}>
                        <TitleInput title={this.state.noteTitle}
                            updateNoteTitle={this.updateNoteTitle.bind(this)}/>

                        <Tags tags={this.props.tags}
                            noteTags={this.props.selectedNote.tags}
                            addTag={this.props.addTag.bind(this)}
                            updateNoteTags={this.updateNoteTags.bind(this)}/>

                        <NoteEditor ref='editor'
                            updateNoteContent={this.updateNoteContent.bind(this)}
                            content={this.state.editorState}/>
                    </div>
                </div>
            );
        }
        else
        {
            return (<div></div>);
        }
    }
}
