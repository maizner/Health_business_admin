var modify = {
    
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

        //INFO : Clases para estilos de error
        window.Parsley.on('field:error', ()=> {
            $('.parsley-error').parents('.form-group')
            .addClass('error')
            .removeClass('success')
        });

        //INFO: Clases para estilos de éxito
        window.Parsley.on('field:success', ()=> {
            $('.parsley-success').parents('.form-group')
            .addClass('success')
            .removeClass('error')
        });

        // -----------------------------------------------------------------------------
        // MODIFY.JS
        // -----------------------------------------------------------------------------
        //INFO: Deshabilito los tabs/steps ante cualquier cambio (hasta que se guarden)
        $('.modify form').change(function () {
            $('.nav_step').attr("disabled", true)
        });

        //INFO: Mensaje de error para tabs/steps deshabilitados TODO DEV: Configuración
        $(".modify .second_nav_tabs.editable_tabs .nav_item").on('click', ()=> {
            if($('.nav_step').is(":disabled")){
                errorMsjTimeDuration('XLos datos son invalidos, están incompletos o no han sido guardados. Para poder continuar debe guardar los cambios. ')
            }
        });

        //INFO: Habilito tabs/steps si es valido el form + mensaje de exito. TODO DEV: Configuración 
        $(".js_form_validation.editar").submit(function(e){
            e.preventDefault();
            var form = $(this);
            if ($(form).parsley( 'isValid' )){
                
                $('.nav_step').attr("disabled", false)
                $('.modal_confirm').modal('show')
                //TODO DEV: una vez se apreta confirmar, mostrar toast comentado con texto(successMsjTimeDuration)     
                // successMsjTimeDuration('XSus datos se guardaron correctamente ')
            }
        });

        
        // -----------------------------------------------------------------------------
        // MODIFY.JS
        // -----------------------------------------------------------------------------

        // -----------------------------------------------------------------------------
        // FIN DE VALIDACIONES
        // ----------------------------------------------------------------------------- 
            
         //Init de select2 para combos y etiquetas
         $('.select2').select2({minimumResultsForSearch: Infinity});
         $('.select2').on('click', function(){
             $(".nano").nanoScroller();
         });

    },  
    
};


