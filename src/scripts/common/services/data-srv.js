angular.module('expMgrApp').factory('dataSrv', function($http, $q) {

    var fetchJSONData = function() {
        var deferred = $q.defer();

        $http.get('https://api.myjson.com/bins/3q8dz')
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

    return {
      getData: getData
    }

});
