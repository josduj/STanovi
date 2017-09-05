const util		= require('../util')

function printItem (item) {
	util.print(`
	${item.title}
	Rooms: ${item.brojSoba}
	Price: ${item.price.eur}
	Link: ${item.link}
	`)
}

function send (data) {
	data.forEach(item => printItem(item))
	util.print()
}


module.exports = {
	send
}