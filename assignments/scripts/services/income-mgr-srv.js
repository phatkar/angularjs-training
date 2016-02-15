angular.module('expMgrApp').service('incomeMgrSrv', function(amountCountSrv, dataSrv) {

      var removeIncRecord = function(idx) {
          var incData = dataSrv.getIncomeData();
          incData.splice(idx, 1);
          return amountCountSrv.getIncCount(incData);
      };

      var getSelectedIncCat = function(item) {
          var selectedIncCat;
          var incCatList = dataSrv.getIncCatData();
          incCatList = incCatList.incCat;

          for(var i=0; i<incCatList.length; i++) {
              if(incCatList[i].name === item.inc_cat) {
                  return selectedIncCat = incCatList[i];
            	  break;
              }
          };
      };

      var getPaymentMode = function(item) {
          var paymentModeList = dataSrv.getPaymentMode();
          paymentModeList = paymentModeList.mode;
          var selectedIncPaymentMode;

          for(var i=0; i<paymentModeList.length; i++) {
              if(paymentModeList[i].name === item.mode) {
                  return selectedIncPaymentMode = paymentModeList[i];
                  break;
              }
          }
      };

      var addNewRecord = function(scope) {
          var incData = dataSrv.getIncomeData();
          var lastIncId = scope.income[scope.income.length - 1].inc_id;
          lastIncId = parseInt(lastIncId, 10) + 1;

          incData.push({
              'inc_id': lastIncId,
              'inc_cat': scope.defaultIncCat.name,
              'inc_amount': scope.incAmount,
              'inc_date': scope.incDate,
              'mode': scope.defaultMode.name
         });

         return {
             incData: incData,
             incCount: amountCountSrv.getIncCount(incData)
         }
      };

      return {
          getSelectedIncCat: getSelectedIncCat,
          getPaymentMode: getPaymentMode,
          removeIncRecord: removeIncRecord,
          addNewRecord: addNewRecord
      }

});
