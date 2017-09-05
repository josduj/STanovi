#!/usr/bin/env node

const argv = require('yargs')
	.usage('Usage: $0 <recipients> [options]')
	.option('location', {alias: 'l', describe: 'location id'})
	.option('interval', {alias: 'i', describe: 'refresh interval (min)'})
	.option('min', {alias: 'm', describe: 'lowest price (€)'})
	.option('max', {alias: 'M', describe: 'highest price (€)'})
	.option('u', {boolean: true, default: undefined, describe: 'only user submitted ads (no 3rd party)'})
	.option('p', {boolean: true, default: undefined, describe: 'only ads with pictures'})
	.help('h')
	.alias('h', 'help')
	.example('$ $0 foo@bar.com foo@foo.com -m 0 -M 400 -i 10 -l 1578 -u --no-p')
	.argv

const config	= require('../lib/config')
const watcher	= require('../lib/watcher')
const util		= require('../lib/util')
const api		= require('../lib/njuskalo-api')
const counties	= require('../lib/counties')
const winston	= require('winston')

if (config.enableLogging) {
	winston.level = 'debug'
} else {
	winston.level = 'info'
}

async function locationSelector (location) {
	if (location !== undefined)
		return location

	let selected = util.selectFromArray(counties, 'Select county')
	if (selected == 0)
		return selected

	const cities = await api.getCities(selected)
	let temp = util.selectFromArray(cities, 'Select city')
	if (temp == selected)
		return selected
	else
		selected = temp

	const areas = await api.getCities(selected)
	return util.selectFromArray(areas, 'Select area')
}

async function main () { 
	const interval = util.inputInt('Refresh interval (min): ', argv.interval)
	const query = { price : {} }
	query.locationId = await locationSelector(argv.location)
	query.price.min = util.inputInt('Min price (€): ', argv.min)
	query.price.max = util.inputInt('Max price (€): ', argv.max)
	query.userOnly = util.selectBoolean('Only user submitted ads? ', argv.u)
	query.adsWithImages = util.selectBoolean('Only ads with pictures? ', argv.p)
	query.date = new Date()
	util.print()

	watcher.run(query, interval)
}

main()

