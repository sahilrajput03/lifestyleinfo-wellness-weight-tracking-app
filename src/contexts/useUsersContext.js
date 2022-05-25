import {createContext, useContext, useState} from 'react'
// src: https://codesandbox.io/s/usecontextgenericwayeg4most-simple-builtin-usestate-j8yep?file=/src/context.js

let UsersContext

const useUsersContext = (value) => {
	const _value = useState(value)

	const valueIsNotUndefined = value !== undefined

	if (valueIsNotUndefined) {
		UsersContext = createContext(_value)
	}

	if (!UsersContext) throw Error('You must provide initial value to useUsersContext.')

	return useContext(UsersContext)
}

export default useUsersContext
