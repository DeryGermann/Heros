import { Component } from "react";
import React from 'react';

export default class HeroSquare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      id: this.props.id,
      name: this.props.name,
      intelligence: this.props.intelligence,
      strength: this.props.strength,
      speed: this.props.speed,
      durability: this.props.durability,
      power: this.props.power,
      combat: this.props.combat,
      imageURL: this.props.imageURL,
      willDelete: this.props.deleteHero
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('user')) {
      this.setState({ user: JSON.parse(sessionStorage.getItem('user')) });
    }
  }

  async deleteHero() {
    await fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero/${this.state.user.id}/${this.state.id}`, {
      method: 'DELETE'
    })
    .then(data => data.json())
    .then(result => console.log(result))
    .catch(e => console.log(e));

    document.location.reload();
  }

  async addCharacter() {
    let hero = {
      "id": this.state.id,
      "name": this.state.name,
      "intelligence": this.state.intelligence,
      "strength": this.state.strength,
      "speed": this.state.speed,
      "durability": this.state.durability,
      "power": this.state.power,
      "combat": this.state.combat,
      "imageURL": this.state.imageURL
    }

    await fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero/${this.state.user.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"hero":hero})
    })
    .catch(e => console.log(e));

    document.location.reload();
  }

  render() {
    let willDeleteClick;
    if (this.state.willDelete) {
      willDeleteClick = () => this.deleteHero();
    } else {
      willDeleteClick = () => this.addCharacter();
    }

    return(
      <div className='hero-square' onClick={ willDeleteClick }>
        <img src={ `${ this.state.imageURL }` } alt='Hero'/>
        <p>{ this.state.name }</p>
      </div>
    );
  }
}