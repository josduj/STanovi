require('dotenv').config()
const winston	= require('winston')
const config	= require('./config')
const watcher	= require('./watcher')
const util		= require('./util')
const api		= require('./njuskaloApi')
const counties	= require('./counties')
const rl		= require('readline-sync')

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
	const query = { price : {} }
	query.locationId = await locationSelector()
	query.price.min = rl.questionInt('Min cijena (€): ')
	query.price.max = rl.questionInt('Max cijena (€): ')
	query.userOnly = rl.keyInYNStrict('Bez agencija? ')
	query.adsWithImages = rl.keyInYNStrict('Samo sa slikom? ')
	query.interval = rl.questionInt('Interval osvjezavanja (min): ')
	query.date = new Date()
	util.print()

	watcher.run(query)
}

main()

