import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TodosList from "./todos-list.component";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            errormessage: ''
        }
    }

    handleClick(event) {
        let apiBaseUrl = "http://localhost:4000/todos/";
        let self = this;
        let payload={
            "email":this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl+'login', payload)
        .then(function (response) {
            console.log(response); 
            if(response.data.code == 200){
                console.log("Login successfull");
                let uploadScreen=[];
                uploadScreen.push(<TodosList appContext=
                    {self.props.appContext} />)
                self.props.appContext.setState({loginPage:
                [],uploadScreen:uploadScreen})
            }
            else if (response.data.code == 204) {
                console.log("Username password do not match")
            }
            else {
               console.log("Username does not exist"); 
            }      
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let header = '';
        if (this.state.username) {
            header = <h1>Hello {this.state.username}</h1>;
        } else {
            header = '';
        }
        return (
            <div>
                <form>
                    {header}
                    <p>Username:</p>
                    <input
                        type='text'
                        label='username'
                        name='username'
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <p>Password:</p>
                    <input
                        type='password'
                        name='password'
                        onChange = {(event,newValue) => this.setState({password:newValue})}
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