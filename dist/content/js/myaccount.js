var myaccount = {
    
    init: function () {
    //Toggleo el icono/ input para mostrar contraseña
    showHidePassword(".password .icon");

    //habilitamos submit si el form es válido
    enableSumbit()

    
    //Creamos tabs en mobile
    var userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    
    if(userAgent){
        $('.tab_group').addClass('tab_pane') 
        $('.group_1').addClass('active') 
    }
     
    // -----------------------------------------------------------------------------
    // COMIENZO DE VALIDACIONES
    // ----------------------------------------------------------------------------- 

    //Comienzo de validaciones Perejil 
    $('.js_form_validation.my_account').parsley({
        //clases en input
        //COMMENT DSG: Le decimos donde se tienen que agregar los mensajes de error de cada campo ( toast)
        successClass: 'parsley-success',
        errorClass:   'parsley-error',
        errorsWrapper:'<div class="toast parsley toast-error"><button type="button" class="toast-close-button" role="button">×</button></div>',
        errorTemplate:'<div class="toast-message"></div>',
        
    });

    //Al error de validaciones 
    window.Parsley.on('field:error', ()=> {
            
        $(".toast-error.filled").slideDown();
        clsBtn();
        $('.parsley-error').siblings('.default_validation_msj')
        .text('XRevisa tus datos')
        .parents('.form-group').addClass('error')
        // var caps = $(".toast-message").text()  
        
        var mensaje= $("#parsley-id-5").find('.toast-message')
        

    });
    
    //COMMENT DSG:Se va toast y mje cuando se completa exitosamente campo
    window.Parsley.on('field:success', ()=> {
        $(".toast-error").slideUp(800);
        $('.parsley-success').siblings('.default_validation_msj')
        .text('')
        .parents('.form-group').removeClass('error')
    });
    //has uppercase
    window.Parsley.addValidator('uppercase', {
        requirementType: 'number',
        validateString: function(value, requirement) {
        var uppercases = value.match(/[A-Z]/g) || [];
        return uppercases.length >= requirement;
        },
    });

    //has lowercase
    window.Parsley.addValidator('lowercase', {
        requirementType: 'number',
        validateString: function(value, requirement) {
        var lowecases = value.match(/[a-z]/g) || [];
        return lowecases.length >= requirement;
        },
    });

    //has number
    window.Parsley.addValidator('number', {
        requirementType: 'number',
        validateString: function(value, requirement) {
        var numbers = value.match(/[0-9]/g) || [];
        return numbers.length >= requirement;
        },
    });

    //has special char
    window.Parsley.addValidator('special', {
        requirementType: 'number',
        validateString: function(value, requirement) {
        var specials = value.match(/[^a-zA-Z0-9]/g) || [];
        return specials.length >= requirement;
        },
    });

     // -----------------------------------------------------------------------------
    // FIN DE VALIDACIONES
    // ----------------------------------------------------------------------------- 
    // -----------------------------------------------------------------------------
    // MYACCOUNT.JS
    // -----------------------------------------------------------------------------
        //INFO: Deshabilito los tabs/steps ante cualquier cambio (hasta que se guarden)
        $('.myaccount form').change(function () {
            $('.nav_link').attr("disabled", true)
        });

        $('.myaccount .js_confirm').click(function () {
            //utilizar disabled cuando los datos fueron guardados en DB
            $('.nav_link').attr("disabled", false)
        });
          //INFO: Mensaje de error para tabs/steps deshabilitados TODO DEV: Configuración
          $(".myaccount .js_form_validation .nav_item").on('click', ()=> {
            if($('.nav_link').is(":disabled")){
                errorMsjTimeDuration('XLos datos son invalidos, están incompletos o no han sido guardados. Para poder continuar debe guardar los cambios. ')
            }
        });
    },  
   
    
   
};
//mostrar contraseña
function showHidePassword(psw){
    $(psw).on('click', function(){
        if($(this).hasClass('icon-password-invisible')){
    
            $(this).siblings("input[type=password]").attr('type','text')
            $(this).removeClass("icon-password-invisible").addClass("icon-password-visible")
    
        }else if($(this).hasClass('icon-password-visible')){
    
            $(this).siblings("input[type=text]").attr('type','password')
            $(this).removeClass("icon-password-visible").addClass("icon-password-invisible")
        }
    });
};

