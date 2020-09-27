import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Button, makeStyles, TextField } from "@material-ui/core";
import ToolBar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  authButton: {
    display: "flex",
    margin: "auto auto",
    flex: "left",
    color: "white",
  },
}));

export default function AuthOptions() {
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => {
    history.push("/register");
  };

  const login = () => {
    history.push("/login");
  };
  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <div>
      {userData.user ? (
        <ToolBar style={{ color: "white" }}>
          <Button onClick={logOut} className={classes.authButton}>
            logout
          </Button>
        </ToolBar>
      ) : (
        <>
          <ToolBar style={{ color: "white" }}>
            <Button onClick={register} className={classes.authButton}>
              Register
            </Button>
            <Button onClick={login} className={classes.authButton}>
              Login
            </Button>
          </ToolBar>
        </>
      )}
    </div>
  );
}
