import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

export class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const status = this.props.status ?
            Object.assign({}, this.props.status)
            : {
                status: "",
                availableDate: null
            }

        this.state = {
            newContact: { jobSeekingStatus: status },
            check: ""
        }
        
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, { value }) {
        const data = Object.assign({}, this.state.newContact)

        switch (value) {
            case '1':
                data.jobSeekingStatus.status = 'Actively looking for a job';
                break;
            case '2':
                data.jobSeekingStatus.status = 'Not looking for a job at the moment';
                break;
            case '3':
                data.jobSeekingStatus.status = 'Currently employed but open to offers';
                break;
            case '4':
                data.jobSeekingStatus.status = 'Will be available on later date';
                break;
            default:
                data.jobSeekingStatus.status =''
        }
               
        this.setState({
            newContact: data,
            check: value
        })
        this.props.saveProfileData(data)
    }

    render() {
        return (
            <div className='ui sixteen wide column'>                
                <Form.Field>
                    Current Status
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Actively looking for a job'
                        name='checkboxRadioGroup'
                        value='1'
                        checked={this.state.check === '1'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Not looking for a job at the moment'
                        name='checkboxRadioGroup'
                        value='2'
                        checked={this.state.check === '2'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Currently employed but open to offers'
                        name='checkboxRadioGroup'
                        value='3'
                        checked={this.state.check === '3'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Will be available on later date'
                        name='checkboxRadioGroup'
                        value='4'
                        checked={this.state.check === '4'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </div>
        )

    }
}