angular.module('expMgrApp').directive('expNote', function() {
	return {
		restrict: 'A',
		link: function (scope, elem) {
	        elem.on('keypress keyup blur', function (event) {
				var $input = $(this);
				if($input[0].value.length > 20) {
						event.preventDefault();
				}
	        });
    	}
	}
});
