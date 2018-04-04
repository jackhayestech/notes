import React, { Component } from 'react';

import '../../../../styles/maincontent/editor/editorpanelelements/titleinput.css';

export class TitleInput extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            noteTitle : this.props.title
        }
    }

    onTitleChange(e)
    {
        var title = e.target.value;
        this.setState({noteTitle:title});
        setTimeout(function() {
            this.props.updateNoteTitle(title);
        }.bind(this), 10);
    }

    render()
    {
        return(
            <input id="inpTitle"
                type="text"
                value={this.state.noteTitle}
                onChange={this.onTitleChange.bind(this)} />
        );
    }
}
