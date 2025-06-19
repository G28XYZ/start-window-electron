import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { IArticle } from "../utils/types";
import { Loader } from "./Loader";

/** компонент с информацией о новости */
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
			<img src={data.urlToImage} alt={data.title} loading='lazy' />
			<div className="news-title">{data.title}</div>
			{isHover && <div className="news-content">{data.content}</div>}
		</div>
}

/** компонент с сегодняшними новостями */
export const NewsContainer = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [news, setNews] = useState<IArticle[]>([]);
	const [q, setQ] = useState('Microsoft');

	useEffect(() => {
		/** запрос на получение новостей */
		api.getNews(q).then(data => {
			setIsLoading(false);
			setNews(data?.articles?.slice(0, 10) || [])
		});
	}, [q])

	return <div className="start-menu-content-news">
			<span>
				Новости
				<input placeholder="Введите..." type="text" name="q" id="q" value={q} onChange={(e) => { setIsLoading(true); setQ(e.target.value) }} />
			</span>
		{
			isLoading
			? <Loader />
			: <>
				<div className="start-menu-content-news-list">
					{
						news.length === 0
						? <>Loading...</>
						: news.map((item, idx) => <News key={idx} data={item} />)
					}
				</div>
			</>
		}
		</div>
}