/* Self introduction section */
import React, { Component } from 'react';

export class SelfIntroduction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: 0,
            summary: props.Summary,
            description: props.description
        };
        this.updateDescription = this.updateDescription.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
    };

    updateDescription(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        this.props.updateWithoutSave(data);
        let description = event.target.value;
        this.setState({
            characters: description.length
        })
    }

    updateSummary(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        this.props.updateWithoutSave(data);
        let summary = event.target.value;
        this.setState({
            characters: summary.length
        })
    }

    saveDescription(event) {

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
                            value={this.state.summary}
                            label="Summary"
                            name="Summary"
                            onChange={this.updateSummary}
                            maxLength={150}
                            placeholder="Please provide a short summary about yourself"
                        />
                    </div>
                    <p>Summary must be no more than 150 characters.</p>                
                    <div className="field" >
                        <textarea
                            maxLength={characterLimit}
                            name="Description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.state.description}
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



