import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.binance.com/api/v3',
});

export default instance;
