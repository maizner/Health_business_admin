var layout = {
    
    init: function () {
        
        // inicializo tooltips ( INFO: lo demoramos unos segundos para asegurarnos que haya cargado todo antes del init)
        setTimeout(function(){ $('[data-toggle="tooltip"]').tooltip(); }, 200);

        //Links de navegación
        activeLink('.navbar .nav_item')

        //Colapsar sidebar
        $('.js_collapse_sidebar').on('click', (e)=> {
            $((event.target)).parents('.sidebar').removeClass('show');
        });

        //target,class container
        toggleActiveClass('.js_menu_toggler','.dashboard_menu');

       //confirmación para completar el formulario
        $('.js_confirm').on('click', (e)=> {
            $('.modal_confirm').modal()
        });

        //Al Éxito
        $('.btn.js_accept').on('click', (e)=> {
            $('.modal_confirm').modal('hide')
            $('.modal_success').modal()
        });

        //Este script se agrega solo para modal de confirmación.
        $('.modal_confirm').on('shown.bs.modal', function (e) {
            $('.modal-backdrop').addClass('darkest');
        })
        $('.modal_confirm').on('hiden.bs.modal', function (e) {
            $('.modal-backdrop').removeClass('darkest');
        })
        
        //Sidebar right show and scrollbar init
        $('#drop-notifications').on('click', function(){
            $('[aria-labelledby=drop-notifications]').addClass("show")
            setTimeout(function () {
                $(".nano").nanoScroller();
            }, 100)
        })
        
        $('.icon-close').on('click', function(){
            $('[aria-labelledby=drop-notifications]').removeClass("show")
        })

        $('.notification_menu').on('click', function (event) {
                event.stopPropagation();
        });

        //Apertura de notificaciones en mobile.
        if( isMobile.any() ){
            $('.notification_item').on('click', function() {
                $(this).toggleClass('sidebar-item_expanded')
            })
        };
    },  

    
};

// -----------------------------------------------------------------------------
//COMIENZO DE TOASTS
// ----------------------------------------------------------------------------- 
    // -----------------------------------------------------------------------------
    //Mensajes Toast con botón de cierre X para uso de desarrollo 
    // ----------------------------------------------------------------------------- 

    function errorMsj(msj){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "800",
            "timeOut": "0",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };
        toastr.error(msj);
    };
    function infoMsj(msj){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "800",
            "timeOut": "0",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };
        toastr.info(msj);
    };
    function successMsj(msj){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "800",
            "timeOut": "0",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
            
        };
        toastr.success(msj);
    };
    
    // -----------------------------------------------------------------------------
    //Mensajes Toast con linea de tiempo(con auto cierre) para uso de desarrollo 
    // ----------------------------------------------------------------------------- 
    function errorMsjTimeDuration(msj){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "800",
            "timeOut": "3000",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };
        toastr.error(msj);
    };

    function successMsjTimeDuration(msj){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "800",
            "timeOut": "3000",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
            
        };
        toastr.success(msj);
    };

    function infoMsjTimeDuration(msj){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "800",
            "timeOut": "3000",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
            
        };
        toastr.info(msj);
    };

// -----------------------------------------------------------------------------
//FIN DE TOASTS
// ----------------------------------------------------------------------------- 
// -----------------------------------------------------------------------------
//FUNCIONES
// ----------------------------------------------------------------------------- 
//Link activo de nav
function activeLink(link){
    $(link).on('click', function(){
        $('.nav_item').removeClass('active');
        $(this).addClass('active')
    })
};

 //Toggle de las clases del menú sidebar al click
 function toggleActiveClass(element,container){
    $(element).on('click', (e)=> {
       $((event.target)).parents(container).toggleClass('expanded collapsed');

        toggleArrow(
            '.dashboard_menu.collapsed .icon-arrow',
            'icon-arrow-up',
            'icon-arrow-down')

        toggleArrow(
            '.dashboard_menu.expanded .icon-arrow',
            'icon-arrow-down', 
            'icon-arrow-up')
    });
};

//Para uso de la función toggleActiveClass   
function toggleArrow(targetClass,class1, class2){
    $(targetClass).addClass(class1).removeClass(class2);
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
// -----------------------------------------------------------------------------
//FIN FUNCIONES
// ----------------------------------------------------------------------------- 

$(function () {
    layout.init();
});