import React, { Fragment, useEffect, useState } from 'react';
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

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const resRoom = await getRooms(token);
    console.log(resRoom);
    setRooms(resRoom);
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
  setRooms: PropTypes.func.isRequired,
  rooms: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  rooms: state.rooms,
});
export default connect(mapStateToProps)(RoomList);
