const winston	= require('winston')
const config	= require('./backend/appConfig')
const watcher	= require('./backend/services/watcher')
const filterSelector = require('./backend/services/filterSelector')

if (config.enableLogging) {
	winston.level = 'debug'
} else {
	winston.level = 'info'
}

async function main () { 
	const query = await filterSelector()
	query.date = new Date('2017-09-01T18:25:40.577Z')
	watcher.run(query)
}

main()

