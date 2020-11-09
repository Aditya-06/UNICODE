import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/pages/Home';
import LoginPage from './components/auth/LoginPage';
import register from './components/auth/register';
import Header from './components/layouts/Header';
import UserContext from './context/UserContext';
import Upload from './components/pages/Upload';
import Request from './components/pages/Request';
import createRequest from './components/pages/createRequest';
import DriverRequest from './components/pages/DriverRequest';
import RequestInfo from './components/pages/RequestInfo';
import Maps from './components/pages/Map';
import GoogleMaps from './components/pages/GoogleMaps.js';
import Dashboard from './components/pages/Dashboard';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkedLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      console.log(token);
      const tokenRes = await Axios.post('http://localhost:5000/isValid', null, {
        headers: { 'x-auth-token': token },
      });
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:5000/user', {
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkedLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={register} />
            <Route exact path='/upload' component={Upload} />
            <Route exact path='/request' component={Request} />
            <Route exact path='/createRequest' component={createRequest} />
            <Route exact path='/driverRequest' component={DriverRequest} />
            <Route exact path='/Map' component={Maps} />
            <Route exact path='/Gmap' component={GoogleMaps} />
            <Route exact path='/user' component={Dashboard} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
