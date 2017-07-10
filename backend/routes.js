const express	= require('express')
const path 		= require('path')
const crawler	= require('./services/crawler')
const router 	= express.Router()

router.post('/api/search', (req, res) => {
	crawler.crawl(req.body)		//https://www.youtube.com/watch?v=eCiFO7qV54E
		.then(data => res.status(200).json(data))
		.catch(err => res.status(400).json(err))
})

router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend', 'index.html'))
})

module.exports = router