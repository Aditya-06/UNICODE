import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./components/pages/Home";
import login from "./components/auth/login";
import register from "./components/auth/register";
import Header from "./components/layouts/Header";
import UserContext from "./context/UserContext";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkedLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      console.log(token);
      const tokenRes = await Axios.post("http://localhost:5000/isValid", null, {
        headers: { "x-auth-token": token },
      });
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user", {
          headers: { "x-auth-token": token },
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
            <Route exact path='/login' component={login} />
            <Route exact path='/register' component={register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
