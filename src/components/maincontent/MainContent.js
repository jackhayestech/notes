import React, { Component } from 'react';
import {EditorPanel} from './editor/EditorPanel'

export class MainContent extends Component
{

    constructor(props)
    {
        super(props);
    }

    render()
    {
        var divMainContent = {
            flex : 1
        }

        return (
            <div style={divMainContent}>
                <EditorPanel
                    ref="editorPanel"
                    selectedNote={this.props.selectedNote}
                    saveNote={this.props.saveNote.bind(this)}
                    addTag={this.props.addTag.bind(this)}
                    tags={this.props.tags}/>
            </div>
        );
    }
}
