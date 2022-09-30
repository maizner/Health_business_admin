/*VARIABLES */
//defaultColor= TODO:Este es el elemento a reemplazar por configuración
var defaultColor = '#F4B300';
//defaulImagePath= TODO:Este es el elemento a reemplazar por configuración
var defaulImagePath= 'Content/img/login-bg.jpg';

//Selectores de clases
var defaultColorBtn= $('.default_brand_color');
var defaultBgImageClass= $('.default_login_background');

// var dashboardActiveToggler = $('.dashboard_menu.expanded .js_menu_toggler');



var inactiveTextColor = '#434C5F';
var activeTextColor = defaultColor;

/*FUNCION INIT*/
var configuredElem = {
    init: function () {
        defaultColorBtn.css('backgroundColor', defaultColor);
		defaultBgImageClass.css('background-image', 'url(' + defaulImagePath + ')');
		// dashboardActiveToggler.css('color', defaultColor);
    },
};

/* --- Funciones y triggers----*/
var lightenDarkenColor = function (col, amt) {
	var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col, 16);
	var r = (num >> 16) + amt;
	if (r > 255) {
		r = 255;
	} else if (r < 0) {
		r = 0;
	}
	var b = ((num >> 8) & 0x00FF) + amt;
	if (b > 255) {
		b = 255;
	} else if (b < 0) {
		b = 0;
	}
	var g = (num & 0x0000FF) + amt;
	if (g > 255) {
		g = 255;
	} else if (g < 0) {
		g = 0;
	}
	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}


defaultColorBtn.on('mouseover', function(){
    this.style.backgroundColor = lightenDarkenColor(defaultColor, -20);
})
defaultColorBtn.on('click', function(){
    this.style.backgroundColor = lightenDarkenColor(defaultColor, -20);
})
defaultColorBtn.on('mouseout', function(){
    this.style.backgroundColor = defaultColor;
})




// $('.dashboard_menu').on('click', function(){
//     if (this.classList.contains("expanded")){
// 		this.firstElementChild.style.color = activeTextColor
// 	}else{
// 		this.firstElementChild.style.color = inactiveTextColor;
// 	}
// })



