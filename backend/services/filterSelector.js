const api		= require('./njuskaloApi')
const rl		= require('readline-sync')
const counties	= require('../counties')

function stringify (array) {
	array[0].name = 'Odaberi sve'
	return array.map(item => `${item.name} - ${item.value}`)
}

function arrayPicker (array, question = 'Unos') {
	const index = rl.keyInSelect(stringify(array), question, { cancel: false })
	return array[index].value
}

async function locationSelector () {
	let selected = arrayPicker(counties, 'Odaberi zupaniju')
	if (selected == 0)
		return selected

	const cities = await api.getCities(selected)
	let temp = arrayPicker(cities, 'Odaberi grad')
	if (temp == selected)
		return selected
	else
		selected = temp

	const areas = await api.getCities(selected)
	return arrayPicker(areas, 'Odaberi naselje')
}

async function filterSelector () {
	const query = { price : {} }
	query.locationId = await locationSelector()
	query.price.min = rl.questionInt('Min cijena (€): ')
	query.price.max = rl.questionInt('Max cijena (€): ')
	query.userOnly = rl.keyInYNStrict('Bez agencija? ')
	query.adsWithImages = rl.keyInYNStrict('Sa slikom? ')
	query.interval = rl.questionInt('Interval osvjezavanja (min): ')
	process.stdout.write('\n')	
	return query
}

module.exports = filterSelector