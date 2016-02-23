expMgrModule.config( ['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/income', {
			templateUrl: 'src/views/income.html',
			controller: 'incCtrl'
		})
		.when('/expense', {
			templateUrl: 'src/views/expense.html',
			controller: 'expCtrl'
		})
		.when('/home', {
			templateUrl: 'src/views/home.html',
			controller: 'expMgrCtrl'
		})
		.when('/report', {
			templateUrl: 'src/views/report.html',
			controller: 'repCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		});
}] );
