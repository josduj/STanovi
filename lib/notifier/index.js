const util		= require('../util')
const winston	= require('winston')
const config	= require('../config')

let notifier
if (!util.hasUndefined(config.facebook)) {
	winston.info('koristim facebook za notifikacije')
	notifier = require('./fb-poster')
} else if (!util.hasUndefined(config.gmail)) {
	winston.info('koristim gmail za notifikacije')
	notifier = require('./mailer')
} else {
	winston.info('rezultati će biti ispisani u terminalu')
	notifier = require('./printer')
}

module.exports = notifier