import React from 'react';
import useStyles from './HomeStyles';
import {
  CssBaseline,
  IconButton,
  Container,
  Collapse,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useState, useEffect } from 'react';
import DriverHome from './DriverHome';
import Header from '../layouts/Header';
import HomeHeader from './HomeHeader';

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <HomeHeader />
        <DriverHome />
      </div>
    </>
  );
}
