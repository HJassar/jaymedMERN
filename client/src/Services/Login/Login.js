import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadAdmin } from '../../store/loadAdmin/loadAdmin.actions';

import './Login.css';

const Login = ({ loadAdmin }) => {
    document.title = 'JayMed | Login';

    return (
        <>
            <button
                onClick={() => {
                    loadAdmin('5fe815ae3bfb4b6e606edbff')
                    // .then(() => {
                    // window.location.reload();
                    // });
                }}

            >
                Temporary Button
                        </button>

            <h1>Login</h1>
            <form action="">
                <label for='username'>Username or Email</label>
                <input id='username' type="text" />
                <label for='password'>Password</label>
                <input id='password' type="password" />
                <button>Login</button>
            </form>
        </>
    )
}

Login.propTypes = {
    loadAdmin: PropTypes.func.isRequired
}

export default connect(null, { loadAdmin })(Login);