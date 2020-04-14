import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const { username, email, password, passwordCheck } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      setAlert('Password does not match', 'danger');
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/chats' />;
  }

  return (
    <Fragment>
      <h1>Register</h1>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='username'
        label='User Name'
        name='username'
        value={username}
        onChange={(e) => onChange(e)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Your Email'
        name='email'
        value={email}
        onChange={(e) => onChange(e)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='password'
        label='Password'
        name='password'
        type='password'
        value={password}
        onChange={(e) => onChange(e)}
        minLength='6'
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='passwordCheck'
        label='Confirm Password'
        name='passwordCheck'
        type='password'
        value={passwordCheck}
        onChange={(e) => onChange(e)}
      />
      <Button onClick={(e) => handleSubmit(e)}>Register</Button>
      <p>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
