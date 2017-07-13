const request 	= require('request-promise')
const config 	= require('../appConfig')

const baseParams = {
	ctl: 'category_selector',
	action: 'getCategorySelector',
	dataProvider: '0x4kdCategoryDataProvider',
	maxLevel: 2,
	elementName: 'locationId',
	'optionalArguments[categoryType]': 3
}

function get(params) {
	return request.get({
		uri: config.baseUrl,
		qs: Object.assign({}, baseParams, params),
		json: true,
		transform: data =>
			data.options.map(opt => ({
				value: opt.id || params.categoryId,
				name: opt.label
			}))
	})
}

function getCities(countyId) {
	return get({
		categoryId: countyId,
		level: 0,
		minLevel: 1
	})
}

function getAreas(cityId) {
	return get({
		categoryId: cityId,
		level: 1,
		minLevel: 2
	})
}

module.exports = {
	getCities,
	getAreas
}



		