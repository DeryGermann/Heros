import { Component } from "react";
import React from 'react';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

export default class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username_signup: "",
        email_signup: "",
        password_signup: "",
        confirm_password_signup: "",
        doPasswordsMatch: false,
        confirmPasswordText: "",
        username_login: "",
        password_login: "",
        isLoggedIn: false
    };

    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {

  }

  async signUp() {
    if (this.state.password_signup === this.state.confirm_password_signup) {
        try {
            this.setState({ confirmPasswordText: "" });

            await Auth.signUp({
                username: this.state.username_signup,
                attributes: {
                    email: this.state.email_signup
                },
                password: this.state.password_signup
            });

            this.setState({
                username_signup: "",
                email_signup: "",
                password_signup: ""
            });

            alert('You Signed Up! Go Log In NOW!!!!');
        } catch (error) {
            console.log(error);
        }
    } else {
        this.setState({ confirmPasswordText: "Passwords do not match." });
    }
  }

  async login() {
    try {
        let user = await Auth.signIn(this.state.username_login, this.state.password_login);

        // Add user to the database
        fetch(`https://giv58tf0a0.execute-api.us-east-2.amazonaws.com/Hero/hero`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": user.attributes.sub,
                "username": user.username,
                "email": user.attributes.email
            })
        })
        .then(data => console.log(data.json()))
        .then(() => {
            sessionStorage.setItem('user', JSON.stringify({
                "id": user.attributes.sub,
                'username': user.username
            }));

            this.setState({ isLoggedIn: true });
        })
        .catch(e => console.log(e));
    } catch (error) {
        console.log(error);
    }
  }

  render() {
    const showHideClassName = this.props.show ? "auth-modal auth-display-block" : "auth-modal auth-display-none";
    
    if (this.state.isLoggedIn) {
        document.location.reload();
    }

    return (
        <div className={ showHideClassName }>
            <section className="modal-main">
                <span className='close-button topright' 
                onClick={ this.props.handleClose.bind(this) }>&times;</span>
                
                <div className='account'>
                    <div className='account-login'>
                        <h2>Log In</h2>
                    
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' 
                            value={ this.state.username_login }
                            onChange={ evt => this.setState({ username_login: evt.target.value }) }
                        />

                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' 
                            value={ this.state.password_login }
                            onChange={ evt => this.setState({ password_login: evt.target.value }) }
                        />
                        <input type='submit' value='Log In' 
                            onClick={ () => this.login() }
                        />
                    </div>

                    <div className='account-signup'>
                        <h2>Sign Up</h2>

                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' 
                            value={ this.state.username_signup }
                            onChange={ evt => this.setState({ username_signup: evt.target.value }) }
                        />

                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' 
                            value={ this.state.email_signup }
                            onChange={ evt => this.setState({ email_signup: evt.target.value }) }
                        />

                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' 
                            value={ this.state.password_signup }
                            onChange={ evt => this.setState({ password_signup: evt.target.value }) }
                        />

                        <label htmlFor='repassword'>Confirm Password</label>
                        <input type='password' name='repassword' 
                            value={ this.state.confirm_password_signup }
                            onChange={ evt => this.setState({ confirm_password_signup: evt.target.value }) }
                        />

                        { this.state.confirmPasswordText }

                        <input type='submit' value='Sign Up' 
                            onClick={ () => this.signUp() }
                        />
                    </div>
                </div>
            </section>
        </div>
    );
  }
}