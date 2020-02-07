/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import DatePicker from 'react-datepicker';
import { Icon, Table } from 'semantic-ui-react';

export class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experiences: props.experiences ? props.experiences : [],
            showAddSection: false,
            addExperience: {
                id: '',
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            },
            updateExperience: {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            },
            editId: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
        this.update = this.update.bind(this)
        this.cancelAdd = this.cancelAdd.bind(this)
        this.cancelUpdate = this.cancelUpdate.bind(this)

        this.renderAdd = this.renderAdd.bind(this)
        this.renderUpdateRow = this.renderUpdateRow.bind(this)
        this.renderRow = this.renderRow.bind(this)

    }

    handleChange(event) {
        var data = Object.assign({}, this.state.addExperience);

        const name = event.target.name;
        const value = event.target.value;

        data[name] = value;

        this.setState({
            addExperience: data
        })
    }

    handleUpdate(event) {
        var data = Object.assign({}, this.state.updateExperience);

        const name = event.target.name;
        const value = event.target.value;

        data[name] = value;

        this.setState({
            updateExperience: data
        })
    }

    add() {
        var experiences = this.state.experiences
        var addExperience = this.state.addExperience

        if (experiences.length > 0) {
            addExperience.id = experiences[experiences.length - 1].id + 1
        } else {
            addExperience.id = 0
        }

        experiences.push(addExperience)

        this.setState({
            experiences: experiences,
            showAddSection: false,
            addExperience: {
                id: '',
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            }
        })
    }

    delete(id) {
        var i;
        var experiences = this.state.experiences
        for (i = 0; i < experiences.length; i++) {
            if (experiences[i].id == id) {
                experiences.splice(i, 1)
            }
        }
        this.setState({ experiences: experiences })
    }

    update(id) {
        var i
        var experiences = this.state.experiences
        //var update = this.state.updateExperience

        for (i = 0; i < experiences.length; i++) {
            if (experiences[i].id == id) {               
                experiences[i] = Object.assign({}, experiences[i], this.state.updateExperience)
            }
        }

        this.setState({
            experiences: experiences,
            editId: '',
            updateExperience: {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            }
        })
    }

    cancelAdd() {
        this.setState({
            showAddSection: false,
            addExperience: {
                id: '',
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            }
        })
    }

    cancelUpdate() {
        this.setState({
            editId: '', 
            updateExperience: {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                responsibilities: ''
            }
        })
    }

    edit(id) {

        var i
        var experiences = this.state.experiences
        //var update = this.state.updateExperience

        for (i = 0; i < experiences.length; i++) {
            if (experiences[i].id == id) {
                this.setState({
                    editId: id,
                    updateExperience: Object.assign({}, this.state.experiences[i])
                })
            }
        }

        
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                {this.state.showAddSection ? this.renderAdd() : ''}

                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui teal button" onClick={() => this.setState({ showAddSection: true })} >
                                        <Icon name='plus' />
                                        Add New
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.experiences.map(experience => experience.id === this.state.editId ? this.renderUpdateRow(experience) : this.renderRow(experience))}
                        </Table.Body>
                    </Table>
                </div >            
            </div>
        )
    }

    renderAdd() {
        return (
            <div>
                <label>Company:</label>
                <input
                    type="text"
                    name="company"
                    value={this.state.addExperience.company ? this.state.addExperience.company : ''}
                    placeholder="Company"
                    maxLength={20}
                    onChange={this.handleChange}
                />
                <label>Position:</label>
                <input
                    type="text"
                    name="position"
                    value={this.state.addExperience.position ? this.state.addExperience.position : ''}
                    placeholder="Position"
                    maxLength={20}
                    onChange={this.handleChange}
                />
                <label>Start Date:</label>
                <DatePicker />
                <label>End Date:</label>
                <DatePicker />
                <label>Responsibilities:</label>
                <input
                    type="text"
                    name="responsibilities"
                    value={this.state.addExperience.responsibilities ? this.state.addExperience.responsibilities : ''}
                    placeholder="Responsibilities"
                    maxLength={20}
                    onChange={this.handleChange}
                />  
                <button type="button" className="ui teal button" onClick={this.add}>Add</button>
                <button type="button" className="ui button" onClick={() => { this.cancelAdd() }}>Cancel</button>
            </div >)
    }

    renderUpdateRow(experience) {
        return (
            <Table.Row key={experience.id}>
                <Table.Cell>
                <label>Company:</label>
                <input
                    type="text"
                    name="company"
                    value={this.state.updateExperience.company ? this.state.updateExperience.company : experience.company}
                    placeholder="Company"
                    maxLength={20}
                    onChange={this.handleUpdate}
                />
                <label>Position:</label>
                <input
                    type="text"
                    name="position"
                    value={this.state.updateExperience.position ? this.state.updateExperience.position : experience.position}
                    placeholder="Position"
                    maxLength={20}
                    onChange={this.handleUpdate}
                />
                <label>Start Date:</label>
                <DatePicker />
                <label>End Date:</label>
                <DatePicker />
                <label>Responsibilities:</label>
                <input
                    type="text"
                    name="responsibilities"
                    value={this.state.updateExperience.responsibilities ? this.state.updateExperience.responsibilities : experience.responsibilities}
                    placeholder="Responsibilities"
                    maxLength={20}
                    onChange={this.handleUpdate}
                />  

                <button type="button" className="ui teal button" onClick={() => { this.update(experience.id) }} >Update</button>
                <button type="button" className="ui button" onClick={() => { this.cancelUpdate() }} >Cancel</button>
                </Table.Cell>
            </Table.Row>)
    }

    renderRow(experience) {
        return (
            <Table.Row key={experience.id}>
                <Table.Cell>{experience.company}</Table.Cell>
                <Table.Cell>{experience.position}</Table.Cell>
                <Table.Cell>{experience.responsibilities}</Table.Cell>
                <Table.Cell>{experience.startDate}</Table.Cell>
                <Table.Cell>{experience.endDate}</Table.Cell>
                <Table.Cell>
                    <button type="button" className="ui edit button" onClick={() => { this.edit(experience.id) }} > <Icon name='edit' /></button>
                    <button type="button" className="ui delete button" onClick={() => { this.delete(experience.id) }} ><Icon name='delete' /></button>
                </Table.Cell>
            </Table.Row>)
    }
}
