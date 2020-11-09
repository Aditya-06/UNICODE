import { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';

function userInfo() {
  const { userData, setUserData } = useContext(UserContext);
  const [userInfo, setuserInfo] = useState({
    name: undefined,
    contact: undefined,
    role: undefined,
    username: undefined,
  });

  const getUserData = async () => {
    const userInfo = await Axios.get('http://5000/getInfo', {
      headers: { 'x-auth-token': userData.token },
    })
      .then((response) => {
        setuserInfo({
          name: response.body.name,
          username: response.body.username,
          contact: response.body.contact,
          role: response.body.role,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return [userInfo, setuserInfo];
}

export default userInfo;
