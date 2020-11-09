import  React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom"; 
import Axios from 'axios';
import UserContext from '../../context/UserContext.js';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Grid, TextField, Button} from '@material-ui/core';
 
const createRequest = () => {
  const history = useHistory();
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [dropOffAddress, setDropOfAddress] = useState('');
  const { userData } = useContext(UserContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    const Request = {
      pickUpAddress: pickUpAddress,
      dropOffAddress: dropOffAddress,
    }

    try {
      const res = await Axios.post(`http://localhost:5000/user/${userData.user.id}/request/new`, Request, {
        headers: {
          Content: 'multipart/form-data',
          'x-auth-token': userData.token,
        },
      });
      const { success, request } = res.data;
      toast.success('Request Successful!'); 
    } catch (err) {
      if (err.response.status === 500) {
        console.log('Server Error');
        toast.error('Server Error!');
      } else {
        console.log(err.response.data.msg);
        toast.warn('Warning!');
      }
    }
  };

  
  

  return (
    <div>
      {localStorage.getItem('auth-token') !== ''  ? (
        <div>
          <h1>Create Request Page</h1>
          <form onSubmit={onSubmit}>
          <Grid item sm={12}>
                <TextField
                  variant='outlined'
                  label='Pick Up Location'
                  
                  name='pickUpAddress'
                  onChange={(e) => {
                    setPickUpAddress(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  label='Drop Off Address'
                 
                  name='dropOffAddress'
                  onChange={(e) => {
                    setDropOfAddress(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
          </form>
        </div>
      ) : (
        history.push('/login')
      )}
    </div>
  );
};
 
export default createRequest;