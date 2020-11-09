import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Button,
  makeStyles,
  Container,
  Grid,
} from '@material-ui/core';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

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
      <div className={classes.root}>
        <div>
          <Container maxWidth='sm' className={classes.formContainer}>
            <h4 style={{ color: 'white' }}>
              Fill Out the Form and Continue ont the Site!
            </h4>
            <hr />
            <form onSubmit={submit} className={classes.formContent}>
              <Grid item sm={12} className={classes.fromRow}>
                <TextField
                  variant='outlined'
                  label='Email Address'
                  className={classes.formElement}
                  name='email'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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

              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
}
