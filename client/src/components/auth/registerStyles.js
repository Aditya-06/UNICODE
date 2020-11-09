import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/landing.jpg'})`,
    backgroundColor: 'black',
  },
  formRoot: {
    margin: '2rem auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.01rem',
  },
  formElement: {
    width: '100%',
    margin: 'auto auto',
    height: '3rem',
    flex: 'left',
  },
  formGrid: {
    margin: '2rem auto',
    boxShadow: '0 4px 10px black',
    justifyContent: 'center',
    padding: '1rem',
  },
  formSubmit: {
    width: '100%',
    margin: '1rem auto',
  },
}));

export default useStyles;
