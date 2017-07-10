angular.module('stanovi').component('loader', {
	bindings: {
		active: '<',
		status: '<'
	},
	template: `
		<div class="loader">
			<h2 ng-show="$ctrl.active"> { </h2>
			<h2>{{$ctrl.status}}</h2>
			<h2 ng-show="$ctrl.active"> } </h2>
		</div>
		`
})