var expMgrModule = angular.module('expMgrApp', ['ngMessages']);

expMgrModule.controller('expMgrCtrl', function($scope, dataSrv, amountCountSrv, expenseMgrSrv, incomeMgrSrv) {

	$scope.init = function() {
		var expCatData = dataSrv.getExpCatData();
		var incCatData = dataSrv.getIncCatData();
		var paymentModeData = dataSrv.getPaymentMode();

		$scope.mode = paymentModeData.mode;
		$scope.defaultMode = paymentModeData.defaultMode;

		$scope.exp_cat = expCatData.expCat;
		$scope.defaultExpCat = expCatData.defaultExpCat;
		$scope.expenses = dataSrv.getExpData();
		$scope.expCount = amountCountSrv.getExpCount(dataSrv.getExpData());

		$scope.inc_cat = incCatData.incCat;
		$scope.defaultIncCat = incCatData.defaultIncCat;
		$scope.income = dataSrv.getIncomeData();
		$scope.incCount = amountCountSrv.getIncCount(dataSrv.getIncomeData());

		$scope.editingData = false;
		$scope.expSuccess = false;
		$scope.incSuccess = false;
		$scope.showContent = 'expense';
	}

	$scope.closeExpForm = function() {
		$scope.showForm = false;
		$scope.xmAddExp.$setPristine();
	};

	$scope.closeIncForm = function() {
		$scope.showForm = false;
		$scope.xmAddInc.$setPristine();
	};

	function clearExpForm() {
		$scope.defaultExpCat = {id: 3, name: 'Shopping'};
		$scope.defaultMode = {id: 2, name: 'Cash'};
		$scope.expAmount = '';
		$scope.expDate = '';
		$scope.newNote = '';
		$scope.editingData = false;
	};

	function clearIncForm() {
		$scope.defaultIncCat = {id: 1, name: 'Salary'};
		$scope.defaultMode = {id: 2, name: 'cash'};
		$scope.incAmount = '';
		$scope.incDate = '';
		$scope.editingData = false;
	};

	$scope.removeExpRecord = function(idx) {
		$scope.expCount = expenseMgrSrv.removeExpRecord(idx);
	};

	$scope.removeIncRecord = function(idx) {
		$scope.incCount = incomeMgrSrv.removeIncRecord(idx);
	};

	$scope.newRecord = function() {
		$scope.editingData = false;
		$scope.showForm = true;
		$scope.xmAddExp.$setPristine();
	};

	$scope.modifyExp = function(item, idx) {
		$scope.editingData = true;
		$scope.showForm = true;
		$scope.expSuccess = false;
		$scope.currentIndex = idx;

		$scope.selectedExpCat = expenseMgrSrv.getSelectedExpCat(item);
		$scope.selectedExpPaymentMode = expenseMgrSrv.getPaymentMode(item);
		$scope.editExpAmount = item.exp_amount;
		$scope.editExpDate = item.exp_date;
		$scope.editNote = item.note;
	};

	$scope.modifyInc = function(item, idx) {
		$scope.editingData = true;
		$scope.showForm = true;
		$scope.incSuccess = false;
		$scope.currentIndex = idx;

		$scope.selectedIncCat = incomeMgrSrv.getSelectedIncCat(item);
		$scope.selectedIncMode = incomeMgrSrv.getPaymentMode(item);
		$scope.editIncAmount = item.inc_amount;
		$scope.editIncDate = item.inc_date;
	};

	$scope.addRecord = function(type) {
		if(type === 'expense') {
			if($scope.editingData) {
				var idx = $scope.currentIndex;

				$scope.expenses[idx].exp_cat = $scope.selectedExpCat.name;
				$scope.expenses[idx].exp_amount = $scope.editExpAmount;
				$scope.expenses[idx].exp_date = $scope.editExpDate;
				$scope.expenses[idx].mode = $scope.selectedExpPaymentMode.name;
				$scope.expenses[idx].note = $scope.editNote;

				$scope.editingData = false;
				$scope.expSuccess = true;
				$scope.showForm = false;
				$scope.expCount = amountCountSrv.getExpCount($scope.expenses)
			} else {

				var lastExpId = $scope.expenses[$scope.expenses.length - 1].exp_id;
				lastExpId = parseInt(lastExpId, 10) + 1;

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
		} else {
			if($scope.editingData) {
				var idx = $scope.currentIndex;

				$scope.income[idx].inc_cat = $scope.selectedIncCat.name;
				$scope.income[idx].inc_amount = $scope.editIncAmount;
				$scope.income[idx].inc_date = $scope.editIncDate;
				$scope.income[idx].mode = $scope.selectedIncMode.name;

				$scope.editingData = false;
				$scope.incSuccess = true;
				$scope.showForm = false;
				$scope.incCount = amountCountSrv.getIncCount($scope.income);
			} else {

				var incData = dataSrv.getIncomeData();
				var lastIncId = $scope.income[$scope.income.length - 1].inc_id;
				lastIncId = parseInt(lastIncId, 10) + 1;

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
		}
	};

});
