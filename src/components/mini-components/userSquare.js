import { Component } from "react";
import React from 'react';

export default class UserSquare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: this.props.userName,
      id: this.props.id,
      selected: false
    };
  }

  componentDidMount() {
    
  }

  selectOpp() {
    if (sessionStorage.getItem('opp')) { // Delete then recreate
      sessionStorage.removeItem('opp');

      this.setState({ selected: false });
    } else {
      // Create
      sessionStorage.setItem('opp', JSON.stringify({ 
        username: this.state.userName,
        id: this.state.id
      }));
  
      this.setState({ selected: true });

      document.location.reload();
    }

  }

  render() {
    let isSelected = this.state.selected ? 'selected-square' : '';

    return(
      <div className={`user-square ${isSelected}`} onClick={ () => this.selectOpp() }>
        <h3 className='user-name'>{ this.state.userName }</h3>
      </div>
    );
  }
}