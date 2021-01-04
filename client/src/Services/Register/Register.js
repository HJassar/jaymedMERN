import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';
import validator from 'validator';

import { loadAdmin } from '../../store/loadAdmin/loadAdmin.actions';

import './Register.css';


const Register = ({ loadAdmin }) => {
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
                        if (res.data.username === lastUsernameInput) {
                            setUsernameCheck(res.data.message)
                            usernameInput.disabled = false;
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
        <>
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

                        // need to add alphanumeric and lowercase

                        lastUsernameInput = e.target.value;
                        usernameExistsCheck(e.target);
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
                <input
                    type="submit"
                    value="Register"
                    disabled={requiredFieldsValidated.includes(false)}
                />
            </form>
        </>
    )
}

Register.propTypes = {
    loadAdmin: PropTypes.func.isRequired
}

export default connect(null, { loadAdmin })(Register);