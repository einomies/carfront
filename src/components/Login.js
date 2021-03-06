import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Carlist from './Carlist';
import Snackbar from '@material-ui/core/Snackbar';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            open: false
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // We need a state handler for the Snackbar open state to close Snackbar after
    // the time that we set in the Snackbar autoHideDuration props.
    handleClose = (event) => {
        this.setState({ open: false });
    }

    // Login is done by calling the /login endpoint using the POST method and sending
    // the user object inside the body. If authentication succeeds, we get a token in a
    //  response Authorization header. We will then save the token to session storage 
    // and set the isAuthenticated state value to true. The session storage is similar 
    // to local storage but it is cleared when a page session ends. When the isAuthenticated
    // state value is changed, the user interface is re-rendered.
    login = () => {
        const user = { username: this.state.username, password: this.state.password };
        fetch(
            SERVER_URL + 'login', {
                method: 'POST',
                body: JSON.stringify(user)
            }
        )
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({ isAuthenticated: true });
                } else {
                    this.setState({ open: true })
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    logout = () => {
        sessionStorage.removeItem("jwt");
        this.setState({ isAuthenticated: false });
    }

    render() {
        if (this.state.isAuthenticated === true) {
            return (<Carlist />)
        } else {
            return (
                <div>
                    <TextField name="username" placeholder="Username"
                        onChange={this.handleChange} />
                    <br />
                    <TextField name="password" placeholder="Password"
                        onChange={this.handleChange} type="password" />
                    <br />
                    <br />
                    <Button variant="raised" color="primary" onClick={this.login}>
                        Login
                    </Button>
                    <Snackbar
                        open={this.state.open} onClose={this.handleClose}
                        autoHideDuration={1500} message='Check your username and password' />
                </div>
            )
        }
    }
}

export default Login;