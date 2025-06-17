import React, { useEffect, useRef, useState } from "react"
import { api } from "./utils/api";
import { IArticle, IGame } from "./utils/types";

export const Search = () => {
	const [value, setValue] = useState('');

	return <label className="start-menu-search-label">
					<input className="start-menu-search" type="text" placeholder="Поиск..." value={value} onChange={(e) => setValue(e.target.value)} />
				</label>
}

export const Game = ({ data }: { data: IGame }) => {
	const [_, setIsHover] = useState(false);

	const handleClick = () => {
		const link = document.createElement('a');
		link.href = data.game_url;
		link.target = '_blank';
		link.click();
		link.remove();
	}

	return <div onClick={handleClick} className="games-item" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
		<img src={data.thumbnail} alt={data.title} />
		<div className="games-title">{data.title}</div>
	</div>
}

export const Games = () => {
	const [games, setGames] = useState<IGame[]>([]);

	useEffect(() => {
		const res = api.getGames();
		res.then(data => data && setGames(data || []));
	}, [])

	return <div className="start-menu-content-games">
			<span>Игры для вас</span>
			<div>{games.map(item => <Game key={item.id} data={item} />)}</div>
		</div>
}

export const News = ({ data }: { data: IArticle }) => {
	const [isHover, setIsHover] = useState(false);

	const handleClick = () => {
		const link = document.createElement('a');
		link.href = data.url;
		link.target = '_blank';
		link.click();
		link.remove();
	}

	return <div onClick={handleClick} className="news-item" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
		<img src={data.urlToImage} alt={data.title} />
		<div className="news-title">{data.title}</div>
		{isHover && <div className="news-content">{data.content}</div>}
	</div>
}

export const NewsContainer = () => {
	const [news, setNews] = useState<IArticle[]>([]);
	const [q, setQ] = useState('Microsoft')

	useEffect(() => {
		const res = api.getNews(q);
		res.then(data => setNews(data?.articles || []));
	}, [q])

	return <div className="start-menu-content-news">
			<span>
				Новости
				<input placeholder="Введите..." type="text" name="q" id="q" value={q} onChange={(e) => setQ(e.target.value)} />
			</span>
			<div>
				{
					news.length === 0
					? <>Loading...</>
					: news.map((item, idx) => <News key={idx} data={item} />)
				}
			</div>
		</div>
}

export const RecentApp = ({ name, base64 }: typeof RECENT_APPS[number]) => {
	return <div key={name} className="recent-app">
						<img src={base64} alt="" />
						<div>{name}</div>
					</div>
}

export const Weather = () => {
	const [city, setCity] = useState('Москва');
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		api.getWeatherContent(city).then(data => {
			if(data && iframeRef.current) {
				iframeRef.current.src = "";
				iframeRef.current.contentWindow.document.body.insertAdjacentHTML('beforebegin', data);
			}
		})
	}, [city])

	return <div className="start-menu-content-weather">
						<span>
							Погода <input placeholder="Город..." type="text" name="city" id="city" value={city} onChange={(e) => {
								iframeRef.current.src = "about:blank";
								setCity(e.target.value)
							}} />
						</span>
						<iframe ref={iframeRef} className="weather-content" width='100%' />
					</div>
}

export const StartWindow = () => {

	const handleShutdown = () => {
		electronAPI.closeApp()
	}


	return <main className="start-menu-container">
		<div className="start-menu">
			<Search />
			<div style={{ textAlign: 'center' }}>Сегодня 	&#8226; {new Date().toLocaleDateString()}</div>
			<div className="start-menu-content">
				<div className="start-menu-content-recent">
					Рекомендации
					{RECENT_APPS.map(item => <RecentApp key={item.name} {...item} />)}
				</div>
				<div style={{ maxHeight: '70vh', overflow: 'auto', maxWidth: '70vw' }}>
					<NewsContainer />
					<Games />
					<Weather />
				</div>
			</div>
		</div>
		<div className="start-menu-footer">
			<div className="start-menu-profile">
				<div className="start-menu-avatar"></div>
				<div className="start-menu-username">WindowsUser</div>
			</div>
			<div className="start-menu-shutdown" onClick={handleShutdown}/>
		</div>
	</main>
}