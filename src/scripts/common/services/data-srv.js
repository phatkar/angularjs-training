angular.module('expMgrApp').factory('dataSrv', function($http, $q) {

    var fetchJSONData = function() {
        var deferred = $q.defer();

        $http.get('https://api.myjson.com/bins/3jfpn')
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    var getData = function() {
        return fetchJSONData();
    };

    var incCat = [
      {id: 1, name: 'Salary'},
      {id: 2, name: 'Interest on deposit'}
    ];
    var defaultIncCat = {id: 1, name: 'Salary'};

    var getIncCatData = function() {
      return {
          incCat: incCat,
          defaultIncCat: defaultIncCat
      }
    };

    var mode = [
      {id: 1, name: 'Card'},
      {id: 2, name: 'Cash'},
      {id: 3, name: 'Electronic Transfer'},
      {id: 4, name: 'Cheque'}
    ];
    var defaultMode = {id: 2, name: 'Cash'};

    var getPaymentMode = function() {
      return {
          mode: mode,
          defaultMode: defaultMode
      }
    };

    return {
      getData: getData,
      getIncCatData: getIncCatData,
      getPaymentMode: getPaymentMode
    }

});
