import React from 'react';

export const StartButton = () => {

	const handleClick = async () => {
		electronAPI.toggleStartWindow();
	}

	return <div className='start-icon-container'>
		<div className='start-icon' onClick={handleClick} />
	</div>
}