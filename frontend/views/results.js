angular.module('stanovi').component('results', {
	bindings: {
		filters: '='
	},
	template: `
		<div class="results-container">
			<div class="results">
				<ad ng-repeat="item in $ctrl.data.results" data="item"
					in-view="$index + 1 == $ctrl.data.results.length
						&& $ctrl.page <= $ctrl.data.pages
						&& $ctrl.getResults()">
				</ad>
			</div>
			<loader active="$ctrl.loading > 0" status="$ctrl.status"></loader>
		</div>
	`,
	controller: ['dataService', function(dataService) {
		
		this.loading = 0
		this.page = 1
		this.hidden = 0

		this.getResults = () => {
			this.loading ++
			dataService.search(this.filters, this.page)
				.then((res) => {
					this.hidden += res.data.hidden
					if(this.hidden)
						this.status = this.hidden + ' oglasa skriveno'
					
					if(!this.data)
						this.data = res.data
					else
						this.data.results.push(...res.data.results)
					
					if(res.data.results.length == 0)
						this.getResults()

					if(this.page == this.data.pages)
						this.status = 'Nema više oglasa'
				})
				.catch((err) => {
					this.status = err.data
				})
				.finally(() => {
					this.page ++
					this.loading --
				})
		}

		this.getResults()

	}]
})