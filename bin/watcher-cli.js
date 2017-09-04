#!/usr/bin/env node

const argv = require('yargs')
	.usage('Usage: $0 <recipients> [options]')
	.option('location', {alias: 'l', describe: 'id lokacije'})
	.option('interval', {alias: 'i', describe: 'interval osvježavanja (min)'})
	.option('min', {alias: 'm', describe: 'najniža cijena (€)'})
	.option('max', {alias: 'M', describe: 'najviša cijena (€)'})
	.boolean(['a', 's'])
	.describe('a', 'bez agencije')
	.describe('s', 'samo sa slikom')
	.help('h')
	.alias('h', 'help')
	.example('Svakih 10 minuta na navedene mailove pošalji nove oglase sa lokacijom u Splitu, cijenom od 0 do 400 eura, koji nisu preko agencije, neovisno imaju li sliku')
	.example('$ $0 foo@mail.com bar@mail.com -m 0 -M 400 -i 10 -l 1578 -a --no-s')
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

	let selected = util.selectFromArray(counties, 'Odaberi zupaniju')
	if (selected == 0)
		return selected

	const cities = await api.getCities(selected)
	let temp = util.selectFromArray(cities, 'Odaberi grad')
	if (temp == selected)
		return selected
	else
		selected = temp

	const areas = await api.getCities(selected)
	return util.selectFromArray(areas, 'Odaberi naselje')
}

async function main () { 
	const interval = util.inputInt('Interval osvjezavanja (min): ', argv.interval)
	const query = { price : {} }
	query.locationId = await locationSelector(argv.location)
	query.price.min = util.inputInt('Min cijena (€): ', argv.min)
	query.price.max = util.inputInt('Max cijena (€): ', argv.max)
	query.userOnly = util.selectBoolean('Bez agencija? ', argv.a)
	query.adsWithImages = util.selectBoolean('Samo sa slikom? ', argv.s)
	query.date = new Date()
	util.print()

	watcher.run(query, interval)
}

main()

