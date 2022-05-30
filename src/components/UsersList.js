import {useState} from 'react'
import useUsersContext from '../contexts/useUsersContext'
import useRefetchUsers from '../hooks/useRefetchUsers'
import Loading from './Loading'

const UsersList = () => {
	const [users] = useUsersContext()
	const [debug, setDebug] = useState(false)
	const refetchUsers = useRefetchUsers()

	return (
		<div className='card-center'>
			<h1>Users</h1>
			{users ? (
				<>
					<div className='flex-col justify-center'>
						{users.map((user) => {
							const deleteUser = async () => {
								let userMongo = window.userMongo

								if (window.confirm(`Are you sure, you want to delete ${user.name}?`)) {
									await userMongo.functions.deleteUser(user._id.toString())
									await refetchUsers()
									alert('User Deleted!')
								}
							}

							return (
								<div key={user._id.toString()} className='flex mb-5'>
									<div className='mr-10'>
										<div className='font-bold'>{user.name}</div>
										<div>Age: {user.age}</div>
										<div>Birth: {user.birth}</div>
										<div>Gender: {user.gender}</div>
										<button className='btn-secondary btn-red py-0 px-2' onClick={deleteUser}>
											Delete User
										</button>
									</div>
									<div>
										<div>Height:{user.height}</div>
										<div>Weight: {user.weight}</div>
										<div>Ideal Weight: {user.idealWeight}</div>
										<div>BMI: {user.bmi}</div>
									</div>
								</div>
							)
						})}
					</div>
					{debug ? <pre>{JSON.stringify(users, null, 2)}</pre> : null}
					<br />
					<div className='flex justify-end'>
						<button onClick={() => setDebug(!debug)}>Debug?</button>
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	)
}

export default UsersList
