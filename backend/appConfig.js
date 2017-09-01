function get(key, def){
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
	allowedUsers	: allowedUsers
}
