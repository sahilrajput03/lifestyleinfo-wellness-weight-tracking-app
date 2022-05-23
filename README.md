# Readme

Reference Article: https://blog.logrocket.com/using-chart-js-react

React-chartjs-2: https://react-chartjs-2.js.org/examples/line-chart/

# mongodb-realm functions

db: `newlifestyle`

collection: `users`

realmapp: `app-newlifestyle`

Functions:

```js
// mongodb driver docs: https://mongodb.github.io/node-mongodb-native/4.5/

// createUser
// TESTING: exports({name: 'sahil', lastName: 'rajput'})
exports = function (arg) {
	let collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')
	collection.insertOne(arg)
	return 'ok'
}

// getOneUser
exports = function (arg) {
	let collection = context.services.get('mongodb-atlas').db('newlifestyle').collection('users')
	return collection.findOne({_id: BSON.ObjectId('628b36217a6c0126c895f85d')})
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
