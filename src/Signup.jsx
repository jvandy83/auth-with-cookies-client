import React, { useState } from 'react';

export const Signup = ({ signup }) => {
	const [values, setValues] = useState({});

	const handleChange = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSignup = (e) => {
		e.preventDefault();
		return signup(values);
	};

	return (
		<div className='App'>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<h2>Sign up</h2>
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
				<button onClick={handleSignup}>Submit</button>
			</form>
		</div>
	);
};
