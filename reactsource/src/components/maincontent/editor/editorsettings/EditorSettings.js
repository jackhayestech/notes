import React, { Component } from 'react';
import {ToggleButton} from './editorelements/ToggleButton'
import {ColourPickerButton} from './editorelements/ColourPickerButton'

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
        var divEditorSettings = {
            minHeight: '10%',
            border: '1px solid',
        }

        return (
            <div style={divEditorSettings}>
                <ToggleButton text={"B"} setting={"BOLD"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ToggleButton text={"I"} setting={"ITALIC"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ToggleButton text={"UL"} setting={"UNDERLINE"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ToggleButton text={"C"} setting={"CODE"} toggleEditorSettings={this.toggleEditorSettings.bind(this)}/>
                <ColourPickerButton setColour={this.props.setColour.bind(this)}/>
            </div>
        );
    }
}
