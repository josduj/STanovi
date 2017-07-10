angular.module('stanovi').component('landing', {
	bindings: {
		onClick: '&'
	},
	template: `
		<div class="landing-container">
			<h1>STanovi</h1>
			<div class="btn-primary" ng-click="$ctrl.onClick()">
				<span>Pretraži</span>
			</div>
		</div>
	`
})