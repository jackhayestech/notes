import React, { Component } from 'react';
import Radium from 'radium';

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
        var styles = {

            divNewNote: {
                margin: '5px 0px',
                padding: '7px 15px',
                display: 'inline-block',
                cursor: 'pointer',
                textAlign: 'center',
                lineHeight: '25px',
                background: '#e8e8e8',

                ':hover': {
                    background : '#efecec',
                },
            },

            divTopBarContainer : {
                border: '1px solid',
                padding: '10px',
            },

            divFilterContainter : {
                display: 'inline-block',
                marginLeft: '25px'
            }
        }

        return (
            <div style={styles.divTopBarContainer}>
                <div style={styles.divNewNote}
                    onMouseDown={this.newNote.bind(this)}>+</div>
                <div style={styles.divFilterContainter}>
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
