/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.addSkill = this.addSkill.bind(this)
        this.addNewSkill = this.addNewSkill.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    handleChange(event) {
    }

    addSkill(event) {
    }

    addNewSkill(event) {
    }

    cancel() {

    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                <div>
                    <input
                        type="text"
                        name="skill"
                        value=""
                        placeholder="Add Skill"
                        maxLength={20}
                        onChange={this.handleChange}
                    />
                    <select className="ui right labeled dropdown"
                        value=""
                        onChange={this.handleChange}
                        name="Skill level">
                        <option value="">Skill Level</option>
                    </select>
                    <button type="button" className="ui teal button" onClick={this.addSkill}>Add</button>
                    <button type="button" className="ui button" onClick={this.cancel}>Cancel</button>
                </div >
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Skill</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" className="ui teal button" onClick={this.addNewSkill}>Add New</button></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Skill</Table.Cell>
                                <Table.Cell>Lvl</Table.Cell>
                                <Table.Cell>Edit / delete</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div >
            </div>
        )
    }
}

