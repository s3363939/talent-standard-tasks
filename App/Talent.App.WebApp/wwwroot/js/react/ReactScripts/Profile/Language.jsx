/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.addLanguage = this.addLanguage.bind(this)
        this.addNewLanguage = this.addNewLanguage.bind(this)

    }

    handleChange(event) {
    }

    addLanguage(event) {
    }

    addNewLanguage(event) {
    }

    cancel() {

    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                <div>
                    <input
                        type="text"
                        name="language"
                        value=""
                        placeholder="Add Language"
                        maxLength={20}
                        onChange={this.handleChange}
                    />
                    <select className="ui right labeled dropdown"
                        value=""
                        onChange={this.handleChange}
                        name="Language level">
                        <option value="">Language Level</option>
                    </select>
                    <button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                    <button type="button" className="ui button" onClick={this.cancel}>Cancel</button>
                </div >
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Language</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" className="ui teal button" onClick={this.addNewLanguage}>Add New</button></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Lang</Table.Cell>
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