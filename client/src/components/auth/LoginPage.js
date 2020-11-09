import React from 'react';
import LoginForm from './LoginForm';
import { CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  html: {
    height: '100%',
  },
  root: {
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/login.jpg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
  },
  formComp: {
    margin: '2rem',
  },
  title: {
    alignContent: 'center',
    justifyContent: 'center',
  },
}));

const register = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <h3 className={classes.title}>Login Form</h3>
      <div className={classes.formComp}>
        <LoginForm />
      </div>
    </div>
  );
};

export default register;
