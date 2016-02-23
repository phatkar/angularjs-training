angular.module('expMgrApp').service('incomeMgrSrv', function($http, $q, amountCountSrv, dataSrv) {

      var removeIncRecord = function(idx) {
          var incData;
          var incCount;
          var deferred = $q.defer();

          dataSrv.getData().then(function(respData) {
              respData.data.income.splice(idx, 1);
              $http.put('https://api.myjson.com/bins/3q8dz', respData).success(function(resp, status) {
                  incData = resp.data;
                  deferred.resolve({
                      incData: incData,
                      incCount: amountCountSrv.getIncCount(incData.income)
                  });
              });
          });

          return deferred.promise;
      };

      var getSelectedIncCat = function(item) {
          var selectedIncCat;
          var incCatList;
          var deferred = $q.defer();

          dataSrv.getData().then(function(respData) {
              incCatList = respData.data.incCat;

              for(var i=0; i<incCatList.length; i++) {
                  if(incCatList[i].inc_cat === item.inc_cat) {
                      selectedIncCat = incCatList[i];
                      deferred.resolve(selectedIncCat);
                  }
              }
          });
          return deferred.promise;

      };

      var getPaymentMode = function(item) {
          var paymentModeList;
          var selectedIncPaymentMode;
          var deferred = $q.defer();

          dataSrv.getData().then(function(respData) {
              paymentModeList = respData.data.mode;

              for(var i=0; i<paymentModeList.length; i++) {
                  if(paymentModeList[i].name === item.mode) {
                      selectedIncPaymentMode = paymentModeList[i];
                      deferred.resolve(selectedIncPaymentMode);
                  }
              }
          });
          return deferred.promise;

      };

      var addNewRecord = function(newIncomeData) {
          var incData;
          var incCount;
          var deferred = $q.defer();

          dataSrv.getData().then(function(respData) {
               respData.data.income.push(newIncomeData);

               $http.put('https://api.myjson.com/bins/3q8dz', respData).success(function(resp, status) {
                   incData = resp.data;
                   deferred.resolve({
                       incData: incData,
                       incCount: amountCountSrv.getIncCount(incData.income)
                   });
               });
          });
          return deferred.promise;
      };

      return {
          getSelectedIncCat: getSelectedIncCat,
          getPaymentMode: getPaymentMode,
          removeIncRecord: removeIncRecord,
          addNewRecord: addNewRecord
      }

});
