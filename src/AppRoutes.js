import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import NavBar from './components/NavBar'
import UsersList from './components/UsersList'
import useUsers from './hooks/useUsers'
import paths from './utils/paths'

const AppRoutes = () => {
	const [users] = useUsers(null) // initializing context and load data on mount.

	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path={paths.home} element={<App />} />
				<Route path={paths.addUser} element={<AddUser />} />
				<Route path={paths.editUser} element={<EditUser />} />
				<Route path={paths.userList} element={<UsersList />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
