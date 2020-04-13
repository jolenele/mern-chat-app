import axios from 'axios';
import { GET_USER, GET_USERS, USER_ERROR, CLEAR_USER } from './types';

// Get all users
export const getUsers = () => async (dispatch) => {
  dispatch({ type: CLEAR_USER });

  try {
    const res = await axios.get('/api/getUser');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get uber by ID
// export const getUserById = (userId) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/getUser/${userId}`);

//     dispatch({
//       type: GET_USER,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: USER_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
