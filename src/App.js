import React, {useEffect, useState} from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'
import * as Realm from 'realm-web'
import UsersList from './components/UsersList'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

let log = console.log

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
	// vvv src: https://www.chartjs.org/docs/latest/axes/labelling.html
	scales: {
		y: {
			ticks: {
				callback: function (value, index, ticks) {
					return value + ' kg'
				},
			},
		},
		x: {
			ticks: {
				callback: function (value, index, ticks) {
					return value + ' May'
				},
			},
		},
	},
	// src: https://stackoverflow.com/a/42573360/10012446
	animation: {
		duration: 1500,
	},
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
// const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']
const getDaysInaMonth = (year, month) => {
	return new Date(year, month + 1, 0).getDate() // 28
}

const getLabels = (year, month) => {
	const labels = []
	for (let i = 1; i <= getDaysInaMonth(year, month) + 1; i++) {
		labels.push(i)
	}
	return labels
}

export const initData = {
	labels: getLabels(2022, 4),
	datasets: [
		{
			label: 'Sahil',
			data: [50.8, 51, 52.3, 51.3, 52.1],
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
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
	const [data, setData] = useState(initData)

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

	const onClick = () => {
		setData((data) => {
			// data.datasets[0].data.push(Math.random() * 10)

			function getRandomIntInclusive(min, max) {
				min = Math.ceil(min)
				max = Math.floor(max)
				return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
			}

			// let random_value = Math.random() * 10
			let random_value = getRandomIntInclusive(50, 54)

			log('data:', data.datasets[0].data)
			return {...data, datasets: [{...data.datasets[0], data: [...data.datasets[0].data, random_value]}]}
			// return {...data}
		})
	}

	return users ? (
		<div className='max-w-7xl m-auto border-2 box-border'>
			<AddUser />
			<EditUser users={users} />
			<Line
				className='line-graph'
				options={options}
				data={data}
				onChange={(e) => {
					log('hell..??', e.target.value)
				}}
			/>
			<UsersList users={users} />
			<button onClick={onClick}>Add data</button>
		</div>
	) : (
		'Loading..'
	)
}

export default App
