import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from './ActionHelper';
import Spinner from '../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const Contact = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const resUser = await getUsers(token);
    console.log(resUser);
    setUsers(resUser);
  }, []);
  const classes = useStyles();
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Contact</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell component='th' scope='row'>
                        {user.username}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <h4>No user found...</h4>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

Contact.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { getUsers })(Contact);
