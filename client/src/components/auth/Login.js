import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import TextField from '@material-ui/core/TextField';
import { Button } from 'semantic-ui-react';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/chat' />;
  }

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
// <form className='form' onSubmit={e => onSubmit(e)}>
//         <div className='form-group'>
//           <input
//             type='email'
//             placeholder='Email Address'
//             name='email'
//             value={email}
//             onChange={e => onChange(e)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='password'
//             placeholder='Password'
//             name='password'
//             value={password}
//             onChange={e => onChange(e)}
//             minLength='6'
//           />
//         </div>
//         <input type='submit' className='btn btn-primary' value='Login' />
//       </form>
