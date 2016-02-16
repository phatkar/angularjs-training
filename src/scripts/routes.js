expMgrModule.config( ['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/income', {
			templateUrl: 'views/income.html',
			controller: 'expMgrCtrl'
		})
		.when('/expense', {
			templateUrl: 'views/expense.html',
			controller: 'expMgrCtrl'
		})
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'expMgrCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		});
}] );
