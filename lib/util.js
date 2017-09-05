const rl	= require('readline-sync')
const fs	= require('fs')
const path	= require('path')

function readJSON (filepath) {
	const file = fs.readFileSync(path.join(__dirname, filepath), 'utf8')
	return JSON.parse(file)
}

function toCamelCase (text) {
	return text.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.split(/[:/\s]/)
		.filter(w => w)
		.map((w, i) => 
			i == 0 
				? w.toLowerCase()
				: w.charAt(0).toUpperCase() + w.slice(1)
		)
		.join('')
}

function print (text='\n') {
	process.stdout.write(text)
}

function addZero (num) {
	if (num < 10)
		num = '0' + num
	return num
}

function hasUndefined (obj) {
	for (key in obj)
		if (obj[key] === undefined)
			return true
	return false
}

function formatDate (d) {
	if (typeof d === 'string')
		d = new Date(d)
	let day = d.getDate()
	let month = d.getMonth()
	let year = d.getFullYear()
	let hour = addZero(d.getHours())
	let min = addZero(d.getMinutes())
	return `${day}.${month}.${year} ${hour}:${min}`
}

function stringifyItems (array) {
	array[0].name = 'Odaberi sve'
	return array.map(item => `${item.name} - ${item.value}`)
}

function selectIndex (items, question, options) {
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

function selectFromArray (array, question = 'Unos') {
	const index = selectIndex(stringifyItems(array), question, { cancel: false })
	return array[index].value
}

function selectBoolean (question, value) {
	if (value !== undefined)
		return value
	return rl.keyInYNStrict(question)
}

function input (question, value) {
	if (value !== undefined)
		return value
	return rl.question(question)
}

function inputInt (question, value) {
	if (value !== undefined)
		return value
	return rl.questionInt(question)
}

module.exports = {
	readJSON,
	toCamelCase,
	hasUndefined,
	selectFromArray,
	selectBoolean,
	input,
	inputInt,
	formatDate,
	print
}