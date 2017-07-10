const winston = require('winston')

const parseSearch = $ => {
	const items = []
	$('.EntityList--Regular')
		.find('.EntityList-item--Regular, .EntityList-item--VauVau')
		.each((i, elem) => {
			let e = $(elem)
			items[i] = {
				link 	: e.attr('data-href'),
				title 	: e.find('h3').text(),
				img 	: 'http:' + e.find('img').attr('data-src'),
				info 	: e.find('.entity-description-main').html(),
				date 	: e.find('time').attr('datetime'),
				price	: {
					eur : e.find('.price--eur').text(),
					hrk : e.find('.price--hrk').text()
				}
			}
			winston.debug(items[i].title)
		})
	const total = $('.entities-count').text()

	return {
		results: items,
		total: total,
		pages: Math.ceil(total / 25)
	}
}

const toCamelCase = text =>
	text.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.split(/[:/\s]/)
		.filter(w => w)
		.map((w, i) => 
			i == 0 
				? w.toLowerCase()
				: w.charAt(0).toUpperCase() + w.slice(1)
		)
		.join('')


const parseTable = $ => {
	const details = {}
	$('.table-summary')
		.find('tr')
		.each((i, elem) => {
			let e = $(elem)
			let key 	= e.find('th').text()
			let value 	= e.find('td').text()
			winston.debug(key)
			details[toCamelCase(key)] = value
		})
	return details
}


const parseDetails = $ => {
	const url = $('.Profile-username').attr('href')
	const userType = /\/([^/]+)\//.exec(url)[1]

	winston.debug(userType)
	
	return Object.assign(parseTable($), {
		user: {
			contact: '',
			type: userType
		}
	})
}

module.exports = {
	parseSearch,
	parseDetails
}