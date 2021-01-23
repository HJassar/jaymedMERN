import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const Dashboard = ({ match, username }) => {
    const action = match.params.action;

    const DOM = (action === 'stats') ?
        <h1>Welcome to stats page</h1>
        : (action === 'users') ?
            <h1>Users Page</h1>
            : (action === 'home') ?
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

const mapStateToProps = state => ({
    username: state.currentUser.username
})

export default connect(mapStateToProps)(Dashboard)