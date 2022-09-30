var myweb = {
    
    init: function () {
        
        // -----------------------------------------------------------------------------
        // COMIENZO DE DROP AND UPLOAD FILE
        // ----------------------------------------------------------------------------- 
        $('input[type=file]').drop_uploader({

            uploader_text: '', //Click para subir o arrastra tus archivos aquí
            browse_text: 'Click para subir o Drag and Drop.',
            secondary_text: '',
            only_one_error_text: 'Solo un archivo permitido',
            not_allowed_error_text: 'Este tipo de archivos no esta permitido, solo imagenes JPG/PNG',
            big_file_before_error_text: 'El archivo subido supera el peso.',
            big_file_after_error_text: 'No permitido',
            allowed_before_error_text: 'solo',
            allowed_after_error_text: 'archivo permitido',
            browse_css_class: '',
            browse_css_selector: 'file_browse',
            uploader_icon: '<span class="icon icon-dropupload"></span>',
            file_icon: '<span class="icon icon-close"></span>',
            progress_color: '#4a90e2',
            time_show_errors: 5,
            layout: 'list',
            method: 'normal',
            url: '',
            delete_url: '',
            
        });
        //Agrega los subtítulos listados en array para cada drop
        subtitles()
        // -----------------------------------------------------------------------------
        // COMIENZO DE COLORPICKER
        // ----------------------------------------------------------------------------- 

        $("#colorpicker").spectrum({
            showInput: true, // Muestra input 
            showPalette: true, // Muestra la paleta de colores
            showAlpha: false, // Oculta el slider del canal alpha
            maxSelectionSize: 1, // Guarda sólo un color seleccionado
            allowEmpty: false, // Oculta el botón de cancelar/ limpiar seleccíon
            palette: [  // Paleta perzonalizada (Checkear con diseño)
                ['#6ea6e8', '#74c283', '#f9d949', '#f59540', '#f66c6c', "#696cd4", '#6d6d6d', '#f5f5f5']
            ]
        });

        // -----------------------------------------------------------------------------
        // FIN DE COLORPICKER
        // ----------------------------------------------------------------------------- 
       
        
        function subtitles() {
            var subtitle = document.querySelectorAll('.subtitle');

            var data = [
                '(PNG, máximo 65px alto o 200px ancho. Máx. 500kb)', 
                '(PNG, máximo 65px alto o 200px ancho. Máx. 500kb)', 
                '(JPG, 1440 ancho x 720 alto. Máx. 3MB)'
            ];
            
            for (var i=0; i<subtitle.length; i++) { 
                for (i in data) { 
                    subtitle[i].innerHTML= data[i]  
                }
            }
           
        }
    },

    
};


$(function () {
    myweb.init();
   
});