import {useState} from 'react'

let log = console.log

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
		<div>
			<span className='font-bold underline'>Sahil Stats:</span>
			<br />
			weight: 52.3kg
			<br />
			height: 180.34cms
			<br />
			<br />
			<div>
				Name: <input name='name' onChange={onChange} value={user?.name} />
			</div>
			<div>
				Gender:
				<form className='inline' onChange={onChange}>
					<input name='gender' type='radio' value='male' />
					<label for='male'>Male</label>
					<input name='gender' type='radio' value='female' />
					<label for='female'>Female</label>
				</form>
			</div>
			<div>
				Age: <input name='age' onChange={onChange} value={user?.age} />
			</div>
			<div>
				Weight (kg):
				<input name='weight' onChange={onChange} value={user?.weight} />
			</div>
			<div>
				Height (cms): <input name='height' onChange={onChange} value={user?.height} />
			</div>
			<div>BMI: {showBmi ? user.bmi : <span className='italic'>Enter height and weight first..</span>}</div>
			<div>Ideal Weight: {user?.idealWeight ? user?.idealWeight : <span className='italic'>Enter height and gender first..</span>}</div>
			<br />
			<br />
			<button onClick={submit}>Submit User</button>
			<button onClick={cancel}>Cancel</button>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<i>Conversions: 1ft = 12inch = 30.48cms </i>
			<br />
			<i>Formula: weight(kg)/height(m) </i>, Unit: kg/m²
			<br />
			<i>BMI ranges below 18.5 means you're in the underweight range. Between 18.5 and 24.9 means you're in the healthy weight range. Between 25 and 29.9 means you're in the overweight range.</i>
		</div>
	) : (
		<button onClick={() => setShow(!show)}>Add user</button>
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
