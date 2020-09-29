import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../../../../client2/uber/src/components/auth/AuthOptions';

export default function Header() {
  return (
    <div>
      <Link to='/'>
        <h1>Uber Clone</h1>
      </Link>
      <AuthOptions />
    </div>
  );
}
