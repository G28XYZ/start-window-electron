import './index.css';
import './index';

const handleKeydown = async (ev: KeyboardEvent) => {
	console.log(ev.key, ev.ctrlKey);
	
	const isOpen = await new Promise(resolve => {
		electronAPI.handleIsOpenWindow();
		electronAPI.onListenIsOpenWindow((isOpen) => resolve(isOpen))
	})

	console.log('isOpen', isOpen);
	if(ev.ctrlKey && ev.key === 'Escape') {
		isOpen ? electronAPI.closeStartWindow() : electronAPI.openStartWindow();
	}
	if(ev.key) {
		//
	}
}

document.addEventListener('keydown', handleKeydown);