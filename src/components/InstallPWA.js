import React, {useEffect, useState} from 'react'
// Simple revision: https://github.com/sahilrajput03#pwa-install-prompt

let APP_NAME = 'New Life Style App'
let ALREADY_INSTALLED_MESSAGE = `You have ${APP_NAME} installed already, so use ${APP_NAME} from you Home screen or All Apps for better experience!`

// src: https://dev.to/woile/simplest-react-hook-component-for-pwa-install-button-2die
const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState(null)
	const [installed, setInstalled] = useState(null)

	// https://stackoverflow.com/a/67618501/10012446
	function getPWADisplayMode() {
		const isStandalone = window.matchMedia('(display-mode: standalone)').matches
		if (document.referrer.startsWith('android-app://')) {
			return 'twa'
		} else if (navigator.standalone || isStandalone) {
			return 'standalone'
		}
		return 'browser'
	}

	//FOR DEBUGGING ONLY: you can see this value from browser console now
	window.pwa_display_mode = getPWADisplayMode()

	useEffect(() => {
		const handler = (e) => {
			e.preventDefault()
			// console.log('::beforeinstallprompt::we are being triggered :D')
			setSupportsPWA(true)
			setPromptInstall(e)
		}

		const main = async () => {
			// Check for mobile users that if the user has installed the PWA already. We make use of `navigator.getInstalledRelatedApps` api, src: https://stackoverflow.com/a/62711422/10012446
			// LEARN `await navigator.getInstalledRelatedApps()` always returns empty array i.e, `[]` for chrome desktop!
			if ('getInstalledRelatedApps' in window.navigator) {
				const relatedApps = await navigator.getInstalledRelatedApps()
				console.log({relatedApps})
				relatedApps.forEach((app) => {
					//if your PWA exists in `relatedApps` array it is already installed on the target user!
					// console.log('::::relatedApps', app.platform, app.url)
					let pfm = 'webapp',
						url = 'https://newfitness.ml/manifest.json'

					// app.platform and app.url is actually defined in manifest.json so MAKE SURE YOU HAVE SAME VALUES AS YOU ARE COMPARING WITH HERE! ~~ Sahil.
					if (app.platform === pfm && app.url === url) {
						// src: https://stackoverflow.com/a/51735941/10012446
						let isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches

						// LEARN: standalonemode = you are viewing site in pwa!
						if (!isStandaloneMode) {
							setInstalled(true) // set state so component's state is updated!
							alert(ALREADY_INSTALLED_MESSAGE)
						}
					}

					// console.log(app.platform, app.url)
				})
			}

			// do action when finished install, src: https://stackoverflow.com/a/58563406/10012446
			window.addEventListener('appinstalled', (e) => {
				alert(APP_NAME + ' installed successfully!')
				setInstalled(true)

				// LEARN: In an attempt to open pwa directly will cause popup blockage, so better use some button action to open pwa.
				//// window.open(window.location.href, '_blank')

				// Reloading in case for desktop browser works real good as it will hide th Install button asap now that the user has chosen to install the app. ~ Sahil
				// window.document.location.reload()
			})

			window.addEventListener('beforeinstallprompt', handler)
		}

		main()
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

		if (isMobile && !isStandaloneMode) {
			//! yahan wo button hona chaiye redirect wala..<<
			return (
				<button
					className='btn-primary'
					onClick={() => {
						window.open(window.location.href, '_blank')
					}}
				>
					Open in App
				</button>
			)
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
