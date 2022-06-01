import React, {useEffect, useState} from 'react'

let APP_NAME = 'New Life Style and Wellness Centre App'

// src: https://dev.to/woile/simplest-react-hook-component-for-pwa-install-button-2die
const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState(null)
	const [installed, setInstalled] = useState(null)

	useEffect(() => {
		// do action when finished install, src: https://stackoverflow.com/a/58563406/10012446
		window.addEventListener('appinstalled', (e) => {
			alert(APP_NAME + ' installed successfully!')
			setInstalled(true)

			// Reloading in case for desktop browser works real good as it will hide th Install button asap now that the user has chosen to install the app. ~ Sahil
			// window.document.location.reload()
		})

		const handler = (e) => {
			e.preventDefault()
			// console.log('::beforeinstallprompt::we are being triggered :D')
			setSupportsPWA(true)
			setPromptInstall(e)
		}
		window.addEventListener('beforeinstallprompt', handler)

		return () => window.removeEventListener('transitionend', handler)
	}, [])

	const onClick = async (evt) => {
		evt.preventDefault() // disable default info bar install prompt shown in chrome android and desktop.
		if (!promptInstall) return

		promptInstall.prompt()

		let {outcome} = await promptInstall.userChoice
		// alert(outcome)
		if (outcome === 'accepted') {
			// console.log('User accepted the A2HS prompt')
			alert('Installing now..') // to be replaced with better ui later on.. // todo
			// fyi: this is fired after the successful install event, ~ thats weird ~ Sahil. Imo, its better to avoid handling anything here at all.
		} else {
			alert('User dismissed the A2HS prompt')
		}
	}

	// src: https://stackoverflow.com/a/51735941/10012446, https://a2hs.glitch.me/
	// https://github.com/ng-chicago/AddToHomeScreen/blob/master/src/app/a2hs.service.ts#L57
	if (installed) {
		let userAgentString = navigator.userAgent.toLowerCase()
		let isMobile = /mobile/.test(userAgentString)
		// for mobile can I redirect the user to pwa with this?

		// src: https://stackoverflow.com/a/51735941/10012446
		let isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches

		if (isMobile && isStandaloneMode) {
			return `Note: You have already '${APP_NAME}' installed, you can use that to get a good experience.`
		} else {
			// Dont show anythig at all for desktop users (hide install button as well).
			return null
		}
	}

	if (!supportsPWA) {
		return null
	}
	return (
		<button className='link-button' id='setup_button' aria-label='Install app' title='Install app' onClick={onClick}>
			Install
		</button>
	)
}

export default InstallPWA

// for more pwa hook: https://dev.to/rikurouvila/react-hook-for-showing-custom-add-to-home-screen-prompt-472c
// https://web.dev/learn/pwa/installation-prompt/
// amazing docs @ mdn: https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
// pwa react dpcs: https://create-react-app.dev/docs/making-a-progressive-web-app/
