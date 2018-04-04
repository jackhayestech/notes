import React, { Component } from 'react';

import {ToggleButton} from './editorsettingselements/ToggleButton'
import {ColourPickerButton} from './editorsettingselements/ColourPickerButton'
import '../../../../styles/maincontent/editor/editorsettings/editorsettings.css';

export class EditorSettings extends Component {
    constructor(props)
    {
        super(props);
        this.toggleEditorSettings = this.toggleEditorSettings.bind(this);
    }

    toggleEditorSettings(Setting)
    {
        this.props.toggleEditorSettings(Setting);
    }

    render()
    {
        return (
            <div id="divEditorSettings">
                <ToggleButton text={"B"} setting={"BOLD"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ToggleButton text={"I"} setting={"ITALIC"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ToggleButton text={"UL"} setting={"UNDERLINE"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ToggleButton text={"C"} setting={"CODE"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ColourPickerButton setColour={this.props.setColour.bind(this)}/>
            </div>
        );
    }
}
