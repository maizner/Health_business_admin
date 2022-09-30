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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJteXdlYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbXl3ZWIgPSB7XHJcbiAgICBcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIENPTUlFTlpPIERFIERST1AgQU5EIFVQTE9BRCBGSUxFXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcbiAgICAgICAgJCgnaW5wdXRbdHlwZT1maWxlXScpLmRyb3BfdXBsb2FkZXIoe1xyXG5cclxuICAgICAgICAgICAgdXBsb2FkZXJfdGV4dDogJycsIC8vQ2xpY2sgcGFyYSBzdWJpciBvIGFycmFzdHJhIHR1cyBhcmNoaXZvcyBhcXXDrVxyXG4gICAgICAgICAgICBicm93c2VfdGV4dDogJ0NsaWNrIHBhcmEgc3ViaXIgbyBEcmFnIGFuZCBEcm9wLicsXHJcbiAgICAgICAgICAgIHNlY29uZGFyeV90ZXh0OiAnJyxcclxuICAgICAgICAgICAgb25seV9vbmVfZXJyb3JfdGV4dDogJ1NvbG8gdW4gYXJjaGl2byBwZXJtaXRpZG8nLFxyXG4gICAgICAgICAgICBub3RfYWxsb3dlZF9lcnJvcl90ZXh0OiAnRXN0ZSB0aXBvIGRlIGFyY2hpdm9zIG5vIGVzdGEgcGVybWl0aWRvLCBzb2xvIGltYWdlbmVzIEpQRy9QTkcnLFxyXG4gICAgICAgICAgICBiaWdfZmlsZV9iZWZvcmVfZXJyb3JfdGV4dDogJ0VsIGFyY2hpdm8gc3ViaWRvIHN1cGVyYSBlbCBwZXNvLicsXHJcbiAgICAgICAgICAgIGJpZ19maWxlX2FmdGVyX2Vycm9yX3RleHQ6ICdObyBwZXJtaXRpZG8nLFxyXG4gICAgICAgICAgICBhbGxvd2VkX2JlZm9yZV9lcnJvcl90ZXh0OiAnc29sbycsXHJcbiAgICAgICAgICAgIGFsbG93ZWRfYWZ0ZXJfZXJyb3JfdGV4dDogJ2FyY2hpdm8gcGVybWl0aWRvJyxcclxuICAgICAgICAgICAgYnJvd3NlX2Nzc19jbGFzczogJycsXHJcbiAgICAgICAgICAgIGJyb3dzZV9jc3Nfc2VsZWN0b3I6ICdmaWxlX2Jyb3dzZScsXHJcbiAgICAgICAgICAgIHVwbG9hZGVyX2ljb246ICc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1kcm9wdXBsb2FkXCI+PC9zcGFuPicsXHJcbiAgICAgICAgICAgIGZpbGVfaWNvbjogJzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWNsb3NlXCI+PC9zcGFuPicsXHJcbiAgICAgICAgICAgIHByb2dyZXNzX2NvbG9yOiAnIzRhOTBlMicsXHJcbiAgICAgICAgICAgIHRpbWVfc2hvd19lcnJvcnM6IDUsXHJcbiAgICAgICAgICAgIGxheW91dDogJ2xpc3QnLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICB1cmw6ICcnLFxyXG4gICAgICAgICAgICBkZWxldGVfdXJsOiAnJyxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9BZ3JlZ2EgbG9zIHN1YnTDrXR1bG9zIGxpc3RhZG9zIGVuIGFycmF5IHBhcmEgY2FkYSBkcm9wXHJcbiAgICAgICAgc3VidGl0bGVzKClcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIENPTUlFTlpPIERFIENPTE9SUElDS0VSXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcblxyXG4gICAgICAgICQoXCIjY29sb3JwaWNrZXJcIikuc3BlY3RydW0oe1xyXG4gICAgICAgICAgICBzaG93SW5wdXQ6IHRydWUsIC8vIE11ZXN0cmEgaW5wdXQgXHJcbiAgICAgICAgICAgIHNob3dQYWxldHRlOiB0cnVlLCAvLyBNdWVzdHJhIGxhIHBhbGV0YSBkZSBjb2xvcmVzXHJcbiAgICAgICAgICAgIHNob3dBbHBoYTogZmFsc2UsIC8vIE9jdWx0YSBlbCBzbGlkZXIgZGVsIGNhbmFsIGFscGhhXHJcbiAgICAgICAgICAgIG1heFNlbGVjdGlvblNpemU6IDEsIC8vIEd1YXJkYSBzw7NsbyB1biBjb2xvciBzZWxlY2Npb25hZG9cclxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsIC8vIE9jdWx0YSBlbCBib3TDs24gZGUgY2FuY2VsYXIvIGxpbXBpYXIgc2VsZWNjw61vblxyXG4gICAgICAgICAgICBwYWxldHRlOiBbICAvLyBQYWxldGEgcGVyem9uYWxpemFkYSAoQ2hlY2tlYXIgY29uIGRpc2XDsW8pXHJcbiAgICAgICAgICAgICAgICBbJyM2ZWE2ZTgnLCAnIzc0YzI4MycsICcjZjlkOTQ5JywgJyNmNTk1NDAnLCAnI2Y2NmM2YycsIFwiIzY5NmNkNFwiLCAnIzZkNmQ2ZCcsICcjZjVmNWY1J11cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEZJTiBERSBDT0xPUlBJQ0tFUlxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gc3VidGl0bGVzKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VidGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3VidGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gW1xyXG4gICAgICAgICAgICAgICAgJyhQTkcsIG3DoXhpbW8gNjVweCBhbHRvIG8gMjAwcHggYW5jaG8uIE3DoXguIDUwMGtiKScsIFxyXG4gICAgICAgICAgICAgICAgJyhQTkcsIG3DoXhpbW8gNjVweCBhbHRvIG8gMjAwcHggYW5jaG8uIE3DoXguIDUwMGtiKScsIFxyXG4gICAgICAgICAgICAgICAgJyhKUEcsIDE0NDAgYW5jaG8geCA3MjAgYWx0by4gTcOheC4gM01CKSdcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxzdWJ0aXRsZS5sZW5ndGg7IGkrKykgeyBcclxuICAgICAgICAgICAgICAgIGZvciAoaSBpbiBkYXRhKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlW2ldLmlubmVySFRNTD0gZGF0YVtpXSAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG59O1xyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgbXl3ZWIuaW5pdCgpO1xyXG4gICBcclxufSk7Il0sImZpbGUiOiJteXdlYi5qcyJ9
