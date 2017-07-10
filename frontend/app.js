const dependencies = [
	'ngAnimate',
	'angular-inview',
	'ngSanitize'
]

angular
	.module('stanovi', dependencies)
	.controller('mainCtrl', function() {
		this.onSearch = (filters = {}) => {
			this.showResults = true
			this.filters = filters
		}
	})
	.service('httpService', ['$http', function($http){
		this.search = (filters, page = 1) => {
			filters.page = page
			return $http.post('api/search', filters)
		}
	}])