angular.module('expMgrApp').service('expenseMgrSrv', function(amountCountSrv, dataSrv, $q, $http) {

      var removeExpRecord = function(idx) {
          var deferred = $q.defer();

          dataSrv.getData().then(function(respData) {
              respData.data.expenses.splice(idx, 1);
              $http.put('https://api.myjson.com/bins/3jfpn/', respData).success(function(resp, status) {
                  expData = resp.data;
                  deferred.resolve({
                      expData: expData,
                      expCount: amountCountSrv.getExpCount(expData.expenses)
                  });
              });
          });

          return deferred.promise;
      };

      var getSelectedExpCat = function(item) {
          var selectedCat;
          var expCatList;
          var deferred = $q.defer();

          dataSrv.getData().then(function(respData) {
              expCatList = respData.data.expCat;

              for(var i=0; i<expCatList.length; i++) {
                  if(expCatList[i].name === item.exp_cat) {
                      selectedExpCat = expCatList[i];
                      deferred.resolve(selectedExpCat);
                  }
              }
          });
          return deferred.promise;
      };

      var getPaymentMode = function(item) {
          var paymentModeList;
          var selectedExpPaymentMode;
          var deferred = $q.defer();

          dataSrv.getData().then(function(respData) {
              paymentModeList = respData.data.mode;

              for(var i=0; i<paymentModeList.length; i++) {
                  if(paymentModeList[i].name === item.mode) {
                      selectedExpPaymentMode = paymentModeList[i];
                      deferred.resolve(selectedExpPaymentMode);
                  }
              }
          });
          return deferred.promise;

      };

      var addNewRecord = function(newExpData) {
          var deferred = $q.defer();
          var expData;
          var expCount;

          dataSrv.getData().then(function(respData) {
               respData.data.expenses.push(newExpData);

               $http.put('https://api.myjson.com/bins/3jfpn', respData).success(function(resp, status) {
                   expData = resp.data;
                   deferred.resolve({
                       expData: expData,
                       expCount: amountCountSrv.getExpCount(expData.expenses)
                   });
               });
          });
          return deferred.promise;
      };

      return {
          getSelectedExpCat: getSelectedExpCat,
          getPaymentMode: getPaymentMode,
          removeExpRecord: removeExpRecord,
          addNewRecord: addNewRecord
      }

});
