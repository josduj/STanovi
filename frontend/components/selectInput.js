angular.module('stanovi').component('selectInput', {
	bindings: {
		label: '@',
		options: '<',
		onSelect: '&'
	},
	controller: function(){
		this.$onChanges = () =>
			this.selected = undefined
	},
	template: `
		<div class="select-input">
			<select ng-model="$ctrl.selected" ng-change="$ctrl.onSelect({selected: $ctrl.selected})">
				<option value="" disabled selected hidden>{{$ctrl.label}}</option>
				<option ng-repeat="opt in $ctrl.options" value="{{opt.value}}">{{opt.name}}</option>
			</select>
		</div>
		`
})