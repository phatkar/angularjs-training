var expMgrModule = angular.module('expMgrApp', ['ngMessages', 'ngRoute']);

expMgrModule.controller('expMgrCtrl', function($scope, dataSrv, amountCountSrv, expenseMgrSrv, incomeMgrSrv) {

	$scope.init = function() {
		dataSrv.getData().then(function(respData) {
			$scope.expCount = amountCountSrv.getExpCount(respData.data.expenses);
			$scope.incCount = amountCountSrv.getIncCount(respData.data.income);
			$scope.balCount = $scope.incCount - $scope.expCount;
		});
	};

});
