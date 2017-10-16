const nodemailer	= require('nodemailer')
const winston		= require('winston')
const config		= require('../config')
const util			= require('../util')
const authProvider	= require('./auth-provider') 
const template		= require('./mail-template')

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: authProvider.get()
})

const recipients = util.input('Recipients (email): ', config.recipients)

function generateHtml (data) {
	let mail = template.header()
	data.forEach(item => {
		let details = `
			${item.info}
			Broj soba: ${item.brojSoba}<br>
			Cijena: ${item.price.eur}
		`
		let date = util.formatDate(item.date)
		mail += template.content(item.title, date, item.img, details, item.link)
	})
	mail += template.footer()
	return mail
}

function getTitle (length) {
	if (length == 1)
		return 'novi oglas'
	else if (1 < length && length < 5)
		return length + ' nova oglasa'
	else
		return length + ' novih oglasa'
}

function send (data) {
	transporter.sendMail({
		from: `STanovi mailer <${config.gmail.user}>`,
		to: recipients,
		subject: `STanovi - ${getTitle(data.length)}`,
		html: generateHtml(data),
	}, function(err) {
		if(err) winston.error(err)
	})
}

module.exports = {
	send
}