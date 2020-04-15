import React, { Fragment, useEffect } from 'react';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ChatBox from './components/chats/ChatBox';
import RoomsList from './components/admin/RoomsList';
import LogsList from './components/admin/LogsList';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './actions/setAuthToken';
import UsersList from './components/admin/UsersList';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Switch>
              <Route exact path='/chats' component={ChatBox} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/users' component={UsersList} />
              <Route exact path='/rooms' component={RoomsList} />
              <Route exact path='/logs' component={LogsList} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
