const express	= require('express')
const path 		= require('path')
const crawler	= require('./services/crawler')
const njuskalo	= require('./services/njuskaloApi')
const router 	= express.Router()

router.post('/api/search', (req, res) => {
	crawler.crawl(req.body)		//https://www.youtube.com/watch?v=eCiFO7qV54E
		.then(data => res.ok(data))
		.catch(err => res.error(err))
})

router.get('/api/cities', (req, res) => {
	njuskalo.getCities(req.query.locationId)
		.then(data => res.ok(data))
		.catch(err => res.error(err))
})

router.get('/api/areas', (req, res) => {
	njuskalo.getAreas(req.query.locationId)
		.then(data => res.ok(data))
		.catch(err => res.error(err))
})

router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend', 'index.html'))
})

module.exports = router