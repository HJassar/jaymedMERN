import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import './Home.css';

const Home = ({ username }) => {
    document.title = 'JayMed';

    const reqData = 'requested Data'

    return (
        <>
            <h1>Welcome to JayMed{username ? `, ${username}` : null}</h1>
        </>
    )
}


const mapStateToProps = state => ({
    username: state.currentUser.username
})

export default connect(mapStateToProps)(Home);