export const checkAuthenticated = () => {
	const accessToken = localStorage.getItem('access_token');
	return accessToken? true: false;
};

export const deleteUser = () => {
	localStorage.removeItem('access_token');
};

export const getCurrentYear = () => {
	return new Date().getFullYear();
};