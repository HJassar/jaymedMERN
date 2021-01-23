import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../store/currentUser/currentUser.actions';

import Error from '../../components/Error/Error'

import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ({ location, login, currentUser }) => {
    document.title = 'JayMed | Login';

    const fromPath = location.state ? location.state.from.pathname : '/'
    console.log(fromPath)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    // const [loggedIn, setLoggedIn] = useState(false);

    return (
        currentUser ?
            <Redirect to='/' />
            :
            <section className='Login'>
                <h1>Login</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setErrorMessage('Loading')
                        axios
                            .post('/auth/login',
                                { username, password })
                            .then(res => {
                                // login(res.data.token)
                                localStorage.setItem('token', res.data.token);
                                window.location.replace(fromPath);
                                // setLoggedIn(true)
                            })
                            .catch(error => {
                                setErrorMessage(error.response.statusText)
                                setTimeout(() => {
                                    setErrorMessage(undefined)
                                }, 3000);
                            })
                    }}
                >
                    <label for='username'>Username</label>
                    <input
                        id='username'
                        value={username}
                        onInput={(e) => {
                            setUsername(e.target.value)
                        }}
                        type="text" />
                    <label for='password'>Password</label>
                    <input id='password'
                        value={password}
                        onInput={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="password" />
                    <input type="submit" value="Login"
                        disabled={(username === '' || password === '')}
                    />
                </form>

                <br /> Don\'t Have an account yet? <Link to='/register'>Register here</Link>


                {errorMessage !== undefined ?
                    <Error errorMessage={errorMessage} />
                    : null
                }
            </section>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser.currentUser
})

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { login })(Login);