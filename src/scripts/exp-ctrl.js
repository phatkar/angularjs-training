expMgrModule.controller('expCtrl', function($scope, $q, $http, dataSrv, amountCountSrv, expenseMgrSrv, incomeMgrSrv) {

    $scope.init = function() {
        $scope.editingData = false;
        $scope.showContent = 'expense';
        $scope.newNote = '';

        dataSrv.getData().then(function(respData) {
            $scope.expenses = respData.data.expenses;
            $scope.expCount = amountCountSrv.getExpCount($scope.expenses);
            $scope.exp_cat = respData.data.expCat;
            $scope.defaultExpCat = respData.data.defaultExpCat;
            $scope.mode = respData.data.mode;
            $scope.defaultMode = respData.data.defaultMode;
        });
    };

    function clearExpForm() {
		$scope.defaultExpCat = {exp_cat: 'Shopping'};
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
        expenseMgrSrv.removeExpRecord(idx).then(function(respData) {
            $scope.expCount = respData.expCount;
            $scope.expenses = respData.expData.expenses;
        });
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

        expenseMgrSrv.getSelectedExpCat(item).then(function(respData) {
            $scope.selectedExpCat = respData;
        });
        expenseMgrSrv.getPaymentMode(item).then(function(respData) {
            $scope.selectedExpPaymentMode = respData;
        });
        $scope.editExpAmount = item.exp_amount;
        $scope.editExpDate = item.exp_date;
        $scope.editNote = item.note;
    };

    $scope.addRecord = function() {
        if($scope.editingData) {
            var expData;
            var idx = $scope.currentIndex;

            dataSrv.getData().then(function(respData) {

                respData.data.expenses[idx].exp_cat = $scope.selectedExpCat.exp_cat;
                respData.data.expenses[idx].exp_amount = $scope.editExpAmount;
                respData.data.expenses[idx].exp_date = $scope.editExpDate;
                respData.data.expenses[idx].mode = $scope.selectedExpPaymentMode.name;
                respData.data.expenses[idx].note = $scope.editNote;

                $http.put('https://api.myjson.com/bins/3q8dz', respData).success(function(resp, status) {
                    expData = resp.data;
                    $scope.expenses = expData.expenses;
                    $scope.expCount = amountCountSrv.getExpCount(expData.expenses);
                });

            });

            $scope.editingData = false;
            $scope.showForm = false;
        } else {
            var lastExpId;
            var expData;

            dataSrv.getData().then(function(respData) {
                expData = respData.data.expenses;

                if(expData.length > 0) {
                    lastExpId = expData[expData.length - 1].exp_id;
                    lastExpId = parseInt(lastExpId, 10) + 1;
                } else {
                    lastExpId = 0;
                }

                var expenseToUpdate = {
                    'exp_id': lastExpId,
                    'exp_cat': $scope.defaultExpCat.exp_cat,
                    'exp_amount': $scope.expAmount,
                    'exp_date': $scope.expDate,
                    'mode': $scope.defaultMode.name,
                    'note': $scope.newNote
                };

                expenseMgrSrv.addNewRecord(expenseToUpdate).then(function(resp) {
                    $scope.expenses = resp.expData.expenses;
                    $scope.expCount = resp.expCount;
                });
                clearExpForm();
                $scope.xmAddExp.$setPristine();
            });
        }
    };

});
