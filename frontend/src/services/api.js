import axios from 'axios';

const api = axios.create({ proxy: true });

export default api;
