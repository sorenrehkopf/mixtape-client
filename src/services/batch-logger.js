import debounce from 'lodash/debounce';
import executeHttpRequest from '_/services/execute-http-request';

class BatchLogger {
	constructor() {
		this.queue = [];
		this.staticData = {};

		window.addEventListener('beforeunload', async() => {
			await this.shipLogs();
		});
	}

	get logDestination() {
		return ({
			"www.myxtape.io":  'https://www.myxtyp.com/api/',
			"localhost": 'http://localhost:5500/',
			"www.myxtape-dev.io": 'http://localhost:5500/'
		})[window.location.hostname]
	}

	get filters() {
		return [];
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
		const { filters, staticData, format } = this;

		if(!filters.some(f => f(data))) {
			this.queue.push({
				level,
				payload: {
					...staticData,
					...format(data),
					timestamp: new Date().toString()
				},
			});

			this.weighLogsForShipping();
		}
	}

	weighLogsForShipping() {
		const { queue } = this;

		if (queue.length >= 5) {
			this.debouncedShipLogs();
		}
	}

	shipLogs = () => {
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
	}

	debouncedShipLogs = debounce(this.shipLogs);

	format(data) {
		return data;
	}

	setStaticData(data) {
		this.staticData = data;
	}
}

export default BatchLogger;