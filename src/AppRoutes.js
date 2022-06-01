import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import NavBar from './components/NavBar'
import UsersList from './components/UsersList'
import useSetupUsers from './hooks/useSetupUsers'
import UpdateStats from './components/UpdateStats'
import paths from './utils/paths'

const AppRoutes = () => {
	const [users] = useSetupUsers(null) // initializing context and load data on mount.

	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path={paths.home} element={<Home />} />
				<Route path={paths.addUser} element={<AddUser />} />
				<Route path={paths.editUser} element={<EditUser />} />
				<Route path={paths.userList} element={<UsersList />} />
				<Route path={paths.updateStats} element={<UpdateStats />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
