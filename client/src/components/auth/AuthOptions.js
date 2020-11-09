import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button } from '@material-ui/core';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => {
    history.push('/register');
  };

  const login = () => {
    history.push('/login');
  };
  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <div>
      {userData.user ? (
        <Button onClick={logOut} style={{ color: 'white' }}>
          logout
        </Button>
      ) : (
        <>
          <Button onClick={register} style={{ color: 'white' }}>
            Register
          </Button>
          <Button onClick={login} style={{ color: 'white' }}>
            Login
          </Button>
        </>
      )}
    </div>
  );
}
