import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext.js';
import Axios from 'axios';

const Dashboard = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    effect;
    return () => {
      cleanup;
    };
  }, [input]);

  return <div>Hi</div>;
};

export default Dashboard;
