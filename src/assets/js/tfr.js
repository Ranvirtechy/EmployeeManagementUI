(function($) {

    'use strict';

    //$(document).ready(function() {
		$(window).on("load", function() {

        // Validation method for budget, profit, revenue fields
        $.validator.addMethod("money", function(value, element) {
            return this.optional(element) || /^(\$?)(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/.test(value);
        }, "Please specify a valid dollar amount"); 
    });

})(window.jQuery);