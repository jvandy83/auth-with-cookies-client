import React, { useState } from 'react';

export const Profile = ({ user, addProfile }) => {
	const [values, setValues] = useState({});
	const handleChange = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<div>
			<h1>Profile Page</h1>
			<div>{user?.email} is logged in</div>
			<div>
				<form onSubmit={(e) => e.preventDefault()}>
					<div>
						<label>First Name: </label>
						<input
							type='text'
							name='firstName'
							value={values.firstName || ''}
							onChange={handleChange}
							placeholder='first name'
						/>
					</div>
					<div>
						<label>Last Name: </label>
						<input
							type='text'
							name='lastName'
							value={values.lastName || ''}
							onChange={handleChange}
							placeholder='last name'
						/>
					</div>
					<button onClick={() => addProfile(values)}>Create Profile</button>
				</form>
			</div>
		</div>
	);
};
