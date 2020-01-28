import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        console.log("Address: ", props.addressData);

        const address = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                postcode: "",
                city: "",
                country: ""
            }

        this.state = {
            showEditSection: false,
            newAddress: address
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const address = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: address
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    handleDropdownChange(event) {
        var data = Object.assign({}, this.props.location);
        //required
        const name = event.target.name;
        let value = event.target.value;
        const id = event.target.id;

        data[name] = value;
        if (name == "country") {
            data["city"] = "";
        }
        var updateData = {
            target: { name: "location", value: data }
        }

        //update props here
        this.props.updateProfileData(updateData);
    }

    saveContact() {
        console.log(this.state.newAddress)
        const data = Object.assign({}, this.state.newAddress)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        const countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>); 

        return (
            <div className='ui sixteen wide column'>
                <label>Number</label>
                <input
                    type="text"
                    name="number"
                    value={this.state.newAddress.number}
                    placeholder="Number"
                    maxLength={10}
                    onChange={this.handleChange}
                />
                <label>Street</label>
                <input
                    type="text"
                    name="street"
                    value={this.state.newAddress.street}
                    placeholder="street name"
                    maxLength={80}
                    onChange={this.handleChange}
                />
                <label>Suburb</label>
                <input
                    type="text"
                    name="suburb"
                    value={this.state.newAddress.suburb}
                    placeholder="suburb name"
                    maxLength={20}
                    onChange={this.handleChange}
                />
                <select className="ui right labeled dropdown"
                    placeholder="Country"
                    value=""
                    onChange={this.handleDropdownChange}
                    name="country">
                    <option value="">Select a country</option>
                    {countriesOptions}
                </select>
                <select className="ui right labeled dropdown"
                    placeholder="City"
                    value=""
                    onChange={this.handleDropdownChange}
                    name="city">
                    <option value="">Select a city</option>
                    {countriesOptions}
                </select>
                <label>Postcode</label>
                <input
                    type="text"
                    name="postcode"
                    value={this.state.newAddress.postcode}
                    placeholder="postcode"
                    maxLength={20}
                    onChange={this.handleChange}
                />
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let fullAddress = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postcode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {fullAddress}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }
    
    render() {
        
        const countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);  

        return (
            <div className='ui sixteen wide column'>
                <select className="ui right labeled dropdown"
                    placeholder="Country"
                    value=""
                    onChange={this.handleChange}
                    name="nationality">
                    <option value="">Select your nationality</option>
                    {countriesOptions}
                </select>
            </div>
        )
    }
}