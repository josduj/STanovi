const winston	= require('winston')
const crawler	= require('./crawler')
const notifier	= require('./notifier')

function formatDate (d) {
	return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
}

async function task (query) {
	let page = 0
	const results = []

	task:
	while (true) {
		page++
		winston.debug('[watcher] page ' + page)
		const data = await crawler.get(Object.assign({}, query, { page }))
		
		for (item of data.results) {
			if (new Date(item.date).getTime() > query.date.getTime())
				results.push(item)
			else
				break task
		}

		if (page >= data.pages)
			break task
	}

	if (results.length > 0) {
		winston.info(`[${formatDate(query.date)}] ${results.length} results found`)
		query.date = new Date(results[0].date)
		notifier(results)
	} else {
		winston.info(`[${formatDate(query.date)}] no results`)
	}
}

function run (query) {
	setInterval(task, query.interval * 60000, query)
}

module.exports = {
	run
}