import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Container } from "@material-ui/core";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import useStyles from "./loginStyles.js";

export default function login() {
  const [username, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const logUser = { username, password };
    const loginRes = await Axios.post("http://localhost:5000/login", logUser);
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user.name,
      id: loginRes.data.user.id,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/user");
  };
  const classes = useStyles();

  return (
    <>
      <div>
        <Container className={classes.formGrid} maxWidth='sm'>
          <h2>Login</h2>
          <form
            className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={submit}
          >
            <TextField
              required
              id='outlined-required'
              label='Email Address'
              className={classes.formElement}
              variant='outlined'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              required
              id='outlined-basic'
              label='Password'
              variant='outlined'
              className={classes.formElement}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.formElement}
            >
              Submit
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
}
