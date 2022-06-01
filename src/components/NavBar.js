import {Link, useLocation} from 'react-router-dom'
import paths from '../utils/paths'
import ContactUs from './ContactUs'

const NavBar = () => {
	return (
		<nav
			style={{
				borderBottom: 'solid 1px',
				paddingBottom: '1rem',
			}}
		>
			{/* <Title /> */}
			<PageLinks />
			<ContactUs />
		</nav>
	)
}

const Title = () => {
	return (
		<Link to={paths.home}>
			<div className='hero-title'>New Life Style Wellness Centre</div>
		</Link>
	)
}

const PageLinks = () => {
	const {pathname} = useLocation()

	let style = {
		home: paths.home === pathname ? 'underline-page-tab ' : '',
		addUser: paths.addUser === pathname ? 'underline-page-tab ' : '',
		editUser: paths.editUser === pathname ? 'underline-page-tab ' : '',
		userList: paths.userList === pathname ? 'underline-page-tab ' : '',
		updateStats: paths.updateStats === pathname ? 'underline-page-tab ' : '',
	}

	return (
		<div className='text-center mb-5'>
			<Link to={paths.home} className={style.home + 'tab'}>
				Home
			</Link>{' '}
			|{' '}
			<Link to={paths.addUser} className={style.addUser + 'tab'}>
				Add user{' '}
			</Link>{' '}
			|{' '}
			<Link to={paths.editUser} className={style.editUser + 'tab'}>
				Edit User
			</Link>{' '}
			|{' '}
			<Link to={paths.userList} className={style.userList + 'tab'}>
				Users List
			</Link>{' '}
			|{' '}
			<Link to={paths.updateStats} className={style.updateStats + 'tab'}>
				Update Stats
			</Link>
		</div>
	)
}

export default NavBar
