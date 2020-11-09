import React from 'react';
import RegisterForm from './registerForm';
import { CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  html: {
    padding: '1rem',
    height: '100%',
  },
  root: {
    minHeight: '110vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/register.jpg'})`,
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
      <h3 className={classes.title}>Registration Form</h3>
      <div className={classes.formComp}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default register;
