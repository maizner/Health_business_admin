var Dashboard = {
    init: function () {

        //TODO DEV: Reemplazar valores
        //Estos 3 valores corresponden a los porcentajes de cada chart según el orden.
        // Vendor: https://codepen.io/sergiopedercini/pen/jmKdbj/
        setPercentChart(100,63, 36.87);

        // -----------------------------------------------------------------------------
        // COMIENZO DE TABLA
        // -----------------------------------------------------------------------------         

        //plugin https://datatables.net/
        var table = $('.table').DataTable({
            //Seteo en false los plugin que vienen incorporados para que no aparezcan por default
            "paging":   true,
            "ordering": false,
            "searching": true,
            "lengthChange": true,
            pageLength: 10,
            "info": false,
            responsive: true,
            
            //https://datatables.net/reference/option/dom
        //<'myfilter'<'icon icon-search' and>f and>: Borro el div vacío que queda del lado izquierdo( lugar de 'info') para ubicar ahí el buscador
        //<'table-wrapper' t and>: envuelvo la tabla con un div para estilar el border top de color
            dom:"<'myfilter'<'icon icon-search' and>f and><'table-wrapper' t and>",
        
            
            language: {
                /*search*/
                "sSearch": "",
                //TODO DEV: Pasar a config
                searchPlaceholder: "Podes buscar por nombre, estado, tiempo, etc "
            },
        });

        // comportamiento del scroll de flechas y search en mb
        cursorBehavior('.table-wrapper');
      
       
       
        // Cargar + datos
        $('.show-more').on('click', (e)=> {
        // https://datatables.net/examples/data_sources/server_side.html
            alert("Se deben cargar + datos lazy loading. Utilizar loader comentado en html al momento de la carga")
        });



        //Cursores para mover la tabla en mobile
        function cursorBehavior(el){
           
            $(".cursor-r").on('click', function () {
                $(el).animate({ scrollLeft: 768}, 100);
            })
            $(".cursor-l").on('click', function () {
                $(el).animate({scrollLeft:0},50);
            })
            
        
        };
        // -----------------------------------------------------------------------------
        // FIN DE TABLAS
        // -----------------------------------------------------------------------------  

      
    },  
    
};

function setPercentChart(chart1,chart2, chart3){
    let firstChartOptions =  {
        chartDuration: '2s',
        data:{
            percent:chart1
        },
    }
    let secondChartOptions =  {
        chartDuration: '2s',
        data:{
            percent:chart2
        },
    }
    let thirdChartOptions =  {
        chartDuration: '2s',
        data:{
            percent:chart3
        },
    }
    var chart = new PercentChart("firstChart",firstChartOptions)
    var chart = new PercentChart("secondChart",secondChartOptions)
    var chart = new PercentChart("thirdChart",thirdChartOptions)
};



