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