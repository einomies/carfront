import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div>
                <TextField name="username" placeholder="Username"
                    onChange={this.handleChange} />
                <br />
                <TextField name="password" placeholder="Password"
                    onChange={this.handleChange} />
                <br />
                <br />
                <Button variant="raised" color="primary" onClick={this.login}>
                    Login
                </Button>
            </div>
        )
    }
}

export default Login;