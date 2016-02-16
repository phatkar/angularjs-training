angular.module('expMgrApp').service('expenseMgrSrv', function(amountCountSrv, dataSrv) {

      var removeExpRecord = function(idx) {
          var expData = dataSrv.getExpData();
          expData.splice(idx, 1);
          return amountCountSrv.getExpCount(expData);
      };

      var getSelectedExpCat = function(item) {
          var selectedCat;
          var expCatList = dataSrv.getExpCatData();
          expCatList = expCatList.expCat;

          for(var i=0; i<expCatList.length; i++) {
              if(expCatList[i].name === item.exp_cat) {
                  return selectedExpCat = expCatList[i];
                  break;
              }
          };
      };

      var getPaymentMode = function(item) {
          var paymentModeList = dataSrv.getPaymentMode();
          paymentModeList = paymentModeList.mode;
          var selectedExpPaymentMode;

          for(var i=0; i<paymentModeList.length; i++) {
              if(paymentModeList[i].name === item.mode) {
                  return selectedExpPaymentMode = paymentModeList[i];
                  break;
              }
          }
      };

      var addNewRecord = function(newExpData) {
          var expData = dataSrv.getExpData();
          expData.push(newExpData);
          
          return {
              expData: expData,
              expCount: amountCountSrv.getExpCount(expData)
          }
      };

      return {
          getSelectedExpCat: getSelectedExpCat,
          getPaymentMode: getPaymentMode,
          removeExpRecord: removeExpRecord,
          addNewRecord: addNewRecord
      }

});
