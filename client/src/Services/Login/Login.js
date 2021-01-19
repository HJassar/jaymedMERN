import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../store/currentUser/currentUser.actions';

import Error from '../../components/Error/Error'

import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ({ login, currentUsername }) => {
    document.title = 'JayMed | Login';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        loggedIn || currentUsername ?
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
                                login(res.data.token)
                                localStorage.setItem('token', res.data.token);
                                window.location.reload();
                                // setLoggedIn(true)
                            })
                            .catch(error => {
                                setErrorMessage(error.response.data.error)
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
                {errorMessage !== undefined ?
                    <Error errorMessage={errorMessage} />
                    : null
                }
            </section>
    )
}

const mapStateToProps = state => ({
    currentUsername: state.currentUser.currentUser.username
})

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { login })(Login);