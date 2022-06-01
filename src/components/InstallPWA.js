import React, {useEffect, useState} from 'react'

// src: https://dev.to/woile/simplest-react-hook-component-for-pwa-install-button-2die
const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState(null)

	useEffect(() => {
		const handler = (e) => {
			e.preventDefault()
			// console.log('::beforeinstallprompt::we are being triggered :D')
			setSupportsPWA(true)
			setPromptInstall(e)
		}
		window.addEventListener('beforeinstallprompt', handler)

		return () => window.removeEventListener('transitionend', handler)
	}, [])

	const onClick = (evt) => {
		evt.preventDefault() // disable default info bar install prompt shown in chrome android and desktop.
		if (!promptInstall) return

		promptInstall.prompt()
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
