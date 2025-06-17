import { useRef } from "react";

export function useDebounce(fn: (...args: any[]) => any, delay: number) {
	const ref = useRef(null);
	
	return (...args: any[]) => {
		clearTimeout(ref.current);
		ref.current = setTimeout(() => fn(...args), delay);
	};
}