import React from 'react'
import DatePicker from 'react-datepicker';

export class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visa: props.visaStatus ? props.visaStatus : '',
            expiryDate: props.expiryDate ? props.expiryDate : '',
            showExpiryDate: false,
            newContact: {
                visaStatus: props.visaStatus ? props.visaStatus : '',
                visaExpiryDate: props.expiryDate ? props.expiryDate : '',
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderExpiryDate = this.renderExpiryDate.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        const value = event.target.value
        data[event.target.name] = value
        if ((value == "Work Visa") || (value == "Student Visa")) {
            this.setState({
                showExpiryDate: true,
                newContact: data
            })
        } else {
            this.setState({
                showExpiryDate: false,
                newContact: data
            })
        }
        
    }

    saveContact() {
        console.log(this.state.newContact)
        const data = Object.assign({}, this.state.newContact)
        this.props.saveProfileData(data)
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                <label>Visa type</label>
                <select className="ui right labeled dropdown"
                    value={this.state.newContact.visaStatus}
                    onChange={this.handleChange}
                    name="visaStatus">
                    <option value="">Visa type</option>
                    <option value="Citizen">Citizen</option>
                    <option value="Permanent Resident">Permanent Resident</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Student Visa">Student Visa</option>
                </select>
                {this.state.showExpiryDate ? this.renderExpiryDate() : ''}                
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
            </div>
        )      
    }

    renderExpiryDate() {
        return (
            <div>
                <label>Visa expiry date</label>
                <DatePicker />
            </div>)
    }
}