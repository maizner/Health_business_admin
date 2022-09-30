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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbnB1dEZpbGUvaW5wdXRmaWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdEJ5IE9zdmFsZGFzIFZhbHV0aXMsIHd3dy5vc3ZhbGRhcy5pbmZvXG5cdEF2YWlsYWJsZSBmb3IgdXNlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuKi9cblxuXG5cdHZhciBpbnB1dHMgPSAkKCAnLmpzX2lucHV0X2ZpbGUnICk7XG5cdFxuXG5cdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoIGlucHV0cywgZnVuY3Rpb24oIGlucHV0IClcblx0e1xuXHRcdFxuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCBmdW5jdGlvbiggZSApXG5cdFx0e1xuXHRcdFx0dmFyIGZpbGVVcGxvYWRlZCA9ICQodGhpcykuZmluZCgnLmZpbGVfdXBsb2FkZWQnKTtcblx0XHRcdFxuXHRcdFx0dmFyIGxhYmVsXHQgPSAkKHRoaXMpLmZpbmQoJy5maWxlc19jb250YWluZXInKTtcblx0XHRcdHZhciBmaWxlSW1hZ2U9ICAkKHRoaXMpLmZpbmQoJ2xhYmVsIC5pbWcnKTtcblx0XHRcdHZhciB0aGVEYXRlPSBsYWJlbC5maW5kKCAnLmRhdGVfdGltZSAuZGF0ZScgKTtcblx0XHRcdHZhciB0aGVUaW1lPSBsYWJlbC5maW5kKCAnLmRhdGVfdGltZSAudGltZScgKTtcblx0XHRcdHZhciB1cGxvYWRCdG4gPSAkKHRoaXMpLmZpbmQoJy5idXR0b25fY29udGFpbmVyX3JpZ2h0Jyk7XG5cdFx0XHR2YXIgZXhwbG9yZUJ0biA9ICQodGhpcykuZmluZCgnLmJ1dHRvbl9jb250YWluZXJfbGVmdCcpXG5cdFx0XHR2YXIgY2xlYW5CdG4gPSAkKHRoaXMpLmZpbmQoJy5qc19jbGVhbicpXG5cblx0XHRcdHZhciBmaWxlTmFtZSA9ICcnO1xuXG5cdFx0XHRpZiggdGhpcy5maWxlcyAmJiB0aGlzLmZpbGVzLmxlbmd0aCA+IDEgKVxuXHRcdFx0XHRmaWxlTmFtZSA9ICggdGhpcy5nZXRBdHRyaWJ1dGUoICdkYXRhLW11bHRpcGxlLWNhcHRpb24nICkgfHwgJycgKS5yZXBsYWNlKCAne2NvdW50fScsIHRoaXMuZmlsZXMubGVuZ3RoICk7XG5cdFx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRmaWxlTmFtZSA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KCAnXFxcXCcgKS5wb3AoKTtcblxuXG5cdFx0XHRpZiggZmlsZU5hbWUgKXtcblx0XHRcdFx0Ly9Gb3JtYXRvIGpzIHBhcmEgYWdyZWdhciBpbWFnZW4uIE5vIGVuIHVzby4gU2FsZSBkZSBCRFxuXHRcdFx0XHRcbiAgICAgICAgXHRcdHZhciB0bXBwYXRoID0gVVJMLmNyZWF0ZU9iamVjdFVSTChldmVudC50YXJnZXQuZmlsZXNbMF0pO1xuXHRcdFx0XHRmaWxlSW1hZ2UuZmFkZUluKFwiZmFzdFwiKS5hdHRyKCdzcmMnLFVSTC5jcmVhdGVPYmplY3RVUkwoZXZlbnQudGFyZ2V0LmZpbGVzWzBdKSk7XG5cdFx0XHRcdCQobGFiZWwpLmFwcGVuZChmaWxlSW1hZ2UpO1x0XG5cdFx0XHRcdGZpbGVVcGxvYWRlZC5odG1sKGZpbGVOYW1lKTtcblx0XHRcdFx0ZmlsZVVwbG9hZGVkLmF0dHIoJ3RpdGxlJyxmaWxlTmFtZSk7XG5cdFx0XHRcdGZpbGVVcGxvYWRlZC5hZGRDbGFzcygnYnJvd3NlJyk7XG5cdFx0XHRcdGxhYmVsLmFkZENsYXNzKFwidXBcIik7XG5cdFx0XHRcdHVwbG9hZEJ0bi5yZW1vdmVDbGFzcyhcImQtbm9uZVwiKTtcblx0XHRcdFx0ZXhwbG9yZUJ0bi5hZGRDbGFzcyhcImQtbm9uZVwiKVxuXHRcdFx0XHRjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcblx0XHRcdFx0LypUT0RPIERFVjogUGFzYXIgbGFuZyAnZW4nIHggY29uZmlnICovXG5cdFx0XHRcdGNvbnN0IGRhdGVUaW1lRm9ybWF0ID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuJywgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJzItZGlnaXQnICwgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0J30pIFxuXHRcdFx0XHRjb25zdCBbeyB2YWx1ZTogbW9udGggfSwseyB2YWx1ZTogZGF5IH0sLHsgdmFsdWU6IHllYXIgfSwseyB2YWx1ZTogaG91ciB9LCx7IHZhbHVlOiBtaW51dGUgfV0gPSBkYXRlVGltZUZvcm1hdCAuZm9ybWF0VG9QYXJ0cyhkYXRlICkgXG5cdFx0XHRcdHRoZURhdGUuaHRtbChgJHtkYXl9ICAke21vbnRofSAke3llYXIgfWApO1xuXHRcdFx0XHR0aGVUaW1lLmh0bWwoYCAke2hvdXIgfToke21pbnV0ZSB9IGhzYCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFxuXHRcdFx0XHRsYWJlbC5yZW1vdmVDbGFzcyhcInVwXCIpO1xuXHRcdFx0XHR1cGxvYWRCdG4uYWRkQ2xhc3MoXCJkLW5vbmVcIik7XG5cdFx0XHRcdGV4cGxvcmVCdG4ucmVtb3ZlQ2xhc3MoXCJkLW5vbmVcIilcblx0XHRcdH1cblxuXHRcdFx0JChjbGVhbkJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0JChmaWxlVXBsb2FkZWQsIHRoZURhdGUsIHRoZVRpbWUpLmlubmVySFRNTCA9Jyc7XG5cdFx0XHRcdGxhYmVsLnJlbW92ZUNsYXNzKFwidXBcIik7XG5cdFx0XHRcdHVwbG9hZEJ0bi5hZGRDbGFzcyhcImQtbm9uZVwiKTtcblx0XHRcdFx0ZXhwbG9yZUJ0bi5yZW1vdmVDbGFzcyhcImQtbm9uZVwiKVxuXHRcdFx0fSk7XG5cdFx0XG5cdFx0fSk7XG5cblx0XHQvLyBGaXJlZm94IGJ1ZyBmaXhcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLCBmdW5jdGlvbigpeyBpbnB1dC5jbGFzc0xpc3QuYWRkKCAnaGFzLWZvY3VzJyApOyB9KTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIGZ1bmN0aW9uKCl7IGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoICdoYXMtZm9jdXMnICk7IH0pO1xuXHR9KTtcblxuIl0sImZpbGUiOiJpbnB1dEZpbGUvaW5wdXRmaWxlLmpzIn0=
