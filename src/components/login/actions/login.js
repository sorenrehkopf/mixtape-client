import {
	LOGIN_START,
	LOGIN_FINISH
} from './types';

import ChildWindow from '../../../services/child-window';
import Api from '../../../services/api';

const login = () => (dispatch, getState) => {
	dispatch({ type: LOGIN_START });

	const url = ({
			"www.myxtape.com":  'https://www.myxtyp.com/api/auth/login',
			"localhost": 'http://localhost:3000/api/auth/login'
		})[window.location.hostname];

	const loginWindow = new ChildWindow({
		url,
		onMessage: ({ data: { authToken, ...more } }) => {
			const payload = {
				user: more
			};

			Api.setAuthToken(authToken);
			dispatch({ type: LOGIN_FINISH, payload });
			loginWindow.close();
		}
	});

	loginWindow.open();
}

export default login;
