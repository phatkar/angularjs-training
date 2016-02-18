expMgrModule.controller('incCtrl', function($scope, dataSrv, amountCountSrv, expenseMgrSrv, incomeMgrSrv) {

    $scope.init = function() {
		var incCatData = dataSrv.getIncCatData();
		var paymentModeData = dataSrv.getPaymentMode();

		$scope.mode = paymentModeData.mode;
		$scope.defaultMode = paymentModeData.defaultMode;

		$scope.inc_cat = incCatData.incCat;
		$scope.defaultIncCat = incCatData.defaultIncCat;
		$scope.income = dataSrv.getIncomeData();
		$scope.incCount = amountCountSrv.getIncCount(dataSrv.getIncomeData());

		$scope.editingData = false;
		$scope.showContent = 'expense';
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
        $scope.incCount = incomeMgrSrv.removeIncRecord(idx);
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

        $scope.selectedIncCat = incomeMgrSrv.getSelectedIncCat(item);
        $scope.selectedIncMode = incomeMgrSrv.getPaymentMode(item);
        $scope.editIncAmount = item.inc_amount;
        $scope.editIncDate = item.inc_date;
    };

    $scope.addRecord = function(type) {
        if($scope.editingData) {
            var idx = $scope.currentIndex;

            $scope.income[idx].inc_cat = $scope.selectedIncCat.name;
            $scope.income[idx].inc_amount = $scope.editIncAmount;
            $scope.income[idx].inc_date = $scope.editIncDate;
            $scope.income[idx].mode = $scope.selectedIncMode.name;

            $scope.editingData = false;
            $scope.showForm = false;
            $scope.incCount = amountCountSrv.getIncCount($scope.income);
        } else {
            var lastIncId;
            var incData = dataSrv.getIncomeData();
            if($scope.income.length > 0) {
                lastIncId = $scope.income[$scope.income.length - 1].inc_id;
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

            var newRecord = incomeMgrSrv.addNewRecord(incomeToUpdate);
            newRecord.incData;
            $scope.incCount = newRecord.incCount;
            clearIncForm();
            $scope.xmAddInc.$setPristine();
        }
    };

});
