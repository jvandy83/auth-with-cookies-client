import React from 'react';

import { Login } from './Login';

import { Signup } from './Signup';

import { Home } from './Home';

import { Profile } from './Profile';

import { Route, Switch, Link } from 'react-router-dom';

import { useAuth } from './context/auth';

import './App.css';
import { Button } from 'react-bootstrap';

//response interceptor to refresh token on receiving token expired error

function App() {
	const { login, signup, auth, logout, addProfile } = useAuth();
	return (
		<>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					{auth.isAuthenticated ? (
						<button onClick={logout}>Logout</button>
					) : (
						<Link to='/login'>Login</Link>
					)}
				</li>
				<li>
					<Link to='/signup'>Sign up</Link>
				</li>
				<li>
					<Link to='/profile'>Profile</Link>
				</li>
			</ul>
			<Switch>
				<Route path='/signup'>
					<Signup signup={signup} />
				</Route>
				<Route path='/profile'>
					<Profile user={auth.user} addProfile={addProfile} />
				</Route>
				<Route path='/login'>
					<Login login={login} />
				</Route>
				<Route path='/'>
					<Home user={auth.user} />
				</Route>
			</Switch>
		</>
	);
}

export default App;
