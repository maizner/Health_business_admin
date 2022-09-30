
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhYm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBBYm0gPSB7XHJcbiAgICBcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIENPTUlFTlpPIERFIFZBTElEQUNJT05FU1xyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG4gICAgICAgICQoJy5qc19mb3JtX3ZhbGlkYXRpb24nKS5wYXJzbGV5KHtcclxuICAgICAgICAgICAgLy9jbGFzZXMgZW4gaW5wdXRcclxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAncGFyc2xleS1zdWNjZXNzJyxcclxuICAgICAgICAgICAgZXJyb3JDbGFzczogICAncGFyc2xleS1lcnJvcicsXHJcbiAgICAgICAgICAgIGVycm9yc1dyYXBwZXI6JzxzcGFuIGNsYXNzPVwiZGVmYXVsdF92YWxpZGF0aW9uX21zalwiPjwvc3Bhbj4nLFxyXG4gICAgICAgICAgICBlcnJvclRlbXBsYXRlOic8c3BhbiBjbGFzcz1cInZhbGlkYXRpb24tbWVzc2FnZVwiPjwvc3Bhbj4nLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9JTkZPIERTRzogQ2xhc2VzIHBhcmEgZXN0aWxvcyBkZSBlcnJvclxyXG4gICAgICAgIHdpbmRvdy5QYXJzbGV5Lm9uKCdmaWVsZDplcnJvcicsICgpPT4ge1xyXG4gICAgICAgICAgICAkKCcucGFyc2xleS1lcnJvcicpLnBhcmVudHMoJy5mb3JtLWdyb3VwJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdlcnJvcicpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc3VjY2VzcycpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vSU5GTyBEU0c6IENsYXNlcyBwYXJhIGVzdGlsb3MgZGUgw6l4aXRvXHJcbiAgICAgICAgd2luZG93LlBhcnNsZXkub24oJ2ZpZWxkOnN1Y2Nlc3MnLCAoKT0+IHtcclxuICAgICAgICAgICAgJCgnLnBhcnNsZXktc3VjY2VzcycpLnBhcmVudHMoJy5mb3JtLWdyb3VwJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdzdWNjZXNzJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdlcnJvcicpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9BbnRlcyBkZSBzdWJpciBhcmNoaXZvIG1vZGFsIGRlIGNvbmZpcm1hY2nDs25cclxuICAgICAgICAkKCcuanNfY29uZmlybScpLm9uKCdjbGljaycsIChlKT0+IHtcclxuICAgICAgICAgICAgJCgnLm1vZGFsX2NvbmZpcm0nKS5tb2RhbCgpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQWwgw4l4aXRvXHJcbiAgICAgICAgJCgnLmJ0bi5qc19hY2NlcHQnKS5vbignY2xpY2snLCAoZSk9PiB7XHJcbiAgICAgICAgICAgICQoJy5tb2RhbF9uZXV0cmFsJykubW9kYWwoKVxyXG4gICAgICAgICAgICAkKCcubW9kYWxfY29uZmlybScpLm1vZGFsKCdoaWRlJylcclxuICAgICAgICAgICAgLy9UT0RPIERFVjogdW5hIHZleiBzZSBhcHJldGEgY29uZmlybWFyLCBtb3N0cmFyIHRvYXN0IGNvbWVudGFkbyBjb24gdGV4dG8oc3VjY2Vzc01zalRpbWVEdXJhdGlvbikgICAgIFxyXG4gICAgICAgICAgICAvLyBzdWNjZXNzTXNqVGltZUR1cmF0aW9uKCdYU3VzIGRhdG9zIHNlIGd1YXJkYXJvbiBjb3JyZWN0YW1lbnRlICcpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBGSU4gREUgVkFMSURBQ0lPTkVTXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9JbXBvcnRvIGxvcyBzY3JpcHRzIGRlIGxhIHRhYmxhXHJcbiAgICAgICAgLy8gJC5nZXRTY3JpcHQoXCJjb250ZW50L2pzL2NvbmZpZ1RhYmxlL2FibVRhYmxlLmpzXCIpO1xyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQ09NSUVOWk8gREUgVEFCTEFcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICAgICAgIFxyXG5cclxuICAgICAgICAvL3BsdWdpbiBodHRwczovL2RhdGF0YWJsZXMubmV0L1xyXG4gICAgICAgIHZhciB0YWJsZSA9ICQoJy50YWJsZScpLkRhdGFUYWJsZSh7XHJcbiAgICAgICAgICAgIC8vU2V0ZW8gZW4gZmFsc2UgbG9zIHBsdWdpbiBxdWUgdmllbmVuIGluY29ycG9yYWRvcyBwYXJhIHF1ZSBubyBhcGFyZXpjYW4gcG9yIGRlZmF1bHRcclxuICAgICAgICAgICAgXCJwYWdpbmdcIjogICB0cnVlLFxyXG4gICAgICAgICAgICBcIm9yZGVyaW5nXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInNlYXJjaGluZ1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJsZW5ndGhDaGFuZ2VcIjogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnZUxlbmd0aDogMTAsXHJcbiAgICAgICAgICAgIFwiaW5mb1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaHR0cHM6Ly9kYXRhdGFibGVzLm5ldC9yZWZlcmVuY2Uvb3B0aW9uL2RvbVxyXG4gICAgICAgICAgICBkb206XCI8J215ZmlsdGVyJzwnY29udGFpbmVyLWNoZWNrJzwnc2ltdWxhdGVkLWNoZWNrJyBhbmQ+IDwnY2hlY2ttYXJrJyBhbmQ+IDwndGV4dCcgYW5kID4gYW5kPmYgPCdmaWx0ZXItYnV0dG9uJyBCPiBhbmQ+PCd0YWJsZS13cmFwcGVyJyB0IGFuZD5cIixcclxuICAgICAgICAgICAgICAgIC8qRXN0b3Mgc29uIGxvcyBib3RvbmVzIHBvciBkZWZhdWx0IGFncmVnYWRvcyBlbiBlbCBkb206Ki9cclxuICAgICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tc2VlXCI+PC9zcGFuPicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlQXR0cjogJ1ZlciBTZWxlY2Npw7NuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndG9vbGJveCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCBlLCBkdCwgbm9kZSwgY29uZmlnICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdzZWUuaHRtbCc7IDt9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAge3RleHQ6ICc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1lZGl0XCI+PC9zcGFuPicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlQXR0cjogJ0VkaXRhciBzZWxlY2Npw7NuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndG9vbGJveCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCBlLCBkdCwgbm9kZSwgY29uZmlnICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnbW9kaWZ5Lmh0bWwnOyA7fVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAge3RleHQ6ICc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1hZmZpbGlhdGVzLWVucm9sbG1lbnRcIj48L3NwYW4+JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVBdHRyOiAnRWxpbWluYXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0b29sYm94JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoIGUsIGR0LCBub2RlLCBjb25maWcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdkZWxldGUuaHRtbCc7IDt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3dTZWxlY3Rpb24oXHJcbiAgICAgICAgICAgIC8vVGFibGFcclxuICAgICAgICAgICAgdGFibGUsXHJcbiAgICAgICAgICAgIC8vUm93XHJcbiAgICAgICAgICAgIFwiLnJlc3VsdF90YWJsZSB0clwiLCBcclxuICAgICAgICAgICAgLy9FbCBEaXYgY29uIHRleHRvIGRpbmFtaWNvXHJcbiAgICAgICAgICAgICcubXlmaWx0ZXIgLnRleHQnXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy9EYXRhIGF0dHJpYnV0ZXMgcGFyYSB0b29sdGlwcyBlbiBib3RvbmVzIGRlIHRhYmxhIFNFRS9FRElUL0RFTEVURVxyXG4gICAgICAgIC8vICQoJy5idG4uYnRuLWRlZmF1bHQnKVxyXG4gICAgICAgIC8vIC5hdHRyKCBcImRhdGEtdG9nZ2xlXCIsIFwidG9vbHRpcFwiIClcclxuICAgICAgICAvLyAuYXR0cihcImRhdGEtcGxhY2VtZW50XCIsIFwiYm90dG9tXCIgKTtcclxuXHJcbiAgICAgICAgLy8gSU5GTzogY29tcG9ydGFtaWVudG8gZGVsIHNjcm9sbCBkZSBmbGVjaGFzIHkgc2VhcmNoIGVuIG1vYmlsZSBwYXJhIGxhIHRhYmxhXHJcbiAgICAgICAgY3Vyc29yQmVoYXZpb3IoJy50YWJsZS13cmFwcGVyJyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gREVWOiBlbGltaW5hciBzY3JpcHQgdW5hIHZleiBjb21wcmVuZGlkbyBlbCBmdW5jaW9uYW1pZW50b1xyXG4gICAgICAgICQoJy5zaG93LW1vcmUnKS5vbignY2xpY2snLCAoZSk9PiB7XHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGF0YXRhYmxlcy5uZXQvZXhhbXBsZXMvZGF0YV9zb3VyY2VzL3NlcnZlcl9zaWRlLmh0bWxcclxuICAgICAgICAgICAgYWxlcnQoXCJTZSBkZWJlbiBjYXJnYXIgKyBkYXRvcyBsYXp5IGxvYWRpbmcuIFV0aWxpemFyIGxvYWRlciBjb21lbnRhZG8gZW4gaHRtbCBhbCBtb21lbnRvIGRlIGxhIGNhcmdhXCIpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vSXhEID0+IEZpbHRyb3MgKCBjYW5jZWxhciA9IHNob3cgZm9ybSArIGhpZGUgZmlsdGVyIHJvdyArIGNsZWFuIGZpbHRlcnMpXHJcbiAgICAgICAgLy9UT0RPIERFVjogTGltcGlhciBsYSB0YWJsYSB5IGZpbHRyb3Mgb24gY2FuY2VsXHJcbiAgICAgICAgSXhEZmlsdGVyQ2FuY2VsKClcclxuXHJcbiAgICAgICAgLy9JeEQgPT4gRmlsdHJvcyAoIEJ1c2NhciA9IEhpZGUgZm9ybSArIHNob3cgZmlsdGVyIHJvdylcclxuICAgICAgICBJeERmaWx0ZXJTZWFyY2goKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBJeERmaWx0ZXJDYW5jZWwoKSB7XHJcbiAgICAgICAgICAgICQoJy5maWx0ZXJfY2FuY2VsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQoXCIuanNfZHJTZWFyY2gsLmpzX3B0U2VhcmNoXCIpLmNvbGxhcHNlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmZpbHRlcnNcIikuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgLy9JTkZPIERFVjogTElNUElBUiBGSUxUUk9TIERFIExBIFRBQkxBIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEl4RGZpbHRlclNlYXJjaCgpIHtcclxuICAgICAgICAgICAgJCgnLmpzX2Zvcm1fY29sbGFwc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5qc19kclNlYXJjaCwuanNfcHRTZWFyY2hcIikuY29sbGFwc2UoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICQoXCIuZmlsdGVyc1wiKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQWdyZWdvIGNsYXNlIGFsIHJvdyB5IG1vZGlmaWNvIGRpbmFtaWNhbWVudGUgZWwgdGV4dG8gZGUgcm93IHNlbGVjY2lvbmFkYXMgZGVudHJvIGRlIGxhIHRhYmxhIFxyXG4gICAgICAgIGZ1bmN0aW9uIHJvd1NlbGVjdGlvbihUYWJsZSwgUm93LCBUZXh0KXtcclxuICAgICAgICAgICAgLy9UT0RPIERFVjogVGV4dG8gYSBjb25maWd1cmFyXHJcbiAgICAgICAgICAgIHZhciB1c2VyQWdlbnQgPSAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgXHJcbiAgICAgICAgICAgICQoVGV4dCkudGV4dCgnU2VsZWNjaW9uZSBwYXJhIGNvbnRpbnVhcicpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICQoUm93KS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSAkKHRoaXMpLmZpbmQoXCI6Y2hlY2tib3hcIilcclxuICAgICAgICAgICAgICAgICAgICAvL0lORk8gREVWIC8gRFNHID0gPiBOTyBTRSBQVUVERU4gU0VMRUNDSU9OQVIgTUFTIERFIDQgREsgLyAxIE1CXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckFnZW50ICYmIFRhYmxlLnJvd3MoJy5zZWxlY3RlZC1yb3cnKS5kYXRhKCkubGVuZ3RoIDwgMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICF1c2VyQWdlbnQgJiYgVGFibGUucm93cygnLnNlbGVjdGVkLXJvdycpLmRhdGEoKS5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHN0YXRlKS5hdHRyKCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzdGF0ZSkucmVtb3ZlQXR0cihcImNoZWNrZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCBcInRyXCIgKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkLXJvd1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHN0YXRlKS5hdHRyKFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCBcInRyXCIgKS5hZGRDbGFzcyhcInNlbGVjdGVkLXJvd1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChzdGF0ZSkucmVtb3ZlQXR0cihcImNoZWNrZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCggXCJ0clwiICkucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1yb3dcIilcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihUYWJsZS5yb3dzKCcuc2VsZWN0ZWQtcm93JykuZGF0YSgpLmxlbmd0aCA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPIERFVjogUGFzYXIgdGV4dG8gYSBjb25maWd1cmFjacOzbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb01zalRpbWVEdXJhdGlvbihcIlB1ZWRlcyBzZWxlY2Npb25hciBoYXN0YSA0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKFRhYmxlLnJvd3MoJy5zZWxlY3RlZC1yb3cnKS5kYXRhKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyBERVY6IFRleHRvIGEgY29uZmlndXJhclxyXG4gICAgICAgICAgICAgICAgICAgICQoVGV4dCkudGV4dChUYWJsZS5yb3dzKCcuc2VsZWN0ZWQtcm93JykuZGF0YSgpLmxlbmd0aCArJyBTZWxlY2lvbmFkb3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRzKCcuY29udGFpbmVyLWNoZWNrJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFRleHQpLnRleHQoJ1NlbGVjY2lvbmUgcGFyYSBjb250aW51YXInKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRzKCcuY29udGFpbmVyLWNoZWNrJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9DdXJzb3JlcyBwYXJhIG1vdmVyIGxhIHRhYmxhIGVuIG1vYmlsZVxyXG4gICAgICAgIGZ1bmN0aW9uIGN1cnNvckJlaGF2aW9yKGVsKXtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgJChcIi5jdXJzb3ItclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsKS5hbmltYXRlKHsgc2Nyb2xsTGVmdDogNzY4fSwgMTAwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChcIi5jdXJzb3ItbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsKS5hbmltYXRlKHtzY3JvbGxMZWZ0OjB9LDUwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEZJTiBERSBUQUJMQVNcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgXHJcblxyXG5cclxuICAgICAgICAvL0luaXQgZGUgc2VsZWN0MiBzaW4gc2VhcmNoZXIgcG9yIGRlZmF1bHRcclxuICAgICAgICAkKCcuc2VsZWN0MicpLnNlbGVjdDIoe21pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiBJbmZpbml0eX0pO1xyXG4gICAgICAgIC8vSW5pdCBkZSBzY3JvbGxlciBwbHVnaW5cclxuICAgICAgICAkKCcuc2VsZWN0MicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubmFub1wiKS5uYW5vU2Nyb2xsZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAgXHJcbiAgICBcclxuICAgIH0sICBcclxuICAgIFxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBBYm0uaW5pdCgpO1xyXG4gICBcclxufSk7Il0sImZpbGUiOiJhYm0uanMifQ==
