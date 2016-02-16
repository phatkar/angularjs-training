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

      var addNewRecord = function(newIncomeData) {
         var incData = dataSrv.getIncomeData();
         incData.push(newIncomeData);

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
