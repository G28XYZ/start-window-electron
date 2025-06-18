import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { IGame } from "../utils/types";
import { Loader } from "./Loader";

export const Game = ({ data }: { data: IGame }) => {
	const [_, setIsHover] = useState(false);
	const [imgSrc, setImageSrc] = useState(data.thumbnail);

	const handleClick = () => {
		const link = document.createElement('a');
		link.href = data.game_url;
		link.target = '_blank';
		link.click();
		link.remove();
	}

	useEffect(() => {
		api.getImage(data.thumbnail).then((data: Uint16Array) => {
			const blob = new Blob([data], { type: 'image/jpg' });
			const url = URL.createObjectURL(blob);
			setImageSrc(url);
		});

	}, [data.thumbnail])

	return <div onClick={handleClick} className="games-item" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
			<img src={imgSrc} alt={data.title} loading='lazy' />
			<div className="games-title">{data.title}</div>
		</div>
}


export const Games = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [games, setGames] = useState<IGame[]>([]);

	useEffect(() => {
		const res = api.getGames();
		res.then(data => {
			setIsLoading(false);
			data && setGames(data?.slice(0, 10) || [])
		});
	}, [])

	
	return <div className="start-menu-content-games">
		<span>Игры для вас</span>
		{
			isLoading
			? <Loader />
			: <>
				<div className="start-menu-content-games-list">{games.map(item => <Game key={item.id} data={item} />)}</div>
			</>
		}
		</div>
}