import axios from 'axios';

export const getCsrfToken = async () => {
	try {
		const response = await axios.get(`${axios.defaults.baseURL}/api/csrf-token/`, {
			withCredentials: true
		});
		const csrfToken = response.data.csrfToken;
		document.cookie = `csrftoken=${csrfToken}; path=/`;
		return csrfToken;
	} catch (error) {
		console.error('Could not get CSRF token:', error);
		return null;
	}
};