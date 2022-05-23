import React, {useEffect} from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'
import * as Realm from 'realm-web'
// realm-web docs: https://www.mongodb.com/docs/realm/web/quickstart/
// inspiration: https://youtu.be/Evp3xTzWCu4?list=PL4RCxklHWZ9v2lcat4oEVGQhZg6r4IQGV

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
		{
			label: 'Sahil',
			data: [51, 52.3, 51.3, 52.1],
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
	useEffect(() => {
		async function main() {
			const app = new Realm.App({id: process.env.REACT_APP_REALM_APP_ID})
			const credentials = Realm.Credentials.anonymous()
			try {
				const user = await app.logIn(credentials)
				console.log('got user', user)

				const allCats = await user.functions.getAllCats()
				console.log('allCats', allCats)
			} catch (err) {
				console.error('Failed to log in', err)
			}
		}

		main()
	}, [])

	return <Line options={options} data={data} />
}

export default App
