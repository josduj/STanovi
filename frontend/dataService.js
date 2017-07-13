angular
	.module('stanovi')
	.factory('dataService', ['$http', function($http){

		return {
			search,
			getCities,
			getAreas
		}
		
		function search(filters, page = 1) {
			filters.page = page
			return $http.post('api/search', filters)
		}

		function getCities(countyId) {
			return $http.get('api/cities', { params: { locationId: countyId }})
				.then(res => res.data)
		}

		function getAreas(cityId) {
			return $http.get('api/areas', { params: { locationId: cityId }})
				.then(res => res.data)
		}

	}])