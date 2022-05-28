export const initData = {
	labels,
	datasets: [
		{
			label: 'Sahil',
			// 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51.3, 50.9, 51.1, 51.6, 51, 52.3, 51.1, 52.1, 51.8, 52.5, 52.5,52
			// data: [51.3, 50.9, 51.1, 51.6, 51, 52.3, 51.1, 52.1, 51.8, 52.5, 52.5, 52],
			borderColor: darkPink,
			backgroundColor: lightPink,
			// ^^ this is color for dot and the rectangular box label's inside color.
		},
		// {
		// 	label: 'Hari Om',
		// 	data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
		// 	borderColor: 'rgb(53, 162, 235)',
		// 	backgroundColor: 'rgba(53, 162, 235, 0.5)',
		// },
	],
}

// const addRandomData = () => {
// 	setData((data) => {
// 		// data.datasets[0].data.push(Math.random() * 10)

// 		function getRandomIntInclusive(min, max) {
// 			min = Math.ceil(min)
// 			max = Math.floor(max)
// 			return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
// 		}

// 		// let random_value = Math.random() * 10
// 		let random_value = getRandomIntInclusive(50, 54)

// 		log('data:', data.datasets[0].data)
// 		return {...data, datasets: [{...data.datasets[0], data: [...data.datasets[0].data, random_value]}]}
// 		// return {...data}
// 	})
// }
