expMgrModule.controller('expCtrl', function($scope, dataSrv, amountCountSrv, expenseMgrSrv, incomeMgrSrv) {

    $scope.init = function() {
        var expCatData = dataSrv.getExpCatData();
        var paymentModeData = dataSrv.getPaymentMode();

        $scope.mode = paymentModeData.mode;
        $scope.defaultMode = paymentModeData.defaultMode;

        $scope.exp_cat = expCatData.expCat;
        $scope.defaultExpCat = expCatData.defaultExpCat;
        $scope.expenses = dataSrv.getExpData();
        $scope.expCount = amountCountSrv.getExpCount(dataSrv.getExpData());

        $scope.editingData = false;
        $scope.showContent = 'expense';
    }

    function clearExpForm() {
		$scope.defaultExpCat = {id: 3, name: 'Shopping'};
		$scope.defaultMode = {id: 2, name: 'Cash'};
		$scope.expAmount = '';
		$scope.expDate = '';
		$scope.newNote = '';
		$scope.editingData = false;
	};

    $scope.closeExpForm = function() {
        $scope.showForm = false;
        $scope.xmAddExp.$setPristine();
    };

    $scope.removeExpRecord = function(idx) {
        $scope.expCount = expenseMgrSrv.removeExpRecord(idx);
    };

    $scope.newExpRecord = function() {
        $scope.editingData = false;
        $scope.showForm = true;
        $scope.xmAddExp.$setPristine();
    };

    $scope.modifyExp = function(item, idx) {
        $scope.editingData = true;
        $scope.showForm = true;
        $scope.currentIndex = idx;

        $scope.selectedExpCat = expenseMgrSrv.getSelectedExpCat(item);
        $scope.selectedExpPaymentMode = expenseMgrSrv.getPaymentMode(item);
        $scope.editExpAmount = item.exp_amount;
        $scope.editExpDate = item.exp_date;
        $scope.editNote = item.note;
    };

    $scope.addRecord = function() {
        if($scope.editingData) {
            var idx = $scope.currentIndex;

            $scope.expenses[idx].exp_cat = $scope.selectedExpCat.name;
            $scope.expenses[idx].exp_amount = $scope.editExpAmount;
            $scope.expenses[idx].exp_date = $scope.editExpDate;
            $scope.expenses[idx].mode = $scope.selectedExpPaymentMode.name;
            $scope.expenses[idx].note = $scope.editNote;

            $scope.editingData = false;
            $scope.showForm = false;
            $scope.expCount = amountCountSrv.getExpCount($scope.expenses)
        } else {
            var lastExpId;
            if($scope.expenses.length > 0) {
                lastExpId = $scope.expenses[$scope.expenses.length - 1].exp_id;
                lastExpId = parseInt(lastExpId, 10) + 1;
            } else {
                lastExpId = 0;
            }

            var expenseToUpdate = {
                'exp_id': lastExpId,
                'exp_cat': $scope.defaultExpCat.name,
                'exp_amount': $scope.expAmount,
                'exp_date': $scope.expDate,
                'mode': $scope.defaultMode.name,
                'note': $scope.newNote
            };

            var newRecord = expenseMgrSrv.addNewRecord(expenseToUpdate);
            newRecord.expData;
            $scope.expCount = newRecord.expCount;
            clearExpForm();
            $scope.xmAddExp.$setPristine();
        }
    };

});
