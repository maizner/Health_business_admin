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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvZGF0ZXJhbmdlcGlja2VyL2NhbGVuZGFyLmNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgIC8vRG9jdW1lbnRhdGlvbiBhbmQgZXhhbXBsZXM6XG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gLy9Ad2Vic2l0ZTogaHR0cDovL3d3dy5kYXRlcmFuZ2VwaWNrZXIuY29tL1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbigpIHt9XG4sIGZhbHNlKTtcbihmdW5jdGlvbigkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gYWRkRGF5cyhkYXRlT2JqLCBudW1EYXlzKSB7XG4gICAgICAgIGRhdGVPYmouc2V0RGF0ZShkYXRlT2JqLmdldERhdGUoKStudW1EYXlzIC0xKTtcbiAgICAgICAgcmV0dXJuIGRhdGVPYmo7XG4gICAgfVxuICAgIHZhciB0b2RheURhdGUgPSBtb21lbnQoKTtcbiAgICAvLyB2YXIgbmV4dERheSA9IG1vbWVudCgpLmFkZCgxLCBcImRheXNcIik7XG4gICAgLy8gdmFyIG5leHRXZWVrID0gbW9tZW50KCkuYWRkKDcsIFwiZGF5c1wiKTtcbiAgICAvLyB2YXIgbmV4dE1vbnRoID0gbW9tZW50KCkuYWRkKDMwLCBcImRheXNcIik7XG4gICAgLy8gdmFyIG5leHQzZGF5cyA9IG1vbWVudCgpLmFkZCgzLCBcImRheXNcIik7XG4gICAgLy8gdmFyIG5leHQ1ZGF5cyA9IG1vbWVudCgpLmFkZCg1LCBcImRheXNcIik7XG4gICAgLy8gdmFyIG5leHQxMGRheXMgPSBtb21lbnQoKS5hZGQoMTAsIFwiZGF5c1wiKTtcbiAgICAvLyB2YXIgbmV4dDE1ZGF5cyA9IG1vbWVudCgpLmFkZCgxNSwgXCJkYXlzXCIpO1xuICAgIHZhciBkdCA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIGN5ID0gZHQuZ2V0RnVsbFllYXIoKTtcbiAgICAvLyB2YXIgbWluRGF0ZXMgPSBcIjEgRGVjZW1iZXIsIFwiICsgY3k7XG4gICAgLy8gdmFyIG1heERhdGVzID0gXCIzMSBEZWNlbWJlciwgXCIgKyBjeTtcblxuXG4gICAgJCgnaW5wdXRbbmFtZT1cInR5Y1ZhbGlkaXR5XCJdJykuZGF0ZXJhbmdlcGlja2VyKHtcbiAgICAgICAgc2luZ2xlRGF0ZVBpY2tlcjogdHJ1ZSxcbiAgICAgICAgdGltZVBpY2tlcjogdHJ1ZSxcbiAgICAgICAgdGltZVBpY2tlcjI0SG91cjogdHJ1ZSxcbiAgICAgICAgbWluRGF0ZTogdG9kYXlEYXRlLFxuICAgICAgICBsb2NhbGU6e1xuICAgICAgICAgICAgbGFuZ3VhZ2U6ICdhdXRvJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ01NL0REL1lZWVkgSEg6bW0nLCBcbiAgICAgICAgICAgIGRheXNPZldlZWs6IFtcIkRPTVwiLFwiTFVOXCIsXCJNQVJcIixcIk1JRVJcIixcIkpVRVwiLFwiVklFXCIsXCJTQVwiIF0sIFxuICAgICAgICAgICAgbW9udGhOYW1lczogW1wiRW5lcm9cIixcIkZlYnJlcm9cIixcIk1hcnpvXCIsXCJBYnJpbFwiLFwiTWF5b1wiLFwiSnVuaW9cIixcIkp1bGlvXCIsXCJBZ29zdG9cIixcIlNlcHRpZW1icmVcIixcIk9jdHVicmVcIixcIk5vdmllbWJyZVwiLFwiRGljaWVtYnJlXCJdLCBcbiAgICAgICAgICAgIGZpcnN0RGF5OiAwLFxuICAgICAgICAgICAgYXBwbHlMYWJlbDogJ0FwbGljYXInLFxuICAgICAgICAgICAgY2FuY2VsTGFiZWw6ICdDYW5jZWxhcicsXG4gICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgfSk7XG4gICAgXG4gICAgJCgnaW5wdXRbbmFtZT1cInR5Y1ZhbGlkaXR5XCJdJykub24oJ2FwcGx5LmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uKGV2LCBwaWNrZXIpe1xuICAgICAgICB2YXIgYSA9IHBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC9NTS9ZWVlZIEhIOm1tJyk7XG4gICAgICAgIGEgPSBtb21lbnQoYSwgXCJERC9NTS9ZWVlZIEhIOm1tXCIpO1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwiRGF0ZVN0YXJ0XCJdJykudmFsKGEpO1xuICAgIH0pO1xuICAgIFxufVxuXG4pKGpRdWVyeSk7Il0sImZpbGUiOiJ2ZW5kb3IvZGF0ZXJhbmdlcGlja2VyL2NhbGVuZGFyLmNvbmZpZy5qcyJ9
