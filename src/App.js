import React, {useEffect, useState} from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'
import * as Realm from 'realm-web'
import UsersList from './components/UsersList'
import AddUser from './components/AddUser'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'New Life Style Wellness Centre',
		},
	},
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
// const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']
const labels = []
for (let i = 1; i < 32; i++) {
	labels.push(i)
}

export const data = {
	labels,
	datasets: [
		// {
		// 	label: 'Sahil',
		// 	data: [50.8, 51, 52.3, 51.3, 52.1],
		// 	borderColor: 'rgb(255, 99, 132)',
		// 	backgroundColor: 'rgba(255, 99, 132, 0.5)',
		// },
		// {
		// 	label: 'Hari Om',
		// 	data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
		// 	borderColor: 'rgb(53, 162, 235)',
		// 	backgroundColor: 'rgba(53, 162, 235, 0.5)',
		// },
	],
}

function App() {
	const [user, setUser] = useState(null)
	const [users, setUsers] = useState(null)
	useEffect(() => {
		async function main() {
			const app = new Realm.App({id: process.env.REACT_APP_REALM_APP_ID})
			const credentials = Realm.Credentials.anonymous()
			try {
				const user = await app.logIn(credentials)
				// console.log('got user', user)

				const allUsers = await user.functions.getAllUsers()
				console.log('allUsers', allUsers)
				setUsers(allUsers)
			} catch (err) {
				console.error('Failed to log in', err)
			}
		}

		main()
	}, [])

	return (
		<div>
			<AddUser />
			<Line className='line-graph' options={options} data={data} />
			{/* <UsersList users={users} /> */}
		</div>
	)
}

export default App
