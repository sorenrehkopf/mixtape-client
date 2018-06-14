import BatchLogger from '_/services/batch-logger';

class ReduxBatchLogger extends BatchLogger {
	get filters() {
		return [
			(data) => {
				//filter out clutter from redux-logger. we only want actions and payloads
				return /(prev state)|(next state)|(log end)/.test(data[0]) ||
					!data[2] || 
					/router/.test(data[2].type);
			}
		];
	}

	format(data) {
		return {
			action: data[2].type,
			payload: data[2].payload
		}
	}
}

export default ReduxBatchLogger;