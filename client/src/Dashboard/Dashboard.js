import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';


const Dashboard = (props) => {
    const action = props.match.params.action;


    const DOM = (action == 'stats') ?
        <h1>Welcome to stats page</h1>
        : (action == 'users') ?
            <h1>Users Page</h1>
            : (action == 'home') ?
                <>
                    <h1>Welcome to the Dashboard</h1>
                    <Link to='users'>Users</Link>
                </>
                :
                <Redirect to='/dashboard/home' />

    return (
        <>
            <Breadcrumbs breadcrumbs={['Dashboard', action]} />
            {DOM}
        </>
    )
}

export default Dashboard;