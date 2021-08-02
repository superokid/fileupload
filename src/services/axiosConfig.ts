import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://14e2ed4b-d989-499e-ba01-aad8acd440b1.mock.pstmn.io',
});

export default instance;
