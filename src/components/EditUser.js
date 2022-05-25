import {useState} from 'react'
import useUsersContext from '../contexts/useUsersContext'
import AddUser from './AddUser'
import Loading from './Loading'

let log = console.log

const EditUser = () => {
	const [users] = useUsersContext()

	return users ? <List users={users} /> : <Loading />
}

const List = ({users, toggleList}) => {
	const [selected, setSelected] = useState(null)

	const onClick = (name) => () => {
		log('got here...')
		const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase())
		log('got here...', user)
		setSelected(user)
	}

	return selected ? (
		<AddUser USER={selected} SHOW={true} />
	) : (
		<div>
			{users.map((u) => (
				<button key={u._id.toString()} onClick={onClick(u.name)}>
					{u.name}
				</button>
			))}
		</div>
	)
}

export default EditUser
