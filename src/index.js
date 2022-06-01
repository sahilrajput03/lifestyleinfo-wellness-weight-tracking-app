import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import AppRoutes from './AppRoutes'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
const root = ReactDOM.createRoot(document.getElementById('root'))

window.addEventListener('beforeinstallprompt', async (e) => {
	// debugger
	alert('event::beforeinstallprompt')
	// Prevents the default mini-infobar or install dialog from appearing on mobile
	// e.preventDefault()
	// Save the event because you'll need to trigger it later.
	// This variable will save the event for later use.
	window.beforeinstallpromptEvent = e
	// Show your customized install prompt for your PWA
	// Your own UI doesn't have to be a single element, you
	// can have buttons in different locations, or wait to prompt
	// as part of a critical journey.
	//? showInAppInstallPromotion()

	// Directly triggerring prompt here. for now.!!
	e.prompt()
	const {outcome} = await e.userChoice
	// The deferredPrompt can only be used once.
	// Act on the user's choice
	if (outcome === 'accepted') {
		alert('User accepted the install prompt.')
	} else if (outcome === 'dismissed') {
		alert('User dismissed the install prompt')
	}
})

// if ('serviceWorker' in navigator) {
// 	alert('Service Worker supported!')
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker
// 			.register('../sw_cached_pages.js')
// 			// ? or use cache whole site via below sw
// 			// .register('../sw_cached_whole_site.js')
// 			.then((reg) => {
// 				return alert('Service Worker: Registered (Pages)')
// 			})
// 			.catch((err) => {
// 				alert('sw registration failed..')
// 				return alert(`Service Worker: Error: ${err}`)
// 			})
// 	})
// } else {
// 	alert('sw not supported in browser!')
// }

root.render(
	<React.StrictMode>
		<AppRoutes />
	</React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
