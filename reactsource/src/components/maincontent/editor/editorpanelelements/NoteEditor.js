import React, { Component } from 'react';
import {Editor, EditorState, RichUtils, ContentState, createEditorState, convertFromRaw, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';

export class NoteEditor extends Component
{
    constructor(props)
    {
        super(props)
        var test = '{"blocks":[{"key":"3rbum","text":"t","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
        var state;

        if (this.props.content === "")
        {
            state = EditorState.createEmpty();
        }
        else
        {
            const DBEditorState = convertFromRaw(JSON.parse(this.props.content));
            state = EditorState.createWithContent(DBEditorState);
        }

        this.props.updateNoteContent(state);

        this.state = {
            editorState: state,
        };

        this.onEditorChange = (editorState) => {
            this.setState({editorState})

            setTimeout(function() {
                this.props.updateNoteContent(editorState);
            }.bind(this), 10);
        };

        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    handleKeyCommand(command, editorState)
    {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState)
        {
            this.onEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    toggleEditorSettings(Settings)
    {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.state.editorState, Settings));
    }

    render()
    {
        var divContainer = {
            marginTop : '15px'
        }

        return(
            <div style={divContainer}>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onEditorChange}
                    ref="editor"
                    placeholder="Write something here..."
                    />
            </div>
        );
    }
}