function get(key){
	let setting = process.env[key]
	if(setting == null)
		throw new Error(`Crashing application - environment variable ${key} is missing.`)

	if(setting == 'true' || setting == 'false')
		return (setting == 'true')

	return setting
}

module.exports = {
	port 			: get('PORT'),
	enableLogging 	: get('ENABLE_LOGGING')
}
