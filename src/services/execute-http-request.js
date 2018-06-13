const executeHttpReqest = ({ data, headers = {}, method = 'GET', url }) => {
	return new Promise((resolve, reject) => {
		const http = new XMLHttpRequest();

		http.open(method, url);

		for (let key in headers) {
			http.setRequestHeader(key, headers[key]);
		}

		http.onreadystatechange = () => {
			if(http.readyState === 4){
				let data;

				try {
					data = JSON.parse(http.response);
				} catch(e) {
					// if we can't parse into json then just send the response as is
					data = http.response;
				}

				if(http.status===200) resolve({ data });
				else reject(`Error: ${http.status}`);
			}
		};

		if(data){
			http.setRequestHeader('Content-Type', 'application/json');
			const serializedData = JSON.stringify(data);
			http.send(serializedData);
		} else {
			http.send();
		}
	});
};

export default executeHttpReqest;