import React from 'react';
import TeamMember from './TeamMember.jsx';
import { browserHistory } from 'react-router';
import $ from 'jquery';

// import dummyData from './../../../data/session-data.json';

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSessions: []
    }
  }

  componentDidMount() {
    this._getSessions(function(data) {
      this.setState({ userSessions: _sessionsByUser(data) });
    }.bind(this));
  }

  _getSessions(callback) {
    $.ajax({
      method: 'GET',
      url: '/api/session',
      success: function(data) {
        callback(data);
      },
      error: function(error) {
        console.error('_getSessions Error:', error);
      },
      dataType: 'json'
    });
  }

  showSessionReport() {
    console.log('showSessionReport function needs updating for correct REACT ROUTER PATH');
    // browserHistory.push('/reports/' + this.props.sessionId.toString());
  }

  _sessionsByUser(sessions) {
    //Build an object with user sessions in an array by user
    let users = sessions.reduce(function(usersSoFar, session) {
      usersSoFar[session.userId] = usersSoFar[session.userId].push(session) || [session];
      return usersSoFar
     },{});

    //Convert object to array of user objects & related sessions
    let userSessions = [];
    for (let user of users) {
      userSessions.push({
        user: user,
        sessions: users[user]
      })
    }
    return userSessions;
  }

  render() {
    return (
      <div className="view team-view">
        <h4 className="team-view-title">Team Dashboard</h4>
        <div className="pure-g">
          {this.state.userSessions.map(
            user => (
              <div className="pure-u-1-3">
                <TeamMember userName={user.sessions[0].firstName + ' ' + user.sessions[0].lastName} 
                            userId={user.user} 
                            sessions={user.sessions} 
                            onClick={this.showSessionReport.bind(this)}/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}