const formatTime = milliseconds => {
	const roundedMilliseconds = 1000 * Math.round(milliseconds / 1000);
	const date = new Date(roundedMilliseconds);

	const minutes = date.getUTCMinutes();
	const seconds = date.getUTCSeconds();
	
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default formatTime;