import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';
import validator from 'validator';

import { login } from '../../store/currentUser/currentUser.actions';

import './Register.css';
import { Redirect } from 'react-router-dom';


const Register = ({ currentUser }) => {
    document.title = 'JayMed | Register';
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [emailCheck, setEmailCheck] = useState('')
    const [usernameCheck, setUsernameCheck] = useState('')
    const [passwordStrong, setPasswordStrong] = useState('')
    const [password2Check, setPassword2Check] = useState('')

    const [emailValidated, setEmailValidated] = useState(false);
    const [usernameValidated, setUsernameValidated] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);


    const requiredFieldsValidated = [
        emailValidated,
        usernameValidated,
        passwordStrong,
        passwordsMatch
    ]

    let usernameTypingTimeout;
    let emailTypingTimeout;

    let lastUsernameInput = '';
    let lastEmailInput = '';

    const usernameExistsCheck = async (usernameInput) => {
        const sendUsernameToServer = () => {
            usernameTypingTimeout = setTimeout(() => {
                usernameInput.disabled = true;
                setUsernameCheck('Checking')
                axios
                    .post('/auth/usernameExists',
                        { username: usernameInput.value }
                    )
                    .then(res => {
                        usernameInput.disabled = false;
                        if (res.data.username === lastUsernameInput) {
                            setUsernameCheck(res.data.message)
                            usernameInput.focus();
                            setUsernameValidated(res.data.available)
                        }
                    })
            }, 1000);
        }
        clearTimeout(usernameTypingTimeout);
        sendUsernameToServer();
    }

    const emailExistsCheck = async (emailInput) => {
        const sendEmailToServer = () => {
            emailTypingTimeout = setTimeout(() => {
                emailInput.disabled = true;
                setEmailCheck('Checking')
                axios
                    .post('/auth/emailExists',
                        { email: emailInput.value }
                    )
                    .then(res => {
                        if (res.data.email === lastEmailInput) {
                            setEmailCheck(res.data.message)
                            emailInput.disabled = false;
                            emailInput.focus()
                            setEmailValidated(res.data.available)
                        }
                    })
            }, 1000);
        }
        clearTimeout(emailTypingTimeout);

        if (validator.isEmail(emailInput.value)) {
            sendEmailToServer();
        } else if (emailInput.value === '') {
            setEmailCheck('')
        } else {
            setEmailCheck('Doesn\'t look like an email to me')
        }
    }


    return (
        currentUser ?
            <Redirect to='/' />
            :
            <div className='Register'>
                <h1>Register</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        axios
                            .post(
                                '/auth/register',
                                { email, username, password, password2 }
                            )
                            .then(res => {
                                console.log(res.data)
                                localStorage.setItem('token', res.data.token)
                                window.location.href = '/';
                            })
                    }}
                >
                    <label for='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        onInput={(e) => {
                            lastEmailInput = e.target.value;
                            setEmailCheck('hold up')
                            emailExistsCheck(e.target);
                        }}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <span>{emailCheck}</span>

                    <label for='username'>Username</label>
                    <input
                        id='username'
                        type='text'
                        onInput={(e) => {

                            lastUsernameInput = e.target.value;

                            !validator.isAlphanumeric(e.target.value) ?
                                setUsernameCheck('Not Alphanumeric') :
                                !validator.isLowercase(e.target.value) ?
                                    setUsernameCheck('Lowercase only') :
                                    !validator.isLength(e.target.value, { min: 6, max: 12 }) ?
                                        setUsernameCheck('Has to be between 6 and 12 characters') :
                                        usernameExistsCheck(e.target)
                        }}
                        onChange={(e) => { setUsername(e.target.value) }}

                    />
                    <span>{usernameCheck}</span>
                    <label for='password'>Password</label>
                    <input
                        id='password'
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        onInput={(e) => {
                            console.log(e.target.value)
                            // console.log(validator.isStrongPassword(e.target.value));
                            if (validator.isStrongPassword(e.target.value)) {
                                setPasswordStrong(true)

                            } else {
                                setPasswordStrong(false)
                            }

                            if (e.target.value === password2) {
                                setPassword2Check('cool')
                                setPasswordsMatch('true');
                            } else {
                                setPassword2Check('passes don\'t match')
                            }
                        }}
                    />
                    <span>{passwordStrong ? 'Strong' : 'Week'}</span>
                    <input
                        id='password2'
                        type="password"
                        onChange={(e) => {
                            setPassword2(e.target.value)
                        }}
                        onInput={(e) => {
                            console.log(e.target.value === password)
                            // console.log(validator.isStrongPassword(e.target.value));
                            if (e.target.value === password) {
                                setPassword2Check('cool')
                                setPasswordsMatch('true');
                            } else {
                                setPassword2Check('passes don\'t match')
                            }
                        }}
                    />
                    <span>{password2Check}</span>
                    <br />
                    <input
                        type="submit"
                        value="Register"
                        disabled={requiredFieldsValidated.includes(false)}
                    />
                </form>
            </div>
    )
}


const mapStateToProps = state => ({
    currentUser: state.currentUser.currentUser
})

Register.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { login })(Register);