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
