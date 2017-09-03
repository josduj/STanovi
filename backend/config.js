function get(key, def=null){
	let setting = process.env[key]
	
	if(setting == null)
		if(def == null)
			throw new Error(`Crashing application - environment variable ${key} is missing.`)
		else
			return def

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
	}
}
