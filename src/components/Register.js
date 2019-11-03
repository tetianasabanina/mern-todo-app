import React, { Component } from 'react';

import axios from 'axios';

import Login from './Login';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    }

    handleClick(event) {
        let apiBaseUrl = "http://localhost:4000/todos";
        console.log("values", this.state.first_name, this.state.last_name, this.state.email. this.state.password);
        let self = this;
        let payload={
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
        }
        axios.post(apiBaseUrl+'/register', payload)
        .then(function (response) {
            console.log(response);
            if(response.data.code == 200) {
                let loginscreen=[];
                loginscreen.push(<Login parentContext={this} />);
                let loginmessage ="Not Registered yet. go to registration";
                self.props.parentContext.setState({loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Register",
                isLogin:true
            });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                <h2>Register:</h2>
                <form>
                    <p>First Name:</p>
                    <input
                        type='text'
                        label='firstname'
                        name='firstname'
                        required
                        onChange={(event, newValue) => this.setState({ first_name: newValue })}
                    />
                    <p>Last Name:</p>
                    <input
                        type='text'
                        label='lastname'
                        name='lastname'
                        onChange={(event, newValue) => this.setState({ last_name: newValue })}
                    />
                    <p>Email:</p>
                    <input
                        type='email'
                        label='email'
                        name='email'
                        required
                        onChange={(event, newValue) => this.setState({ email: newValue })}
                    />
                    <p>Password:</p>
                    <input
                        type='password'
                        name='password'
                        required
                        onChange={(event, newValue) => this.setState({ password: newValue })}
                    />
                    {this.state.errormessage}
                    <button
                        className="btn btn-primary btn-sm ml-2"
                        type="submit"
                        onClick={(event) => this.handleClick(event)}
                    >Submit
                        </button>
                </form>
            </div>
        )
    }
}