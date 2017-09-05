const winston	= require('winston')
const config	= require('../config').facebook
const FB		= require('fb')

FB.options({
	appId: config.appId,
	appSecret: config.appSecret
})

function sendSingle (text, link){
	FB.api(`/${config.groupId}/feed`, 'POST', {
		access_token: config.accessToken,
		message: text,
		link: link
	}).then( res => {
		if (!res || res.error)
			winston.error(!res ? 'Error occurred' : res.error)
	})
}

function send (data) {
	data.forEach(item => {
		let text = `
			${item.title}\n
			Rooms: ${item.brojSoba}\n
			Price: ${item.price.eur}
			`
		sendSingle(text, item.link)
	})
}

module.exports = {
	send
}