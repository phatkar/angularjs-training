angular.module('expMgrApp').factory('dataSrv', function() {

      var expenses = [
          {exp_id: 1, exp_cat: 'Rent', exp_amount: '5000', exp_date: '02/01/2016', mode: 'Cash', note: 'Rent given.'},
          {exp_id: 2, exp_cat: 'Party', exp_amount: '2000', exp_date: '10/01/2016', mode: 'Card', note: 'Team win.'},
          {exp_id: 3, exp_cat: 'Shopping', exp_amount: '900', exp_date: '03/01/2016', mode: 'Electronic Transfer', note: 'Khup kharcha'},
          {exp_id: 4, exp_cat: 'Gift', exp_amount: '500', exp_date: '12/01/2016', mode: 'Cash', note: 'Gift for birthday.'},
          {exp_id: 5, exp_cat: 'Shopping', exp_amount: '500', exp_date: '10/01/2016', mode: 'Cheque', note: 'Gift.'},
          {exp_id: 6, exp_cat: 'Gift', exp_amount: '500', exp_date: '12/01/2016', mode: 'Cash', note: 'Gift for birthday.'}
      ];

      var getExpData = function() {
          return expenses;
      };

      var income = [
          {inc_id: 1, inc_cat: 'Salary', inc_amount: '30000', inc_date: '01/01/2016', mode: 'Electronic Transfer'},
          {inc_id: 2, inc_cat: 'Interest on deposit', inc_amount: '1500', inc_date: '04/01/2016', mode: 'Electronic Transfer'}
      ];

      var getIncomeData = function() {
          return income;
      };

      var expCat = [
          {id: 1, name: 'Rent'},
          {id: 2, name: 'Party'},
          {id: 3, name: 'Shopping'},
          {id: 4, name: 'Gift'},
          {id: 5, name: 'Emi'}
      ];
      var defaultExpCat = {id: 3, name: 'Shopping'};

      var getExpCatData = function() {
          return {
              expCat: expCat,
              defaultExpCat: defaultExpCat
          }
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
          getExpData: getExpData,
          getIncomeData: getIncomeData,
          getExpCatData: getExpCatData,
          getIncCatData: getIncCatData,
          getPaymentMode: getPaymentMode
      }

});
