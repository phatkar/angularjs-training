expMgrModule.controller('repCtrl', function($scope, $q, $http, dataSrv, amountCountSrv, expenseMgrSrv, incomeMgrSrv) {

    $scope.init = function() {
        dataSrv.getData().then(function(respData) {
            $scope.expenses = respData.data.expenses;
            $scope.exp_cat = respData.data.expCat;
            $scope.defaultExpCat = respData.data.defaultExpCat;

            $scope.income = respData.data.income;
            $scope.inc_cat = respData.data.incCat;
            $scope.defaultIncCat = respData.data.defaultIncCat;
        });
	}

});
