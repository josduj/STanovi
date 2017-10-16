const config 	= require('../config')

const basicAuthConfig = {
    user: config.gmail.user,
	pass: config.gmail.password
}

const oAuthConfig = Object.assign({
	type: 'OAuth2',
	expires: 1484314697599
}, config.gmail) 

function get () {
	if(config.gmail.password)
		return basicAuthConfig 
	else 
		return oAuthConfig
}

module.exports = {
	get
}