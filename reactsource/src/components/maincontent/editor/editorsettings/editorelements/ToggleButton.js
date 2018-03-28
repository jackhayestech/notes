import React, { Component } from 'react';

export class ToggleButton extends Component
{
    constructor(props)
    {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            active : false
        }
    }

    toggle(event)
    {
        event.preventDefault();
        this.props.toggleEditorSettings(this.props.setting);
        this.setState({active: !this.state.active});
    }

    render()
    {
        if (this.state.active === true)
        {
            var lblStyleButtonActive = {
                backgroundColor: '#c3c3c3'
            }
        }

        var lblStyleButton = {
            margin: '10px 5px',
            display: 'inline-block',
            cursor: 'pointer',
            width: '25px',
            height: '25px',
            textAlign: 'center',
            lineHeight: '25px',
            backgroundColor: '#e8e8e8'
        }

        return (
            <div style={{...lblStyleButton, ...lblStyleButtonActive}} onMouseDown={this.toggle}>{this.props.text}</div>
        );
    }
}
