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