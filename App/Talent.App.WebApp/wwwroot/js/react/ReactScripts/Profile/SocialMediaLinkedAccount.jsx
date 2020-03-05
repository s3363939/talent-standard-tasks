/* Social media JSX */
import React, { Component } from "react";
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export class SocialMediaLinkedAccount extends Component {
    constructor(props) {
        super(props);

        const socialAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }

        this.state = {
            showEditSection: false,
            newContact: { linkedAccounts: socialAccounts }
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

/*    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }*/

    openEdit() {
        const socialAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newContact: { linkedAccounts: socialAccounts }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data.linkedAccounts[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newContact)

        var expression = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        var regex = new RegExp(expression)
        if (!data.linkedAccounts.linkedIn.match(regex) && data.linkedAccounts.linkedIn!="") {
            TalentUtil.notification.show("LinkedIn URL invalid", "error", null, null)
        } else if (!data.linkedAccounts.github.match(regex) && data.linkedAccounts.github != "") {
            TalentUtil.notification.show("Github URL invalid", "error", null, null)
        } else {
            this.props.saveProfileData(data)
            this.closeEdit()
        }        
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="linkedIn"
                    name="linkedIn"
                    value={this.state.newContact.linkedAccounts.linkedIn ? this.state.newContact.linkedAccounts.linkedIn : ""}
                    controlFunc={this.handleChange}
                    maxLength={100}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="github"
                    name="github"
                    value={this.state.newContact.linkedAccounts.github ? this.state.newContact.linkedAccounts.github : ""}
                    controlFunc={this.handleChange}
                    maxLength={100}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid Url"
                />      

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <button type="button" className="ui left floated linkedin button" >LinkedIn</button>
                    <button type="button" className="ui left floated github button" >GitHub</button>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}