$(function () {
    modify.init();
   
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtb2RpZnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1vZGlmeSA9IHtcclxuICAgIFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gQ09NSUVOWk8gREUgVkFMSURBQ0lPTkVTXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcblxyXG4gICAgICAgICQoJy5qc19mb3JtX3ZhbGlkYXRpb24nKS5wYXJzbGV5KHtcclxuICAgICAgICAgICAgLy9jbGFzZXMgZW4gaW5wdXRcclxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAncGFyc2xleS1zdWNjZXNzJyxcclxuICAgICAgICAgICAgZXJyb3JDbGFzczogICAncGFyc2xleS1lcnJvcicsXHJcbiAgICAgICAgICAgIGVycm9yc1dyYXBwZXI6JzxzcGFuIGNsYXNzPVwiZGVmYXVsdF92YWxpZGF0aW9uX21zalwiPjwvc3Bhbj4nLFxyXG4gICAgICAgICAgICBlcnJvclRlbXBsYXRlOic8c3BhbiBjbGFzcz1cInZhbGlkYXRpb24tbWVzc2FnZVwiPjwvc3Bhbj4nLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9JTkZPIDogQ2xhc2VzIHBhcmEgZXN0aWxvcyBkZSBlcnJvclxyXG4gICAgICAgIHdpbmRvdy5QYXJzbGV5Lm9uKCdmaWVsZDplcnJvcicsICgpPT4ge1xyXG4gICAgICAgICAgICAkKCcucGFyc2xleS1lcnJvcicpLnBhcmVudHMoJy5mb3JtLWdyb3VwJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdlcnJvcicpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc3VjY2VzcycpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vSU5GTzogQ2xhc2VzIHBhcmEgZXN0aWxvcyBkZSDDqXhpdG9cclxuICAgICAgICB3aW5kb3cuUGFyc2xleS5vbignZmllbGQ6c3VjY2VzcycsICgpPT4ge1xyXG4gICAgICAgICAgICAkKCcucGFyc2xleS1zdWNjZXNzJykucGFyZW50cygnLmZvcm0tZ3JvdXAnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2Vycm9yJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBNT0RJRlkuSlNcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vSU5GTzogRGVzaGFiaWxpdG8gbG9zIHRhYnMvc3RlcHMgYW50ZSBjdWFscXVpZXIgY2FtYmlvIChoYXN0YSBxdWUgc2UgZ3VhcmRlbilcclxuICAgICAgICAkKCcubW9kaWZ5IGZvcm0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubmF2X3N0ZXAnKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9JTkZPOiBNZW5zYWplIGRlIGVycm9yIHBhcmEgdGFicy9zdGVwcyBkZXNoYWJpbGl0YWRvcyBUT0RPIERFVjogQ29uZmlndXJhY2nDs25cclxuICAgICAgICAkKFwiLm1vZGlmeSAuc2Vjb25kX25hdl90YWJzLmVkaXRhYmxlX3RhYnMgLm5hdl9pdGVtXCIpLm9uKCdjbGljaycsICgpPT4ge1xyXG4gICAgICAgICAgICBpZigkKCcubmF2X3N0ZXAnKS5pcyhcIjpkaXNhYmxlZFwiKSl7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zalRpbWVEdXJhdGlvbignWExvcyBkYXRvcyBzb24gaW52YWxpZG9zLCBlc3TDoW4gaW5jb21wbGV0b3MgbyBubyBoYW4gc2lkbyBndWFyZGFkb3MuIFBhcmEgcG9kZXIgY29udGludWFyIGRlYmUgZ3VhcmRhciBsb3MgY2FtYmlvcy4gJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0lORk86IEhhYmlsaXRvIHRhYnMvc3RlcHMgc2kgZXMgdmFsaWRvIGVsIGZvcm0gKyBtZW5zYWplIGRlIGV4aXRvLiBUT0RPIERFVjogQ29uZmlndXJhY2nDs24gXHJcbiAgICAgICAgJChcIi5qc19mb3JtX3ZhbGlkYXRpb24uZWRpdGFyXCIpLnN1Ym1pdChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGlmICgkKGZvcm0pLnBhcnNsZXkoICdpc1ZhbGlkJyApKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdl9zdGVwJykuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgJCgnLm1vZGFsX2NvbmZpcm0nKS5tb2RhbCgnc2hvdycpXHJcbiAgICAgICAgICAgICAgICAvL1RPRE8gREVWOiB1bmEgdmV6IHNlIGFwcmV0YSBjb25maXJtYXIsIG1vc3RyYXIgdG9hc3QgY29tZW50YWRvIGNvbiB0ZXh0byhzdWNjZXNzTXNqVGltZUR1cmF0aW9uKSAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzTXNqVGltZUR1cmF0aW9uKCdYU3VzIGRhdG9zIHNlIGd1YXJkYXJvbiBjb3JyZWN0YW1lbnRlICcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBNT0RJRlkuSlNcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEZJTiBERSBWQUxJREFDSU9ORVNcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgIC8vSW5pdCBkZSBzZWxlY3QyIHBhcmEgY29tYm9zIHkgZXRpcXVldGFzXHJcbiAgICAgICAgICQoJy5zZWxlY3QyJykuc2VsZWN0Mih7bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IEluZmluaXR5fSk7XHJcbiAgICAgICAgICQoJy5zZWxlY3QyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICQoXCIubmFub1wiKS5uYW5vU2Nyb2xsZXIoKTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgfSwgIFxyXG4gICAgXHJcbn07XHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBtb2RpZnkuaW5pdCgpO1xyXG4gICBcclxufSk7Il0sImZpbGUiOiJtb2RpZnkuanMifQ==
