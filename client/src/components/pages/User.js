import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext.js";

export default function User() {
  const context = useContext(UserContext);
  const history = useHistory();
  console.log(context.user);

  return (
    <div>
      {localStorage.getItem("auth-token") !== "" ? (
        <h2>Welcome {context.user}</h2>
      ) : (
        history.push("/login")
      )}
    </div>
  );
}
