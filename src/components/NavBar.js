import {Link, useLocation} from 'react-router-dom'
import paths from '../utils/paths'
import ContactUs from './ContactUs'

const NavBar = () => {
	const {pathname} = useLocation()

	return (
		<nav
			style={{
				borderBottom: 'solid 1px',
				paddingBottom: '1rem',
			}}
		>
			<h1 className='font-bold text-2xl text-pink-600'>New Life Style Wellness Centre</h1>
			<Link to={paths.home} className={paths.home === pathname ? 'underline-page-tab' : ''}>
				Home
			</Link>{' '}
			|{' '}
			<Link to={paths.addUser} className={paths.addUser === pathname ? 'underline-page-tab' : ''}>
				Add user
			</Link>
			|{' '}
			<Link to={paths.editUser} className={paths.editUser === pathname ? 'underline-page-tab' : ''}>
				Edit User
			</Link>{' '}
			|{' '}
			<Link to={paths.userList} className={paths.userList === pathname ? 'underline-page-tab' : ''}>
				Users List
			</Link>
			<br />
			<br />
			<ContactUs />
		</nav>
	)
}

export default NavBar
