require('dotenv').config()
const winston	= require('winston')
const config	= require('./backend/config')
const watcher	= require('./backend/services/watcher')
const filterSelector = require('./backend/services/filterSelector')

if (config.enableLogging) {
	winston.level = 'debug'
} else {
	winston.level = 'info'
}

async function main () { 
	const query = await filterSelector()
	query.date = new Date()
	watcher.run(query)
}

main()

