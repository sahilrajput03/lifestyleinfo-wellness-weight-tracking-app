import useUsersContext from '../contexts/useUsersContext'

const UsersList = () => {
	const [users] = useUsersContext()

	return (
		<div className='card-center'>
			<h1>Users</h1>
			<div className='flex justify-center'>
				{users &&
					users.map((user) => {
						return (
							<div key={user._id.toString()} className='flex'>
								<div className='mr-10'>
									<div className='font-bold'>{user.name}</div>
									<div>Age: {user.age}</div>
									<div>Birth: {user.birth}</div>
									<div>Gender: {user.gender}</div>
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
		</div>
	)
}

export default UsersList
