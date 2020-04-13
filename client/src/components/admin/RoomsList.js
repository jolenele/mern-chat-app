import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRooms } from '../../actions/chats';
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

const RoomList = ({ getRooms, room: { rooms, loading } }) => {
  useEffect(() => {
    getRooms();
  }, []);
  const classes = useStyles();
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>All Rooms Created</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Room ID</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Timestamps</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <TableRow key={room._id}>
                      <TableCell component='th' scope='row'>
                        {room._id}
                      </TableCell>
                      <TableCell align='right'>{room.name}</TableCell>
                      <TableCell align='right'>{room.timestamps}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <h4>No room found...</h4>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

RoomList.propTypes = {
  getRooms: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  room: state.room,
});
export default connect(mapStateToProps, { getRooms })(RoomList);
