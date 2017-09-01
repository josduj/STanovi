const winston	= require('winston')
const config	= require('./backend/appConfig')
const rl		= require('readline-sync') 

//logging
if (config.enableLogging) {
	winston.level = 'debug'
} else {
	winston.level = 'error'
}