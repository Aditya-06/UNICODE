/* 
import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/'>
            <Typography variant='h6' className={classes.title}>
              Uber Clone
            </Typography>
          </Link>
          <Button color='inherit'>Login</Button>

          <AuthOptions />
        </Toolbar>
      </AppBar>
    </div>
  );
}
*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AuthOptions from "../auth/AuthOptions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  auth: {},
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position='sticky'
        style={{ backgroundColor: "#0f0f0f", color: "#FFFFFF" }}
      >
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' style={{ color: "white", textDecoration: "none" }}>
              Uber Clone
            </Link>
          </Typography>
          <AuthOptions className={classes.auth} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
