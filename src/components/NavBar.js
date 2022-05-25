import {Link} from 'react-router-dom'

const NavBar = () => (
	<nav
		style={{
			borderBottom: 'solid 1px',
			paddingBottom: '1rem',
		}}
	>
		<h1 className='font-bold text-2xl text-pink-600'>New Life Style Wellness Centre</h1>
		<Link to='/'>Home</Link> | <Link to='/add-user'>Add user</Link> | <Link to='/edit-user'>Edit User</Link> | <Link to='/user-list'>Users List</Link>
	</nav>
)

export default NavBar
