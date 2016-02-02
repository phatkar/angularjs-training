expMgrModule.directive('validAmount', function() {
		return {
				restrict: 'A',
				link: function (scope, elem) {
            elem.on('keypress keyup blur', function (event) {
									var regExpAfterDec = /^\d*\.?\d{0,1}$/;
									var $input = $(this);

			            if ((event.which != 46 || $input.val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
			                event.preventDefault();
			            }
									if(!$input.val().match(regExpAfterDec)) {
											event.preventDefault();
									}
            });
        }
		}
});
