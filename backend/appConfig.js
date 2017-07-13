function get(key){
	let setting = process.env[key]
	if(setting == null)
		throw new Error(`Crashing application - environment variable ${key} is missing.`)

	if(setting == 'true' || setting == 'false')
		return (setting == 'true')

	return setting
}

const baseUrl = 'http://www.njuskalo.hr/'
const allowedUsers = ['korisnik']

module.exports = {
	port 			: get('PORT'),
	enableLogging 	: get('ENABLE_LOGGING'),
	baseUrl 		: baseUrl,
	allowedUsers	: allowedUsers
}
