import React, { useEffect, useState } from 'react';
import { Collapse, IconButton, makeStyles } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: '3.5rem',
  },
  uber: {
    color: 'black',
  },
  goDown: {
    color: 'white',
    fontSize: '3rem',
  },
}));

const HomeHeader = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        Welcome to
        <br />
        <span className={classes.uber}>Uber Clone</span>
        <br />
        <IconButton>
          <KeyboardArrowDownIcon className={classes.goDown} />
        </IconButton>
      </div>
    </div>
  );
};
export default HomeHeader;
