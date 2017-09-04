const nodemailer	= require('nodemailer')
const template		= require('./mail-template')
const config		= require('../config')
const winston		= require('winston')
const util			= require('../util')

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: Object.assign({
		type: 'OAuth2',
		expires: 1484314697598
	}, config.gmail)
})

const recipients = util.input('Email primatelja: ', config.recipients)

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