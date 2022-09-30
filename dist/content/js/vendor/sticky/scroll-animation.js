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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3Ivc3RpY2t5L3Njcm9sbC1hbmltYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9lbGVtZW50IGRlc2t0b3AgYW5pbWF0aW9uXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB1c2VyQWdlbnQgPSAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcclxuICAgIGlmICh1c2VyQWdlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh1c2VyQWdlbnQpXHJcblxyXG4gICAgICAgIHZhciBjYnBBbmltYXRlZGVsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY29udGVuaWRvMiA9ICQoXCIubXlmaWx0ZXJcIikub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIC8vTGEgY2xhc2Ugc2UgYWdyZWdhcsOhIGN1YW5kbyBsbGVndWUgYWwgY29udGVuaWRvIDIgKCAzMDBweCBhbnRlcyBkZSBsbGVnYXIgYWwgdG9wKVxyXG5cdFx0XHRjb250ZW5pZG8yID0gY29udGVuaWRvMi50b3AgLSAzMDA7XHJcbiAgICAgICAgICAgIHZhciBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9iaWxlLWN1cnNvcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZFNjcm9sbCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWVsZW1lbnRPbiA9ICBjb250ZW5pZG8yO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlkU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZFNjcm9sbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoc2Nyb2xsUGFnZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN5ID0gc2Nyb2xsWSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN5ID49IGNoYW5nZWVsZW1lbnRPbikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKCdkLW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGlkU2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2Nyb2xsWSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG5cclxufSkiXSwiZmlsZSI6InZlbmRvci9zdGlja3kvc2Nyb2xsLWFuaW1hdGlvbi5qcyJ9
