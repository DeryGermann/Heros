import { Component } from "react";
import React from 'react';

import UserSquare from './mini-components/userSquare';

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      users: []
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('user')) {
      this.setState({ user: JSON.parse(sessionStorage.getItem('user')) }, () => {
        this.setState({ isUserLoggedIn: true }, () => this.grabUsers());
      });
    }
  }
  
  grabUsers() {
    fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero/${this.state.user.id}`, {
      method: 'PUT'
    })
    .then(data => data.json())
    .then(result => {
      this.setState({ users: result })
    })
    .catch(e => console.log(e));
  }

  render() {
    return(
      <div className='user-list'>
        {
          this.state.users.map((user, i) => {
            if (user.username) {
              return <UserSquare
                key={i}  
              
                userName={user.username}
                id={user.id}
              />
            }
          })
        }
      </div>
    );
  }
}