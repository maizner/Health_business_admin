  //Documentation and examples:
  //---------------------------
 //@website: http://www.daterangepicker.com/

document.addEventListener("touchstart", function() {}
, false);
(function($) {
    "use strict";
    function addDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate()+numDays -1);
        return dateObj;
    }
    var todayDate = moment();
    // var nextDay = moment().add(1, "days");
    // var nextWeek = moment().add(7, "days");
    // var nextMonth = moment().add(30, "days");
    // var next3days = moment().add(3, "days");
    // var next5days = moment().add(5, "days");
    // var next10days = moment().add(10, "days");
    // var next15days = moment().add(15, "days");
    var dt = new Date();
    var cy = dt.getFullYear();
    // var minDates = "1 December, " + cy;
    // var maxDates = "31 December, " + cy;


    $('input[name="tycValidity"]').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        minDate: todayDate,
        locale:{
            language: 'auto',
            format: 'MM/DD/YYYY HH:mm', 
            daysOfWeek: ["DOM","LUN","MAR","MIER","JUE","VIE","SA" ], 
            monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"], 
            firstDay: 0,
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
           
        },

    });
    
    $('input[name="tycValidity"]').on('apply.daterangepicker', function(ev, picker){
        var a = picker.startDate.format('DD/MM/YYYY HH:mm');
        a = moment(a, "DD/MM/YYYY HH:mm");
        $('input[name="DateStart"]').val(a);
    });
    
}

)(jQuery);