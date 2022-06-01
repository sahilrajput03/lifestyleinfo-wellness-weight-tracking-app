# Readme

Reference Article: https://blog.logrocket.com/using-chart-js-react

React-chartjs-2: https://react-chartjs-2.js.org/examples/line-chart/

Chart.js - [Click here](https://www.chartjs.org/docs/latest/)

Mongodb web-sdk: https://www.mongodb.com/docs/realm/web/#std-label-web-intro

Mongodb driver docs: https://mongodb.github.io/node-mongodb-native/4.5/

React router dom v6: https://reactrouter.com/docs/en/v6/getting-started/tutorial#nested-routes

- realm-web docs: https://www.mongodb.com/docs/realm/web/quickstart/

- inspiration: https://youtu.be/Evp3xTzWCu4?list=PL4RCxklHWZ9v2lcat4oEVGQhZg6r4IQGV

- React Icons: https://react-icons.github.io/react-icons/

# mongodb-realm functions

db: `newlifestyle`

collection: `users`

realmapp: `app-newlifestyle`

Functions:

```js
// createUser
// TESTING: exports({name: 'sahil', lastName: 'rajput'})
exports = function (arg) {
	let collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')
	collection.insertOne(arg)
	return 'ok'
}

// deleteUser

// getOneUser
exports = function (arg) {
	let collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')
	return collection.findOne({_id: BSON.ObjectId('628b36217a6c0126c895f85d')})
}

// deleteUser
// Usage: exports('6292bc817033163290c29db7')
exports = async function (arg) {
	var collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')
	let result = await collection.deleteOne({_id: BSON.ObjectId(arg)})
	return 'ok'
}

// getAllUsers
exports = function (arg) {
	let collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')

	return collection.find({})
}

// updateUser
// TESTING: exports({id: "628b36217a6c0126c895f85d", update: {name: 'sahil', lastName: 'rajput'}})
exports = async function (arg) {
	let collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')
	const updateResult = await collection.updateOne({_id: BSON.ObjectId(arg.id)}, {$set: arg.update})
	// console.log('user is:', updateResult)
	return updateResult
}

// dropUsers
exports = function (arg) {
	let collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')
	// console.log(Object.keys(collection)) // output: ,insertMany,find,deleteOne,initializeUnorderedBulkOp,findOne,initializeOrderedBulkOp,insertOne,findOneAndUpdate,findOneAndDelete,replaceOne,updateMany,aggregate,distinct,count,updateOne,findOneAndReplace,deleteMany
	collection.deleteMany({})
	return 'ok'
}
```

## Trigger pwa on instantly causes error

Solution: https://stackoverflow.com/questions/58729197/the-prompt-method-must-be-called-with-a-user-gesture-error-in-angular-pwa

tldr: you need to call the prompt() using some user's action like button click.
