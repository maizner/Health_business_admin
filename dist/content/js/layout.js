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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsYXlvdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGxheW91dCA9IHtcclxuICAgIFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGluaWNpYWxpem8gdG9vbHRpcHMgKCBJTkZPOiBsbyBkZW1vcmFtb3MgdW5vcyBzZWd1bmRvcyBwYXJhIGFzZWd1cmFybm9zIHF1ZSBoYXlhIGNhcmdhZG8gdG9kbyBhbnRlcyBkZWwgaW5pdClcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7IH0sIDIwMCk7XHJcblxyXG4gICAgICAgIC8vTGlua3MgZGUgbmF2ZWdhY2nDs25cclxuICAgICAgICBhY3RpdmVMaW5rKCcubmF2YmFyIC5uYXZfaXRlbScpXHJcblxyXG4gICAgICAgIC8vQ29sYXBzYXIgc2lkZWJhclxyXG4gICAgICAgICQoJy5qc19jb2xsYXBzZV9zaWRlYmFyJykub24oJ2NsaWNrJywgKGUpPT4ge1xyXG4gICAgICAgICAgICAkKChldmVudC50YXJnZXQpKS5wYXJlbnRzKCcuc2lkZWJhcicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vdGFyZ2V0LGNsYXNzIGNvbnRhaW5lclxyXG4gICAgICAgIHRvZ2dsZUFjdGl2ZUNsYXNzKCcuanNfbWVudV90b2dnbGVyJywnLmRhc2hib2FyZF9tZW51Jyk7XHJcblxyXG4gICAgICAgLy9jb25maXJtYWNpw7NuIHBhcmEgY29tcGxldGFyIGVsIGZvcm11bGFyaW9cclxuICAgICAgICAkKCcuanNfY29uZmlybScpLm9uKCdjbGljaycsIChlKT0+IHtcclxuICAgICAgICAgICAgJCgnLm1vZGFsX2NvbmZpcm0nKS5tb2RhbCgpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQWwgw4l4aXRvXHJcbiAgICAgICAgJCgnLmJ0bi5qc19hY2NlcHQnKS5vbignY2xpY2snLCAoZSk9PiB7XHJcbiAgICAgICAgICAgICQoJy5tb2RhbF9jb25maXJtJykubW9kYWwoJ2hpZGUnKVxyXG4gICAgICAgICAgICAkKCcubW9kYWxfc3VjY2VzcycpLm1vZGFsKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Fc3RlIHNjcmlwdCBzZSBhZ3JlZ2Egc29sbyBwYXJhIG1vZGFsIGRlIGNvbmZpcm1hY2nDs24uXHJcbiAgICAgICAgJCgnLm1vZGFsX2NvbmZpcm0nKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5hZGRDbGFzcygnZGFya2VzdCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJCgnLm1vZGFsX2NvbmZpcm0nKS5vbignaGlkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5yZW1vdmVDbGFzcygnZGFya2VzdCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9TaWRlYmFyIHJpZ2h0IHNob3cgYW5kIHNjcm9sbGJhciBpbml0XHJcbiAgICAgICAgJCgnI2Ryb3Atbm90aWZpY2F0aW9ucycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJ1thcmlhLWxhYmVsbGVkYnk9ZHJvcC1ub3RpZmljYXRpb25zXScpLmFkZENsYXNzKFwic2hvd1wiKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoXCIubmFub1wiKS5uYW5vU2Nyb2xsZXIoKTtcclxuICAgICAgICAgICAgfSwgMTAwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLmljb24tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCdbYXJpYS1sYWJlbGxlZGJ5PWRyb3Atbm90aWZpY2F0aW9uc10nKS5yZW1vdmVDbGFzcyhcInNob3dcIilcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubm90aWZpY2F0aW9uX21lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0FwZXJ0dXJhIGRlIG5vdGlmaWNhY2lvbmVzIGVuIG1vYmlsZS5cclxuICAgICAgICBpZiggaXNNb2JpbGUuYW55KCkgKXtcclxuICAgICAgICAgICAgJCgnLm5vdGlmaWNhdGlvbl9pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzaWRlYmFyLWl0ZW1fZXhwYW5kZWQnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICB9LCAgXHJcblxyXG4gICAgXHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vL0NPTUlFTlpPIERFIFRPQVNUU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL01lbnNhamVzIFRvYXN0IGNvbiBib3TDs24gZGUgY2llcnJlIFggcGFyYSB1c28gZGUgZGVzYXJyb2xsbyBcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuICAgIGZ1bmN0aW9uIGVycm9yTXNqKG1zail7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VCdXR0b25cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJuZXdlc3RPblRvcFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwcm9ncmVzc0JhclwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwb3NpdGlvbkNsYXNzXCI6IFwidG9hc3QtdG9wLWZ1bGwtd2lkdGhcIixcclxuICAgICAgICAgICAgXCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJvbmNsaWNrXCI6IG51bGwsXHJcbiAgICAgICAgICAgIFwic2hvd0R1cmF0aW9uXCI6IFwiMzAwXCIsXHJcbiAgICAgICAgICAgIFwiaGlkZUR1cmF0aW9uXCI6IFwiODAwXCIsXHJcbiAgICAgICAgICAgIFwidGltZU91dFwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJleHRlbmRlZFRpbWVPdXRcIjogXCIwXCIsXHJcbiAgICAgICAgICAgIFwic2hvd0Vhc2luZ1wiOiBcInN3aW5nXCIsXHJcbiAgICAgICAgICAgIFwiaGlkZUVhc2luZ1wiOiBcImxpbmVhclwiLFxyXG4gICAgICAgICAgICBcInNob3dNZXRob2RcIjogXCJzbGlkZURvd25cIixcclxuICAgICAgICAgICAgXCJoaWRlTWV0aG9kXCI6IFwic2xpZGVVcFwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0b2FzdHIuZXJyb3IobXNqKTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBpbmZvTXNqKG1zail7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VCdXR0b25cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJuZXdlc3RPblRvcFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwcm9ncmVzc0JhclwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwb3NpdGlvbkNsYXNzXCI6IFwidG9hc3QtdG9wLWZ1bGwtd2lkdGhcIixcclxuICAgICAgICAgICAgXCJwcmV2ZW50RHVwbGljYXRlc1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJvbmNsaWNrXCI6IG51bGwsXHJcbiAgICAgICAgICAgIFwic2hvd0R1cmF0aW9uXCI6IFwiMzAwXCIsXHJcbiAgICAgICAgICAgIFwiaGlkZUR1cmF0aW9uXCI6IFwiODAwXCIsXHJcbiAgICAgICAgICAgIFwidGltZU91dFwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJleHRlbmRlZFRpbWVPdXRcIjogXCIwXCIsXHJcbiAgICAgICAgICAgIFwic2hvd0Vhc2luZ1wiOiBcInN3aW5nXCIsXHJcbiAgICAgICAgICAgIFwiaGlkZUVhc2luZ1wiOiBcImxpbmVhclwiLFxyXG4gICAgICAgICAgICBcInNob3dNZXRob2RcIjogXCJzbGlkZURvd25cIixcclxuICAgICAgICAgICAgXCJoaWRlTWV0aG9kXCI6IFwic2xpZGVVcFwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0b2FzdHIuaW5mbyhtc2opO1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3NNc2oobXNqKXtcclxuICAgICAgICB0b2FzdHIub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgXCJjbG9zZUJ1dHRvblwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImRlYnVnXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIm5ld2VzdE9uVG9wXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInByb2dyZXNzQmFyXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uQ2xhc3NcIjogXCJ0b2FzdC10b3AtZnVsbC13aWR0aFwiLFxyXG4gICAgICAgICAgICBcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIm9uY2xpY2tcIjogbnVsbCxcclxuICAgICAgICAgICAgXCJzaG93RHVyYXRpb25cIjogXCIzMDBcIixcclxuICAgICAgICAgICAgXCJoaWRlRHVyYXRpb25cIjogXCI4MDBcIixcclxuICAgICAgICAgICAgXCJ0aW1lT3V0XCI6IFwiMFwiLFxyXG4gICAgICAgICAgICBcImV4dGVuZGVkVGltZU91dFwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJzaG93RWFzaW5nXCI6IFwic3dpbmdcIixcclxuICAgICAgICAgICAgXCJoaWRlRWFzaW5nXCI6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIFwic2hvd01ldGhvZFwiOiBcInNsaWRlRG93blwiLFxyXG4gICAgICAgICAgICBcImhpZGVNZXRob2RcIjogXCJzbGlkZVVwXCJcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0b2FzdHIuc3VjY2Vzcyhtc2opO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vTWVuc2FqZXMgVG9hc3QgY29uIGxpbmVhIGRlIHRpZW1wbyhjb24gYXV0byBjaWVycmUpIHBhcmEgdXNvIGRlIGRlc2Fycm9sbG8gXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuICAgIGZ1bmN0aW9uIGVycm9yTXNqVGltZUR1cmF0aW9uKG1zail7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VCdXR0b25cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJuZXdlc3RPblRvcFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwcm9ncmVzc0JhclwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uQ2xhc3NcIjogXCJ0b2FzdC10b3AtZnVsbC13aWR0aFwiLFxyXG4gICAgICAgICAgICBcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIm9uY2xpY2tcIjogbnVsbCxcclxuICAgICAgICAgICAgXCJzaG93RHVyYXRpb25cIjogXCIzMDBcIixcclxuICAgICAgICAgICAgXCJoaWRlRHVyYXRpb25cIjogXCI4MDBcIixcclxuICAgICAgICAgICAgXCJ0aW1lT3V0XCI6IFwiMzAwMFwiLFxyXG4gICAgICAgICAgICBcImV4dGVuZGVkVGltZU91dFwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJzaG93RWFzaW5nXCI6IFwic3dpbmdcIixcclxuICAgICAgICAgICAgXCJoaWRlRWFzaW5nXCI6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIFwic2hvd01ldGhvZFwiOiBcInNsaWRlRG93blwiLFxyXG4gICAgICAgICAgICBcImhpZGVNZXRob2RcIjogXCJzbGlkZVVwXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRvYXN0ci5lcnJvcihtc2opO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBzdWNjZXNzTXNqVGltZUR1cmF0aW9uKG1zail7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VCdXR0b25cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJuZXdlc3RPblRvcFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwcm9ncmVzc0JhclwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uQ2xhc3NcIjogXCJ0b2FzdC10b3AtZnVsbC13aWR0aFwiLFxyXG4gICAgICAgICAgICBcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIm9uY2xpY2tcIjogbnVsbCxcclxuICAgICAgICAgICAgXCJzaG93RHVyYXRpb25cIjogXCIzMDBcIixcclxuICAgICAgICAgICAgXCJoaWRlRHVyYXRpb25cIjogXCI4MDBcIixcclxuICAgICAgICAgICAgXCJ0aW1lT3V0XCI6IFwiMzAwMFwiLFxyXG4gICAgICAgICAgICBcImV4dGVuZGVkVGltZU91dFwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJzaG93RWFzaW5nXCI6IFwic3dpbmdcIixcclxuICAgICAgICAgICAgXCJoaWRlRWFzaW5nXCI6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIFwic2hvd01ldGhvZFwiOiBcInNsaWRlRG93blwiLFxyXG4gICAgICAgICAgICBcImhpZGVNZXRob2RcIjogXCJzbGlkZVVwXCJcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0b2FzdHIuc3VjY2Vzcyhtc2opO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbmZvTXNqVGltZUR1cmF0aW9uKG1zail7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIFwiY2xvc2VCdXR0b25cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJuZXdlc3RPblRvcFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwcm9ncmVzc0JhclwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uQ2xhc3NcIjogXCJ0b2FzdC10b3AtZnVsbC13aWR0aFwiLFxyXG4gICAgICAgICAgICBcInByZXZlbnREdXBsaWNhdGVzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIm9uY2xpY2tcIjogbnVsbCxcclxuICAgICAgICAgICAgXCJzaG93RHVyYXRpb25cIjogXCIzMDBcIixcclxuICAgICAgICAgICAgXCJoaWRlRHVyYXRpb25cIjogXCI4MDBcIixcclxuICAgICAgICAgICAgXCJ0aW1lT3V0XCI6IFwiMzAwMFwiLFxyXG4gICAgICAgICAgICBcImV4dGVuZGVkVGltZU91dFwiOiBcIjBcIixcclxuICAgICAgICAgICAgXCJzaG93RWFzaW5nXCI6IFwic3dpbmdcIixcclxuICAgICAgICAgICAgXCJoaWRlRWFzaW5nXCI6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIFwic2hvd01ldGhvZFwiOiBcInNsaWRlRG93blwiLFxyXG4gICAgICAgICAgICBcImhpZGVNZXRob2RcIjogXCJzbGlkZVVwXCJcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0b2FzdHIuaW5mbyhtc2opO1xyXG4gICAgfTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vRklOIERFIFRPQVNUU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9GVU5DSU9ORVNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcbi8vTGluayBhY3Rpdm8gZGUgbmF2XHJcbmZ1bmN0aW9uIGFjdGl2ZUxpbmsobGluayl7XHJcbiAgICAkKGxpbmspLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLm5hdl9pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICB9KVxyXG59O1xyXG5cclxuIC8vVG9nZ2xlIGRlIGxhcyBjbGFzZXMgZGVsIG1lbsO6IHNpZGViYXIgYWwgY2xpY2tcclxuIGZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZUNsYXNzKGVsZW1lbnQsY29udGFpbmVyKXtcclxuICAgICQoZWxlbWVudCkub24oJ2NsaWNrJywgKGUpPT4ge1xyXG4gICAgICAgJCgoZXZlbnQudGFyZ2V0KSkucGFyZW50cyhjb250YWluZXIpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCBjb2xsYXBzZWQnKTtcclxuXHJcbiAgICAgICAgdG9nZ2xlQXJyb3coXHJcbiAgICAgICAgICAgICcuZGFzaGJvYXJkX21lbnUuY29sbGFwc2VkIC5pY29uLWFycm93JyxcclxuICAgICAgICAgICAgJ2ljb24tYXJyb3ctdXAnLFxyXG4gICAgICAgICAgICAnaWNvbi1hcnJvdy1kb3duJylcclxuXHJcbiAgICAgICAgdG9nZ2xlQXJyb3coXHJcbiAgICAgICAgICAgICcuZGFzaGJvYXJkX21lbnUuZXhwYW5kZWQgLmljb24tYXJyb3cnLFxyXG4gICAgICAgICAgICAnaWNvbi1hcnJvdy1kb3duJywgXHJcbiAgICAgICAgICAgICdpY29uLWFycm93LXVwJylcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy9QYXJhIHVzbyBkZSBsYSBmdW5jacOzbiB0b2dnbGVBY3RpdmVDbGFzcyAgIFxyXG5mdW5jdGlvbiB0b2dnbGVBcnJvdyh0YXJnZXRDbGFzcyxjbGFzczEsIGNsYXNzMil7XHJcbiAgICAkKHRhcmdldENsYXNzKS5hZGRDbGFzcyhjbGFzczEpLnJlbW92ZUNsYXNzKGNsYXNzMik7XHJcbn07XHJcblxyXG52YXIgaXNNb2JpbGUgPSB7XHJcbiAgICBBbmRyb2lkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTtcclxuICAgIH0sXHJcbiAgICBCbGFja0JlcnJ5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKTtcclxuICAgIH0sXHJcbiAgICBpT1M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kL2kpO1xyXG4gICAgfSxcclxuICAgIE9wZXJhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT3BlcmEgTWluaS9pKTtcclxuICAgIH0sXHJcbiAgICBXaW5kb3dzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvSUVNb2JpbGUvaSkgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV1BEZXNrdG9wL2kpO1xyXG4gICAgfSxcclxuICAgIGFueTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChpc01vYmlsZS5BbmRyb2lkKCkgfHwgaXNNb2JpbGUuQmxhY2tCZXJyeSgpIHx8IGlzTW9iaWxlLmlPUygpIHx8IGlzTW9iaWxlLk9wZXJhKCkgfHwgaXNNb2JpbGUuV2luZG93cygpKTtcclxuICAgIH1cclxufTtcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9GSU4gRlVOQ0lPTkVTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBsYXlvdXQuaW5pdCgpO1xyXG59KTsiXSwiZmlsZSI6ImxheW91dC5qcyJ9
