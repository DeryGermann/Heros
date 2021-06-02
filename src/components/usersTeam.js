import { Component } from "react";
import React from 'react';

import UserSquare from './mini-components/userSquare';
import HeroSquare from './mini-components/heroSquare';

export default class UsersTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: [],
      user: ""
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('user')) {
      this.setState({ user: JSON.parse(sessionStorage.getItem('user')) }, () => {
        this.grabUserTeam();
      });
    }
  }

  grabUserTeam() {
    fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero/${this.state.user.id}`,{
      method: 'GET'
    })
    .then(data => data.json())
    .then(result => this.setState({ team: result.heros }))
    .catch(e => console.log(e));
  }

  render() {
    let user;

    if (this.state.user !== "") {
      user = <UserSquare 
        userName={ this.state.user.username }
        id={ this.state.user.id }
      />;
    }

    return(
      <div className='user-team'>
        { user }

        <div className='team-list'>
            {
              this.state.team.map((hero, i) => {
                return <HeroSquare 
                  key={i}
                  id={ hero.M.id.S }
                  name={ hero.M.name.S }

                  intelligence={ hero.M.intelligence.S }
                  strength={ hero.M.strength.S }
                  speed={ hero.M.speed.S }
                  durability={ hero.M.durability.S }
                  power={ hero.M.power.S }
                  combat={ hero.M.combat.S }

                  imageURL={ hero.M.imageURL.S }

                  deleteHero={ true }
                />
              })
            }
        </div>
      </div>
    );
  }
}