/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);


        this.selectFileToUpload = this.selectFileToUpload.bind(this);
    };

    selectFileToUpload() {
        document.getElementById('selectFile').click();
    }
    

    render() {
        return (
            <div className='ui sixteen wide column'>
                <label>Profile Photo</label>
                <span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>
            </div>
        )
    }
}
