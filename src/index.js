import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Router } from 'react-router';

import { AuthProvider } from './context/auth';

import { history } from './util/history';

ReactDOM.render(
	<Router history={history}>
		<AuthProvider>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</AuthProvider>
	</Router>,
	document.getElementById('root'),
);
