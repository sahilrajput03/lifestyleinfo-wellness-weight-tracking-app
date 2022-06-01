import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import AppRoutes from './AppRoutes'
import InstallPWA from './components/InstallPWA'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Having a service worker is important to be able to show install prompt, learned this from Lighthouse report for Installable prompt, yikes!. Works good with .ml domains as well! Yikes!
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
}

root.render(
	<React.StrictMode>
		<InstallPWA />
		<button
			onClick={() => {
				window.open(window.location.href, '_blank')
			}}
		>
			Open pwa
		</button>
		<AppRoutes />
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
