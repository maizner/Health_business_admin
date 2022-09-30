/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/


	var inputs = $( '.js_input_file' );
	

	Array.prototype.forEach.call( inputs, function( input )
	{
		
		input.addEventListener( 'change', function( e )
		{
			var fileUploaded = $(this).find('.file_uploaded');
			
			var label	 = $(this).find('.files_container');
			var fileImage=  $(this).find('label .img');
			var theDate= label.find( '.date_time .date' );
			var theTime= label.find( '.date_time .time' );
			var uploadBtn = $(this).find('.button_container_right');
			var exploreBtn = $(this).find('.button_container_left')
			var cleanBtn = $(this).find('.js_clean')

			var fileName = '';

			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
				
			else
				fileName = e.target.value.split( '\\' ).pop();


			if( fileName ){
				//Formato js para agregar imagen. No en uso. Sale de BD
				
        		var tmppath = URL.createObjectURL(event.target.files[0]);
				fileImage.fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
				$(label).append(fileImage);	
				fileUploaded.html(fileName);
				fileUploaded.attr('title',fileName);
				fileUploaded.addClass('browse');
				label.addClass("up");
				uploadBtn.removeClass("d-none");
				exploreBtn.addClass("d-none")
				const date = new Date();
				/*TODO DEV: Pasar lang 'en' x config */
				const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' , hour: '2-digit', minute: '2-digit'}) 
				const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute }] = dateTimeFormat .formatToParts(date ) 
				theDate.html(`${day}  ${month} ${year }`);
				theTime.html(` ${hour }:${minute } hs`);
			}else{
			
				label.removeClass("up");
				uploadBtn.addClass("d-none");
				exploreBtn.removeClass("d-none")
			}

			$(cleanBtn).on('click', function(){
				$(fileUploaded, theDate, theTime).innerHTML ='';
				label.removeClass("up");
				uploadBtn.addClass("d-none");
				exploreBtn.removeClass("d-none")
			});
		
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});

