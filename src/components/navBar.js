import { Component } from "react";
import React from 'react';

import Authentication from './authentication';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  componentDidMount() {

  }

  showAuthModal = evt => {
    this.setState({ showModal: true });
  }
  hideAuthModal = evt => {
    this.setState({ showModal: false });
  }

  async signOut() {
    try {
      await Auth.signOut();

      sessionStorage.removeItem('user');

      document.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let auth;

    if (sessionStorage.getItem('user')) {
      auth = <div className='button' onClick={ () => this.signOut() }>
        Sign Out
      </div>
    } else {
      auth = <div className='button' onClick={ evt => this.showAuthModal(evt) }>
        Log In / Sign Up
      </div>
    }

    return(
        <div className='nav-bar'>
            <h1 className='logo'>Heros?</h1>

            { auth }

            <Authentication 
              show={ this.state.showModal }
              handleClose={ evt => this.hideAuthModal(evt) } 
            />
        </div>
    );
  }
}