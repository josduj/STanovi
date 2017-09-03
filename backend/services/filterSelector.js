const api		= require('./njuskaloApi')
const rl		= require('readline-sync')
const counties	= require('../counties')
const util		= require('../util')

function selectItems (items, question, options) {
	/* 
		extends keyInSelect method to allow more than 35 items / pagination
		https://github.com/anseki/readline-sync/issues/60#issuecomment-324533678
	*/

	if (!items || !items.length) { return -1 }

	const MAX_ITEMS = 34,
		MAX_PAGE_INDEX = Math.ceil(items.length / MAX_ITEMS) - 1

	let pageIndex = 0
	while (true) {
		const PAGE_ITEMS = []
		let indexPrev = -1, indexNext = -1
		if (pageIndex > 0) {
			PAGE_ITEMS.push(`(PREVIOUS ${MAX_ITEMS} items)`)
			indexPrev = PAGE_ITEMS.length - 1
		}
		Array.prototype.push.apply(PAGE_ITEMS,
			items.slice(pageIndex * MAX_ITEMS, (pageIndex + 1) * MAX_ITEMS))
		if (pageIndex < MAX_PAGE_INDEX) {
			PAGE_ITEMS.push(`(NEXT ${pageIndex < MAX_PAGE_INDEX - 1 ? MAX_ITEMS :
				items.length - MAX_ITEMS * (pageIndex + 1)} item(s))`)
			indexNext = PAGE_ITEMS.length - 1
		}

		// util.print('\x1B[2J')
		const index = rl.keyInSelect(PAGE_ITEMS, question, options)
		if (indexPrev !== -1 && index === indexPrev) {
			pageIndex--
		} else if (indexNext !== -1 && index === indexNext) {
			pageIndex++
		} else {
			return index === -1 ? index :
				(index + pageIndex * MAX_ITEMS - (indexPrev === -1 ? 0 : 1))
		}
	}
}

function stringify (array) {
	array[0].name = 'Odaberi sve'
	return array.map(item => `${item.name} - ${item.value}`)
}

function arrayPicker (array, question = 'Unos') {
	const index = selectItems(stringify(array), question, { cancel: false })
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
	query.adsWithImages = rl.keyInYNStrict('Samo sa slikom? ')
	query.interval = rl.questionInt('Interval osvjezavanja (min): ')
	util.print()	
	return query
}

module.exports = filterSelector