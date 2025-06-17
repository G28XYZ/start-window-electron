import React, { useState } from "react"
import { Games, NewsContainer, Weather } from "./components";

export const StartWindow = () => {

	const handleShutdown = () => electronAPI.closeApp();

	const RecentApp = ({ name, base64 }: typeof RECENT_APPS[number]) => {
		return <div key={name} className="recent-app">
				<img src={base64} alt={name} loading='lazy' />
				<div>{name}</div>
			</div>
	}

	const Search = () => {
		const [value, setValue] = useState('');

		return <label className="start-menu-search-label">
				<input className="start-menu-search" type="text" placeholder="Поиск..." value={value} onChange={(e) => setValue(e.target.value)} />
			</label>
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
				<div style={{ maxHeight: '70vh', overflow: 'auto', maxWidth: '70vw', width: '100%' }}>
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