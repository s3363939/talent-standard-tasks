/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import DatePicker from 'react-datepicker';
import { Table } from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.addExperience = this.addExperience.bind(this)
        this.addNewExperience = this.addNewExperience.bind(this)

    }

    handleChange(event) {
    }

    addExperience(event) {
    }

    addNewExperience(event) {
    }

    cancel() {

    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                <div>
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        value=""
                        placeholder="Company"
                        maxLength={20}
                        onChange={this.handleChange}
                    />
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value=""
                        placeholder="Position"
                        maxLength={20}
                        onChange={this.handleChange}
                    />
                    <label>Start Date:</label>
                    <DatePicker/>
                    <label>End Date:</label>
                    <DatePicker />
                    <label>Responsibilities:</label>
                    <input
                        type="text"
                        name="responsibilities"
                        value=""
                        placeholder="Responsibilities"
                        maxLength={20}
                        onChange={this.handleChange}
                    />                 
                    <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
                    <button type="button" className="ui button" onClick={this.cancel}>Cancel</button>
                </div >
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>end</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" className="ui teal button" onClick={this.addNewExperience}>Add New</button></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Skill</Table.Cell>
                                <Table.Cell>Lvl</Table.Cell>
                                <Table.Cell>Resp</Table.Cell>
                                <Table.Cell>st</Table.Cell>
                                <Table.Cell>end</Table.Cell>
                                <Table.Cell>Edit / delete</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div >
            </div>
        )
    }
}
