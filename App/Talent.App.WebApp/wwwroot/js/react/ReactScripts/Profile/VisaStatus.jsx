import React from 'react'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

export class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.updateContact = this.updateContact.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderExpiryDate = this.renderExpiryDate.bind(this)
        this.handleChangeExpiryDate = this.handleChangeExpiryDate.bind(this)
    }

    handleChangeExpiryDate(date) {
        const expiryDate = date

        const data = {
            visaExpiryDate: expiryDate
        }
        this.props.updateProfileData(data)
    }

    updateContact(event) {
        const data = {}
        const value = event.target.value
        data[event.target.name] = value
        this.props.updateProfileData(data)
    }

    saveContact() {
        const data = {
            visaStatus: this.props.visaStatus,
            visaExpiryDate: this.props.visaExpiryDate
        }
        this.props.saveProfileData(data)
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                <label>Visa type</label>
                <select className="ui right labeled dropdown"
                    value={this.props.visaStatus ? this.props.visaStatus : ''}
                    onChange={this.updateContact}
                    name="visaStatus">
                    <option value="">Visa type</option>
                    <option value="Citizen">Citizen</option>
                    <option value="Permanent Resident">Permanent Resident</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Student Visa">Student Visa</option>
                </select>
                {this.renderExpiryDate()}                
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
            </div>
        )      
    }

    renderExpiryDate() {
        if ((this.props.visaStatus == "Work Visa") || (this.props.visaStatus == "Student Visa")) {
            return (
                <div>
                    <label>Visa expiry date</label>
                    <DatePicker
                        dateFormat="DD/MM/YYYY"
                        name="expiry"
                        selected={Moment(this.props.visaExpiryDate) ? Moment(this.props.visaExpiryDate) : Moment()}
                        onChange={this.handleChangeExpiryDate}
                    />
                </div>)
        } else {
            return (<div/>)
        }        
    }
}