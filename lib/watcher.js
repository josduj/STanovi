const winston	= require('winston')
const crawler	= require('./crawler')
const notifier	= require('./notifier/mailer')
const util		= require('./util')

async function task (query, recipients) {
	try {
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

		const timestamp = util.formatDate(query.date)
		if (results.length > 0) {
			winston.info(`[${timestamp}] pronađeno ${results.length} rezultata`)
			query.date = new Date(results[0].date)
			notifier.send(results, recipients)
		} else {
			winston.info(`[${timestamp}] nema rezultata`)
		}
	}
	catch (e) {
		winston.error(e)
	}
}

function run (query, recipients) {
	winston.info('tražim...')
	setInterval(task, query.interval * 60000, query, recipients)
}

module.exports = {
	run
}