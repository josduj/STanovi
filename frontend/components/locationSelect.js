angular.module('stanovi').component('locationSelect', {
	bindings: {
		location: '=' 
	},
	controller: ['dataService', 'counties', function(dataService, counties){
		
		this.counties = counties

		this.onCountySelect = (selected) => {
			this.location = selected
			this.areas = []
			dataService.getCities(selected).then(data => {
				this.cities = data
			})
		}

		this.onCitySelect = (selected) => {
			this.location = selected
			dataService.getAreas(selected).then(data => {
				this.areas = data
			})
		}

		this.onAreaSelect = (selected) => {
			this.location = selected
		}


	}],
	template: `
		<div class="location-select">
			<select-input label="Odaberi zupaniju"
				options="$ctrl.counties"
				on-select="$ctrl.onCountySelect(selected)">	
			</select-input>
			<select-input label="Odaberi grad"
				options="$ctrl.cities"
				on-select="$ctrl.onCitySelect(selected)">	
			</select-input>
			<select-input label="Odaberi naselje"
				options="$ctrl.areas"
				on-select="$ctrl.onAreaSelect(selected)">	
			</select-input>
		</div>
		`
})