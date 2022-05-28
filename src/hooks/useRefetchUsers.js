import useUsersContext from '../contexts/useUsersContext'

const useRefetchUsers = () => {
	// eslint-disable-next-line no-unused-vars
	const [_, setUsers] = useUsersContext()

	async function main() {
		try {
			let userMongo = window.userMongo // true global state solution.. ~ Sahil,
			// console.log('got user', user)
			const allUsers = await userMongo.functions.getAllUsers()
			console.log('allUsers', allUsers)
			setUsers(allUsers)
		} catch (err) {
			console.error('Failed to log in', err)
		}
	}

	return main
}

export default useRefetchUsers
