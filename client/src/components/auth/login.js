import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, makeStyles } from '@material-ui/core';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function login() {
  const [username, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const logUser = { username, password };
    const loginRes = await Axios.post('http://localhost:5000/login', logUser);
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem('auth-token', loginRes.data.token);
    history.push('/');
  };
  const classes = useStyles();

  return (
    <>
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
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </>
  );
}
