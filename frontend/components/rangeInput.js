angular.module('stanovi').component('rangeInput', {
	bindings: {
		label: '@',
		range: '='
	},
	template: `
		<div class="range-input">
			<div class="input-label" ng-bind-html="$ctrl.label"></div>
			<div class="input-box">
				<label>min</label>
				<input type="number" ng-model="$ctrl.range.min">
			</div>
			<div class="input-box">
				<label>max</label>
				<input type="number" ng-model="$ctrl.range.max">
			</div>	
		</div>
		`
})



					
