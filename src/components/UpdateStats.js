import {useState} from 'react'
import useUsersContext from '../contexts/useUsersContext'
import Loading from './Loading'
import UserStats from './UserStats'

let log = console.log

const EditUser = () => {
	const [users] = useUsersContext()

	return users ? <List users={users} /> : <Loading />
}

const List = ({users, toggleList}) => {
	const [selected, setSelected] = useState(null)

	const onClick = (name) => () => {
		const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase())
		setSelected(user)
	}

	return selected ? (
		<UserStats USER={selected} />
	) : (
		<div className='card-center'>
			<h1>Select a user</h1>
			{users.map((usr, idx) => (
				<button className='block m-auto' key={usr._id.toString()} onClick={onClick(usr.name)}>
					{`${idx + 1}. ${usr.name}`}
				</button>
			))}
		</div>
	)
}

export default EditUser
