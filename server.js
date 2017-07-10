require('dotenv').config()
const express 		= require('express')
const bodyParser 	= require('body-parser')
const morgan 		= require('morgan')
const winston 		= require('winston')
const config 		= require('./backend/appConfig')

const app = express()

//logging
if (config.enableLogging) {
	winston.level = 'debug'
	app.use(morgan('dev'))
} else {
	winston.level = 'error'
	app.use(morgan('common', {
		skip: () => true 
	}))
}

app.listen(config.port, () => {
	winston.info(`listening on ${ config.port }`)
})

app.use(bodyParser.json())
app.use(express.static(__dirname + '/frontend'))
app.use('/', require('./backend/routes'))

module.exports = app