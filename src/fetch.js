import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

export default service
