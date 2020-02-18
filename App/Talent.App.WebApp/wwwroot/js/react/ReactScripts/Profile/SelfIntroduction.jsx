/* Self introduction section */
import React, { Component } from 'react';

export class SelfIntroduction extends Component {
    constructor(props) {
        super(props);

        this.updateDescription = this.updateDescription.bind(this);
        this.saveDescription = this.saveDescription.bind(this);
    };

    updateDescription(event) {
        const data = {}
        data[event.target.name] = event.target.value;
        this.props.updateWithoutSave(data);
    }

    saveDescription() {
        const data = {
            summary: this.props.summary,
            description: this.props.description            
        }

        this.props.updateProfileData(data)
    }

    render() {
        const characterLimit = 600;
        
        //let characters = this.props.description ? this.props.description.length : 0;

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <input
                            type="text"
                            value={this.props.summary ? this.props.summary : ""}
                            label="Summary"
                            name="summary"
                            onChange={this.updateDescription}
                            maxLength={150}
                            placeholder="Please provide a short summary about yourself"
                        />
                    </div>
                    <p>Summary must be no more than 150 characters.</p>                
                    <div className="field" >
                        <textarea
                            maxLength={characterLimit}
                            name="description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.props.description ? this.props.description : ""}
                            onChange={this.updateDescription} >
                        </textarea>
                    </div>
                    <p>Description must be between 150-600 characters.</p>
                    <button type="button" className="ui teal button" onClick={this.saveDescription}>Save</button>
                </div>
            </React.Fragment>
        )
    }
}



