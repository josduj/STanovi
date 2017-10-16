const config 	= require('../config')
const winston 	= require('winston')
const util		= require('../util')

function isGmailSet () {
	if(!config.gmail.user) { 
		winston.warn("If you want to use Gmail as notifier, please provide the needed credentials in .ENV file.")
		return false
	}

	if(!config.gmail.password && util.hasUndefined(config.gmail)) {
		winston.warn("If you want to use Gmail as notifier, you need to specify either a password or OAuth settings in .ENV file.")
		return false
	}

	return true
}

function isFacebookSet () {
	if(util.hasUndefined(config.facebook)) { 
		winston.warn("If you want to use Facebook as notifier, please provide the needed credentials in .ENV file.")
		return false
	}

	return true
}

function resolve () {
	if (isFacebookSet()) {
		winston.info('using facebook for notifications')
		return require('./fb-poster')
	} else if (isGmailSet()) {
		winston.info('using gmail for notifications')
		return require('./mailer')
	} else {
		winston.info('results will be printed in terminal')
		return require('./printer')
	}
}


module.exports = {
	resolve
}