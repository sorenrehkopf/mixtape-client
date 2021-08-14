import executeHttpRequest from '_/services/execute-http-request';

class Api {
	static get baseUrl() {
		return ({
			"www.myxtape.io":  'https://www.myxtape.io/api/',
			"localhost": 'http://localhost:3000/api/',
			"www.myxtape-dev.io": 'http://localhost:3000/api/'
		})[window.location.hostname];
	}

	static get authToken() {
		return window.localStorage.getItem('authtoken');
	}

	static setAuthToken(token) {
		window.localStorage.setItem('authtoken', token);
	}

	static clearAuthToken() {
		window.localStorage.removeItem('authtoken');
	}

	static get(path) {
		return this.makeReqest({ path })
	}

	static post(path, data) {
		return this.makeReqest({ data, method: 'POST', path });
	}

	static put(path, data) {
		return this.makeReqest({ data, method: 'PUT', path });
	}

	static delete(path, data) {
		return this.makeReqest({ data, method: 'DELETE', path });
	}

	static makeReqest({ data, method = 'GET', path }) {
		const { authToken, baseUrl } = this;
		const url = `${baseUrl}${path}`;
		const headers = { authToken };

		return executeHttpRequest({
			data,
			headers,
			method,
			url
		});
	}
}

export default Api;
