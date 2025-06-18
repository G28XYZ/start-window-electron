import React from "react"

export const RecommendApps = () => {

	const RecentApp = ({ name, base64 }: typeof RECENT_APPS[number]) => {
		return <div key={name} className="recent-app">
				<img src={base64} alt={name} loading='lazy' />
				<div>{name}</div>
			</div>
	}

	return <div className="start-menu-content-recent">
				Рекомендации
				{RECENT_APPS.map(item => <RecentApp key={item.name} {...item} />)}
			</div>
}