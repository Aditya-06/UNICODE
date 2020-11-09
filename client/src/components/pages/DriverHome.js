import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageCard from './ImageCard';
import driver from '../../static/driver';
import customer from '../../static/customer';

const useStyles = makeStyles((theme) => ({
  root: {
    minheight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const DriverHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageCard driver={driver} />
      <ImageCard driver={customer} />
    </div>
  );
};

export default DriverHome;
