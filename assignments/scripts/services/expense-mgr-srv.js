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

      var addNewRecord = function(scope) {
          var expData = dataSrv.getExpData();

          var lastExpId = expData[expData.length - 1].exp_id;
          lastExpId = parseInt(lastExpId, 10) + 1;

          expData.push({
              'exp_id': lastExpId,
              'exp_cat': scope.defaultExpCat.name,
              'exp_amount': scope.expAmount,
              'exp_date': scope.expDate,
              'mode': scope.defaultMode.name,
              'note': scope.newNote
          });

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
