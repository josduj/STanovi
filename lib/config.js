const winston = require('winston')

function get(key, def){
	let setting = process.env[key]
	if(setting === undefined || setting === ''){ 
		if(def === undefined)
			winston.warn(`${key} varijabla nije postavljena`)
		return def
	}

	if(setting == 'true' || setting == 'false')
		return (setting == 'true')

	return setting
}

const baseUrl = 'http://www.njuskalo.hr/'
const allowedUsers = ['korisnik']

module.exports = {
	enableLogging 	: get('ENABLE_LOGGING', false),
	baseUrl 		: baseUrl,
	allowedUsers	: allowedUsers,
	gmail: {
		user		: get('GMAIL_USER'),
		clientId 	: get('GMAIL_CLIENT_ID'),
		clientSecret: get('GMAIL_CLIENT_SECRET'),
		accessToken	: get('GMAIL_ACCESS_TOKEN'),
		refreshToken: get('GMAIL_REFRESH_TOKEN')
	},
	facebook: {
		appId		: get('FACEBOOK_APP_ID'),
		appSecret	: get('FACEBOOK_APP_SECRET'),
		accessToken	: get('FACEBOOK_ACCESS_TOKEN'),
		groupId		: get('FACEBOOK_GROUP_ID')
	}
}
