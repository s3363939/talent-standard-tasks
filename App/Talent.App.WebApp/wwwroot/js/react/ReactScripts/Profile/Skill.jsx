/* Skill section */
import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

export class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newContact: {
                skills: props.skillData ? props.skillData : []
            },
            showAddSection: false,
            addSkill: {
                id: 0,
                name: '',
                level: ''
            },
            updateSkill: {
                name: '',
                level: ''
            },
            editId: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.addSkill = this.addSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.cancelAddSkill = this.cancelAddSkill.bind(this)
        this.cancelUpdateSkill = this.cancelUpdateSkill.bind(this)

        this.renderAddSkill = this.renderAddSkill.bind(this)
        this.renderUpdateRow = this.renderUpdateRow.bind(this)
        this.renderRow = this.renderRow.bind(this)

    }

    handleChange(event) {
        var data = Object.assign({}, this.state.addSkill);

        const name = event.target.name;
        const value = event.target.value;

        data[name] = value;

        this.setState({
            addSkill: data
        })
    }

    handleUpdate(event) {
        var data = Object.assign({}, this.state.updateSkill);

        const name = event.target.name;
        const value = event.target.value;

        data[name] = value;

        this.setState({
            updateSkill: data
        })
    }

    addSkill() {
        var addSkill = this.state.addSkill
        var skills = this.props.skillData
        var data = Object.assign({}, this.state.newContact)
        data.skills = skills
        addSkill.id = addSkill.id + 1
        data.skills.push(addSkill)

        this.props.updateProfileData(data)
        
        this.setState({
            showAddSection: false,
            addSkill: {
                name: '',
                level: ''
            }
        })
    }

    deleteSkill(id) {
        var i;
        var skills = this.props.skillData
        var data = Object.assign({}, this.state.newContact)
        for (i = 0; i < skills.length; i++) {
            if (skills[i].id == id) {
                skills.splice(i, 1)
            }
        }
        this.setState({ newContact: { skills: skills } })
        data.skills = skills
        this.props.updateProfileData(data)
    }

    updateSkill(id) {
        var i
        var skills = this.props.skillData
        var data = Object.assign({}, this.state.newContact)
        var addSkill = this.state.updateSkill
        for (i = 0; i < skills.length; i++) {
            if (skills[i].id == id) {
                if (!addSkill.name)
                    addSkill.name = skills[i].name
                if (!addSkill.level)
                    addSkill.level = skills[i].level

                skills[i] = Object.assign({}, skills[i], addSkill)
            }
        }
        data.skills = skills
        this.setState({
            newContact: {
                skills: skills
            },
            editId: '',
            updateSkill: { name: '', level: '' }
        })
        this.props.updateProfileData(data)
    }

    cancelAddSkill() {
        this.setState({
            showAddSection: false, addSkill: { name: '', level: '' }
        })
    }

    cancelUpdateSkill() {
        this.setState({
            editId: '', updateSkill: { name: '', level: '' }
        })
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                {this.state.showAddSection ? this.renderAddSkill() : ''}
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Skill</Table.HeaderCell>
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
                            {this.props.skillData.map(skill => skill.id === this.state.editId ? this.renderUpdateRow(skill) : this.renderRow(skill))}
                        </Table.Body>
                    </Table>
                </div >
            </div>)
    }

    renderAddSkill() {
        return (
            <div>
                <input
                    type="text"
                    name="name"
                    value={this.state.addSkill.name ? this.state.addSkill.name : ''}
                    placeholder="Add Skill"
                    maxLength={20}
                    onChange={this.handleChange}
                />
                <select className="ui right labeled dropdown"
                    value={this.state.addSkill.level ? this.state.addSkill.level : ''}
                    onChange={this.handleChange}
                    name="level">
                    <option value="">Skill Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                </select>
                <button type="button" className="ui teal button" onClick={this.addSkill}>Add</button>
                <button type="button" className="ui button" onClick={() => { this.cancelAddSkill() }}>Cancel</button>
            </div >)
    }

    renderUpdateRow(skill) {
        return (
            <Table.Row key={skill.id}>
                <Table.Cell>
                    <input
                        type="text"
                        name="name"
                        value={this.state.updateSkill.name ? this.state.updateSkill.name : skill.name}
                        placeholder="Add Skill"
                        maxLength={20}
                        onChange={this.handleUpdate}
                    />
                </Table.Cell>
                <Table.Cell>
                    <select className="ui right labeled dropdown"
                        value={this.state.updateSkill.level ? this.state.updateSkill.level : skill.level}
                        onChange={this.handleUpdate}
                        name="level">
                        <option value="">Skill Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                </Table.Cell>
                <Table.Cell>
                    <button type="button" className="ui update button" onClick={() => { this.updateSkill(skill.id) }} >Update</button>
                    <button type="button" className="ui cancel button" onClick={() => { this.cancelUpdateSkill() }} >Cancel</button>
                </Table.Cell>
            </Table.Row>)
    }

    renderRow(skill) {
        return (
            <Table.Row key={skill.id}>
                <Table.Cell>{skill.name}</Table.Cell>
                <Table.Cell>{skill.level}</Table.Cell>
                <Table.Cell>
                    <button type="button" className="ui edit button" onClick={() => this.setState({ editId: skill.id })} > <Icon name='edit' /></button>
                    <button type="button" className="ui delete button" onClick={() => { this.deleteSkill(skill.id) }} ><Icon name='delete' /></button>
                </Table.Cell>
            </Table.Row>)
    }
}