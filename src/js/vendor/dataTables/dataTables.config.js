//script demo de filtros para incrustar en el datatable
function UpdateStatus(thisObj) {
    thisObj.addClass('active').siblings().removeClass('active');
}
																																													
$(document).ready(function () {
		//checkbox row
	$(".voucher-table tr").click(function(e) {
	    var state = $(this).find(":checkbox")
	    if ($(state).attr('checked')){
	        $(state).removeAttr("checked")
	        $(state).closest( "tr" ).removeClass("selected-row")
	    }else {
	        $(state).attr("checked", "checked")
	        $(state).closest( "tr" ).addClass("selected-row")
	    }       
	});

	function filter(shown,hidden){
		table.rows(shown).nodes();
		table.rows(hidden).nodes();
		filterRow(shown, hidden)
	}
	function filterRow(a, b){
        $(a).show()
        $(b).hide()
    }
    
    //voucher search settings for daterangepickers
    var todayDate = moment();
    var rangeDays = 7;
    todayDate = todayDate.format('DD/MM/YYYY');
    var nextDate = moment().add(rangeDays -1, 'days');
    nextDate = nextDate.format('DD/MM/YYYY');
    $('input[name="DateFrom"]').val(todayDate);
    $('input[name="DateTo"]').val(nextDate);

    //plugin https://datatables.net/
    var table = $('.voucher-table').DataTable({
    	"paging":   true,
        "ordering": false,
        "searching": true,
        "lengthChange": true,
        "info": true,
  		pageLength: 10,
        responsive: true,
    	language: {
	        paginate: {
	            previous:'<i class="icon-back"></i>',
	            next:'<i class="icon-go"></i>',
	        },
	        aria: {
	            paginate:{
	                previous:'Previous',
	                next:'Next' 
	            }
	        },
	        /*paginacion*/
	        "info": " PÁGINA <span class='brand-color'> <b> _PAGE_ </b> </span>/ <b>_PAGES_</b> ",
	        /*seacrh*/
			"sSearch": "",
	    },
      	/*Selecciono donde se posiciona cada elemento y tambien dibujo los divs dentro de la tabla para despues poder incrustar botones*/
      	"dom":'<"row buttons"<"col-sm-12 col-md-6 tab-filters"<"modality"><"state">><"col-sm-12 col-md-6 icon-btn"B>>rt<"row filters"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>rt<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',

      	/*Estos son los botones por default agregados en el dom:*/
        buttons: [
        		{text: '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15"><path fill="#4A4A4A" fill-rule="nonzero" d="M11.059 3.52c1.041 0 1.927.367 2.656 1.103.729.736 1.094 1.618 1.094 2.647 0 1.041-.365 1.927-1.094 2.656-.73.729-1.615 1.094-2.656 1.094-1.03 0-1.911-.365-2.647-1.094C7.676 9.196 7.31 8.31 7.31 7.27c0-1.03.367-1.911 1.103-2.647.736-.736 1.618-1.103 2.647-1.103zm0 6.25c.69 0 1.276-.248 1.757-.743a2.458 2.458 0 0 0 .723-1.777c0-.69-.244-1.28-.732-1.768a2.409 2.409 0 0 0-1.768-.732c-.69 0-1.28.244-1.768.732A2.409 2.409 0 0 0 8.54 7.25c0 .69.25 1.283.752 1.777.501.495 1.09.743 1.768.743zM21 7.113c0 .026.003.052.01.078.006.026.01.052.01.079a.453.453 0 0 1-.01.087.453.453 0 0 0-.01.088c-.013.013-.02.026-.02.04v.058l-.02.02v.029c0 .006-.006.016-.019.03a10.354 10.354 0 0 1-1.718 2.773 10.79 10.79 0 0 1-2.364 2.04c-.872.554-1.806.977-2.802 1.27-.996.293-2.015.44-3.057.44-1.042 0-2.06-.147-3.057-.44a11.002 11.002 0 0 1-2.802-1.27 10.75 10.75 0 0 1-4.102-4.814v-.058l-.01-.01c-.006-.007-.01-.017-.01-.03v-.039A.15.15 0 0 0 1 7.426a.321.321 0 0 0-.01-.078.321.321 0 0 1-.01-.078c0-.027.004-.056.01-.088A.453.453 0 0 0 1 7.094c.013-.013.02-.026.02-.04v-.058l.02-.02v-.058a10.77 10.77 0 0 1 1.747-2.783c.71-.814 1.5-1.5 2.373-2.06a10.878 10.878 0 0 1 8.936-1.28c.996.293 1.924.72 2.783 1.28a11.1 11.1 0 0 1 2.344 2.06 10.513 10.513 0 0 1 1.718 2.783c.013.013.02.023.02.03v.029l.01.01c.006.006.01.016.01.029v.039a.15.15 0 0 0 .019.058zm-10 5.782c.885 0 1.761-.118 2.627-.352a9.24 9.24 0 0 0 2.441-1.055 9.493 9.493 0 0 0 2.09-1.758 9.306 9.306 0 0 0 1.572-2.46 9.447 9.447 0 0 0-3.642-4.229 9.327 9.327 0 0 0-2.432-1.074 9.653 9.653 0 0 0-2.617-.362c-.885 0-1.761.12-2.627.362A9.452 9.452 0 0 0 5.961 3.04a9.822 9.822 0 0 0-2.11 1.768 9.172 9.172 0 0 0-1.581 2.46A9.172 9.172 0 0 0 3.852 9.73a9.692 9.692 0 0 0 2.1 1.758c.76.469 1.571.82 2.43 1.055.86.234 1.733.352 2.618.352z"/></svg>',
        			titleAttr: 'Ver selección',
        			className: 'toolbox',

	                action: function ( e, dt, node, config ) {
	                alert( 'Ver columna seleccionada' );}
            	},
            	{extend: 'print', 
            	text:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17"><path fill="#000" fill-rule="evenodd" d="M16.5 2.063c.401 0 .73.128.988.386s.387.573.387.946v6.832c0 .4-.129.73-.387.988s-.587.387-.988.387h-2.063V16.5h-11v-4.898H1.376c-.401 0-.73-.13-.988-.387-.258-.258-.387-.587-.387-.988V3.395c0-.373.129-.688.387-.946s.587-.386.988-.386H2.75V0h12.375v2.063H16.5zM3.437.687v1.375h11V.688h-11zM13.75 15.813v-8.25H4.125v8.25h9.625zm3.438-5.586V3.395c0-.43-.23-.645-.688-.645H1.375c-.458 0-.688.215-.688.645v6.832c0 .458.23.687.688.687h2.063V6.875h11v4.04H16.5c.458 0 .688-.23.688-.688z"/></svg>',
            	titleAttr: 'Imprimir selección',
            	className: 'toolbox'
            	},

           		{extend: 'pdf',
           		text:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path fill="#4A4A4A" fill-rule="evenodd" d="M14.902 3.687a5.87 5.87 0 0 1 1.983.573 5.829 5.829 0 0 1 1.62 1.174A5.45 5.45 0 0 1 19.6 7.077c.267.618.4 1.277.4 1.977 0 .662-.11 1.324-.332 1.986a5.746 5.746 0 0 1-.967 1.786c-.423.529-.94.965-1.553 1.309-.612.344-1.308.528-2.09.554a.607.607 0 0 1-.439-.182.581.581 0 0 1-.185-.43c0-.165.061-.308.185-.43a.607.607 0 0 1 .44-.18h.175a2.78 2.78 0 0 0 1.455-.392c.437-.261.811-.605 1.123-1.032.313-.426.554-.9.723-1.423.17-.522.254-1.044.254-1.566 0-.573-.117-1.111-.352-1.614a4.215 4.215 0 0 0-.957-1.318 4.774 4.774 0 0 0-1.386-.898 4.176 4.176 0 0 0-1.66-.334l-.45-.02-.136-.42c-.326-1.018-.85-1.81-1.573-2.378-.722-.566-1.702-.85-2.94-.85-.78 0-1.483.131-2.108.392a4.767 4.767 0 0 0-1.612 1.089A4.763 4.763 0 0 0 4.58 4.365a5.86 5.86 0 0 0-.361 2.072h.02l.038.573-.566.096c-.69.114-1.276.477-1.758 1.088a3.247 3.247 0 0 0-.723 2.063 3.2 3.2 0 0 0 .89 2.254c.592.637 1.291.955 2.099.955h.547c.182 0 .332.06.449.182a.597.597 0 0 1 .176.43.597.597 0 0 1-.176.43.598.598 0 0 1-.45.18H4.22a3.806 3.806 0 0 1-1.621-.353 4.321 4.321 0 0 1-1.338-.964 4.762 4.762 0 0 1-.918-1.414 4.292 4.292 0 0 1-.342-1.7c0-.98.28-1.865.84-2.655.56-.79 1.276-1.318 2.148-1.585a6.695 6.695 0 0 1 .576-2.378 6.258 6.258 0 0 1 1.329-1.91A6.009 6.009 0 0 1 6.846.459C7.594.152 8.424 0 9.336 0a6.85 6.85 0 0 1 1.934.258 5.6 5.6 0 0 1 1.582.735c.468.319.872.707 1.21 1.165.339.459.619.968.84 1.529zm-2.285 9.837l.156.133c.092.09.137.185.137.287a.398.398 0 0 1-.137.286l-2.304 2.464v.02l-.156.152a.45.45 0 0 1-.157.105.508.508 0 0 1-.342 0 .298.298 0 0 1-.146-.105l-.156-.153v-.019L7.246 14.27a.437.437 0 0 1-.137-.325c0-.128.046-.236.137-.325l.156-.095a.385.385 0 0 1 .323-.115.527.527 0 0 1 .322.153l1.328 1.451v-6.15c0-.166.059-.309.176-.43A.598.598 0 0 1 10 8.252c.17 0 .316.06.44.181a.581.581 0 0 1 .185.43v6.15l1.367-1.49a.446.446 0 0 1 .322-.133c.124 0 .225.044.303.134z"/></svg>',
				   titleAttr: 'Descargar PDF',
				   className: 'toolbox',
				   action: function () {
					   $('#downloadVaucher').modal()
				   }
				},
           		{text: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14"><path fill="#4A4A4A" fill-rule="evenodd" d="M19.98 1.432a.18.18 0 0 1 .02.08v10.26c0 .531-.13 1.035-.39 1.512-.261.477-.652.716-1.172.716H2.188c-.521 0-1.016-.239-1.485-.716C.234 12.807 0 12.303 0 11.773V1.51a.18.18 0 0 1 .02-.08.47.47 0 0 1 0-.268.723.723 0 0 1 .136-.248.325.325 0 0 0 .04-.05.148.148 0 0 1 .058-.05C.449.55.726.348 1.084.21A3.02 3.02 0 0 1 2.188 0h16.25c.416 0 .751.09 1.005.268.254.18.42.448.498.806.026.053.043.11.05.169a.626.626 0 0 1-.01.189zm-18.085-.16c-.105 0-.209.007-.313.02L10 8.135l8.438-6.861H1.895zm16.543 11.455c.169 0 .263-.116.283-.348.02-.232.029-.434.029-.606V2.665l-8.34 6.781a.774.774 0 0 1-.195.12.564.564 0 0 1-.215.04.564.564 0 0 1-.215-.04.774.774 0 0 1-.195-.12L1.25 2.665v9.108c0 .172.114.374.342.606.228.232.426.348.596.348h16.25z"/></svg>',
           			titleAttr: 'Enviar Ekit',
                   	className: 'toolbox',
	                action: function ( e, dt, node, config ) {
	                alert( 'Enviar por mail el ekit' );}
            	},
            	{text: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="#4A4A4A" fill-rule="evenodd" d="M13.438 12.875c.156 0 .289.055.398.164.11.11.164.242.164.399 0 .156-.055.289-.164.398a.542.542 0 0 1-.399.164H.563a.542.542 0 0 1-.399-.164.542.542 0 0 1-.164-.399c0-.156.055-.289.164-.398a.542.542 0 0 1 .398-.164h12.876zm-9.813-1.844a.469.469 0 0 1-.547-.11.469.469 0 0 1-.11-.546l1.563-3.672a.439.439 0 0 1 .11-.172L10.844.328C11.063.11 11.328 0 11.64 0c.312 0 .578.11.796.328l1.235 1.234c.219.22.328.485.328.797 0 .313-.11.578-.328.797L7.469 9.375a.622.622 0 0 1-.157.094L3.626 11.03zm8.016-9.906l-.97.969 1.235 1.234.969-.969-1.234-1.234zM5.516 7.25l-.907 2.14 2.141-.906 4.36-4.359-1.235-1.234-4.36 4.359z"/></svg>',
            		titleAttr: 'Editar selección',
                   	className: 'toolbox',
	                action: function ( e, dt, node, config ) {
	                alert( 'Editar columna seleccionada' );}
            	},
            	{extend: 'excel',text:'<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="#4A4A4A" fill-rule="evenodd" d="M12.938 8.509a.57.57 0 0 1 .193.439v3.586c0 .433-.155.806-.466 1.116-.31.31-.683.466-1.116.466H1.582c-.434 0-.806-.155-1.116-.466A1.523 1.523 0 0 1 0 12.534V2.216c0-.446.155-.82.466-1.125.31-.305.682-.457 1.116-.457h4.465a.61.61 0 0 1 .448.184.6.6 0 0 1 .185.44.6.6 0 0 1-.185.439.61.61 0 0 1-.448.185H1.582a.323.323 0 0 0-.237.096.323.323 0 0 0-.097.238v10.318c0 .094.032.17.097.228a.34.34 0 0 0 .237.088h9.967c.082 0 .155-.029.22-.088a.294.294 0 0 0 .096-.228V8.948a.61.61 0 0 1 .185-.448.61.61 0 0 1 .448-.185.57.57 0 0 1 .44.194zM5.923 4.624c.96-1.442 2.332-2.239 4.113-2.39v-1.6c0-.27.129-.46.387-.572.258-.111.486-.073.685.114l3.34 3.182a.667.667 0 0 1 .194.492.664.664 0 0 1-.229.457l-3.34 2.778a.662.662 0 0 1-.668.088c-.246-.118-.369-.305-.369-.563V4.66a.61.61 0 0 1 .185-.448.61.61 0 0 1 .448-.185.61.61 0 0 1 .448.185.61.61 0 0 1 .185.448v.598l1.775-1.477-1.775-1.67v.738a.61.61 0 0 1-.185.449.61.61 0 0 1-.448.184l-.053-.017c-1.594.011-2.8.62-3.62 1.828-.188.27-.347.565-.476.887-.128.323-.21.557-.246.704a1.563 1.563 0 0 0-.052.307.621.621 0 0 1-.22.387.619.619 0 0 1-.413.158.196.196 0 0 1-.088-.018.606.606 0 0 1-.404-.237.598.598 0 0 1-.123-.466c.105-.797.421-1.593.949-2.39z"/></svg>',
            		titleAttr: 'Exportar tabla',
                   	className: 'toolbox'},

             	{text: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="#000" fill-rule="evenodd" d="M10.547 0l.703.703-4.922 4.922 4.922 4.922-.703.703-4.922-4.922L.703 11.25 0 10.547l4.922-4.922L0 .703.703 0l4.922 4.922z"/></svg>',
				 titleAttr: 'Borrar Selección',
				 className: 'toolbox',
				 action: function () {
					 $('#deleteConfirmation').modal()
				 }
            	},
            	{text: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="25" viewBox="0 0 1 25"><path fill="#D8D8D8" fill-rule="evenodd" d="M0 0h1v25H0z"/></svg><svg xmlns="http://www.w3.org/2000/svg" style="margin-left:12px;margin-right:12px;" width="13" height="13" viewBox="0 0 13 13"><path fill="#000" fill-rule="nonzero" d="M12.5 7.064H6.64v5.811h-.83v-5.81H0v-.83h5.81V.374h.83v5.86h5.86z"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="1" height="25" viewBox="0 0 1 25"><path fill="#D8D8D8" fill-rule="evenodd" d="M0 0h1v25H0z"/></svg>',
            		titleAttr: 'Sumar beneficios',
                   	className: 'toolbox',
	                action: function ( e, dt, node, config ) {
	                alert( 'Sumar beneficios. Agregar addons(Nueva pantalla)' );}
            	},
            	

        ],

       
    	/* pagingType: "full_numbers"*/
       	pagingType: "simple_numbers",

    });

	/*creo el grupo de botones para filtrar*/
	//https://datatables.net/extensions/buttons/examples/initialisation/multiple.html
	var modality = new $.fn.dataTable.Buttons( table, {
        buttons: [
        	{
                text: 'Daily',
                className:'daily',
               
                action: function ( e, dt, node, conf ) {
                    UpdateStatus($(node))
                   
                }
            },
            {
                text: 'Multi Trip',
                className:'multitrip',
                action: function ( e, dt, node, conf ) {
                    UpdateStatus($(node))
                }
            },
            {
                text: 'Long Stay',
                className:'longstay',
                action: function ( e, dt, node, conf ) {
                    UpdateStatus($(node))
                }
            }
        ]
    } );

    var state = new $.fn.dataTable.Buttons( table, {
        buttons: [
        	{
                text: 'Active',
                className:'complete',
                action: function ( e, dt, node, conf ) {
                    UpdateStatus($(node))
                    filter('.active-row','.void-row, .incomplete-row')
                }
            },
            {
                text: 'Incomplete',
                className:'incomplete',
                action: function ( e, dt, node, conf ) {
                    UpdateStatus($(node))
                    filter('.incomplete-row','.void-row,.active-row ')
                }
            },
            {
                text: 'Void',
                className:'void',
                action: function ( e, dt, node, conf ) {
                    UpdateStatus($(node))
                    filter('.void-row','.incomplete-row,.active-row ')
                }
            }
        ]
    } );
 	var modality = $('.modality')
 	var state = $('.state')
 	
   //Incrusto grupo de botones modalidad
    table.buttons( 1, null ).container().appendTo(
        modality
    );
    //Incrusto grupo de botones estado
    table.buttons( 2, null ).container().appendTo(
        state
    );
});