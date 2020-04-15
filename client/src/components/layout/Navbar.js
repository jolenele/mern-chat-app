import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { username, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/chats'>Chat Box</Link>
      </li>
      <li>
        <a onClick={logout} href='/'>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to='/users'>Contacts</Link>
      </li>
      <li>
        <Link to='/rooms'>Rooms</Link>
      </li>
      <li>
        <Link to='/logs'>Even Logs</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'> Chat App</Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated
            ? username === 'admin'
              ? adminLinks
              : authLinks
            : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
