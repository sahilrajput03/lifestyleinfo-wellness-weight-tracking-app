import {useEffect, useState} from 'react'
import * as Realm from 'realm-web'
import useUsersContext from '../contexts/useUsersContext'

const useSetupUsers = (value) => {
	// const [users, setUsers] = useState(null)
	const [users, setUsers] = useUsersContext(value)

	useEffect(() => {
		async function main() {
			const app = new Realm.App({id: process.env.REACT_APP_REALM_APP_ID})
			const credentials = Realm.Credentials.anonymous()
			try {
				const userMongo = await app.logIn(credentials)
				window.userMongo = userMongo // true global state solution.. ~ Sahil,
				// console.log('got user', user)
				const allUsers = await userMongo.functions.getAllUsers()
				console.log('allUsers', allUsers)
				setUsers(allUsers)
			} catch (err) {
				console.error('Failed to log in', err)
			}
		}

		main()
	}, [])

	return [users, setUsers]
}

export default useSetupUsers
