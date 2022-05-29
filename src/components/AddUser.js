import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useRefetchUsers from '../hooks/useRefetchUsers'

let log = console.log

const AddUser = ({USER = null}) => {
	const [user, setUser] = useState(USER)
	const [debug, setDebug] = useState(false)
	let navigate = useNavigate()
	const refetchUsers = useRefetchUsers()

	window.user = user

	const onChange = (e) => {
		const {name, value} = e.target
		let bmi, idealWeight, heightSquared, age

		switch (name) {
			case 'weight':
				if (user?.height && value) {
					heightSquared = (user?.height / 100) ** 2
					log({heightSquared})
					bmi = (value / heightSquared).toFixed(2)
				}
				setUser((user) => {
					return {...user, [name]: value, bmi}
				})

				break

			case 'height':
				if (value && user.weight) {
					heightSquared = (value / 100) ** 2
					log({heightSquared})
					bmi = (user?.weight / heightSquared).toFixed(2)
				}
				idealWeight = idealWeightFn(value, user?.gender)

				setUser((user) => {
					return {...user, [name]: value, bmi, idealWeight}
				})

				break

			case 'gender':
				idealWeight = idealWeightFn(user?.height, value)
				setUser((user) => {
					return {...user, [name]: value, idealWeight}
				})

				break

			case 'birth':
				if (value.length === 10) {
					const [yyyy, mm, dd] = value.split('/')
					const ddmmyyyy = [dd, mm, yyyy].join('/')
					age = getAge(ddmmyyyy)
				}
				setUser((user) => {
					return {...user, [name]: value, age}
				})
				break

			default:
				setUser((user) => {
					return {...user, [name]: value}
				})

				break
		}

		// >> IDEAL WEIGHT FORMULA
		// const idealWeight = idealWeightFn(user?.height, user?.gender)
		// >> BMI FORMULA:
		// const bmi = (user?.weight / ((user?.height / 100) ** 2)).toFixed(2)
	}

	const submit = async () => {
		let userMongo = window.userMongo
		log('submit button pressed..')
		try {
			if (user._id) {
				await userMongo.functions.updateUser({id: user._id.toString(), update: user})
				alert('User updated!')
			} else {
				await userMongo.functions.createUser(user)
				alert('User Created!')
			}
			setUser(null)
			refetchUsers()
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

	const showBmi = user?.weight && user?.height

	return (
		<div className='card-center'>
			{false && (
				<>
					<span className='font-bold underline'>Sahil Stats:</span>
					<br />
					weight: 52.3kg
					<br />
					height: 180.34cms
					<br />
					<br />
				</>
			)}
			<h1>User Profile</h1>

			<div className='field-container'>
				<span className='field'>Name</span> <input className='field-input' name='name' placeholder='Enter name here..' onChange={onChange} value={user?.name || ''} />
			</div>
			<div className='field-container'>
				<span className='field'>Gender</span>
				<form className='field-input border-none' onChange={onChange}>
					<input name='gender' type='radio' value='male' onChange={() => {}} checked={user?.gender === 'male'} />
					<label htmlFor='male'>Male</label>
					<input name='gender' type='radio' value='female' onChange={() => {}} className='ml-2' checked={user?.gender === 'female'} />
					<label htmlFor='female'>Female</label>
				</form>
			</div>
			<div className='field-container'>
				<span className='field'>Birth</span> <input name='birth' className='field-input' placeholder='22/03/1983' onChange={onChange} value={user?.birth || ''} />
			</div>
			<div className='field-container'>
				<span className='field'>Age</span> {user?.age ? <span className='field-input border-none'>{user.age}</span> : <span className='text-gray-400 mr-8'>Please enter your DOB ..</span>}
			</div>
			<div className='field-container'>
				<span className='field'>Weight (kg)</span>
				<input name='weight' className='field-input' type='number' placeholder='Enter weight here..' onChange={onChange} value={user?.weight || ''} />
			</div>
			<div className='field-container'>
				<span className='field'>Height (cms)</span> <input name='height' className='field-input' type='number' placeholder='Enter height here..' onChange={onChange} value={user?.height || ''} />
			</div>
			<div className='field-container'>
				<span className='field'>BMI</span> {showBmi ? <span className='field-input border-none'>{user.bmi}</span> : <span className='text-gray-400'>Please enter height and weight first..</span>}
			</div>
			<div className='field-container'>
				<span className='field'>Ideal Weight</span> {user?.idealWeight ? <span className='field-input border-none'>{user.idealWeight}</span> : <span className='text-gray-400'>Please enter height and gender first..</span>}
			</div>
			<div className='flex justify-end'>
				<button className='btn-primary' onClick={submit}>
					Submit
				</button>
				<button className='btn-secondary ml-3' onClick={cancel}>
					Cancel
				</button>
			</div>

			{debug ? <pre>{JSON.stringify(user, null, 2)}</pre> : null}
			<br />
			<div className='font-bold text-gray-700 mt-5'>Tips </div>
			<li className='italic text-gray-500'>Conversions: 1ft = 12inch = 30.48cms</li>
			<li className='italic text-gray-500'>Ideal body weight: male = (50 + 2.3*(h-60)inch) and female = (45.5 + 2.3*(h-60)inch)</li>
			<li className='italic text-gray-500'>BMI Formula: weight(kg)/height(m), Unit: kg/m²</li>
			<li className='italic text-gray-500'>BMI ranges below 18.5 means you're in the underweight range. </li>
			<li className='italic text-gray-500'>
				Between <b>18.5 and 24.9</b> means you're in the healthy weight range.
			</li>
			<li className='italic text-gray-500'>Between 25 and 29.9 means you're in the overweight range.</li>
			<div className='flex justify-end'>
				<button onClick={() => setDebug(!debug)}>Debug?</button>
			</div>
		</div>
	)
}
// IDEAL BODY WEIGHT: male(50 + 2.3*(h-60)inch) and female(45.5 + 2.3*(h-60)inch)

export default AddUser

const idealWeightFn = (height, gender) => {
	log('inside idealWeightFn:', !height || typeof gender === 'undefined', !height, typeof gender === 'undefined')
	if (!height || typeof gender === 'undefined') return undefined

	const heightInInches = height * 0.393701
	let idealWeight
	if (gender === 'male') {
		idealWeight = 50 + 2.3 * (heightInInches - 60)
	} else {
		idealWeight = 45.5 + 2.3 * (heightInInches - 60)
	}
	return idealWeight.toFixed(2)
}

// src: https://stackoverflow.com/a/7091965/10012446
function getAge(dateString) {
	var today = new Date()
	var birthDate = new Date(dateString)
	var age = today.getFullYear() - birthDate.getFullYear()
	var m = today.getMonth() - birthDate.getMonth()
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--
	}
	return age
}
