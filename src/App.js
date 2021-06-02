import { Component } from "react";
import React from 'react';

import NavBar from './components/navBar';
import UserList from './components/userList';
import BattleSection from './components/battleSection';
import HeroList from './components/heroList';
import UsersTeam from './components/usersTeam';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.grabUsers();
  }

  grabUsers() {
    fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero/12`, 
    {
      method: "PUT"
    }
    )
    .then(data => data.json())
    .then(result => console.log(result))
    .catch(e => console.log(e));
  }

  render() {
    return(
      <div className='container'>
        <NavBar />
        
        <div className='h-container'>
          <UserList />
          
          <div className='v-container'>
            <BattleSection />
            <HeroList />
          </div>

          <UsersTeam />
        </div>
      </div>
    );
  }
}