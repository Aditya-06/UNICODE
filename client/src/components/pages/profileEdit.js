import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Container } from "@material-ui/core";
import UserContext from "../../context/UserContext.js";
import useStyles from "./editStyles";
import Axios from "axios";

export default function ProfileEdit() {
  const [username, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const editUser = { name, username };
    await Axios.put(
      `https://localhost:5000/user/${userData.id}`,
      editUser,
      {
        headers: {
          "x-auth-token": userData.token,
        },
      }
    );
  };

  const classes = useStyles();

  return (
    <>
      {localStorage.getItem("auth-token") !== null ? (
        <div>
          <Container maxWidth='sm' className={classes.formGrid}>
            <h2>Edit Profile</h2>
            <form
              className={classes.root}
              noValidate
              autoComplete='off'
              onSubmit={submit}
            >
              <TextField
                required
                defaultValue={userData.name}
                className={classes.formElement}
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
                className={classes.formElement}
                label='Email Address'
                value={userData.username}
                variant='outlined'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.formSubmit}
              >
                Submit
              </Button>
              <hr />
            </form>
          </Container>
        </div>
      ) : (
        history.push("/login")
      )}
    </>
  );
}
