angular.module('expMgrApp').factory('amountCountSrv', function(dataSrv) {

     var getExpCount = function(exp) {
         var expTotal = 0;
         angular.forEach(exp, function(item) {
             expTotal = expTotal + parseFloat(item.exp_amount);
         });
         return expTotal.toFixed(2);
      }

    var getIncCount = function(inc) {
        var incTotal = 0;
        angular.forEach(inc, function(item) {
        		incTotal = incTotal + parseFloat(item.inc_amount, 10);
        });
        return incTotal.toFixed(2);
    };

    return {
        getExpCount: getExpCount,
        getIncCount: getIncCount
    };
});
