/* Experience section */
import React from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import { Icon, Table } from 'semantic-ui-react';

export class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newContact: {
                experience: props.experienceData ? props.experienceData : []
            },
            showAddSection: false,
            addExperience: {
                id: 0,
                company: '',
                position: '',
                start: '',
                end: '',
                responsibilities: ''
            },
            updateExperience: {
                company: '',
                position: '',
                start: '',
                end: '',
                responsibilities: ''
            },
            editId: '',
            isEndEnabled: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
        this.handleUpdateStartDate = this.handleUpdateStartDate.bind(this)
        this.handleUpdateEndDate = this.handleUpdateEndDate.bind(this)
        //this.handleSelect = this.handleSelect.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
        this.update = this.update.bind(this)
        this.edit = this.edit.bind(this)
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

    handleChangeStartDate(date) {
        const startDate = date

        var data = Object.assign({}, this.state.addExperience);
        
        let today = new Moment()
        if (startDate >= today) {
            TalentUtil.notification.show("Experience start date can't be today or in the future", "error", null, null)
        }
        else {
            data.start = Moment(date)
            this.setState({
                addExperience: data,
                isEndEnabled: true
            })
        }
    }

    handleChangeEndDate(date) {
        const endDate = date

        var data = Object.assign({}, this.state.addExperience);

        let today = new Moment()
        if (endDate <= data.start) {
            TalentUtil.notification.show("Experience end date needs to be past start date", "error", null, null)
        } else if (endDate >= today) {
            TalentUtil.notification.show("Experience end date can't be today or in the future", "error", null, null)
        } else {
            data.end = Moment(date)
            this.setState({
               addExperience: data
            })
        }
    }

    handleUpdateStartDate(date) {
        const startDate = date

        var data = Object.assign({}, this.state.updateExperience);

        let today = new Moment()
        if (startDate >= today) {
            TalentUtil.notification.show("Experience start date can't be today or in the future", "error", null, null)
        }
        else {
            data.start = Moment(date)
            this.setState({
                updateExperience: data
            })
        }
    }

    handleUpdateEndDate(date) {
        const endDate = date

        var data = Object.assign({}, this.state.updateExperience);

        let today = new Moment()
        if (endDate <= data.start) {
            TalentUtil.notification.show("Experience end date needs to be past start date", "error", null, null)
        } else if (endDate >= today) {
            TalentUtil.notification.show("Experience end date can't be today or in the future", "error", null, null)
        } else {
            data.end = Moment(date)
            this.setState({
                addExperience: data
            })
        }
    }

    /*handleSelect(event) {
        console.log("handleSelect")
    }*/

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
        var experiences = this.props.experienceData
        var addExperience = this.state.addExperience
        var data = Object.assign({}, this.state.newContact)

        if (addExperience.company == '') {
            TalentUtil.notification.show("Company field empty", "error", null, null)
        } else if (addExperience.position == '') {
            TalentUtil.notification.show("Position field empty", "error", null, null)
        } else if (addExperience.start == '') {
            TalentUtil.notification.show("Please select start date", "error", null, null)
        } else if (addExperience.end == '') {
            TalentUtil.notification.show("Please select end date", "error", null, null)
        } else if (addExperience.responsibilities == '') {
            TalentUtil.notification.show("Responsibilities field empty", "error", null, null)
        } else {            
            data.experience = experiences
            addExperience.id = addExperience.id + 1
            data.experience.push(addExperience)
            this.props.updateProfileData(data)
            this.setState({
               showAddSection: false,
               addExperience: {
                    company: '',
                    position: '',
                    start: '',
                    end: '',
                    responsibilities: ''
               },
               isEndEnabled: false
            })
        }        
    }

    delete(id) {
        var i;
        var experiences = this.props.experienceData
        var data = Object.assign({}, this.state.newContact)
        for (i = 0; i < experiences.length; i++) {
            if (experiences[i].id == id) {
                experiences.splice(i, 1)
            }
        }
        this.setState({ newContact: { experience: experiences } })
        data.experience = experiences
        this.props.updateProfileData(data)
    }

    update(id) {
        var i
        var experiences = this.props.experienceData
        var data = Object.assign({}, this.state.newContact)
        var update = this.state.updateExperience

        for (i = 0; i < experiences.length; i++) {
            if (experiences[i].id == id) {               
                experiences[i] = Object.assign({}, experiences[i], update)
            }
        }
        data.experience = experiences
        this.setState({
            newContact: { experience: experiences },
            editId: '',
            updateExperience: {
                company: '',
                position: '',
                start: '',
                end: '',
                responsibilities: ''
            }
        })
        this.props.updateProfileData(data)
    }

    edit(id) {
       var experiences = this.props.experienceData

       for (var i = 0; i < experiences.length; i++) {
           if (experiences[i].id == id) {
               this.setState({
                   editId: id,
                   updateExperience: Object.assign({}, experiences[i])
               })
           }
       }
    }

    cancelAdd() {
        this.setState({
            showAddSection: false,
            addExperience: {
                company: '',
                position: '',
                start: '',
                end: '',
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
                start: '',
                end: '',
                responsibilities: ''
            }
        })
    }

    render() {
        return (
            <div className='ui sixteen wide column'>
                {this.state.showAddSection ? this.renderAdd() : ''}
                <br />
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
                            {this.props.experienceData.map(experience => experience.id === this.state.editId ? this.renderUpdateRow(experience) : this.renderRow(experience))}
                        </Table.Body>
                    </Table>
                </div >            
            </div>
        )
    }

    renderAdd() {
        return (
            <div class="ui grid">
                <div class="row">
                    <div class="eight wide column">
                        <label>Company:</label>
                        <input
                            type="text"
                            name="company"
                            value={this.state.addExperience.company ? this.state.addExperience.company : ''}
                            placeholder="Company"
                            maxLength={20}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div class="eight wide column">
                        <label>Position:</label>
                        <input
                            type="text"
                            name="position"
                            value={this.state.addExperience.position ? this.state.addExperience.position : ''}
                            placeholder="Position"
                            maxLength={20}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="eight wide column">
                        <label>Start Date:</label>
                        <br />
                        <DatePicker
                            dateFormat="DD/MM/YYYY"
                            name="start"
                            selected={this.state.addExperience.start ? this.state.addExperience.start : Moment()}
                            onChange={this.handleChangeStartDate}
                        />
                    </div>
                    <div class="eight wide column">
                        <label>End Date:</label>
                        <br />
                        <DatePicker
                            disabled={!this.state.isEndEnabled}
                            name="end"
                            selected={this.state.addExperience.end ? this.state.addExperience.end : Moment()}
                            onChange={this.handleChangeEndDate}
                        />                        
                    </div>
                </div>
                <div class="row">
                    <div class="sixteen wide column">
                        <label>Responsibilities:</label>
                        <input
                            type="text"
                            name="responsibilities"
                            value={this.state.addExperience.responsibilities ? this.state.addExperience.responsibilities : ''}
                            placeholder="Responsibilities"
                            maxLength={20}
                            onChange={this.handleChange}
                        />  
                    </div>
                </div>
                <div class="row">
                    <div class="sixteen wide column">
                        <button type="button" className="ui teal button" onClick={this.add}>Add</button>
                        <button type="button" className="ui button" onClick={() => { this.cancelAdd() }}>Cancel</button>
                    </div>
                </div>
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
                    <br/>
                                <label>Start Date:</label>
                                    <DatePicker
                                        dateFormat="DD/MM/YYYY"
                                        name="start"
                                        selected={Moment(this.state.updateExperience.start)}
                                        onChange={this.handleUpdateStartDate}
                    />
                    <br />
                                <label>End Date:</label>
                                    <DatePicker
                                        dateFormat="DD/MM/YYYY"
                                        name="end"
                                        selected={Moment(this.state.updateExperience.end)}
                                        onChange={this.handleUpdateEndDate}
                    />
                    <br />
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
                <Table.Cell>{Moment(experience.start).format("Do MMM, YYYY")}</Table.Cell>
                <Table.Cell>{Moment(experience.end).format("Do MMM, YYYY")}</Table.Cell>
                <Table.Cell>
                    <button type="button" className="ui edit button" onClick={() => this.edit(experience.id)} > <Icon name='edit' /></button>
                    <button type="button" className="ui delete button" onClick={() => { this.delete(experience.id) }} ><Icon name='delete' /></button>
                </Table.Cell>
            </Table.Row>)
    }
}
