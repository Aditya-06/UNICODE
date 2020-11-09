import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext.js';
import Axios from 'axios';
import { Container } from '@material-ui/core';
import PendingRequest from './PendingRequest';

const DriverRequest = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  let listOfRequests = [];
  const [responseData, setRespnseData] = useState([]);

  const displayRequestHandler = async (e) => {
    e.preventDefault();
    await Axios.get(`http://localhost:5000/driver/${userData.user.id}/request`, {
      headers: {
        'x-auth-token': userData.token,
      },
    })
      .then((requestRes) => {
        setRespnseData(requestRes.data.requests);
        console.log(listOfRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {localStorage.getItem('auth-token') !== '' ? (
        <div>
          <Container maxWidth='sm'>
            <h2>Requests</h2>
            <button onClick={(e) => displayRequestHandler(e)}>
              View Requests
            </button>

            <PendingRequest data={responseData} />
          </Container>
        </div>
      ) : (
        history.push('/login')
      )}
    </div>
  );
}


export default DriverRequest
