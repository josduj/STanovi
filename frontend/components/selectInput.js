angular.module('stanovi').component('selectInput', {
	bindings: {
		label: '@',
		options: '=',
		selected: '='
	},
	template: `
		<div class="select-input">
			<select ng-model="$ctrl.selected">
				<option value="" disabled selected hidden>{{$ctrl.label}}</option>
				<option ng-repeat="opt in $ctrl.options" value="{{opt.value}}">{{opt.name}}</option>
			</select>
		</div>
		`
})