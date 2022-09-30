
var Abm = {
    
    init: function () {
        
        // -----------------------------------------------------------------------------
        // COMIENZO DE VALIDACIONES
        // ----------------------------------------------------------------------------- 
        $('.js_form_validation').parsley({
            //clases en input
            successClass: 'parsley-success',
            errorClass:   'parsley-error',
            errorsWrapper:'<span class="default_validation_msj"></span>',
            errorTemplate:'<span class="validation-message"></span>',
            
        });

        //INFO DSG: Clases para estilos de error
        window.Parsley.on('field:error', ()=> {
            $('.parsley-error').parents('.form-group')
            .addClass('error')
            .removeClass('success')
        });

        //INFO DSG: Clases para estilos de éxito
        window.Parsley.on('field:success', ()=> {
            $('.parsley-success').parents('.form-group')
            .addClass('success')
            .removeClass('error')
        });
        
        //Antes de subir archivo modal de confirmación
        $('.js_confirm').on('click', (e)=> {
            $('.modal_confirm').modal()
        });

        //Al Éxito
        $('.btn.js_accept').on('click', (e)=> {
            $('.modal_neutral').modal()
            $('.modal_confirm').modal('hide')
            //TODO DEV: una vez se apreta confirmar, mostrar toast comentado con texto(successMsjTimeDuration)     
            // successMsjTimeDuration('XSus datos se guardaron correctamente ')
        });
        // -----------------------------------------------------------------------------
        // FIN DE VALIDACIONES
        // ----------------------------------------------------------------------------- 
        
        //Importo los scripts de la tabla
        // $.getScript("content/js/configTable/abmTable.js");
        // -----------------------------------------------------------------------------
        // COMIENZO DE TABLA
        // -----------------------------------------------------------------------------         

        //plugin https://datatables.net/
        var table = $('.table').DataTable({
            //Seteo en false los plugin que vienen incorporados para que no aparezcan por default
            "paging":   true,
            "ordering": false,
            "searching": false,
            "lengthChange": true,
            pageLength: 10,
            "info": false,
            responsive: true,
            
            //https://datatables.net/reference/option/dom
            dom:"<'myfilter'<'container-check'<'simulated-check' and> <'checkmark' and> <'text' and > and>f <'filter-button' B> and><'table-wrapper' t and>",
                /*Estos son los botones por default agregados en el dom:*/
            buttons: [
                    {text: '<span class="icon icon-see"></span>',
                        titleAttr: 'Ver Selección',
                        className: 'toolbox',
                        action: function ( e, dt, node, config ) {
                        window.location.href = 'see.html'; ;}

                    },
                    
                    
                    {text: '<span class="icon icon-edit"></span>',
                        titleAttr: 'Editar selección',
                        className: 'toolbox',
                        action: function ( e, dt, node, config ) {
                            window.location.href = 'modify.html'; ;}
                    },
                    
                    {text: '<span class="icon icon-affiliates-enrollment"></span>',
                        titleAttr: 'Eliminar',
                        className: 'toolbox',
                        action: function ( e, dt, node, config ) {
                            window.location.href = 'delete.html'; ;}
                    },
                    

            ],
            
        });

        rowSelection(
            //Tabla
            table,
            //Row
            ".result_table tr", 
            //El Div con texto dinamico
            '.myfilter .text'
        );

        //Data attributes para tooltips en botones de tabla SEE/EDIT/DELETE
        // $('.btn.btn-default')
        // .attr( "data-toggle", "tooltip" )
        // .attr("data-placement", "bottom" );

        // INFO: comportamiento del scroll de flechas y search en mobile para la tabla
        cursorBehavior('.table-wrapper');

        // TODO DEV: eliminar script una vez comprendido el funcionamiento
        $('.show-more').on('click', (e)=> {
            // https://datatables.net/examples/data_sources/server_side.html
            alert("Se deben cargar + datos lazy loading. Utilizar loader comentado en html al momento de la carga")
        });

        //IxD => Filtros ( cancelar = show form + hide filter row + clean filters)
        //TODO DEV: Limpiar la tabla y filtros on cancel
        IxDfilterCancel()

        //IxD => Filtros ( Buscar = Hide form + show filter row)
        IxDfilterSearch()

        function IxDfilterCancel() {
            $('.filter_cancel').on('click', function(){
                $(".js_drSearch,.js_ptSearch").collapse('show');
                $(".filters").addClass('d-none');
                //INFO DEV: LIMPIAR FILTROS DE LA TABLA 
            });
        }

        function IxDfilterSearch() {
            $('.js_form_collapse').on('click', function(){
                $(".js_drSearch,.js_ptSearch").collapse('hide');
                $(".filters").removeClass('d-none');
                
            });
        }
        //Agrego clase al row y modifico dinamicamente el texto de row seleccionadas dentro de la tabla 
        function rowSelection(Table, Row, Text){
            //TODO DEV: Texto a configurar
            var userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            $(Text).text('Seleccione para continuar');


            $(Row).click(function(e) {
                var state = $(this).find(":checkbox")
                    //INFO DEV / DSG = > NO SE PUEDEN SELECCIONAR MAS DE 4 DK / 1 MB
                    if(userAgent && Table.rows('.selected-row').data().length < 1 ||
                    !userAgent && Table.rows('.selected-row').data().length < 4) {
                        if ($(state).attr('checked')){
                            $(state).removeAttr("checked")
                            .closest( "tr" ).removeClass("selected-row")
                        }else {
                            $(state).attr("checked", "checked")
                            .closest( "tr" ).addClass("selected-row")
                        }
                }else {
                    $(state).removeAttr("checked")
                    .closest( "tr" ).removeClass("selected-row")
                    
                    if(Table.rows('.selected-row').data().length == 4){
                        //TODO DEV: Pasar texto a configuración.
                        infoMsjTimeDuration("Puedes seleccionar hasta 4")
                    }
                }

                if(Table.rows('.selected-row').data().length>0){
                    //TODO DEV: Texto a configurar
                    $(Text).text(Table.rows('.selected-row').data().length +' Selecionados')
                    .parents('.container-check').addClass('selected')
                }else {
                    $(Text).text('Seleccione para continuar')
                    .parents('.container-check').removeClass('selected')
                }
                
            });
        }
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


        //Init de select2 sin searcher por default
        $('.select2').select2({minimumResultsForSearch: Infinity});
        //Init de scroller plugin
        $('.select2').on('click', function(){
            $(".nano").nanoScroller();
        });
         
    
    },  
    
};




$(function () {
    Abm.init();
   
});