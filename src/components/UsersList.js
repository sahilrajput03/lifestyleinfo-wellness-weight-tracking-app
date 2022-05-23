const UsersList = ({users}) => {
	return (
		<>
			<h2>Users</h2>
			{users &&
				users.map((user) => {
					return (
						<div>
							<li>{user.name}</li>
							<li>{user.age}</li>
							<li>{user.height}</li>
						</div>
					)
				})}
		</>
	)
}

export default UsersList
