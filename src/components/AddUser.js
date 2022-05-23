import {useState} from 'react'

let log = console.log
const debug = false

const AddUser = () => {
	const [show, setShow] = useState(false)
	const [user, setUser] = useState(null)
	window.user = user

	const onChange = (e) => {
		const {name, value} = e.target
		let bmi, idealWeight, heightSquared

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

	const submit = () => {}

	const cancel = () => {
		setShow(!show)
	}

	const showBmi = user?.weight && user?.height

	return show ? (
		<div className='max-w-lg m-auto'>
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
			<div className='field-container'>
				<span className='field'>Name</span> <input className='field-input' name='name' placeholder='Enter name here..' onChange={onChange} value={user?.name} />
			</div>
			<div className='field-container'>
				<span className='field'>Gender</span>
				<form className='field-input border-none' onChange={onChange}>
					<input name='gender' type='radio' value='male' />
					<label htmlFor='male'>Male</label>
					<input name='gender' type='radio' value='female' className='ml-2' />
					<label htmlFor='female'>Female</label>
				</form>
			</div>
			<div className='field-container'>
				<span className='field'>Age</span> <input name='age' className='field-input' placeholder='Enter age here..' onChange={onChange} value={user?.age} />
			</div>
			<div className='field-container'>
				<span className='field'>Weight (kg)</span>
				<input name='weight' className='field-input' placeholder='Enter weight here..' onChange={onChange} value={user?.weight} />
			</div>
			<div className='field-container'>
				<span className='field'>Height (cms)</span> <input name='height' className='field-input' placeholder='Enter height here..' onChange={onChange} value={user?.height} />
			</div>
			<div className='field-container'>
				<span className='field'>BMI</span> {showBmi ? user.bmi : <span className='text-gray-400'>Please enter height and weight first..</span>}
			</div>
			<div className='field-container'>
				<span className='field'>Ideal Weight</span> {user?.idealWeight ? user?.idealWeight : <span className='text-gray-400'>Please enter height and gender first..</span>}
			</div>
			<button className='btn-primary' onClick={submit}>
				Submit
			</button>
			<button className='btn-secondary' onClick={cancel}>
				Cancel
			</button>
			{debug ? <pre>{JSON.stringify(user, null, 2)}</pre> : null}
			<br />
			<span className='font-bold text-gray-700'>Tips -</span>
			<br />
			<li className='italic text-gray-500'>Conversions: 1ft = 12inch = 30.48cms</li>
			<li className='italic text-gray-500'>Formula: weight(kg)/height(m), Unit: kg/m²</li>
			<li className='italic text-gray-500'>BMI ranges below 18.5 means you're in the underweight range. </li>
			<li className='italic text-gray-500'>
				Between <b>18.5 and 24.9</b> means you're in the healthy weight range.
			</li>
			<li className='italic text-gray-500'>Between 25 and 29.9 means you're in the overweight range.</li>
		</div>
	) : (
		<button className='btn-primary' onClick={() => setShow(!show)}>
			Add user
		</button>
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