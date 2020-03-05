/* Language section */
import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

export class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newContact: {
                languages: props.languageData
            },
            showAddSection: false,
            addLanguage: {
                id: 0,
                name: '',
                level: ''
            },
            updateLanguage: {
                name: '',
                level: ''
            },
            editId: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.addLanguage = this.addLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.cancelAddLanguage = this.cancelAddLanguage.bind(this)
        this.cancelUpdateLanguage = this.cancelUpdateLanguage.bind(this)        

        this.renderAddLanguage = this.renderAddLanguage.bind(this)
        this.renderUpdateRow = this.renderUpdateRow.bind(this)
        this.renderRow = this.renderRow.bind(this)
    }

    handleChange(event) {
        var data = Object.assign({}, this.state.addLanguage);

        const name = event.target.name;
        const value = event.target.value;

        data[name] = value;

        this.setState({
            addLanguage: data
        })
    }

    handleUpdate(event) {
        var data = Object.assign({}, this.state.updateLanguage);

        const name = event.target.name;
        const value = event.target.value;

        data[name] = value;

        this.setState({
            updateLanguage: data
        })
    }

    addLanguage() {
        var addLang = this.state.addLanguage
        if (addLang.name == "" || addLang.level == "")
            TalentUtil.notification.show("Please enter language and level", "error", null, null)
        else {
            var langs = this.props.languageData
            var data = Object.assign({}, this.state.newContact)
            data.languages = langs
            addLang.id = addLang.id + 1
            data.languages.push(addLang)

            this.props.updateProfileData(data)
            this.setState({
                showAddSection: false,
                addLanguage: { name: '', level: '' }
            })
        }        
    }

    deleteLanguage(id) {
        var i;
        var langs = this.props.languageData
        var data = Object.assign({}, this.state.newContact)
        for (i = 0; i < langs.length; i++) {
            if (langs[i].id == id) {
                langs.splice(i, 1)
            }
        }
        this.setState({ newContact: { languages: langs } })
        data.languages = langs
        this.props.updateProfileData(data)
    }

    updateLanguage(id) {
        var i
        var langs = this.props.languageData
        var data = Object.assign({}, this.state.newContact)
        var addLang = this.state.updateLanguage
        for (i = 0; i < langs.length; i++) {
            if (langs[i].id == id) {
                if (!addLang.name)
                    addLang.name = langs[i].name
                if (!addLang.level)
                    addLang.level = langs[i].level

                langs[i] = Object.assign({}, langs[i], addLang)
            }
        }
        data.languages = langs
        this.setState({
            newContact: {
                languages: langs
            },
            editId: '',
            updateLanguage: { name: '', level: '' }
        })
        this.props.updateProfileData(data)
    }

    cancelAddLanguage() {
        this.setState({
            showAddSection: false, addLanguage: { name: '', level: '' }
        })
    }

    cancelUpdateLanguage() {
        this.setState({
            editId: '', updateLanguage: { name: '', level: '' }
        })
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                {this.state.showAddSection ? this.renderAddLanguage() : ''}
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Language</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui teal button" onClick={() => this.setState({ showAddSection: true })} >
                                        <Icon name='plus' />
                                        Add New
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.languageData.map(language => language.id === this.state.editId ? this.renderUpdateRow(language) : this.renderRow(language))}
                        </Table.Body>
                    </Table>
                </div >
            </div>)
    }

    renderAddLanguage() {
        return (
            <div>
                <input
                    type="text"
                    name="name"
                    value={this.state.addLanguage.name ? this.state.addLanguage.name : ''}
                    placeholder="Add Language"
                    maxLength={20}
                    onChange={this.handleChange}
                />
                <select className="ui right labeled dropdown"
                    value={this.state.addLanguage.level ? this.state.addLanguage.level : ''}
                    onChange={this.handleChange}
                    name="level">
                    <option value="">Language Level</option>
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native/Bilingual">Native/Bilingual</option>
                </select>
                <button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                <button type="button" className="ui button" onClick={() => { this.cancelAddLanguage() }}>Cancel</button>
            </div >)
    }

    renderUpdateRow(language) {
        return (
            <Table.Row key={language.id}>
                <Table.Cell>
                    <input
                        type="text"
                        name="name"
                        value={this.state.updateLanguage.name ? this.state.updateLanguage.name : language.name}
                        placeholder="Add Language"
                        maxLength={20}
                        onChange={this.handleUpdate}
                    />
                </Table.Cell>
                <Table.Cell>
                    <select className="ui right labeled dropdown"
                        value={this.state.updateLanguage.level ? this.state.updateLanguage.level : language.level}
                        onChange={this.handleUpdate}
                        name="level">
                        <option value="">Language Level</option>
                        <option value="Basic">Basic</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                </Table.Cell>
                <Table.Cell>
                    <button type="button" className="ui update button" onClick={() => { this.updateLanguage(language.id) }} >Update</button>
                    <button type="button" className="ui cancel button" onClick={() => { this.cancelUpdateLanguage() }} >Cancel</button>
                </Table.Cell>
            </Table.Row>)
    }

    renderRow(language) {
        return (
            <Table.Row key={language.id}>
                <Table.Cell>{language.name}</Table.Cell>
                <Table.Cell>{language.level}</Table.Cell>
                <Table.Cell>
                    <button type="button" className="ui edit button" onClick={() => this.setState({ editId: language.id })} > <Icon name='edit' /></button>
                    <button type="button" className="ui delete button" onClick={() => { this.deleteLanguage(language.id) }} ><Icon name='delete' /></button>
                </Table.Cell>
            </Table.Row>)
    }
}
