import React from 'react'
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const RequestInfo = (props) => {
  const { requestId } = useParams();

    return (
        <div>
            <h1>{requestId}</h1>
        </div>

    )
}

export default RequestInfo;
