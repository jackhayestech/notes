import React, { Component } from 'react';

import '../../../../../styles/maincontent/editor/editorsettings/editorsettingselements/togglebutton.css';

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
        let className = 'lblStyleButton';

        if (this.state.active === true)
        {
            className += ' lblStyleButtonActive';
        }

        return (
            <div className={className} onMouseDown={this.toggle}>{this.props.text}</div>
        );
    }
}
