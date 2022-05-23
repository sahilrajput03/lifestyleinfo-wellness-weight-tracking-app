import {useState} from 'react'
import AddUser from './AddUser'

let log = console.log

const EditUser = ({users}) => {
	const [showList, setShowList] = useState(null)

	const toggleList = () => {
		setShowList(!showList)
	}

	return showList ? (
		<>
			<List users={users} toggleList={toggleList} />
			<button className='btn-secondary' onClick={toggleList}>
				Close List
			</button>
		</>
	) : (
		<button className='btn-primary' onClick={toggleList}>
			Edit User
		</button>
	)
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
		<AddUser USER={selected} SHOW={true} CB={toggleList} />
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
