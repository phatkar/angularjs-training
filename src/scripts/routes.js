expMgrModule.config( ['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/income', {
			templateUrl: 'views/income.html',
			controller: 'incCtrl'
		})
		.when('/expense', {
			templateUrl: 'views/expense.html',
			controller: 'expCtrl'
		})
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'expMgrCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		});
}] );
