import App from './App'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import UsersList from './components/UsersList'
import useUsersContext from './contexts/useUsersContext'
import useUsers from './hooks/useUsers'

const AppRoutes = () => {
	const [users] = useUsers(null) // initializing context and load data on mount.

	return (
		<BrowserRouter>
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
