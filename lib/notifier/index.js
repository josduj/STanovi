const notifierProvider 	= require('./notifier-provider') 

let notifier = notifierProvider.resolve()

module.exports = notifier