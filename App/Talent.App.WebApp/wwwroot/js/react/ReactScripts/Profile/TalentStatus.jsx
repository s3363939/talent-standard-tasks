import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

export class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeAvailableDate = this.handleChangeAvailableDate.bind(this)

        this.renderCheckBoxes = this.renderCheckBoxes.bind(this)
        this.renderDate = this.renderDate.bind(this)
    }

    handleChange(event, { value }) {
        let status = ''

        switch (value) {
            case '1':
                status = 'Actively looking for a job';
                break;
            case '2':
                status = 'Not looking for a job at the moment';
                break;
            case '3':
                status = 'Currently employed but open to offers';
                break;
            case '4':
                status = 'Will be available on later date';
                break;
            default:
                status =''
        }

        const data = {
            jobSeekingStatus: {
                status: status
            }
        }
        this.props.saveProfileData(data)
    }

    handleChangeAvailableDate(date) {
        if (date <= Moment()) {
            TalentUtil.notification.show("Select future date", "error", null, null)
        } else {
            const data = {
                jobSeekingStatus: {
                    status: this.props.status.status,
                    availableDate: date
                }
            }
            this.props.saveProfileData(data)
        }        
    }

    render() {
        return (
            <div className="ui grid">
                <div className="row">
                    <div className="sixteen wide column"> 
                        {this.renderCheckBoxes()}
                    </div>
                </div>
                <div className="row">
                    <div className="sixteen wide column">
                        {this.renderDate()}
                    </div>
                </div>
            </div>)
    }

    renderCheckBoxes() {
        let check = 'Actively looking for a job'

        if (this.props.status != null)
            check = this.props.status.status

        return (
            <div>
                <Form.Field>
                    Current Status
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Actively looking for a job'
                        name='checkboxRadioGroup'
                        value='1'
                        checked={check === 'Actively looking for a job'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Not looking for a job at the moment'
                        name='checkboxRadioGroup'
                        value='2'
                        checked={check === 'Not looking for a job at the moment'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Currently employed but open to offers'
                        name='checkboxRadioGroup'
                        value='3'
                        checked={check === 'Currently employed but open to offers'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Will be available on later date'
                        name='checkboxRadioGroup'
                        value='4'
                        checked={check === 'Will be available on later date'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </div>)
    }

    renderDate() {
        let display = false

        if (this.props.status != null && this.props.status.status == 'Will be available on later date')
            display = true

        if (display == true) {
            return (
                <div>
                    <label>Availability date</label>
                    <br/>
                    <DatePicker
                        dateFormat="DD/MM/YYYY"
                        name="available"
                        selected={this.props.status.availableDate ? Moment(this.props.status.availableDate) : Moment()}
                        onChange={this.handleChangeAvailableDate}
                    />
                </div>)
        } else {return (<div/>)}
    }
}