//btn close para toast en validaciones
function clsBtn(){
    var closeBtn = $('.toast.parsley .toast-close-button');
    closeBtn.on('click', (e)=> {
       $((event.target)).parent().slideUp(800);
    });
};
//Habilitar submit p/ validacion exitosa. Momentaneamente solo para login
//TODO DEV: Agregar disabled true a los botones una vez se haya guardado la info en DB
function enableSumbit(){
    $('.myaccount input').keyup(()=> {
        $(':input[type="submit"],:input[type="button"]').attr("disabled", false);
    });

     //Si hay un cambio de imagen se habilitan los botones para guardar o cancelar
     $(':input[type="file"]').on('click', function(){
        $(':input[type="submit"],:input[type="button"]').attr("disabled", false);
    })
};


$(function () {
    myaccount.init();
   
});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJteWFjY291bnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG15YWNjb3VudCA9IHtcclxuICAgIFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgXHJcblxyXG4gICAgfSwgIFxyXG4gICAgXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIG15YWNjb3VudC5pbml0KCk7XHJcbiAgIFxyXG59KTtcclxuXHJcbiJdLCJmaWxlIjoibXlhY2NvdW50LmpzIn0=

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJteWFjY291bnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG15YWNjb3VudCA9IHtcclxuICAgIFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9Ub2dnbGVvIGVsIGljb25vLyBpbnB1dCBwYXJhIG1vc3RyYXIgY29udHJhc2XDsWFcclxuICAgIHNob3dIaWRlUGFzc3dvcmQoXCIucGFzc3dvcmQgLmljb25cIik7XHJcblxyXG4gICAgLy9oYWJpbGl0YW1vcyBzdWJtaXQgc2kgZWwgZm9ybSBlcyB2w6FsaWRvXHJcbiAgICBlbmFibGVTdW1iaXQoKVxyXG5cclxuICAgIFxyXG4gICAgLy9DcmVhbW9zIHRhYnMgZW4gbW9iaWxlXHJcbiAgICB2YXIgdXNlckFnZW50ID0gL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIFxyXG4gICAgXHJcbiAgICBpZih1c2VyQWdlbnQpe1xyXG4gICAgICAgICQoJy50YWJfZ3JvdXAnKS5hZGRDbGFzcygndGFiX3BhbmUnKSBcclxuICAgICAgICAkKCcuZ3JvdXBfMScpLmFkZENsYXNzKCdhY3RpdmUnKSBcclxuICAgIH1cclxuICAgICBcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBDT01JRU5aTyBERSBWQUxJREFDSU9ORVNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuICAgIC8vQ29taWVuem8gZGUgdmFsaWRhY2lvbmVzIFBlcmVqaWwgXHJcbiAgICAkKCcuanNfZm9ybV92YWxpZGF0aW9uLm15X2FjY291bnQnKS5wYXJzbGV5KHtcclxuICAgICAgICAvL2NsYXNlcyBlbiBpbnB1dFxyXG4gICAgICAgIC8vQ09NTUVOVCBEU0c6IExlIGRlY2ltb3MgZG9uZGUgc2UgdGllbmVuIHF1ZSBhZ3JlZ2FyIGxvcyBtZW5zYWplcyBkZSBlcnJvciBkZSBjYWRhIGNhbXBvICggdG9hc3QpXHJcbiAgICAgICAgc3VjY2Vzc0NsYXNzOiAncGFyc2xleS1zdWNjZXNzJyxcclxuICAgICAgICBlcnJvckNsYXNzOiAgICdwYXJzbGV5LWVycm9yJyxcclxuICAgICAgICBlcnJvcnNXcmFwcGVyOic8ZGl2IGNsYXNzPVwidG9hc3QgcGFyc2xleSB0b2FzdC1lcnJvclwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidG9hc3QtY2xvc2UtYnV0dG9uXCIgcm9sZT1cImJ1dHRvblwiPsOXPC9idXR0b24+PC9kaXY+JyxcclxuICAgICAgICBlcnJvclRlbXBsYXRlOic8ZGl2IGNsYXNzPVwidG9hc3QtbWVzc2FnZVwiPjwvZGl2PicsXHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0FsIGVycm9yIGRlIHZhbGlkYWNpb25lcyBcclxuICAgIHdpbmRvdy5QYXJzbGV5Lm9uKCdmaWVsZDplcnJvcicsICgpPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAkKFwiLnRvYXN0LWVycm9yLmZpbGxlZFwiKS5zbGlkZURvd24oKTtcclxuICAgICAgICBjbHNCdG4oKTtcclxuICAgICAgICAkKCcucGFyc2xleS1lcnJvcicpLnNpYmxpbmdzKCcuZGVmYXVsdF92YWxpZGF0aW9uX21zaicpXHJcbiAgICAgICAgLnRleHQoJ1hSZXZpc2EgdHVzIGRhdG9zJylcclxuICAgICAgICAucGFyZW50cygnLmZvcm0tZ3JvdXAnKS5hZGRDbGFzcygnZXJyb3InKVxyXG4gICAgICAgIC8vIHZhciBjYXBzID0gJChcIi50b2FzdC1tZXNzYWdlXCIpLnRleHQoKSAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1lbnNhamU9ICQoXCIjcGFyc2xleS1pZC01XCIpLmZpbmQoJy50b2FzdC1tZXNzYWdlJylcclxuICAgICAgICBcclxuXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy9DT01NRU5UIERTRzpTZSB2YSB0b2FzdCB5IG1qZSBjdWFuZG8gc2UgY29tcGxldGEgZXhpdG9zYW1lbnRlIGNhbXBvXHJcbiAgICB3aW5kb3cuUGFyc2xleS5vbignZmllbGQ6c3VjY2VzcycsICgpPT4ge1xyXG4gICAgICAgICQoXCIudG9hc3QtZXJyb3JcIikuc2xpZGVVcCg4MDApO1xyXG4gICAgICAgICQoJy5wYXJzbGV5LXN1Y2Nlc3MnKS5zaWJsaW5ncygnLmRlZmF1bHRfdmFsaWRhdGlvbl9tc2onKVxyXG4gICAgICAgIC50ZXh0KCcnKVxyXG4gICAgICAgIC5wYXJlbnRzKCcuZm9ybS1ncm91cCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpXHJcbiAgICB9KTtcclxuICAgIC8vaGFzIHVwcGVyY2FzZVxyXG4gICAgd2luZG93LlBhcnNsZXkuYWRkVmFsaWRhdG9yKCd1cHBlcmNhc2UnLCB7XHJcbiAgICAgICAgcmVxdWlyZW1lbnRUeXBlOiAnbnVtYmVyJyxcclxuICAgICAgICB2YWxpZGF0ZVN0cmluZzogZnVuY3Rpb24odmFsdWUsIHJlcXVpcmVtZW50KSB7XHJcbiAgICAgICAgdmFyIHVwcGVyY2FzZXMgPSB2YWx1ZS5tYXRjaCgvW0EtWl0vZykgfHwgW107XHJcbiAgICAgICAgcmV0dXJuIHVwcGVyY2FzZXMubGVuZ3RoID49IHJlcXVpcmVtZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2hhcyBsb3dlcmNhc2VcclxuICAgIHdpbmRvdy5QYXJzbGV5LmFkZFZhbGlkYXRvcignbG93ZXJjYXNlJywge1xyXG4gICAgICAgIHJlcXVpcmVtZW50VHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgdmFsaWRhdGVTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlLCByZXF1aXJlbWVudCkge1xyXG4gICAgICAgIHZhciBsb3dlY2FzZXMgPSB2YWx1ZS5tYXRjaCgvW2Etel0vZykgfHwgW107XHJcbiAgICAgICAgcmV0dXJuIGxvd2VjYXNlcy5sZW5ndGggPj0gcmVxdWlyZW1lbnQ7XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vaGFzIG51bWJlclxyXG4gICAgd2luZG93LlBhcnNsZXkuYWRkVmFsaWRhdG9yKCdudW1iZXInLCB7XHJcbiAgICAgICAgcmVxdWlyZW1lbnRUeXBlOiAnbnVtYmVyJyxcclxuICAgICAgICB2YWxpZGF0ZVN0cmluZzogZnVuY3Rpb24odmFsdWUsIHJlcXVpcmVtZW50KSB7XHJcbiAgICAgICAgdmFyIG51bWJlcnMgPSB2YWx1ZS5tYXRjaCgvWzAtOV0vZykgfHwgW107XHJcbiAgICAgICAgcmV0dXJuIG51bWJlcnMubGVuZ3RoID49IHJlcXVpcmVtZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2hhcyBzcGVjaWFsIGNoYXJcclxuICAgIHdpbmRvdy5QYXJzbGV5LmFkZFZhbGlkYXRvcignc3BlY2lhbCcsIHtcclxuICAgICAgICByZXF1aXJlbWVudFR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgIHZhbGlkYXRlU3RyaW5nOiBmdW5jdGlvbih2YWx1ZSwgcmVxdWlyZW1lbnQpIHtcclxuICAgICAgICB2YXIgc3BlY2lhbHMgPSB2YWx1ZS5tYXRjaCgvW15hLXpBLVowLTldL2cpIHx8IFtdO1xyXG4gICAgICAgIHJldHVybiBzcGVjaWFscy5sZW5ndGggPj0gcmVxdWlyZW1lbnQ7XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gRklOIERFIFZBTElEQUNJT05FU1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gTVlBQ0NPVU5ULkpTXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vSU5GTzogRGVzaGFiaWxpdG8gbG9zIHRhYnMvc3RlcHMgYW50ZSBjdWFscXVpZXIgY2FtYmlvIChoYXN0YSBxdWUgc2UgZ3VhcmRlbilcclxuICAgICAgICAkKCcubXlhY2NvdW50IGZvcm0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubmF2X2xpbmsnKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLm15YWNjb3VudCAuanNfY29uZmlybScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy91dGlsaXphciBkaXNhYmxlZCBjdWFuZG8gbG9zIGRhdG9zIGZ1ZXJvbiBndWFyZGFkb3MgZW4gREJcclxuICAgICAgICAgICAgJCgnLm5hdl9saW5rJykuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgLy9JTkZPOiBNZW5zYWplIGRlIGVycm9yIHBhcmEgdGFicy9zdGVwcyBkZXNoYWJpbGl0YWRvcyBUT0RPIERFVjogQ29uZmlndXJhY2nDs25cclxuICAgICAgICAgICQoXCIubXlhY2NvdW50IC5qc19mb3JtX3ZhbGlkYXRpb24gLm5hdl9pdGVtXCIpLm9uKCdjbGljaycsICgpPT4ge1xyXG4gICAgICAgICAgICBpZigkKCcubmF2X2xpbmsnKS5pcyhcIjpkaXNhYmxlZFwiKSl7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1zalRpbWVEdXJhdGlvbignWExvcyBkYXRvcyBzb24gaW52YWxpZG9zLCBlc3TDoW4gaW5jb21wbGV0b3MgbyBubyBoYW4gc2lkbyBndWFyZGFkb3MuIFBhcmEgcG9kZXIgY29udGludWFyIGRlYmUgZ3VhcmRhciBsb3MgY2FtYmlvcy4gJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgIFxyXG4gICBcclxuICAgIFxyXG4gICBcclxufTtcclxuLy9tb3N0cmFyIGNvbnRyYXNlw7FhXHJcbmZ1bmN0aW9uIHNob3dIaWRlUGFzc3dvcmQocHN3KXtcclxuICAgICQocHN3KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2ljb24tcGFzc3dvcmQtaW52aXNpYmxlJykpe1xyXG4gICAgXHJcbiAgICAgICAgICAgICQodGhpcykuc2libGluZ3MoXCJpbnB1dFt0eXBlPXBhc3N3b3JkXVwiKS5hdHRyKCd0eXBlJywndGV4dCcpXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJpY29uLXBhc3N3b3JkLWludmlzaWJsZVwiKS5hZGRDbGFzcyhcImljb24tcGFzc3dvcmQtdmlzaWJsZVwiKVxyXG4gICAgXHJcbiAgICAgICAgfWVsc2UgaWYoJCh0aGlzKS5oYXNDbGFzcygnaWNvbi1wYXNzd29yZC12aXNpYmxlJykpe1xyXG4gICAgXHJcbiAgICAgICAgICAgICQodGhpcykuc2libGluZ3MoXCJpbnB1dFt0eXBlPXRleHRdXCIpLmF0dHIoJ3R5cGUnLCdwYXNzd29yZCcpXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJpY29uLXBhc3N3b3JkLXZpc2libGVcIikuYWRkQ2xhc3MoXCJpY29uLXBhc3N3b3JkLWludmlzaWJsZVwiKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy9idG4gY2xvc2UgcGFyYSB0b2FzdCBlbiB2YWxpZGFjaW9uZXNcclxuZnVuY3Rpb24gY2xzQnRuKCl7XHJcbiAgICB2YXIgY2xvc2VCdG4gPSAkKCcudG9hc3QucGFyc2xleSAudG9hc3QtY2xvc2UtYnV0dG9uJyk7XHJcbiAgICBjbG9zZUJ0bi5vbignY2xpY2snLCAoZSk9PiB7XHJcbiAgICAgICAkKChldmVudC50YXJnZXQpKS5wYXJlbnQoKS5zbGlkZVVwKDgwMCk7XHJcbiAgICB9KTtcclxufTtcclxuLy9IYWJpbGl0YXIgc3VibWl0IHAvIHZhbGlkYWNpb24gZXhpdG9zYS4gTW9tZW50YW5lYW1lbnRlIHNvbG8gcGFyYSBsb2dpblxyXG4vL1RPRE8gREVWOiBBZ3JlZ2FyIGRpc2FibGVkIHRydWUgYSBsb3MgYm90b25lcyB1bmEgdmV6IHNlIGhheWEgZ3VhcmRhZG8gbGEgaW5mbyBlbiBEQlxyXG5mdW5jdGlvbiBlbmFibGVTdW1iaXQoKXtcclxuICAgICQoJy5teWFjY291bnQgaW5wdXQnKS5rZXl1cCgoKT0+IHtcclxuICAgICAgICAkKCc6aW5wdXRbdHlwZT1cInN1Ym1pdFwiXSw6aW5wdXRbdHlwZT1cImJ1dHRvblwiXScpLmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAgLy9TaSBoYXkgdW4gY2FtYmlvIGRlIGltYWdlbiBzZSBoYWJpbGl0YW4gbG9zIGJvdG9uZXMgcGFyYSBndWFyZGFyIG8gY2FuY2VsYXJcclxuICAgICAkKCc6aW5wdXRbdHlwZT1cImZpbGVcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJzppbnB1dFt0eXBlPVwic3VibWl0XCJdLDppbnB1dFt0eXBlPVwiYnV0dG9uXCJdJykuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgIH0pXHJcbn07XHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBteWFjY291bnQuaW5pdCgpO1xyXG4gICBcclxufSk7XHJcblxyXG5cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pSWl3aWMyOTFjbU5sY3lJNld5SnRlV0ZqWTI5MWJuUXVhbk1pWFN3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWRtRnlJRzE1WVdOamIzVnVkQ0E5SUh0Y2NseHVJQ0FnSUZ4eVhHNGdJQ0FnYVc1cGREb2dablZ1WTNScGIyNGdLQ2tnZTF4eVhHNGdJQ0FnWEhKY2JseHlYRzRnSUNBZ2ZTd2dJRnh5WEc0Z0lDQWdYSEpjYm4wN1hISmNibHh5WEc1Y2NseHVYSEpjYmx4eVhHNGtLR1oxYm1OMGFXOXVJQ2dwSUh0Y2NseHVJQ0FnSUcxNVlXTmpiM1Z1ZEM1cGJtbDBLQ2s3WEhKY2JpQWdJRnh5WEc1OUtUdGNjbHh1WEhKY2JpSmRMQ0ptYVd4bElqb2liWGxoWTJOdmRXNTBMbXB6SW4wPVxyXG4iXSwiZmlsZSI6Im15YWNjb3VudC5qcyJ9
