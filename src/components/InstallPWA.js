import React, {useEffect, useState} from 'react'

// src: https://dev.to/woile/simplest-react-hook-component-for-pwa-install-button-2die
const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState(null)
	const [installed, setInstalled] = useState(null)

	useEffect(() => {
		// My own way to to check if user has pwa app installed or not!
		if (window.matchMedia('(display-mode: standalone)').matches) {
			// src: https://stackoverflow.com/a/51735941/10012446
			setInstalled(true)
		}

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
			alert('Installing.. Please wait for few seconds..') // to be replaced with better ui later on.. // todo
			// todo: refresh app after 7 seconds and show the banner that you have this website as app installed somehow..

			// Reloading in case for desktop browser works real good as it will hide th Install button asap now that the user has chosen to install the app. ~ Sahil
			window.document.location.reload()
		} else {
			alert('User dismissed the A2HS prompt')
		}
	}

	if (installed) {
		// for mobile can I redirect the user to pwa with this?
		return 'Note: You have already `New Life Style Wellness Centre App` installed, you can use that to get a good experience.'
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
