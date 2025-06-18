import React, { useState } from 'react';

export const StartButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = async () => {
		setIsOpen(!isOpen);
		electronAPI.toggleStartWindow();
	}

	return <div className='start-icon-container'>
		<div className='start-icon' onClick={handleClick} />
	</div>
}