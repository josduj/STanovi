angular.module('stanovi').component('filters', {
	bindings: {
		onSearch: '&'
	},
	template: `
		<div class="filters-container">
			<h2>Filteri</h2>
			<div class="filters">
				<location-select location="filter.locationId">
				</location-select>
				<range-input label="€" range="filter.price"></range-input>
				<range-input label="m<sup>2</sup>" range="filter.mainArea"></range-input>
				<checkbox-input
					label="Samo stanovi sa slikom"
					checked="filter.adsWithImages">
				</checkbox-input>
				<checkbox-input
					label="Samo stanovi bez agencije"
					checked="filter.userOnly">
				</checkbox-input>
			</div>
			<div class="btn-primary" ng-click="$ctrl.onSearch({filters: filter})">
				<span>Pretraži</span>
			</div>
		</div>
	`
})