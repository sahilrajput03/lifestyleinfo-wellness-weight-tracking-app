const UsersList = ({users}) => {
	return (
		<>
			<h2 className='font-bold text-2xl'>Users</h2>
			{users &&
				users.map((user) => {
					return (
						<div className=''>
							<div className='font-bold'>{user.name}</div>
							<div>Age: {user.age}</div>
							<div> Height:{user.height}</div>
						</div>
					)
				})}
		</>
	)
}

export default UsersList
