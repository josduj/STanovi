angular.module('stanovi').component('ad', {
	bindings: {
		data: '<'
	},
	template: `
		<div class="ad-container">
			<div class="image">
				<img src="{{$ctrl.data.img}}"></img>
				<div class="btn-primary">
					<span>Galerija</span>
				</div>
			</div>
			<div class="details">
				<p class="title">{{$ctrl.data.title}}</p>
				<span class="date">
					{{$ctrl.data.date | date:'dd.MM.yyyy HH:mm'}}
				</span>
				<div class="info" ng-bind-html="$ctrl.data.info"></div>
				<p>Broj soba: {{$ctrl.data.brojSoba}}</p>
				<p ng-show="$ctrl.data.provizija">Provizija: {{$ctrl.data.provizija}}</p>
				<p>Tip: {{$ctrl.data.user.type}}</p>
				<div class="bottom">
					<div class="price">
						<span>{{$ctrl.data.price.eur}}</span>
						<span>{{$ctrl.data.price.hrk}}</span>
					</div>
					<a target="_blank" href="{{$ctrl.data.link}}">
						Pogledaj na njuškalu
					</a>
				</div>
			</div>
		</div>
		`
})