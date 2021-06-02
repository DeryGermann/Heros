import { Component } from "react";
import React from 'react';

import HeroSquare from './mini-components/heroSquare';

export default class HeroList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero_list: [],
      herosPerPage: 20,
      hasHerosLoaded: false
    };
  }

  componentDidMount() {
    this.Init();
  }

  Init() {
    let list = [];

    for (let i = 0; i < this.state.herosPerPage; i++) {
      let object = {
        "id": "",
        "name": "",
        "intelligence": "",
        "strength": "",
        "speed": "",
        "durability": "",
        "power": "",
        "combat": "",
        "imageURL": "",
      }

      // Random number 1 and 731
      let rng = Math.floor(Math.random() * 731) + 1;

      fetch(`https://www.superheroapi.com/api.php/1930328933773094/${ rng }`)
      .then(data => data.json())
      .then(result => {
        object.id = result.id;
        object.name = result.name;

        object.intelligence = result.powerstats.intelligence;
        object.strength = result.powerstats.strength;
        object.speed = result.powerstats.speed;
        object.durability = result.powerstats.durability;
        object.power = result.powerstats.power;
        object.combat = result.powerstats.combat;

        object.imageURL = result.image.url;

        list.push(object);

        this.setState({ hero_list: [...this.state.hero_list, list] });
      })
      .catch(e => console.log(e));
    }
  }

  render() {
    return(
      <div className='hero-list'>
        {
          this.state.hero_list.map((hero, i) => {
            return <HeroSquare 
              key={ i }

              id={ hero[i].id }
              name={ hero[i].name }

              intelligence={ hero[i].intelligence }
              strength={ hero[i].strength }
              speed={ hero[i].speed }
              durability={ hero[i].durability }
              power={ hero[i].power }
              combat={ hero[i].combat }

              imageURL={ hero[i].imageURL }

              deleteHero={ false }
            />
          })
        }
      </div>
    );
  }
}