import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogs } from '../../actions/chats';
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

const LogsList = ({ getLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();
  }, []);
  const classes = useStyles();
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>All Event Logs Recorded</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Log Event ID</TableCell>
                  <TableCell align='right'>Type</TableCell>
                  <TableCell align='right'>Source</TableCell>
                  <TableCell align='right'>User</TableCell>
                  <TableCell align='right'>Room</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <TableRow key={log._id}>
                      <TableCell component='th' scope='row'>
                        {log._id}
                      </TableCell>
                      <TableCell align='right'>{log.type}</TableCell>
                      <TableCell align='right'>{log.source}</TableCell>
                      <TableCell align='right'>{log.user}</TableCell>
                      <TableCell align='right'>{log.room}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <h4>No event log found...</h4>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

LogsList.propTypes = {
  getLogs: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  log: state.log,
});
export default connect(mapStateToProps, { getLogs })(LogsList);
