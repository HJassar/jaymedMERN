import React from 'react';

import './Login.css';

const Login = () => {
    document.title = 'JayMed';

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quibusdam, iure nihil, quam cumque hic eum modi obcaecati mollitia, possimus quos quia dolorum omnis beatae distinctio culpa molestiae amet dicta.'

    return (
        <>
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

export default Login;