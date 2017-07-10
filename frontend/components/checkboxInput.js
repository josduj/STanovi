angular.module('stanovi').component('checkboxInput', {
	bindings: {
		label: '@',
		checked: '='
	},
	template: `
		<div class="checkbox-input">
			<div class="checkbox"
				ng-class="{checked: $ctrl.checked}"
				ng-click="$ctrl.checked = !$ctrl.checked">
				<div class="checkmark"></div>
			</div>
			<span>{{$ctrl.label}}</span>
		</div>
		`
})