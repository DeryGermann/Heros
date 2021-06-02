import { Component } from "react";
import React from 'react';

import UserSquare from './mini-components/userSquare';
import HeroSquare from './mini-components/heroSquare';

export default class BattleSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
        result: "",
        user: "",
        user_team: [],
        opp: "",
        opp_team: []
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('opp')) {
      this.setState({ user: JSON.parse(sessionStorage.getItem('user')) }, () => {
        this.setState({ opp: JSON.parse(sessionStorage.getItem('opp')) }, () => this.grabOppHeros());
      });
    }
  }

  grabOppHeros() {
    fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero/${this.state.opp.id}`)
    .then(data => data.json())
    .then(result => {
      this.setState({ opp_team: result.heros }, () => this.grabUserHeros());
    })
    .catch(e => console.log(e));
  }
  grabUserHeros() {
    fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero/${this.state.user.id}`)
    .then(data => data.json())
    .then(result => {
      this.setState({ user_team: result.heros }, () => this.battleMath());
    })
    .catch(e => console.log(e));
  }

  battleMath() {
    let user_total = this.calculatePlayerScore(this.state.user_team);
    let opp_total = this.calculatePlayerScore(this.state.opp_team);
    
    if (opp_total > user_total) { // Player 1 WINS
      this.setState({ result: `${this.state.opp.username} has WON this battle!` });
    } else if (opp_total < user_total) { // Player 2 WINS
      this.setState({ result: `${this.state.user.username} has WON this battle!` });
    } else { // DRAW
      this.setState({ result: "This Battle was a DRAW!" });
    }
  }

  calculatePlayerScore(team) {
    let total = 0;

    for (let i = 0; i < team.length; i++) {
      const hero = team[i];

      total += parseInt(hero.M.intelligence.S) || 0;
      total += parseInt(hero.M.strength.S) || 0;
      total += parseInt(hero.M.speed.S) || 0;
      total += parseInt(hero.M.durability.S) || 0;
      total += parseInt(hero.M.power.S) || 0;
      total += parseInt(hero.M.combat.S) || 0;
    }

    return total;
  }

  clearBattleScreen() {
    sessionStorage.removeItem('opp');
    document.location.reload();
  }

  render() {
    let opp;
    let user;
    let clearScreen;
    if (this.state.user !== "" && this.state.opp !== "") {
      user = <UserSquare 
        userName={this.state.user.username}
        id={this.state.user.id}
      />;
      opp = <UserSquare 
        userName={this.state.opp.username}
        id={this.state.opp.id}
      />;

      clearScreen = <div className='button' onClick={() => this.clearBattleScreen()}>
        Clear Battle Screen
      </div>
    }

    return(
      <div className='battle-section'>
        
        <div className='left-user'>
            { opp }
            
            <div className='battle-hero-list'>
                {
                  this.state.opp_team.map((hero, i) => {
                    return <HeroSquare 
                      key={ i }

                      id={ hero.M.id.S }
                      name={ hero.M.name.S }

                      intelligence={ hero.M.intelligence.S }
                      strength={ hero.M.strength.S }
                      speed={ hero.M.speed.S }
                      durability={ hero.M.durability.S }
                      power={ hero.M.power.S }
                      combat={ hero.M.combat.S }

                      imageURL={ hero.M.imageURL.S }
                    />
                  })  
                }
            </div>
        </div>
        
        <div className='result'>
            <h1>{ this.state.result }</h1>
            { clearScreen }
        </div>
        
        <div className='right-user'>
            { user }

            <div className='battle-hero-list'>
              {
                this.state.user_team.map((hero, i) => {
                  return <HeroSquare 
                    key={ i }

                    id={ hero.M.id.S }
                    name={ hero.M.name.S }

                    intelligence={ hero.M.intelligence.S }
                    strength={ hero.M.strength.S }
                    speed={ hero.M.speed.S }
                    durability={ hero.M.durability.S }
                    power={ hero.M.power.S }
                    combat={ hero.M.combat.S }

                    imageURL={ hero.M.imageURL.S }
                  />
                })  
              }
            </div>
        </div>
      </div>
    );
  }
}