import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

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

// import CELLS from 'vanta/dist/vanta.cells.min';

// Dashboard
import Dashboard from './Dashboard/Dashboard';

import './App.css';

const MyComponent = (props) => {
  // const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(CELLS({
  //       el: myRef.current,
  //       mouseControls: true,
  //       touchControls: true,
  //       gyroControls: false,
  //       minHeight: 200.00,
  //       minWidth: 200.00,
  //       scale: 1.00,
  //       color1: 0x253556,
  //       color2: 0x2e2e2e,
  //       size: 0.80,
  //       speed: 4.00
  //     }))
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy()
  //   }
  // }, [vantaEffect])
  return <div ref={myRef}
    style={{
      opacity: '.3',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '-1'
    }}>
  </div>
}


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
          if (error.response && error.response.status === 401) localStorage.removeItem('token')
          setLoaded(true)
        })
      : setLoaded(true)
  }, [localToken, getProfile])




  // const token = 
  return (
    // Delay the appearance of the whole website until the user, if any, is loaded. This way you will prevent the website from looking gletchy (having a login button that changes to username+logout)
    loaded ?
      <Router>
        < div className="App" >
          <Header />
          <MyComponent />
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
