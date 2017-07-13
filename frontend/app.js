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