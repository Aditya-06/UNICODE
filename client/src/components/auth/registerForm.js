/*
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container } from '@material-ui/core';
import UserContext from '../../context/UserContext';
import useStyles from './registerStyles';
import Axios from 'axios';

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
      <Container>
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
      </Container>
    </>
  );
}
*/
import React, { useState, useContext } from 'react';
import {
  Grid,
  TextField,
  makeStyles,
  Paper,
  Container,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Link,
  Button,
} from '@material-ui/core';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formRoot: {
    margin: '2rem auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.01rem',
  },
  formContainer: {
    marginTop: '2rem',
    border: '0.5px solid black',
    padding: theme.spacing(2),
    boxShadow: '3px 1px 10px black',
    borderRadius: '35px',
  },
  formElement: {
    margin: '0.5rem',
    borderRadius: '35px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formRow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContents: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const initialValues = {
  fisrtName: '',
  email: '',
  mobile: '',
  city: '',
};

export default function RegisterForm() {
  const [username, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [contact, setContact] = useState();
  const [type, settype] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    const newUser = { username, password, password2, contact, type };
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
    <div className={classes.root}>
      <div>
        <Container maxWidth='sm' className={classes.formContainer}>
          <h4 style={{ color: 'white' }}>Fill Out the Form and Get Started!</h4>
          <hr />
          <form onSubmit={submit} className={classes.formContent}>
            <Grid item sm={12} className={classes.fromRow}>
              <TextField
                variant='outlined'
                label='Email Address'
                className={classes.formElement}
                name='username'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} className={classes.formRow}>
              <TextField
                variant='outlined'
                label='Mobile no.'
                //value={initialValues.mobile}
                className={classes.formElement}
                name='contact'
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                type='number'
              ></TextField>
            </Grid>
            <Grid item xs={12} className={classes.formRow}>
              <TextField
                variant='outlined'
                label='Password'
                value={initialValues.password}
                className={classes.formElement}
                name='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type='password'
              ></TextField>
            </Grid>
            <Grid item xs={12} className={classes.formRow}>
              <TextField
                variant='outlined'
                label='Confirmed Password'
                value={initialValues.password2}
                className={classes.formElement}
                name='password2'
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                type='password'
              ></TextField>
            </Grid>
            <FormLabel component='legend'>
              What would you like to register as ?
            </FormLabel>
            <RadioGroup
              aria-label='gender'
              className={classes.formElement}
              name='type'
              label='What would you like to sign in as?'
              onChange={(e) => {
                settype(e.target.value);
              }}
            >
              <FormControlLabel
                value='Customer'
                control={<Radio />}
                label='user'
              />
              <FormControlLabel
                value='Driver'
                control={<Radio />}
                label='Driver'
              />
            </RadioGroup>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </form>
          <hr />
          <Link href='/login'>
            <h5>Already Have An Account? Log-in.</h5>
          </Link>
        </Container>
      </div>
    </div>
  );
}
