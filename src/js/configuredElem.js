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