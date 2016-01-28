var expMgrModule = angular.module('expMgrApp', []);

expMgrModule.controller('expMgrCtrl', function($scope) {

		$scope.editingData = false;
		$scope.expSuccess = false;
		$scope.incSuccess = false;
		$scope.showContent = 'expense';

		$scope.expenses = [
				{exp_id: 1, exp_cat: 'Rent', exp_amount: '5000', exp_date: '02/01/2016', mode: 'Cash'},
				{exp_id: 2, exp_cat: 'Party', exp_amount: '2000', exp_date: '10/01/2016', mode: 'Card'},
				{exp_id: 3, exp_cat: 'Shopping', exp_amount: '900', exp_date: '03/01/2016', mode: 'Electronic Transfer'},
				{exp_id: 4, exp_cat: 'Gift', exp_amount: '500', exp_date: '12/01/2016', mode: 'Cash'}
		];

		$scope.income = [
				{inc_id: 1, inc_cat: 'Salary', inc_amount: '30000', inc_date: '01/01/2016', mode: 'Electronic Transfer'},
				{inc_id: 2, inc_cat: 'Interest on deposit', inc_amount: '1500', inc_date: '04/01/2016', mode: 'Electronic Transfer'}
		];

		$scope.expCat = [
				{id: 1, name: 'Rent'},
				{id: 2, name: 'Party'},
				{id: 3, name: 'Shopping'},
				{id: 4, name: 'Gift'},
				{id: 5, name: 'Emi'}
		];
		$scope.defaultExpCat = {id: 3, name: 'Shopping'};

		$scope.incCat = [
				{id: 1, name: 'Salary'},
				{id: 2, name: 'Interest on deposit'}
		];
		$scope.defaultIncCat = {id: 1, name: 'Salary'};

		$scope.mode = [
				{id: 1, name: 'Card'},
				{id: 2, name: 'Cash'},
				{id: 3, name: 'Electronic Transfer'},
				{id: 4, name: 'Cheque'}
		];
		$scope.defaultMode = {id: 2, name: 'Cash'};

		function getExpCount() {
				$scope.expCount = 0;
				angular.forEach($scope.expenses, function(item) {
						$scope.expCount = $scope.expCount + parseInt(item.exp_amount, 10);
				});
		};
		getExpCount();

		function getIncCount() {
				$scope.incCount = 0;
				angular.forEach($scope.income, function(item) {
						$scope.incCount = $scope.incCount + parseInt(item.inc_amount, 10);
				});
		};
		getIncCount();

		function clearCommonRecords() {
				$scope.expAmount = '';
				$scope.expDate = '';
				$scope.editingData = false;
		}

		function clearExpForm() {
				$scope.defaultExpCat = {id: 3, name: 'Shopping'};
				$scope.defaultMode = {id: 2, name: 'Cash'};
				clearCommonRecords();
		};

		function clearIncForm() {
				$scope.defaultIncCat = {id: 1, name: 'Salary'};
				$scope.defaultMode = {id: 2, name: 'cash'};
				clearCommonRecords();
		};

		$scope.removeExpRecord = function(idx) {
		 		$scope.expenses.splice(idx, 1);
				getExpCount();
		};

		$scope.removeIncRecord = function(idx) {
				$scope.income.splice(idx, 1);
				getIncCount();
		};

		$scope.modifyExp = function(item, idx) {
				$scope.editingData = true;
				$scope.showForm = true;
				$scope.currentIndex = idx;

				for(i=0; i<$scope.expCat.length; i++) {
						if($scope.expCat[i].name === item.exp_cat) {
								$scope.selectedExpCat = $scope.expCat[i];
								break;
						}
				};
				for(i=0; i<$scope.mode.length; i++) {
						if($scope.mode[i].name === item.mode) {
								$scope.selectedExpMode = $scope.mode[i];
								break;
						}
				};
				$scope.editExpAmount = item.exp_amount;
				$scope.editExpDate = item.exp_date;
		};

		$scope.modifyInc = function(item, idx) {
				$scope.editingData = true;
				$scope.showForm = true;
				$scope.currentIndex = idx;

				for(i=0; i<$scope.incCat.length; i++) {
						if($scope.incCat[i].name === item.inc_cat) {
								$scope.selectedIncCat = $scope.incCat[i];
								break;
						}
				};
				for(i=0; i<$scope.mode.length; i++) {
						if($scope.mode[i].name === item.mode) {
								$scope.selectedIncMode = $scope.mode[i];
								break;
						}
				};
				$scope.editIncAmount = item.inc_amount;
				$scope.editIncDate = item.inc_date;
		};

		$scope.addNewRecord = function(type) {
				if(type === 'expense') {
						if($scope.editingData) {
								var idx = $scope.currentIndex;

								$scope.expenses[idx].exp_cat = $scope.selectedExpCat.name;
								$scope.expenses[idx].exp_amount = $scope.editExpAmount;
								$scope.expenses[idx].exp_date = $scope.editExpDate;
								$scope.expenses[idx].mode = $scope.selectedExpMode.name;
								$scope.editingData = false;
								$scope.expSuccess = true;
								$scope.showForm = false;
								getExpCount();
						} else {
								var lastExpId = $scope.expenses[$scope.expenses.length - 1].exp_id;
								lastExpId = parseInt(lastExpId, 10) + 1;

								$scope.expenses.push({
										'exp_id': lastExpId,
										'exp_cat': $scope.defaultExpCat.name,
										'exp_amount': $scope.expAmount,
										'exp_date': $scope.expDate,
										'mode': $scope.defaultMode.name
								});
								getExpCount();
								clearExpForm();
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
								getIncCount();
						} else {
								var lastIncId = $scope.income[$scope.income.length - 1].inc_id;
								lastIncId = parseInt(lastIncId, 10) + 1;
								$scope.income.push({
										'inc_id': lastIncId,
										'inc_cat': $scope.defaultIncCat.name,
										'inc_amount': $scope.incAmount,
										'inc_date': $scope.incDate,
										'mode': $scope.defaultMode.name
								});
								getIncCount();
								clearIncForm();
						}
				}
		};

});
