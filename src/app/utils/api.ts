import { NEWS_API_KEY } from "./constants";

const format = (text: string, ...args: string[]) => {
	args.forEach((item, idx) => text = text.replace(`{${idx}}`, item));

	return text;
}

class NEWS_API {
	private url = `https://newsapi.org/v2/everything?q={0}&from={1}&sortBy=popularity&apiKey=${NEWS_API_KEY}`

	private _handleRequest(res: Promise<Response>) {
		return res.then(data => data.ok ? data.json() : { error: 'error' })
	}

	getNews(q = 'Apple') {
		return this._handleRequest(fetch(format(this.url, q, new Date().toLocaleDateString().replace(/\./g, '-'))))
	}
}

export const newsApi = new NEWS_API();