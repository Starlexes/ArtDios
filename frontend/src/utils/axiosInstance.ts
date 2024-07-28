import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
	baseURL: axios.defaults.baseURL,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},
	withCredentials: true
});

axiosInstance.interceptors.request.use(
	config => {
		const csrfToken = Cookies.get('csrftoken');
		if (csrfToken) {
			config.headers['X-CSRFToken'] = csrfToken;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default axiosInstance;