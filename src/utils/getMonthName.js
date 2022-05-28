let getMonthName = (idx) => {
	// 0=january, 1=february
	const date = new Date(2022, idx, 1) // 1 _month_ _year_
	const monthName = date.toLocaleString('default', {month: 'long'})
	return monthName
}

export default getMonthName
