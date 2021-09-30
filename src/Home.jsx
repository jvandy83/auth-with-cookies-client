import React from 'react';

export const Home = ({ user }) => {
	console.log(user);
	return (
		<>
			<div>{user?.email} is logged in</div>
		</>
	);
};
