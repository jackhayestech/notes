import React, { Component } from 'react';

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
        var inpTitle = {
            marginBottom: '10px',
        }

        return(
            <input style={inpTitle}
                type="text"
                value={this.state.noteTitle}
                onChange={this.onTitleChange.bind(this)} />
        );
    }
}
