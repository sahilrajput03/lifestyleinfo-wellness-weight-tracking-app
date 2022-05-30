import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import React, {useState} from 'react'
import {Line} from 'react-chartjs-2'
import useUsersContext from './contexts/useUsersContext'
import Loading from './components/Loading'
import getMonthName from './utils/getMonthName'
import Select from 'react-select'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

let log = console.log

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
			labels: {
				// This more specific font property overrides the global property
				font: {
					// This is for the label i.e., `name` of the user.
					size: 25,
					style: 'bold',
				},
			},
		},
		title: {
			display: true,
			// text: 'New Life Style Wellness Centre',
			// ^^^ We don't need this title text.
		},
	},
	// This doesn't work though :(
	// scale: {
	// 	pointLabels: {
	// 		fontStyle: 'bold',
	// 	},
	// },
	///
	// vvv src: https://www.chartjs.org/docs/latest/axes/labelling.html
	scales: {
		y: {
			ticks: {
				callback: function (value, index, ticks) {
					return value.toFixed(1) + ' kg'
				},
			},
		},
	},
	// src: https://stackoverflow.com/a/42573360/10012446
	animation: {
		duration: 1000,
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
		// const date = new Date(year, month, 1) // 1 _month_ _year_
		const date = new Date(year, month, i) // 1 _month_ _year_ // TESTING THIS FOR GETTING MONDAY LABELS ON X_AXIS!
		const monthName = date.toLocaleString('default', {month: 'long'})

		if (date.getDay() === 1) {
			labels.push('Monday, ' + i + ' ' + monthName)
		} else {
			labels.push(i + ' ' + monthName)
		}
	}
	return labels
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
// const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']

// Using static of initially only:
// let labels = getLabels(2022, 4) // may=4 in javascript
// log('labels??', getLabels(2022, 4))

let darkPink = 'rgb(255, 99, 132)',
	lightPink = 'rgba(255, 99, 132, 0.5)'

export const initData = (label, data, xAxisLabels) => {
	return {
		labels: xAxisLabels,
		datasets: [
			{
				label: label,
				// 50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,50.2,51.3, 50.9, 51.1, 51.6, 51, 52.3, 51.1, 52.1, 51.8, 52.5, 52.5,52
				// data: [51.3, 50.9, 51.1, 51.6, 51, 52.3, 51.1, 52.1, 51.8, 52.5, 52.5, 52],
				data,
				borderColor: darkPink,
				backgroundColor: lightPink,
				// ^^ this is color for dot and the rectangular box label's inside color.
			},
		],
	}
}

function App() {
	return (
		<div>
			<Graphs />
		</div>
	)
}

let currentYear = new Date().getYear() + 1900,
	currentMonth = new Date().getMonth(),
	currentMetric = 'weight' // default metric set to weight!

let initFilter = {year: currentYear, month: currentMonth, metric: currentMetric}

const optionsSelect = [
	{value: 'weight', label: 'weight'},
	{value: 'fats', label: 'fats'},
	{value: 'proteins', label: 'proteins'},
	{value: 'carbs', label: 'carbs'},
]

const optionsMonth = Array(12)
	.fill(0)
	.map((zero, idx) => ({value: idx, label: getMonthName(idx)}))

const Graphs = () => {
	// const [data, setData] = useState(initData)
	const [users] = useUsersContext()
	const [filter, setFilter] = useState(initFilter)
	const [selectUser, setSelectUser] = useState(null)

	const onChange = (e) => {
		const {name, value} = e.target

		setFilter((filter) => {
			return {...filter, [name]: value}
		})
	}

	const resetFilter = () => {
		setFilter({...initFilter, metric: filter.metric})
	}

	const setMetric = (e) => {
		setFilter((filter) => {
			return {...filter, metric: e.value}
		})
	}

	const setMonth = (e) => {
		setFilter((filter) => {
			return {...filter, month: e.value}
		})
	}

	// debug loading gif..
	// return <Loading />

	const valueMetric = {value: filter.metric, label: filter.metric}
	const valueMonth = {value: filter.month, label: getMonthName(filter.month)}

	const defaultOptionUser = {value: null, label: 'All Users'}

	const optionsUsers = [defaultOptionUser, ...(users || [])?.map((usr) => ({label: usr.name, value: usr._id.toString()}))]
	const valueUser = selectUser ? {label: selectUser.name, value: selectUser._id.toString()} : defaultOptionUser

	const selectSetUser = (e) => {
		const user = users.find((usr) => usr._id.toString() === e.value)
		setSelectUser(user)
	}

	return (
		<>
			{users ? (
				<>
					<h1 className='mt-4'>Weight Graphs</h1>
					<div className='max-w-7xl m-auto rounded-xl box-shadow mt-0 pt-0'>
						<h1 className='ml-0 text-left mb-1'>Filter</h1>
						<div className='my-2'>
							<span className='field'>User</span> <Select value={valueUser} options={optionsUsers} onChange={selectSetUser} className={'w-[+180px] inline-block'} />
						</div>
						<div className='my-2'>
							{/* <span className='field'>Month</span> <input className='field-input w-[+150px]' name='month' placeholder='Enter month here..' onChange={onChange} value={filter.month === '' ? '' : filter.month + 1} /> */}
							<span className='field'>Month</span> <Select value={valueMonth} options={optionsMonth} onChange={setMonth} className={'w-[+180px] inline-block'} />
						</div>
						<div className='my-2'>
							<span className='field'>Year</span> <input className='field-input w-[+180px] text-left' name='year' placeholder='Enter year here..' onChange={onChange} value={filter.year} />
						</div>
						<div className='my-2'>
							<span className='field'>Metric</span> <Select value={valueMetric} options={optionsSelect} onChange={setMetric} className={'w-[+180px] inline-block'} />
						</div>
						<button className='ml-5 btn-secondary' onClick={resetFilter}>
							Goto current month
						</button>
					</div>

					{selectUser
						? userGraph(selectUser, filter, 0)
						: users.map((user, idx) => {
								return userGraph(user, filter, idx)
						  })}
				</>
			) : (
				<Loading />
			)}
		</>
	)
}

const userGraph = (user, filter, idx = 0) => {
	let monthData = user.stats?.[filter.year]?.[filter.month]?.[filter.metric]?.split(',')
	let data = initData(user.name, monthData, getLabels(filter.year, filter.month))

	return monthData ? (
		<div key={idx} className='max-w-7xl m-auto rounded-xl box-shadow mt-0'>
			<Line
				className='m-0'
				options={options}
				data={data}
				onChange={(e) => {
					log('hell..??', e.target.value)
				}}
			/>
			{/* <button onClick={addRandomData}>Add data</button> */}
		</div>
	) : (
		<div key={idx}>
			<span className='italic'>No stats found for</span> <span className='font-bold'>{user.name}</span>{' '}
			<span className='italic'>
				in {getMonthName(filter.month)}, {filter.year}
			</span>
		</div>
	)
}

export default App
