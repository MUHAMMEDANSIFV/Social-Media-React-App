/* eslint-disable import/prefer-default-export */
import axios from './Axios.instence';

axios.defaults.withCredentials = true;

export const getAllUser = async (callback) => {
  try {
    const response = await axios.get('/user/all-users');
    callback(response);
  } catch (err) {
    callback(err);
  }
};
