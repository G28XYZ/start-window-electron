import React, { useState } from "react"
import { Games, NewsContainer, Profile, RecommendApps, Weather } from "./components";

export const StartWindow = () => {

	const handleShutdown = () => electronAPI.closeApp();

	const Search = () => {
		const [value, setValue] = useState('');

		return <label className="start-menu-search-label">
				<input className="start-menu-search" type="text" placeholder="Поиск..." value={value} onChange={(e) => setValue(e.target.value)} />
			</label>
	}

	const nowText = <div style={{ textAlign: 'center' }}>Сегодня &#8226; {new Date().toLocaleDateString()}</div>;

	const startMenuContent =
		<div className="start-menu-content">
			<RecommendApps />
			<div style={{ maxHeight: '70vh', overflow: 'auto', maxWidth: '70vw', width: '100%' }}>
				<NewsContainer />
				<Games />
				<Weather />
			</div>
		</div>

	return <main className="start-menu-container">
		<div className="start-menu">
			<Search />
			{nowText}
			{startMenuContent}
		</div>
		<div className="start-menu-footer">
			<Profile />
			<div className="start-menu-shutdown" onClick={handleShutdown}/>
		</div>
	</main>
}