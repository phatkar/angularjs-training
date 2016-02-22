expMgrModule.controller('incCtrl', function($scope, $q, $http, dataSrv, amountCountSrv, expenseMgrSrv, incomeMgrSrv) {

    $scope.init = function() {

        dataSrv.getData().then(function(respData) {
            $scope.income = respData.data.income;
            $scope.incCount = amountCountSrv.getIncCount($scope.income);
            $scope.mode = respData.data.mode;
            $scope.defaultMode = respData.data.defaultMode;
            $scope.inc_cat = respData.data.incCat;
            $scope.defaultIncCat = respData.data.defaultIncCat;
        });

		$scope.editingData = false;
		$scope.showContent = 'income';
	}

    function clearIncForm() {
        $scope.defaultIncCat = {id: 1, name: 'Salary'};
        $scope.defaultMode = {id: 2, name: 'cash'};
        $scope.incAmount = '';
        $scope.incDate = '';
        $scope.editingData = false;
    };

    $scope.closeIncForm = function() {
        $scope.showForm = false;
        $scope.xmAddInc.$setPristine();
    };

    $scope.removeIncRecord = function(idx) {
        incomeMgrSrv.removeIncRecord(idx).then(function(respData) {
            $scope.incCount = respData.incCount;
            $scope.income = respData.incData.income;
        });
    };

    $scope.newIncRecord = function() {
        $scope.editingData = false;
        $scope.showForm = true;
        $scope.xmAddInc.$setPristine();
    };

    $scope.modifyInc = function(item, idx) {

        $scope.editingData = true;
        $scope.showForm = true;
        $scope.currentIndex = idx;

        incomeMgrSrv.getSelectedIncCat(item).then(function(respData) {
            $scope.selectedIncCat = respData;
        });
        incomeMgrSrv.getPaymentMode(item).then(function(respData) {
            $scope.selectedIncMode = respData;
        });

        $scope.editIncAmount = item.inc_amount;
        $scope.editIncDate = item.inc_date;
    };

    $scope.addRecord = function(type) {
        if($scope.editingData) {
            var incData;
            var idx = $scope.currentIndex;

            dataSrv.getData().then(function(respData) {

                respData.data.income[idx].inc_cat = $scope.selectedIncCat.name;
                respData.data.income[idx].inc_amount = $scope.editIncAmount;
                respData.data.income[idx].inc_date = $scope.editIncDate;
                respData.data.income[idx].mode = $scope.selectedIncMode.name;

                $http.put('https://api.myjson.com/bins/3jfpn/', respData).success(function(resp, status) {
                    incData = resp.data;
                    $scope.income = incData.income;
                    $scope.incCount = amountCountSrv.getIncCount(incData.income);
                });

            });
            $scope.editingData = false;
            $scope.showForm = false;

        } else {
            var lastIncId;
            var incData;

            dataSrv.getData().then(function(respData) {
                incData = respData.data.income;

                if(incData.length > 0) {
                    lastIncId = incData[incData.length - 1].inc_id;
                    lastIncId = parseInt(lastIncId, 10) + 1;
                } else {
                    lastIncId = 0;
                }

                var incomeToUpdate = {
                    'inc_id': lastIncId,
                    'inc_cat': $scope.defaultIncCat.name,
                    'inc_amount': $scope.incAmount,
                    'inc_date': $scope.incDate,
                    'mode': $scope.defaultMode.name
                };

                incomeMgrSrv.addNewRecord(incomeToUpdate).then(function(resp) {
                    $scope.income = resp.incData.income;
                    $scope.incCount = resp.incCount;
                });
                clearIncForm();
                $scope.xmAddInc.$setPristine();
            });
        }
    };

});
