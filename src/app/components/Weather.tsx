import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDebounce } from "../utils/hooks";
import { api } from "../utils/api";
import { Loader } from "./Loader";

export const Weather = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [city, setCity] = useState('Москва');
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const onGetData = useCallback((city: string) => {
		api.getWeatherContent(city).then(data => {
			console.log(iframeRef.current);
			if(data && iframeRef.current) {
				const doc = iframeRef.current.contentDocument;
				doc.open();
				doc.writeln(data);
				doc.close();
				setIsLoading(false);
			}
		})
	}, [city, iframeRef])

	const debounce = useCallback(useDebounce(onGetData, 3000), []);

	useEffect(() => { onGetData(city) }, [iframeRef.current]);

	return <div className="start-menu-content-weather">
					<span>
						Погода <input placeholder="Город..." type="text" name="city" id="city" value={city} onChange={(e) => { setIsLoading(true); setCity(e.target.value); debounce(e.target.value) }} />
					</span>
			{isLoading && <Loader />}
			<iframe style={{ display: isLoading ? 'none' : 'initial' }} ref={iframeRef} src='' className="weather-content" width='100%' />
		</div>
}