const util		= require('../util')
const winston	= require('winston')
const config	= require('../config')

let notifier
if (!util.hasUndefined(config.facebook)) {
	winston.info('using facebook for notifications')
	notifier = require('./fb-poster')
} else if (!util.hasUndefined(config.gmail)) {
	winston.info('using gmail for notifications')
	notifier = require('./mailer')
} else {
	winston.info('results will be printed in terminal')
	notifier = require('./printer')
}

module.exports = notifier