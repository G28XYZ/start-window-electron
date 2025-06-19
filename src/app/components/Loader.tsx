import React from "react";

import './loader.css';

/** компонент лоадер */
export const Loader = () => {
	return <span className="loader-container">
							<span className="loader-wrapper">
									<div className="loader">
										<div className="dot"></div>
									</div>
									<div className="loader">
										<div className="dot"></div>
									</div>
									<div className="loader">
										<div className="dot"></div>
									</div>
									<div className="loader">
										<div className="dot"></div>
									</div>
									<div className="loader">
										<div className="dot"></div>
									</div>
									<div className="loader">
										<div className="dot"></div>
									</div>
							</span>
							{/* <div className="text">
									Loading...
							</div> */}
					</span>
}