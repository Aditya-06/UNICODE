import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
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

export default function register() {
  const [username, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setpassword] = useState();
  const [password2, setPassword2] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { name, username, password, password2 };
    await Axios.post('http://localhost:5000/register', newUser);
    const loginRes = await Axios.post('http://localhost:5000/login', {
      username,
      password,
    });
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
      <h2>Register</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={submit}
      >
        <TextField
          required
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
            setpassword(e.target.value);
          }}
        />
        <TextField
          required
          id='outlined-basic'
          label='Confirm Password'
          variant='outlined'
          type='password'
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </>
  );
}
