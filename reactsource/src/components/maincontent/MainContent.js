import React, { Component } from 'react';

import {EditorPanel} from './editor/EditorPanel'
import '../../styles/maincontent/maincontent.css';

export class MainContent extends Component
{

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div id="divMainContent">
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
