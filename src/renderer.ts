import './index.css';
import './index';

const handleKeydown = async (ev: KeyboardEvent) => {
	console.log(ev.key, ev.ctrlKey);

	if(ev.ctrlKey && ev.key === 'Escape') {
		electronAPI.toggleStartWindow();
	}
	if(ev.key) {
		// todo
	}
}

document.addEventListener('keydown', handleKeydown);