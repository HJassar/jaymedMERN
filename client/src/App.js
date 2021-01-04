import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

const App = () => {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
