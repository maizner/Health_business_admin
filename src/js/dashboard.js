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