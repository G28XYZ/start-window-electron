import React, { useState } from 'react';
// import { ipcRenderer } from 'electron';

export const StartButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = async () => {
		setIsOpen(!isOpen);
		if(isOpen) electronAPI.closeStartWindow();
		else electronAPI.openStartWindow();
	}

	return <div className='start-icon-container'>
		<div className='start-icon' onClick={handleClick} />
	</div>
}