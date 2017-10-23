import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';

export class ColourPickerButton extends Component
{
    state = {
       displayColorPicker: false,
       color: {
         r: '0',
         g: '0',
         b: '0',
         a: '1',
       },
     };

     handleClick = () => {
       this.setState({ displayColorPicker: !this.state.displayColorPicker })
     };

     handleClose = () => {
       this.setState({ displayColorPicker: false })
     };

     handleChange = (color) => {
       this.setState({ color: color.rgb })

       this.props.setColour(  this.state.color.r , this.state.color.g , this.state.color.b );
     };

     render() {

       const styles = reactCSS({
         'default': {
           color: {
             width: '36px',
             height: '14px',
             borderRadius: '2px',
             background: `rgb(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b })`,
           },
           swatch: {
             padding: '5px',
             background: '#fff',
             borderRadius: '1px',
             boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
             display: 'inline-block',
             cursor: 'pointer',
           },
           popover: {
             position: 'absolute',
             zIndex: '2',
           },
           cover: {
             position: 'fixed',
             top: '0px',
             right: '0px',
             bottom: '0px',
             left: '0px',
           },
         },
       });

       return (
         <div>
           <div style={ styles.swatch } onClick={ this.handleClick }>
             <div style={ styles.color } />
           </div>
           { this.state.displayColorPicker ? <div style={ styles.popover }>
             <div style={ styles.cover } onClick={ this.handleClose }/>
             <ChromePicker color={ this.state.color } onChange={ this.handleChange } />
           </div> : null }

         </div>
       )
     }
}
