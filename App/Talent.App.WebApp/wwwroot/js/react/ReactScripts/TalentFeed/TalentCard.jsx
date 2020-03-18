import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Card, Icon, Image, Button } from 'semantic-ui-react'
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            showCard: true,
            default: true
        }

        this.init = this.init.bind(this);
        this.loadData = this.loadData.bind(this)
        this.showProfile = this.showProfile.bind(this)
        this.hideProfile = this.hideProfile.bind(this)
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        /*var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                }
                //console.log(res)
                this.setState({
                    companyDetails: employerData
                })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()*/
    }

    showProfile() {
        this.setState({
            default: false
        });
    }

    hideProfile() {
        this.setState({
            default: true
        });
    }

    render() {
        if (this.state.showCard) {
            return (
                <Card fluid>
                    <Card.Content>
                        Talent
                        <Button floated="right">
                            <Icon name="star" />
                        </Button>
                    </Card.Content>
                    {this.state.default ?
                        <div className='player-wrapper'>
                            <ReactPlayer
                                className='react-player'
                                url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                                width='100%'
                                height='100%'
                            />
                        </div>
                        :
                        <div className="ui grid" display="none">
                            <div className="row">
                                <div className="eight wide column">
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size="medium" />
                                </div>
                                <div className="eight wide column">
                                    <Card.Content>
                                        <Card.Header>Talent snapshot</Card.Header>
                                        <br />
                                        <Card.Description>
                                            CURRENT EMPLOYER
                                        <br />
                                            VISA STATUS
                                        <br />
                                            POSITION
                                    </Card.Description>
                                    </Card.Content>
                                </div>
                            </div>
                        </div>
                    }
                    <Card.Content extra>
                        <div className='ui four buttons'>
                            {this.state.default ?
                                <Button onClick={this.showProfile}>
                                    <Icon name="user" />
                                </Button>
                                :
                                <Button onClick={this.hideProfile}>
                                    <Icon name="video" />
                                </Button>
                            }
                            <Button>
                                <Icon name="file pdf outline" />
                            </Button>
                            <Button>
                                <Icon name="linkedin" />
                            </Button>
                            <Button>
                                <Icon name="github" />
                            </Button>
                        </div>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color='blue'>
                            C#
                        </Button>
                    </Card.Content>
                </Card>)
        } else {
            return (
                <div className="content">
                    <div className="center aligned header">
                        There are no talents found for your recruitment company
                    </div>
                </div>)
        }            
    }
}

