require('dotenv').config()
const winston	= require('winston')
const config	= require('./config')
const watcher	= require('./watcher')
const util		= require('./util')
const api		= require('./njuskalo-api')
const counties	= require('./counties')
const rl		= require('readline-sync')
const argv		= require('yargs').argv

if (config.enableLogging) {
	winston.level = 'debug'
} else {
	winston.level = 'info'
}

async function locationSelector () {
	let selected = util.selectItem(counties, 'Odaberi zupaniju')
	if (selected == 0)
		return selected

	const cities = await api.getCities(selected)
	let temp = util.selectItem(cities, 'Odaberi grad')
	if (temp == selected)
		return selected
	else
		selected = temp

	const areas = await api.getCities(selected)
	return util.selectItem(areas, 'Odaberi naselje')
}

async function main () { 
	const recipients = argv.r || rl.question('Email primatelja: ')
	const query = { price : {} }
	query.locationId = argv.l || await locationSelector()
	query.price.min = argv.m || rl.questionInt('Min cijena (€): ')
	query.price.max = argv.M || rl.questionInt('Max cijena (€): ')
	query.userOnly = argv.a || rl.keyInYNStrict('Bez agencija? ')
	query.adsWithImages = argv.s || rl.keyInYNStrict('Samo sa slikom? ')
	query.interval = argv.i || rl.questionInt('Interval osvjezavanja (min): ')
	query.date = new Date()
	util.print()

	watcher.run(query, recipients)
}

main()

