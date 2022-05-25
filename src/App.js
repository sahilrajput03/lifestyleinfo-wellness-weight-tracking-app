import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import React, {useState} from 'react'
import {Line} from 'react-chartjs-2'
import useUsersContext from './contexts/useUsersContext'

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
	},
	// src: https://stackoverflow.com/a/42573360/10012446
	animation: {
		duration: 1500,
	},
}

const getDaysInaMonth = (year, month) => {
	return new Date(year, month + 1, 0).getDate() // 28
}

const getLabels = (year, month) => {
	const labels = []
	// for (let i = 1; i <= getDaysInaMonth(year, month); i++) {
	for (let i = 1; i <= getDaysInaMonth(year, month); i++) {
		// const date = new Date(2009, 4, 20); // 20 May 2009
		const date = new Date(year, month, 1) // 1 _month_ _year_
		const monthName = date.toLocaleString('default', {month: 'long'})
		labels.push(i + ' ' + monthName)
	}
	return labels
}

let labels = getLabels(2022, 4) // may=4 in javascript
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
// const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']

// log('labels??', getLabels(2022, 4))

export const initData = {
	labels,
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
	return (
		<div>
			<Graphs />
		</div>
	)
}

const Graphs = () => {
	const [data, setData] = useState(initData)
	const [users] = useUsersContext()

	const addRandomData = () => {
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
			<Line
				className='line-graph'
				options={options}
				data={data}
				onChange={(e) => {
					log('hell..??', e.target.value)
				}}
			/>
			<button onClick={addRandomData}>Add data</button>
		</div>
	) : (
		'Loading..'
	)
}

export default App
