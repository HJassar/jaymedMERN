import { connect } from 'react-redux'

import './Home.css';

const Home = ({ currentUser }) => {
    document.title = 'JayMed';

    return (
        <>
            <h1>Welcome to JayMed{currentUser ? `, ${currentUser.username}` : null}</h1>
        </>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser.currentUser
})

export default connect(mapStateToProps)(Home);