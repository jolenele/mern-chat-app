import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1>MERN Chat App</h1>
        <div>
          <Link to='/register'>Sign Up </Link>
          <br />
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
