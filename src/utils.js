import axios from 'axios';

const configureRequests = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
};

export default configureRequests;
