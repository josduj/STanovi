function addZero (num) {
    if (num < 10)
        num = '0' + num
    return num
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

function print (text='\n') {
	process.stdout.write(text)
}

module.exports = {
	formatDate,
	print
}