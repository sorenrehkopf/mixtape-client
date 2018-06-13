import debounce from 'lodash/debounce';
import executeHttpRequest from '_/services/execute-http-request';

class BatchLogger {
	constructor() {
		this.queue = [];
		this.staticData = {};
	}

	get logDestination() {
		return ({
			"www.myxtape.io":  'https://www.myxtyp.com/api/',
			"localhost": 'http://localhost:5000/',
			"www.myxtape-dev.io": 'http://localhost:5000/'
		})[window.location.hostname]
	}

	get filters() {
		return [
			(data) => {
				//filter out clutter from redux-logger. we only want actions and payloads
				return data && data[0] && /(prev state)|(next state)|(log end)/.test(data[0]);
			}
		];
	}

	log(...data) {
		this.addLogToQueue({ level: 'info', data });
	}
	
	info(...data) {
		this.addLogToQueue({ level: 'info', data });
	}

	error(...data) {
		this.addLogToQueue({ level: 'error', data });
	}

	warn(...data) {
		this.addLogToQueue({ level: 'warn', data });
	}

	debug(...data) {
		this.addLogToQueue({ level: 'debug', data });
	}

	addLogToQueue({ level, data }) {
		const { filters, staticData } = this;

		if(!filters.some(f => f(data))) {
			this.queue.push({
				level,
				payload: {
					...staticData,
					...data
				},
				timestamp: new Date().toString()
			});

			this.weighLogsForShipping();
		}
	}

	weighLogsForShipping() {
		const { queue } = this;

		if (queue.length >= 10) {
			this.shipLogs();
		}
	}

	shipLogs = debounce(() => {
		const { logDestination: url, queue } = this;
		const currentCargo = [...queue];

		this.queue = [];

		executeHttpRequest({
			data: { queue: currentCargo },
			method: 'POST',
			url
		}).then(() => {
			this.queue = [];
		}).catch(error => {
			this.queue = [...currentCargo, ...this.queue];
			this.error({ error });
		});
	},2000);

	setStaticData(data) {
		this.staticData = data;
	}
}

export default BatchLogger;