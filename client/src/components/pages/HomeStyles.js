import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '110vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/landing6.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    //display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '2rem',
  },
  heading: {
    color: 'white',
    fontFamily: 'Nunito',
    fontSize: '4rem',
  },
  collapse: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useStyles;
