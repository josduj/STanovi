const util		= require('../util')
const winston	= require('winston')
const config	= require('../config')

let notifier
if (!util.hasUndefined(config.facebook)) {
	notifier = require('./fb-poster')
} else if (!util.hasUndefined(config.gmail)) {
	notifier = require('./mailer')
} else {
	winston.warn('FACEBOOK/GMAIL env varijable nisu postavljene. Rezultati će biti ispisani u terminalu')
	notifier = require('./printer')
}

module.exports = notifier