const request 	= require('request-promise')
const cheerio 	= require('cheerio')
const async 	= require('async')
const qs  		= require('qs')
const winston 	= require('winston')
const scraper 	= require('./scraper')
const config	= require('./config')
const util		= require('./util')

const getHtml = url => 
	request.get({
		uri: url,
		transform: body => 
			cheerio.load(body)
	})

const getDetails = data =>
	new Promise((resolve, reject) => {
		async.each(data.results, (item, cb) => {
			item.link = config.baseUrl + item.link
			getHtml(item.link)
				.then($ => {
					Object.assign(item, scraper.parseDetails($))
					cb()
				})
				.catch(err => cb(err))
		}, err => {
			if (err) reject(err)
			else resolve(data)
		})
	})

const filterBlacklisted = (data) => {
	let blacklist = util.readJSON('../blacklist.json')
	let total = data.results.length
	data.results = data.results.filter((item) =>
		!Object.keys(blacklist).some((key) =>
			blacklist[key].includes(item[key])
		)
	)
	data.hidden = total - data.results.length
	winston.debug('[crawler] filtered by blacklist: ' + data.hidden)
	return data
}

const filterByUser = (data) => {
	let total = data.results.length
	data.results = data.results.filter((item) =>
		config.allowedUsers.includes(item.user.type)
	)
	data.hidden += total - data.results.length
	return data
}

const get = params => {
	params.adsWithImages = params.adsWithImages ? 1 : 0
	const url = config.baseUrl + '/iznajmljivanje-stanova?' + qs.stringify(params)
	
	winston.debug(params, url)

	return getHtml(url)
		.then($ => scraper.parseSearch($))
		.then(data => getDetails(data))
		.then(data => filterBlacklisted(data))
		.then(data => params.userOnly ? filterByUser(data) : data)
}

module.exports = {
	get
}
