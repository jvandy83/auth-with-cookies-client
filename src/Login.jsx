import React, { useState } from 'react';

export const Login = ({ login, redirect, setRedirect }) => {
	const [values, setValues] = useState({});
	const handleChange = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		return login(values);
	};
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div>
				<h2>Login</h2>
			</div>
			<div>
				<input
					type='email'
					name='email'
					value={values.email || ''}
					onChange={handleChange}
					placeholder='email'
				/>
			</div>
			<div>
				<input
					type='password'
					name='password'
					value={values.password || ''}
					onChange={handleChange}
					placeholder='password'
				/>
			</div>
			<button onClick={handleLogin}>Submit</button>
		</form>
	);
};
