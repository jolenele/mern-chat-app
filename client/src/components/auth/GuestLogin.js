import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Context from '../../state/globalState';

export default function GuestLogin() {
  const histtory = useHistory();
  const [name, setName] = useState('');
  //   const { setGuest, sendGuest, setToken } = useContext(Context);
  const server = 'http://localhost:5000';
  const handleSubmit = (e) => {
    Axios.post(`${server}/`);
  };
  return (
    <Fragment>
      <h1>Login</h1>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Your email'
        name='email'
        value={email}
        onChange={(e) => onChange(e)}
      />
      <TextField
        type='password'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='password'
        label='Your password'
        name='password'
        value={password}
        minLength='6'
        onChange={(e) => onChange(e)}
      />
      <Button onSubmit={(e) => handleSubmit(e)}>Login</Button>
    </Fragment>
  );
}
