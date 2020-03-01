import axios from 'axios';

const axiosinstance = axios.create({
    baseURL:"https://burgerbuilder-5e6c4.firebaseio.com/"
});

export default axiosinstance;