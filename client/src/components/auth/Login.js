import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const SERVER = "http://localhost:5000"
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`${SERVER}/auth`, {
      email,
      password
    }).then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      history.push('/chats')
    }).catch(err => {
      console.log(err)
    })
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
      <Button onClick={(e) => handleSubmit(e)}>Login</Button>
      <p>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
