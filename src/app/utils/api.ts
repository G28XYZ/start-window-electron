import { NEWS_API_KEY } from "./constants";

const format = (text: string, ...args: string[]) => {
	args.forEach((item, idx) => text = text.replace(`{${idx}}`, item));

	return text;
}

class API {
	private news_url = `https://newsapi.org/v2/everything?q={0}&from={1}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;
	private games_url = 'https://www.freetogame.com/api/games';
	private weather_url = `https://wttr.in/`

	private _handleRequest(res: Promise<Response>) {
		return res.then(data => data.ok ? data.json() : { error: 'error' })
	}

	getNews<T = any>(q = 'Microsoft') {
		const url = format(this.news_url, q, new Date().toLocaleDateString().replace(/\./g, '-'));
		apiNodeFetch.GET(url);
		
		return new Promise<T>(resolve => {
			electronAPI.onFetchData((data) => data.url === url && resolve(data.data))
		})
	}

	getGames<T = any>() {
		apiNodeFetch.GET(this.games_url)

		return new Promise<T>(resolve => {
			electronAPI.onFetchData((data) => data.url === this.games_url && resolve(data.data))
		})
	}

	getWeatherContent<T = any>(city = 'Moscow') {
		const url = this.weather_url + city;
		apiNodeFetch.GET(url, 'start_window', { responseType: 'text' })

		return new Promise<T>(resolve => {
			electronAPI.onFetchData((data) => data.url === url && resolve(data.data))
		})
	}

	getImage<T = any>(url: string) {
		apiNodeFetch.GET(url, 'start_window', { responseType: 'arraybuffer' })

		return new Promise<T>(resolve => {
			electronAPI.onFetchData((data) => data.url === url && resolve(data.data))
		})
	}
}

export const api = new API();