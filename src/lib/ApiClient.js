import axios from 'axios';

const ApiClient = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ApiClient;
