import React, { Component } from 'react';
import Radium from 'radium';

import '../../../styles/sidebar/elements/topbar.css';

export class TopBar extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            searchText : ""
        };
    }

    newNote()
    {
        this.props.newNote();
    }

    search(e)
    {
        this.setState({searchText:e.target.value});

        this.props.filterNotes(e.target.value)
    }

    render()
    {
        return (
            <div id="divTopBarContainer">
                <div id="divNewNote"
                    onMouseDown={this.newNote.bind(this)}>+</div>
                <div id="divFilterContainter">
                    Search Notes: <br/>
                    <input type="text"
                        value={this.state.searchText}
                        onChange={this.search.bind(this)} />
                </div>
            </div>
        );
    }
}

TopBar = Radium(TopBar);
