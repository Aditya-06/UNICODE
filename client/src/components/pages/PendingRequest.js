import React, {useContext, useState} from "react";
import {Button} from '@material-ui/core'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import UserContext from '../../context/UserContext.js';
import RequestInfo from './RequestInfo.js';
import {Link, Route, useRouteMatch} from 'react-router-dom';

const Requests = ({ data }) => {
  const RequestData = data;
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const { url } = useRouteMatch();
  

  return (
    <>
      {data &&
        data.map((d) => {
          return (
            <>
            <div className='card' key={d.id}>
              <div className='container' key={d.id}>
                <ul>
                  <li>Issued For: {d.time}</li>
                  <li>Customer: {d.createdBy}</li>
                  <Link to={`${url}/${d.id}`}>
                  <Button variant="contained" color="primary">Select</Button>
                  </Link>
                  
                </ul>
              </div>
            </div>
            </>
          );
        })}
        <Route path={`${url}/:requestId`}>
          <RequestInfo props={data} />
        </Route>
    </>
  );
};

export default Requests;