/*INICIALIZACION*/
$(function () {
    //Se dispara un init por página
    configuredElem.init();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb25maWd1cmVkRWxlbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlZBUklBQkxFUyAqL1xyXG4vL2RlZmF1bHRDb2xvcj0gVE9ETzpFc3RlIGVzIGVsIGVsZW1lbnRvIGEgcmVlbXBsYXphciBwb3IgY29uZmlndXJhY2nDs25cclxudmFyIGRlZmF1bHRDb2xvciA9ICcjRjRCMzAwJztcclxuLy9kZWZhdWxJbWFnZVBhdGg9IFRPRE86RXN0ZSBlcyBlbCBlbGVtZW50byBhIHJlZW1wbGF6YXIgcG9yIGNvbmZpZ3VyYWNpw7NuXHJcbnZhciBkZWZhdWxJbWFnZVBhdGg9ICdDb250ZW50L2ltZy9sb2dpbi1iZy5qcGcnO1xyXG5cclxuLy9TZWxlY3RvcmVzIGRlIGNsYXNlc1xyXG52YXIgZGVmYXVsdENvbG9yQnRuPSAkKCcuZGVmYXVsdF9icmFuZF9jb2xvcicpO1xyXG52YXIgZGVmYXVsdEJnSW1hZ2VDbGFzcz0gJCgnLmRlZmF1bHRfbG9naW5fYmFja2dyb3VuZCcpO1xyXG5cclxuLy8gdmFyIGRhc2hib2FyZEFjdGl2ZVRvZ2dsZXIgPSAkKCcuZGFzaGJvYXJkX21lbnUuZXhwYW5kZWQgLmpzX21lbnVfdG9nZ2xlcicpO1xyXG5cclxuXHJcblxyXG52YXIgaW5hY3RpdmVUZXh0Q29sb3IgPSAnIzQzNEM1Ric7XHJcbnZhciBhY3RpdmVUZXh0Q29sb3IgPSBkZWZhdWx0Q29sb3I7XHJcblxyXG4vKkZVTkNJT04gSU5JVCovXHJcbnZhciBjb25maWd1cmVkRWxlbSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkZWZhdWx0Q29sb3JCdG4uY3NzKCdiYWNrZ3JvdW5kQ29sb3InLCBkZWZhdWx0Q29sb3IpO1xyXG5cdFx0ZGVmYXVsdEJnSW1hZ2VDbGFzcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcgKyBkZWZhdWxJbWFnZVBhdGggKyAnKScpO1xyXG5cdFx0Ly8gZGFzaGJvYXJkQWN0aXZlVG9nZ2xlci5jc3MoJ2NvbG9yJywgZGVmYXVsdENvbG9yKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG4vKiAtLS0gRnVuY2lvbmVzIHkgdHJpZ2dlcnMtLS0tKi9cclxudmFyIGxpZ2h0ZW5EYXJrZW5Db2xvciA9IGZ1bmN0aW9uIChjb2wsIGFtdCkge1xyXG5cdHZhciB1c2VQb3VuZCA9IGZhbHNlO1xyXG5cdGlmIChjb2xbMF0gPT0gXCIjXCIpIHtcclxuXHRcdGNvbCA9IGNvbC5zbGljZSgxKTtcclxuXHRcdHVzZVBvdW5kID0gdHJ1ZTtcclxuXHR9XHJcblx0dmFyIG51bSA9IHBhcnNlSW50KGNvbCwgMTYpO1xyXG5cdHZhciByID0gKG51bSA+PiAxNikgKyBhbXQ7XHJcblx0aWYgKHIgPiAyNTUpIHtcclxuXHRcdHIgPSAyNTU7XHJcblx0fSBlbHNlIGlmIChyIDwgMCkge1xyXG5cdFx0ciA9IDA7XHJcblx0fVxyXG5cdHZhciBiID0gKChudW0gPj4gOCkgJiAweDAwRkYpICsgYW10O1xyXG5cdGlmIChiID4gMjU1KSB7XHJcblx0XHRiID0gMjU1O1xyXG5cdH0gZWxzZSBpZiAoYiA8IDApIHtcclxuXHRcdGIgPSAwO1xyXG5cdH1cclxuXHR2YXIgZyA9IChudW0gJiAweDAwMDBGRikgKyBhbXQ7XHJcblx0aWYgKGcgPiAyNTUpIHtcclxuXHRcdGcgPSAyNTU7XHJcblx0fSBlbHNlIGlmIChnIDwgMCkge1xyXG5cdFx0ZyA9IDA7XHJcblx0fVxyXG5cdHJldHVybiAodXNlUG91bmQgPyBcIiNcIiA6IFwiXCIpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpO1xyXG59XHJcblxyXG5cclxuZGVmYXVsdENvbG9yQnRuLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBsaWdodGVuRGFya2VuQ29sb3IoZGVmYXVsdENvbG9yLCAtMjApO1xyXG59KVxyXG5kZWZhdWx0Q29sb3JCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gbGlnaHRlbkRhcmtlbkNvbG9yKGRlZmF1bHRDb2xvciwgLTIwKTtcclxufSlcclxuZGVmYXVsdENvbG9yQnRuLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGRlZmF1bHRDb2xvcjtcclxufSlcclxuXHJcblxyXG5cclxuXHJcbi8vICQoJy5kYXNoYm9hcmRfbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJleHBhbmRlZFwiKSl7XHJcbi8vIFx0XHR0aGlzLmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLmNvbG9yID0gYWN0aXZlVGV4dENvbG9yXHJcbi8vIFx0fWVsc2V7XHJcbi8vIFx0XHR0aGlzLmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLmNvbG9yID0gaW5hY3RpdmVUZXh0Q29sb3I7XHJcbi8vIFx0fVxyXG4vLyB9KVxyXG5cclxuXHJcblxyXG4vKklOSUNJQUxJWkFDSU9OKi9cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICAvL1NlIGRpc3BhcmEgdW4gaW5pdCBwb3IgcMOhZ2luYVxyXG4gICAgY29uZmlndXJlZEVsZW0uaW5pdCgpO1xyXG59KTsiXSwiZmlsZSI6ImNvbmZpZ3VyZWRFbGVtLmpzIn0=