$(function () {
    Dashboard.init();
   
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkYXNoYm9hcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIERhc2hib2FyZCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy9UT0RPIERFVjogUmVlbXBsYXphciB2YWxvcmVzXHJcbiAgICAgICAgLy9Fc3RvcyAzIHZhbG9yZXMgY29ycmVzcG9uZGVuIGEgbG9zIHBvcmNlbnRhamVzIGRlIGNhZGEgY2hhcnQgc2Vnw7puIGVsIG9yZGVuLlxyXG4gICAgICAgIC8vIFZlbmRvcjogaHR0cHM6Ly9jb2RlcGVuLmlvL3Nlcmdpb3BlZGVyY2luaS9wZW4vam1LZGJqL1xyXG4gICAgICAgIHNldFBlcmNlbnRDaGFydCgxMDAsNjMsIDM2Ljg3KTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBDT01JRU5aTyBERSBUQUJMQVxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAgICAgICAgXHJcblxyXG4gICAgICAgIC8vcGx1Z2luIGh0dHBzOi8vZGF0YXRhYmxlcy5uZXQvXHJcbiAgICAgICAgdmFyIHRhYmxlID0gJCgnLnRhYmxlJykuRGF0YVRhYmxlKHtcclxuICAgICAgICAgICAgLy9TZXRlbyBlbiBmYWxzZSBsb3MgcGx1Z2luIHF1ZSB2aWVuZW4gaW5jb3Jwb3JhZG9zIHBhcmEgcXVlIG5vIGFwYXJlemNhbiBwb3IgZGVmYXVsdFxyXG4gICAgICAgICAgICBcInBhZ2luZ1wiOiAgIHRydWUsXHJcbiAgICAgICAgICAgIFwib3JkZXJpbmdcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwic2VhcmNoaW5nXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwibGVuZ3RoQ2hhbmdlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIHBhZ2VMZW5ndGg6IDEwLFxyXG4gICAgICAgICAgICBcImluZm9cIjogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2h0dHBzOi8vZGF0YXRhYmxlcy5uZXQvcmVmZXJlbmNlL29wdGlvbi9kb21cclxuICAgICAgICAvLzwnbXlmaWx0ZXInPCdpY29uIGljb24tc2VhcmNoJyBhbmQ+ZiBhbmQ+OiBCb3JybyBlbCBkaXYgdmFjw61vIHF1ZSBxdWVkYSBkZWwgbGFkbyBpenF1aWVyZG8oIGx1Z2FyIGRlICdpbmZvJykgcGFyYSB1YmljYXIgYWjDrSBlbCBidXNjYWRvclxyXG4gICAgICAgIC8vPCd0YWJsZS13cmFwcGVyJyB0IGFuZD46IGVudnVlbHZvIGxhIHRhYmxhIGNvbiB1biBkaXYgcGFyYSBlc3RpbGFyIGVsIGJvcmRlciB0b3AgZGUgY29sb3JcclxuICAgICAgICAgICAgZG9tOlwiPCdteWZpbHRlcic8J2ljb24gaWNvbi1zZWFyY2gnIGFuZD5mIGFuZD48J3RhYmxlLXdyYXBwZXInIHQgYW5kPlwiLFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHtcclxuICAgICAgICAgICAgICAgIC8qc2VhcmNoKi9cclxuICAgICAgICAgICAgICAgIFwic1NlYXJjaFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy9UT0RPIERFVjogUGFzYXIgYSBjb25maWdcclxuICAgICAgICAgICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyOiBcIlBvZGVzIGJ1c2NhciBwb3Igbm9tYnJlLCBlc3RhZG8sIHRpZW1wbywgZXRjIFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGNvbXBvcnRhbWllbnRvIGRlbCBzY3JvbGwgZGUgZmxlY2hhcyB5IHNlYXJjaCBlbiBtYlxyXG4gICAgICAgIGN1cnNvckJlaGF2aW9yKCcudGFibGUtd3JhcHBlcicpO1xyXG4gICAgICBcclxuICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgLy8gQ2FyZ2FyICsgZGF0b3NcclxuICAgICAgICAkKCcuc2hvdy1tb3JlJykub24oJ2NsaWNrJywgKGUpPT4ge1xyXG4gICAgICAgIC8vIGh0dHBzOi8vZGF0YXRhYmxlcy5uZXQvZXhhbXBsZXMvZGF0YV9zb3VyY2VzL3NlcnZlcl9zaWRlLmh0bWxcclxuICAgICAgICAgICAgYWxlcnQoXCJTZSBkZWJlbiBjYXJnYXIgKyBkYXRvcyBsYXp5IGxvYWRpbmcuIFV0aWxpemFyIGxvYWRlciBjb21lbnRhZG8gZW4gaHRtbCBhbCBtb21lbnRvIGRlIGxhIGNhcmdhXCIpXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9DdXJzb3JlcyBwYXJhIG1vdmVyIGxhIHRhYmxhIGVuIG1vYmlsZVxyXG4gICAgICAgIGZ1bmN0aW9uIGN1cnNvckJlaGF2aW9yKGVsKXtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgJChcIi5jdXJzb3ItclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsKS5hbmltYXRlKHsgc2Nyb2xsTGVmdDogNzY4fSwgMTAwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChcIi5jdXJzb3ItbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsKS5hbmltYXRlKHtzY3JvbGxMZWZ0OjB9LDUwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEZJTiBERSBUQUJMQVNcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgXHJcblxyXG4gICAgICBcclxuICAgIH0sICBcclxuICAgIFxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0UGVyY2VudENoYXJ0KGNoYXJ0MSxjaGFydDIsIGNoYXJ0Myl7XHJcbiAgICBsZXQgZmlyc3RDaGFydE9wdGlvbnMgPSAge1xyXG4gICAgICAgIGNoYXJ0RHVyYXRpb246ICcycycsXHJcbiAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnQ6Y2hhcnQxXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGxldCBzZWNvbmRDaGFydE9wdGlvbnMgPSAge1xyXG4gICAgICAgIGNoYXJ0RHVyYXRpb246ICcycycsXHJcbiAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnQ6Y2hhcnQyXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGxldCB0aGlyZENoYXJ0T3B0aW9ucyA9ICB7XHJcbiAgICAgICAgY2hhcnREdXJhdGlvbjogJzJzJyxcclxuICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgcGVyY2VudDpjaGFydDNcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgdmFyIGNoYXJ0ID0gbmV3IFBlcmNlbnRDaGFydChcImZpcnN0Q2hhcnRcIixmaXJzdENoYXJ0T3B0aW9ucylcclxuICAgIHZhciBjaGFydCA9IG5ldyBQZXJjZW50Q2hhcnQoXCJzZWNvbmRDaGFydFwiLHNlY29uZENoYXJ0T3B0aW9ucylcclxuICAgIHZhciBjaGFydCA9IG5ldyBQZXJjZW50Q2hhcnQoXCJ0aGlyZENoYXJ0XCIsdGhpcmRDaGFydE9wdGlvbnMpXHJcbn07XHJcblxyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgRGFzaGJvYXJkLmluaXQoKTtcclxuICAgXHJcbn0pOyJdLCJmaWxlIjoiZGFzaGJvYXJkLmpzIn0=
