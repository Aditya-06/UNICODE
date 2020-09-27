import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Container } from "@material-ui/core";
import UserContext from "../../context/UserContext.js";
import useStyles from "./registerStyle.js";
import Axios from "axios";

const register = () => {
  const [username, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setpassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { name, username, password, password2 };
    await Axios.post("http://localhost:5000/register", newUser);
    const loginRes = await Axios.post("http://localhost:5000/login", {
      username,
      password,
    });
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user.name,
      id: loginRes.data.user.id,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/user");
  };

  const onGoogleClick = () => {
    Axios.get("http://localhost:5000/google")
      .then((res) => {
        console.log(res.response);
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Container maxWidth='sm' className={classes.formGrid}>
          <h2>Register</h2>
          <form
            className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={submit}
          >
            <TextField
              required
              className={classes.formElement}
              id='outlined-basic'
              label='Name'
              variant='outlined'
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              required
              id='outlined-required'
              className={classes.formElement}
              label='Email Address'
              variant='outlined'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              required
              id='outlined-basic'
              className={classes.formElement}
              label='Password'
              variant='outlined'
              type='password'
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <TextField
              required
              className={classes.formElement}
              id='outlined-basic'
              label='Confirm Password'
              variant='outlined'
              type='password'
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.formSubmit}
            >
              Submit
            </Button>
            <hr />
          </form>
          <a href='/google'>Sign-in with Google</a>
        </Container>
      </div>
    </>
  );
};

export default register;
