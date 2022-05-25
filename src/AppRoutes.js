import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import NavBar from './components/NavBar'
import UsersList from './components/UsersList'
import useUsers from './hooks/useUsers'

const AppRoutes = () => {
	const [users] = useUsers(null) // initializing context and load data on mount.

	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='add-user' element={<AddUser />} />
				<Route path='edit-user' element={<EditUser />} />
				<Route path='user-list' element={<UsersList />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
