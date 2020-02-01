/* Self introduction section */
import React, { Component } from 'react';

export class SelfIntroduction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newContact: {
                summary: this.props.summary,
                description: this.props.description
            }
        }

        this.updateDescription = this.updateDescription.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
        this.saveDescription = this.saveDescription.bind(this);
    };

    updateDescription(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value;
        //this.props.updateWithoutSave(data);
        let description = event.target.value;
        this.setState({
            newContact: data
        })
    }

    updateSummary(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value;
        //this.props.updateWithoutSave(data);
        let summary = event.target.value;
        this.setState({
            newContact: data
        })
    }

    /*handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }*/

    saveDescription() {
        const data = Object.assign({}, this.state.newContact)
        this.props.updateProfileData(data)
    }

    render() {
        const characterLimit = 600;
        //let characters = this.props.description ? this.props.description.length : 0;
        let summary = "";
        let description = "";
        //console.log('summary', this.props.summary)
        if (this.props.summary) {
            summary = this.props.summary
        }

        if (this.state.newContact.description) {
            description = this.state.newContact.description
        }

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <input
                            type="text"
                            value={summary}
                            label="Summary"
                            name="summary"
                            onChange={this.updateSummary}
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
                            value={description}
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



