var Login = {

    init: function () {


        //submit deshabilitado x default SOLO para login ( Se habilitará cuando la validación sea true)
        // $('.login :input[type="submit"]').attr("disabled", true);

        //habilitamos submit si el form es válido
        // enableSumbit()

    
        setTimeout(function() {
            toastr.options = {
                closeButton: true,
                progressBar: false,
                "positionClass": "toast-top-full-width",
                showMethod: 'slideDown',
                extendedTimeOut: 0,
                timeOut: 0,
                tapToDismiss: false
            };
            toastr.info('Los datos de esta web fueron creados con fines puramente demostrativos y no se guardarán en ninguna base de datos. Por este motivo no verás reflejados los cambios realizados. <br> Ingresa con mail:demo@demo.com , contraseña 1 caracter.');

        }, 300);

       

        //Comienzo de validaciones Perejil
        $('.js_form_validation.login').parsley({
            //clases en input
            //COMMENT DSG: Le decimos donde se tienen que agregar los mensajes de error de cada campo ( toast)
            successClass: 'parsley-success',
            errorClass:   'parsley-error',
            errorsWrapper:'<div class="toast parsley toast-error"><button type="button" class="toast-close-button" role="button">×</button></div>',
            errorTemplate:'<div class="toast-message"></div>',

        });

        //COMMENT DEV/DSG:se agrega toast y btn de cierre en error ( TODO:TEXTO CONFIGURABLE 'Revisa tus datos')
        //'Revisa tus datos'=> COMMENT DEV/DSG:Este es un mensaje genérico que le dice al usuario que su campo tiene un error

        window.Parsley.on('field:error', ()=> {

            $(".toast-error.filled").slideDown();
            clsBtn();
            $('.parsley-error').siblings('.default_validation_msj')
            .text('XRevisa tus datos')
            .parents('.form-group').addClass('error')
            // var caps = $(".toast-message").text()

            var mensaje= $("#parsley-id-5").find('.toast-message')
            capitalizeFirstLetter(mensaje.text())

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

        //COMMENT DSG: Mensajes on submit
        //Mensaje de exito en la pantalla newPsw
        $("form.login").submit(function(e){
            e.preventDefault();
            var form = $(this);
            if ($(form).parsley( 'isValid' )){
                window.location.href = 'dashboard-patients.html'; //relative to domain
            }
        });

        //COMMENT DSG: Mensajes on submit
        //Mensaje de exito en la pantalla newPsw
        $("form.new_psw").submit(function(e){
            e.preventDefault();
            var form = $(this);
            if ($(form).parsley( 'isValid' )){
                successMsj('La contraseña se creó correctamente. ')
            }
        });

        //COMMENT DSG: Mensajes on submit
        //Mensaje para submit exitoso en la pantalla forgotPsw
        $("form.forgot_psw").submit(function(e){
            e.preventDefault();
            var form = $(this);
            if ($(form).parsley( 'isValid' )){
                infoMsj('Revisa tu casilla de correo. Te enviamos un mail con las indicaciones para restablecer tu contraseña ')
            }
        });

        

    },

};

//Toggleo el icono/ input para mostrar contraseña
showHidePassword(".password .icon");


/* --- Funciones ----*/

//Forzamos la capitalización de texto dentro de un tag = solo de primer letra
function capitalizeFirstLetter(string) {
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//btn close para toast en validaciones
function clsBtn(){
    var closeBtn = $('.toast.parsley .toast-close-button');
    closeBtn.on('click', (e)=> {
       $((event.target)).parent().slideUp(800);
    });
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

//Habilitar submit p/ validacion exitosa. Momentaneamente solo para login
// function enableSumbit(){
//     $('.login input[type="email"],.login input[type="password"],.login input[type="text"]').keyup(()=> {
//         if ($('.js_form_validation').parsley().isValid()) {
//             $(':input[type="submit"]').attr("disabled", false);
//         } else {
//             $(':input[type="submit"]').attr("disabled", true);
//         }
//     });
// };



$(function () {
    Login.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTG9naW4gPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICAgICAgLy9zdWJtaXQgZGVzaGFiaWxpdGFkbyB4IGRlZmF1bHQgU09MTyBwYXJhIGxvZ2luICggU2UgaGFiaWxpdGFyw6EgY3VhbmRvIGxhIHZhbGlkYWNpw7NuIHNlYSB0cnVlKVxyXG4gICAgICAgIC8vICQoJy5sb2dpbiA6aW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy9oYWJpbGl0YW1vcyBzdWJtaXQgc2kgZWwgZm9ybSBlcyB2w6FsaWRvXHJcbiAgICAgICAgLy8gZW5hYmxlU3VtYml0KClcclxuXHJcbiAgICBcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0b2FzdHIub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvbkNsYXNzXCI6IFwidG9hc3QtdG9wLWZ1bGwtd2lkdGhcIixcclxuICAgICAgICAgICAgICAgIHNob3dNZXRob2Q6ICdzbGlkZURvd24nLFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAwLFxyXG4gICAgICAgICAgICAgICAgdGltZU91dDogMCxcclxuICAgICAgICAgICAgICAgIHRhcFRvRGlzbWlzczogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdG9hc3RyLmluZm8oJ0xvcyBkYXRvcyBkZSBlc3RhIHdlYiBmdWVyb24gY3JlYWRvcyBjb24gZmluZXMgcHVyYW1lbnRlIGRlbW9zdHJhdGl2b3MgeSBubyBzZSBndWFyZGFyw6FuIGVuIG5pbmd1bmEgYmFzZSBkZSBkYXRvcy4gUG9yIGVzdGUgbW90aXZvIG5vIHZlcsOhcyByZWZsZWphZG9zIGxvcyBjYW1iaW9zIHJlYWxpemFkb3MuIDxicj4gSW5ncmVzYSBjb24gbWFpbDpkZW1vQGRlbW8uY29tICwgY29udHJhc2XDsWEgMSBjYXJhY3Rlci4nKTtcclxuXHJcbiAgICAgICAgfSwgMzAwKTtcclxuXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgLy9Db21pZW56byBkZSB2YWxpZGFjaW9uZXMgUGVyZWppbFxyXG4gICAgICAgICQoJy5qc19mb3JtX3ZhbGlkYXRpb24ubG9naW4nKS5wYXJzbGV5KHtcclxuICAgICAgICAgICAgLy9jbGFzZXMgZW4gaW5wdXRcclxuICAgICAgICAgICAgLy9DT01NRU5UIERTRzogTGUgZGVjaW1vcyBkb25kZSBzZSB0aWVuZW4gcXVlIGFncmVnYXIgbG9zIG1lbnNhamVzIGRlIGVycm9yIGRlIGNhZGEgY2FtcG8gKCB0b2FzdClcclxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAncGFyc2xleS1zdWNjZXNzJyxcclxuICAgICAgICAgICAgZXJyb3JDbGFzczogICAncGFyc2xleS1lcnJvcicsXHJcbiAgICAgICAgICAgIGVycm9yc1dyYXBwZXI6JzxkaXYgY2xhc3M9XCJ0b2FzdCBwYXJzbGV5IHRvYXN0LWVycm9yXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0b2FzdC1jbG9zZS1idXR0b25cIiByb2xlPVwiYnV0dG9uXCI+w5c8L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgICAgICAgICBlcnJvclRlbXBsYXRlOic8ZGl2IGNsYXNzPVwidG9hc3QtbWVzc2FnZVwiPjwvZGl2PicsXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0NPTU1FTlQgREVWL0RTRzpzZSBhZ3JlZ2EgdG9hc3QgeSBidG4gZGUgY2llcnJlIGVuIGVycm9yICggVE9ETzpURVhUTyBDT05GSUdVUkFCTEUgJ1JldmlzYSB0dXMgZGF0b3MnKVxyXG4gICAgICAgIC8vJ1JldmlzYSB0dXMgZGF0b3MnPT4gQ09NTUVOVCBERVYvRFNHOkVzdGUgZXMgdW4gbWVuc2FqZSBnZW7DqXJpY28gcXVlIGxlIGRpY2UgYWwgdXN1YXJpbyBxdWUgc3UgY2FtcG8gdGllbmUgdW4gZXJyb3JcclxuXHJcbiAgICAgICAgd2luZG93LlBhcnNsZXkub24oJ2ZpZWxkOmVycm9yJywgKCk9PiB7XHJcblxyXG4gICAgICAgICAgICAkKFwiLnRvYXN0LWVycm9yLmZpbGxlZFwiKS5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgY2xzQnRuKCk7XHJcbiAgICAgICAgICAgICQoJy5wYXJzbGV5LWVycm9yJykuc2libGluZ3MoJy5kZWZhdWx0X3ZhbGlkYXRpb25fbXNqJylcclxuICAgICAgICAgICAgLnRleHQoJ1hSZXZpc2EgdHVzIGRhdG9zJylcclxuICAgICAgICAgICAgLnBhcmVudHMoJy5mb3JtLWdyb3VwJykuYWRkQ2xhc3MoJ2Vycm9yJylcclxuICAgICAgICAgICAgLy8gdmFyIGNhcHMgPSAkKFwiLnRvYXN0LW1lc3NhZ2VcIikudGV4dCgpXHJcblxyXG4gICAgICAgICAgICB2YXIgbWVuc2FqZT0gJChcIiNwYXJzbGV5LWlkLTVcIikuZmluZCgnLnRvYXN0LW1lc3NhZ2UnKVxyXG4gICAgICAgICAgICBjYXBpdGFsaXplRmlyc3RMZXR0ZXIobWVuc2FqZS50ZXh0KCkpXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0NPTU1FTlQgRFNHOlNlIHZhIHRvYXN0IHkgbWplIGN1YW5kbyBzZSBjb21wbGV0YSBleGl0b3NhbWVudGUgY2FtcG9cclxuICAgICAgICB3aW5kb3cuUGFyc2xleS5vbignZmllbGQ6c3VjY2VzcycsICgpPT4ge1xyXG4gICAgICAgICAgICAkKFwiLnRvYXN0LWVycm9yXCIpLnNsaWRlVXAoODAwKTtcclxuICAgICAgICAgICAgJCgnLnBhcnNsZXktc3VjY2VzcycpLnNpYmxpbmdzKCcuZGVmYXVsdF92YWxpZGF0aW9uX21zaicpXHJcbiAgICAgICAgICAgIC50ZXh0KCcnKVxyXG4gICAgICAgICAgICAucGFyZW50cygnLmZvcm0tZ3JvdXAnKS5yZW1vdmVDbGFzcygnZXJyb3InKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2hhcyB1cHBlcmNhc2VcclxuICAgICAgICB3aW5kb3cuUGFyc2xleS5hZGRWYWxpZGF0b3IoJ3VwcGVyY2FzZScsIHtcclxuICAgICAgICAgICAgcmVxdWlyZW1lbnRUeXBlOiAnbnVtYmVyJyxcclxuICAgICAgICAgICAgdmFsaWRhdGVTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlLCByZXF1aXJlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgdXBwZXJjYXNlcyA9IHZhbHVlLm1hdGNoKC9bQS1aXS9nKSB8fCBbXTtcclxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyY2FzZXMubGVuZ3RoID49IHJlcXVpcmVtZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2hhcyBsb3dlcmNhc2VcclxuICAgICAgICB3aW5kb3cuUGFyc2xleS5hZGRWYWxpZGF0b3IoJ2xvd2VyY2FzZScsIHtcclxuICAgICAgICAgICAgcmVxdWlyZW1lbnRUeXBlOiAnbnVtYmVyJyxcclxuICAgICAgICAgICAgdmFsaWRhdGVTdHJpbmc6IGZ1bmN0aW9uKHZhbHVlLCByZXF1aXJlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgbG93ZWNhc2VzID0gdmFsdWUubWF0Y2goL1thLXpdL2cpIHx8IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gbG93ZWNhc2VzLmxlbmd0aCA+PSByZXF1aXJlbWVudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9oYXMgbnVtYmVyXHJcbiAgICAgICAgd2luZG93LlBhcnNsZXkuYWRkVmFsaWRhdG9yKCdudW1iZXInLCB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVtZW50VHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlU3RyaW5nOiBmdW5jdGlvbih2YWx1ZSwgcmVxdWlyZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIG51bWJlcnMgPSB2YWx1ZS5tYXRjaCgvWzAtOV0vZykgfHwgW107XHJcbiAgICAgICAgICAgIHJldHVybiBudW1iZXJzLmxlbmd0aCA+PSByZXF1aXJlbWVudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9oYXMgc3BlY2lhbCBjaGFyXHJcbiAgICAgICAgd2luZG93LlBhcnNsZXkuYWRkVmFsaWRhdG9yKCdzcGVjaWFsJywge1xyXG4gICAgICAgICAgICByZXF1aXJlbWVudFR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZVN0cmluZzogZnVuY3Rpb24odmFsdWUsIHJlcXVpcmVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzcGVjaWFscyA9IHZhbHVlLm1hdGNoKC9bXmEtekEtWjAtOV0vZykgfHwgW107XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjaWFscy5sZW5ndGggPj0gcmVxdWlyZW1lbnQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQ09NTUVOVCBEU0c6IE1lbnNhamVzIG9uIHN1Ym1pdFxyXG4gICAgICAgIC8vTWVuc2FqZSBkZSBleGl0byBlbiBsYSBwYW50YWxsYSBuZXdQc3dcclxuICAgICAgICAkKFwiZm9ybS5sb2dpblwiKS5zdWJtaXQoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoJChmb3JtKS5wYXJzbGV5KCAnaXNWYWxpZCcgKSl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdkYXNoYm9hcmQtcGF0aWVudHMuaHRtbCc7IC8vcmVsYXRpdmUgdG8gZG9tYWluXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9DT01NRU5UIERTRzogTWVuc2FqZXMgb24gc3VibWl0XHJcbiAgICAgICAgLy9NZW5zYWplIGRlIGV4aXRvIGVuIGxhIHBhbnRhbGxhIG5ld1Bzd1xyXG4gICAgICAgICQoXCJmb3JtLm5ld19wc3dcIikuc3VibWl0KGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgaWYgKCQoZm9ybSkucGFyc2xleSggJ2lzVmFsaWQnICkpe1xyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc01zaignTGEgY29udHJhc2XDsWEgc2UgY3Jlw7MgY29ycmVjdGFtZW50ZS4gJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0NPTU1FTlQgRFNHOiBNZW5zYWplcyBvbiBzdWJtaXRcclxuICAgICAgICAvL01lbnNhamUgcGFyYSBzdWJtaXQgZXhpdG9zbyBlbiBsYSBwYW50YWxsYSBmb3Jnb3RQc3dcclxuICAgICAgICAkKFwiZm9ybS5mb3Jnb3RfcHN3XCIpLnN1Ym1pdChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGlmICgkKGZvcm0pLnBhcnNsZXkoICdpc1ZhbGlkJyApKXtcclxuICAgICAgICAgICAgICAgIGluZm9Nc2ooJ1JldmlzYSB0dSBjYXNpbGxhIGRlIGNvcnJlby4gVGUgZW52aWFtb3MgdW4gbWFpbCBjb24gbGFzIGluZGljYWNpb25lcyBwYXJhIHJlc3RhYmxlY2VyIHR1IGNvbnRyYXNlw7FhICcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgfSxcclxuXHJcbn07XHJcblxyXG4vL1RvZ2dsZW8gZWwgaWNvbm8vIGlucHV0IHBhcmEgbW9zdHJhciBjb250cmFzZcOxYVxyXG5zaG93SGlkZVBhc3N3b3JkKFwiLnBhc3N3b3JkIC5pY29uXCIpO1xyXG5cclxuXHJcbi8qIC0tLSBGdW5jaW9uZXMgLS0tLSovXHJcblxyXG4vL0ZvcnphbW9zIGxhIGNhcGl0YWxpemFjacOzbiBkZSB0ZXh0byBkZW50cm8gZGUgdW4gdGFnID0gc29sbyBkZSBwcmltZXIgbGV0cmFcclxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xyXG4gICAgc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuXHJcbi8vYnRuIGNsb3NlIHBhcmEgdG9hc3QgZW4gdmFsaWRhY2lvbmVzXHJcbmZ1bmN0aW9uIGNsc0J0bigpe1xyXG4gICAgdmFyIGNsb3NlQnRuID0gJCgnLnRvYXN0LnBhcnNsZXkgLnRvYXN0LWNsb3NlLWJ1dHRvbicpO1xyXG4gICAgY2xvc2VCdG4ub24oJ2NsaWNrJywgKGUpPT4ge1xyXG4gICAgICAgJCgoZXZlbnQudGFyZ2V0KSkucGFyZW50KCkuc2xpZGVVcCg4MDApO1xyXG4gICAgfSk7XHJcbn07XHJcbi8vbW9zdHJhciBjb250cmFzZcOxYVxyXG5mdW5jdGlvbiBzaG93SGlkZVBhc3N3b3JkKHBzdyl7XHJcbiAgICAkKHBzdykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdpY29uLXBhc3N3b3JkLWludmlzaWJsZScpKXtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuc2libGluZ3MoXCJpbnB1dFt0eXBlPXBhc3N3b3JkXVwiKS5hdHRyKCd0eXBlJywndGV4dCcpXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJpY29uLXBhc3N3b3JkLWludmlzaWJsZVwiKS5hZGRDbGFzcyhcImljb24tcGFzc3dvcmQtdmlzaWJsZVwiKVxyXG5cclxuICAgICAgICB9ZWxzZSBpZigkKHRoaXMpLmhhc0NsYXNzKCdpY29uLXBhc3N3b3JkLXZpc2libGUnKSl7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKFwiaW5wdXRbdHlwZT10ZXh0XVwiKS5hdHRyKCd0eXBlJywncGFzc3dvcmQnKVxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaWNvbi1wYXNzd29yZC12aXNpYmxlXCIpLmFkZENsYXNzKFwiaWNvbi1wYXNzd29yZC1pbnZpc2libGVcIilcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vSGFiaWxpdGFyIHN1Ym1pdCBwLyB2YWxpZGFjaW9uIGV4aXRvc2EuIE1vbWVudGFuZWFtZW50ZSBzb2xvIHBhcmEgbG9naW5cclxuLy8gZnVuY3Rpb24gZW5hYmxlU3VtYml0KCl7XHJcbi8vICAgICAkKCcubG9naW4gaW5wdXRbdHlwZT1cImVtYWlsXCJdLC5sb2dpbiBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sLmxvZ2luIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJykua2V5dXAoKCk9PiB7XHJcbi8vICAgICAgICAgaWYgKCQoJy5qc19mb3JtX3ZhbGlkYXRpb24nKS5wYXJzbGV5KCkuaXNWYWxpZCgpKSB7XHJcbi8vICAgICAgICAgICAgICQoJzppbnB1dFt0eXBlPVwic3VibWl0XCJdJykuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAkKCc6aW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gfTtcclxuXHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBMb2dpbi5pbml0KCk7XHJcbn0pOyJdLCJmaWxlIjoibG9naW4uanMifQ==
