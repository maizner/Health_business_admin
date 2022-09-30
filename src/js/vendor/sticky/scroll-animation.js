//element desktop animation
$(document).ready(function () {
    var userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (userAgent) {
        console.log(userAgent)

        var cbpAnimatedelement = (function () {
            var contenido2 = $(".myfilter").offset();
            //La clase se agregará cuando llegue al contenido 2 ( 300px antes de llegar al top)
			contenido2 = contenido2.top - 300;
            var docElem = document.documentElement,
                    element = document.querySelector('.mobile-cursor'),
                    didScroll = false,
                    changeelementOn =  contenido2;
            function init() {
                window.addEventListener('scroll', function (event) {
                    if (!didScroll) {
                        didScroll = true;
                        setTimeout(scrollPage, 10);
                    }
                }, false);
            }
            function scrollPage() {
                var sy = scrollY();
                if (sy >= changeelementOn) {
                    $(element).removeClass('d-none')
                }
                else {
                    $(element).addClass('d-none')
                }
                didScroll = false;
            }
            function scrollY() {
                return window.pageYOffset || docElem.scrollTop;
            }
            init();

        })();
    }

})