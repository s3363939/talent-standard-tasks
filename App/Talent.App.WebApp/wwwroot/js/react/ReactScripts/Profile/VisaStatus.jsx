import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.addVisa = this.addVisa.bind(this)
    }

    handleChange(event) {
    }

    addVisa(event) {
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                <label>Visa type</label>
                <select className="ui right labeled dropdown"
                    value=""
                    onChange={this.handleChange}
                    name="Visa type">
                    <option value="">Visa type</option>
                </select>
                <label>Visa expiry date</label>
                <DatePicker />
                <button type="button" className="ui teal button" onClick={this.addVisa}>Save</button>
            </div>
        )
      
    }
}