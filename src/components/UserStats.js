import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useRefetchUsers from '../hooks/useRefetchUsers'
import produce from 'immer'

let log = console.log

let currentYear = new Date().getYear() + 1900

const UserStats = ({USER = null}) => {
	const [user, setUser] = useState(USER)
	const [debug, setDebug] = useState(false)
	let navigate = useNavigate()
	const refetchUsers = useRefetchUsers()
	const [year, setYear] = useState(currentYear) // 2022

	window.user = user

	const onChange = (e) => {
		const {name, value} = e.target
		if (name === 'month') {
		} else if (name === 'year') {
			if (!Number(value)) return
			if (String(value).length > 4) return

			setYear(value)
			log(value)
		} else if (name.includes('stats')) {
			const monthIdx = name.split('.')[1] // monthIdx
			const metric = name.split('.')[2] // metric identifier e.g., weight, muscle, fats, etc.

			setUser((user) => {
				return produce(user, (draftState) => {
					// debugger
					if (!draftState.stats) {
						draftState.stats = {}
					}
					if (!draftState.stats[year]) {
						draftState.stats[year] = {}
					}
					if (!draftState.stats[year][monthIdx]) {
						draftState.stats[year][monthIdx] = {}
					}

					debugger
					draftState.stats[year][monthIdx][metric] = value
				})
				// return {...user, stats: {...user.stats, [year]: [...user?.stats[year], value]}}
			})
		} else {
			throw new Error('unhandled input type.. ~Sahil')
		}
	}

	const submit = async () => {
		let userMongo = window.userMongo
		log('submit button pressed..')
		try {
			await userMongo.functions.updateUser({id: user._id.toString(), update: user})
			alert('User updated!')
			setUser(null)
			await refetchUsers()
			navigate('/')
		} catch (error) {
			alert('Failed..')
			log(error)
		}
	}

	const cancel = () => {
		setUser(null)
		navigate('/')
		// go to home now.>// todo:
	}

	return (
		<div className='card-center'>
			<h1>User Profile</h1>

			<div className=''>
				<span className='field'>Year</span> <input className='field-input' name='year' placeholder='Enter year here..' onChange={onChange} value={year} />
				{Array(12)
					.fill(0)
					.map((zero, idx) => {
						let metric = 'weight'
						// debugger
						// let value = user?.stats?.[year]?.[idx]?.[metric]
						return (
							<div className='flex justify-between' key={'month' + idx}>
								<span className='field'>{monthName(idx)}</span> <input inputmode='numeric' className='field-input' name={`stats.${idx}.${metric}`} placeholder='Enter stats here..' onChange={onChange} value={user?.stats?.[year]?.[idx]?.[metric] || ''} />
							</div>
						)
					})}
				{/* <span className='field'></span> <input className='field-input' name='stats' placeholder='Enter stats here..' onChange={onChange} value={user?.stats || ''} /> */}
			</div>

			<div className='flex justify-end'>
				<button className='btn-primary' onClick={submit}>
					Submit
				</button>
				<button className='btn-secondary ml-3' onClick={cancel}>
					Cancel
				</button>
			</div>

			{debug ? <pre>{JSON.stringify({name: user.name, stats: user.stats}, null, 2)}</pre> : null}
			<br />
			<div className='flex justify-end'>
				<button onClick={() => setDebug(!debug)}>Debug?</button>
			</div>
		</div>
	)
}
// IDEAL BODY WEIGHT: male(50 + 2.3*(h-60)inch) and female(45.5 + 2.3*(h-60)inch)

function monthName(monthNumber) {
	// 0 = 'january', 1 = 'february'
	return new Date(2009, monthNumber, 1).toLocaleString('default', {month: 'long'})
}

export default UserStats
