import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import axios from 'axios'
import { useEffect, useState } from 'react'

// Redux
import { getProfile } from './store/currentUser/currentUser.actions';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'


// Components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// Services
import Home from './Services/Home/Home'

import Reading from './Services/Reading/Reading'
import Subject from './Services/Reading/Subject/Subject'

import Residency from './Services/Residency/Residency'
import Questions from './Services/Questions/Questions'
import Contribute from './Services/Contribute/Contribute'
import Login from './Services/Login/Login'
import Register from './Services/Register/Register'


// Dashboard
import Dashboard from './Dashboard/Dashboard';

import './App.css';

const App = ({ getProfile }) => {

  const [loaded, setLoaded] = useState(false);

  // get the token from local storage
  const localToken = localStorage.getItem('token');
  useEffect(() => {
    localToken ?
      axios
        .get('/users/profile',
          {
            headers: {
              'authorization': localToken
            }
          }
        )
        .then(res => {
          getProfile(res.data)
          setLoaded(true);
        })
        .catch(error => {
          if (error.response.status === 401) localStorage.removeItem('token')
          setLoaded(true)
        })
      : setLoaded(true)
  }, [])




  // const token = 
  return (
    // Delay the appearance of the whole website until the user, if any, is loaded. This way you will prevent the website from looking gletchy (having a login button that changes to username+logout)
    loaded ?
      <Router>
        < div className="App" >
          <Header />
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/questions' component={Questions} />

              <Route path='/reading/:subjectId' component={Subject} />
              <Route path='/reading' component={Reading} />

              <Route path='/residency' component={Residency} />
              <Route path='/contribute' component={Contribute} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/dashboard/:action' component={Dashboard} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/' component={() => {
                return <>
                  <h1>
                    Page Not Found
              </h1>
                </>
              }} />
            </Switch>
          </main>
          <Footer />
        </div >
      </Router >
      : 'Loading'
  )
}

App.propTypes = {
  getProfile: PropTypes.func.isRequired
}

export default connect(null, { getProfile })(App);
