import { NEWS_API_KEY } from "./constants";

const format = (text: string, ...args: string[]) => {
	args.forEach((item, idx) => text = text.replace(`{${idx}}`, item));

	return text;
}

class API {
	private news_url    = `https://newsapi.org/v2/everything?q={0}&from={1}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;
	private games_url   = 'https://www.freetogame.com/api/games';
	private weather_url = `https://wttr.in/{0}`;


	private _handleRequest<T = any>(urlRes: string) {
		return new Promise<T>(resolve => electronAPI.onListenFetchData((data) => data.url === urlRes && resolve(data.data)))
	}

	getNews<T = any>(q = 'Microsoft') {
		const nowDate = new Date().toLocaleDateString().replace(/\./g, '-');
		const url = format(this.news_url, q, nowDate);

		apiNodeFetch.GET(url);
		
		return this._handleRequest<T>(url);
	}

	getGames<T = any>() {
		apiNodeFetch.GET(this.games_url)

		return this._handleRequest<T>(this.games_url);
	}

	getWeatherContent<T = any>(city = 'Moscow') {
		const url = format(this.weather_url, city);

		apiNodeFetch.GET(url, 'start_window', { responseType: 'text' })

		return this._handleRequest<T>(url);
	}

	getImage<T = any>(url: string) {
		apiNodeFetch.GET(url, 'start_window', { responseType: 'arraybuffer' })

		return this._handleRequest<T>(url);
	}
}

export const api = new API();