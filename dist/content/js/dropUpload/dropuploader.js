//http://demo.borisolhor.com/drop-uploader/

//MOdificado 09/2020

(function($) {
    jQuery.fn.drop_uploader = function(options) {
        options = $.extend({
            // Localization
            uploader_text: 'Drop files to upload, or',
            browse_text: 'Browse',
            secondary_text: '',
            only_one_error_text: 'Only one file allowed',
            not_allowed_error_text: 'File type is not allowed',
            big_file_before_error_text: 'Files, bigger than',
            big_file_after_error_text: 'is not allowed',
            allowed_before_error_text: 'Only',
            allowed_after_error_text: 'files allowed',
            // CSS
            browse_css_class: 'button button-primary',
            browse_css_selector: 'file_browse',
            uploader_icon: '<i class="pe-7s-cloud-upload"></i>',
            file_icon: '<i class="pe-7s-file"></i>',
            progress_color: '#4a90e2',
            // Main Options
            time_show_errors: 5,
            layout: 'thumbnails', // thumbnails/list
            method: 'normal', // normal/ajax/chunked
            chunk_size: 1000000, 
            // AJAX URL
            url: 'ajax_upload.php',
            delete_url: 'ajax_delete.php',
        }, options);

        this.each(function(i, val) {
            var v = val;
            // Get input file params
            var file_accept = $(v).attr("accept");
            var file_multiple = $(v).prop("multiple");
            var file_multiple_count = parseInt($(v).data("count"));
            var input_name = $(v).prop("name");
            var max_file_size = 0; 

            var uploader_id = 'drop_uploader_' + i;

            var added_files = 0;
            var files_index = 0;

            var cur_form = $(v).parent("form");
            var input_max_file_size = $(cur_form).find("input[name=MAX_FILE_SIZE]").val();
            if(input_max_file_size !== undefined) {
                max_file_size = parseInt(input_max_file_size);
            }

            var data_max_file_size = $(v).data("maxfilesize");
            if(data_max_file_size !== undefined) {
                max_file_size = parseInt(data_max_file_size);
            }

            var layout = options.layout;
            if($(v).data("layout") == "thumbnails") {
                layout = "thumbnails";
            } else if($(v).data("layout") == "list") {
                layout = "list";
            }

            var submit_method = options.method;
            if($(v).data("method") == "normal") {
                submit_method = "normal";
            } else if($(v).data("method") == "ajax") {
                submit_method = "ajax";
            } else if($(v).data("method") == "chunked") {
                submit_method = "chunked";
            }

            var submit_url = options.url;
            if($(v).data("url") != "" && $(v).data("url") !== undefined) {
                submit_url = $(v).data("url");
            }

            var delete_url = options.delete_url;
            if($(v).data("deleteurl") != "" && $(v).data("deleteurl") !== undefined) {
                delete_url = $(v).data("deleteurl");
            }

            // Wrap file input field
            $(v).attr('id', get_random_id());
            $(v).wrap('<div id="' + uploader_id + '" class="drop_uploader drop_zone"></div>');
            $(v).before('<div class="text_wrapper">' + options.uploader_icon + ' <span class="text">' + options.uploader_text + ' <a href="#" class="' + options.browse_css_class + ' ' + options.browse_css_selector + '">' + options.browse_text + '<span class="subtitle">' + options.secondary_text  +'</span></a></span></div>');
            $(v).before('<span class="errors"></span>');
            if(submit_method == "ajax" || submit_method == "chunked") {
                $(v).attr('name', '');
            }

            var ul_classes = "files";

            if(layout == "thumbnails") {
                ul_classes += " thumb"
            }
            if(submit_method == "ajax") {
                ul_classes += " ajax"
            }
            if(submit_method == "chunked") {
                ul_classes += " ajax"
            }

            $(v).before('<ul class="' + ul_classes + '"></ul>');

            var drop_zone = $('#' + uploader_id);

            drop_zone[0].ondragover = function(event) {
                drop_zone.addClass('hover');
                if(submit_method == "normal") {
                    maximizeInput(v);
                    return false;
                } else if(submit_method == "ajax" || submit_method == "chunked"){
                    minimizeInput(v);
                    return false;
                }
                
            };

            drop_zone[0].ondragleave = function(event) {
                drop_zone.removeClass('hover');
                //minimizeInput(v);
                return false;
            };


            drop_zone[0].ondrop = function(event) {
                minimizeInput(v);
                clear_error();
                if(submit_method == "normal") {
                    var files = event.dataTransfer.files;
                    // Check Files
                    var check_result = check_files(files);
                    if(check_result == false) {
                        $('#' + uploader_id + ' .files').html('');
                        // Delete input and create new
                        var new_id = get_random_id();
                        var cur_input_html = $(v)[0].outerHTML;
                        var new_v = $.parseHTML(cur_input_html);
                        $(new_v).attr('id', new_id);
                        $(v).before(new_v);
                        $(v).remove();
                        v = $('#'+new_id)[0];
                        $(v).change(function() {
                            files_added();
                        });
                        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                    }
                } else if(submit_method == "ajax" || submit_method == "chunked") {
                    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                    var files = event.dataTransfer.files;
                    var check_result = check_files(files);
                    if(check_result) {
                        files_added(files);
                    }
                }
            };
          
            
            $(drop_zone).find("." + options.browse_css_selector).click(function(event) {
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                $(v).click();
            });

            // Show added files
            $(v).change(function() {
                var files = $(v)[0].files;
                var check_result = check_files(files);

                if(submit_method == "normal") {
                    if(check_result == false) {
                        $('#' + uploader_id + ' .files').html('');
                        // Delete input and create new
                        var new_id = get_random_id();
                        var cur_input_html = $(v)[0].outerHTML;
                        var new_v = $.parseHTML(cur_input_html);
                        $(new_v).attr('id', new_id);
                        $(v).before(new_v);
                        $(v).remove();
                        v = $('#'+new_id)[0];
                        $(v).change(function() {
                            files_added();
                        });
                        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                    } else {
                        files_added(files);
                    }
                } else if(submit_method == "ajax" || submit_method == "chunked") {
                    if(check_result) {
                        files_added(files);
                    }
                }
            });

            function files_added(files) {
                if(files === undefined) {
                    var files = $(v)[0].files;
                }
                if(submit_method == "normal") {
                    $('#' + uploader_id + ' .files').html('');
                }
                for (var i = 0; i < files.length; i++) {
                    //tomamos el modal
                    var modal = document.querySelector('.js_uploadmodal')
                    var fileSize = get_file_size_readable(files[i].size)
                    //le damos el id del archivo
                    modal.id= uploader_id
                    //Configuramos fecha y hora para mostrar en modal
                    const date = new Date();
                    /*TODO DEV: Pasar lang 'en' x config */
                    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' , hour: '2-digit', minute: '2-digit'}) 
                    const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute }] = dateTimeFormat .formatToParts(date ) 
                    
                    if(layout == "thumbnails") {
                        // Si es miniatura o thumbnail
                        // Agregando archivos a la lista 
                        
                        var listUl = $('#' + uploader_id + ' .files.thumb')
                        var listItem = '<li id="selected_file_' + files_index + '"><div class="thumbnail"></div><span class="title" title="' + files[i].name + '"><span class="left">' + files[i].name +'</span> <span class="right"> '+ fileSize  +' </span></span></li>'
                        listUl.append(listItem);
                        preview_file(files[i],files_index);
                        // TODO DSG: SOLO DEBE REMOVERSE EL ELEMNTO CON CLICK EN CRUZ
                        // 
                        $(listUl).on('click', function(){
                            $(this).children().remove()
                        })

                    } else {
                      
                        drop_zone.addClass('hover');
                        //vaciamos el body del modal con cada subida
                        var modalbody = $('#' + uploader_id + ' .modal-body')
                        modalbody.html('')
                        //agregamos el elemento que tiene nombre, fecha y hora del archivo 
                        var fileInfo = '<div class="input_file"><label class="files_container feature_row_bg_color up"><span class="icon icon-selected"><span class="icon icon-selected-row"></span></span><span class="file_uploaded" title="'+ files[i].name +'">'+ files[i].name +'</span><span class="date_time"><span class="date">'+ `${day}  ${month} ${year }` +'</span><span class="time">'+ ` ${hour }:${minute } hs` +'</span></span></label></div>'
                        modalbody.append(fileInfo)
                        //Agregamos la imagen subida
                        var fileItem = '<div id="selected_file_' + files_index + '" class="preview_img"><div class="thumbnail"></div></div>'
                        modalbody.append(fileItem);
                        //preparamos el nombre y peso del archivo a mostrar y lo agregamos
                        var listUl = $('#' + uploader_id + ' .files')
                        var iconClose = $('#' + uploader_id + ' .files .icon-close')
                        var listItem = options.file_icon +'<span class="icon icon-checkupload" ></span><li id="selected_file_' + files_index + '" class="list_item">' +  ' <span class="left">' + files[i].name +'</span> <span class="right"> '+ fileSize  +' </span> </li>'
                        preview_file(files[i],files_index);
                        //mostramos el modal 
                        $('.js_uploadmodal').modal('show')

                    }

                    //Al click de subir elimina clases, esconde modal, agrega al drop nombre y peso del archivo
                    //para luego ser levantado por dev.
                    //TODO DEV: GRABAR EN DB los archivos subidos al click en GUARDAR
                    document.querySelector(".js_load").onclick = function() {
                        drop_zone.removeClass('hover');
                        listUl.append(listItem);
                        listUl.addClass('added');
                        listUl.parents('.drop_wrapper').addClass('items_added')
                        $('.js_uploadmodal').modal('hide')
                        
                    }

                    //limpiamos carga completa de drops si ponemos CANCELAR
                    $(".js_clean_form, .js_cancel").on('click', function(){
                        drop_zone.removeClass('hover');
                        $(".drop_zone").removeClass('items_added')
                        $(".added").empty().removeClass('added');
                    })
                    
                    console.log(iconClose)
                    //Debe borrarse al click de la cruz
                    $(listUl).on('click', function(){
                        
                        listUl.children().remove()
                        listUl.removeClass('added')
                        listUl.parents('.drop_wrapper').removeClass('items_added')
                    })

                    // Now upload files via AJAX
                    if(submit_method == "ajax") {
                        file_upload_ajax(files[i],files_index);
                    } else if(submit_method == "chunked") {
                        file_upload_chunked(files[i],files_index);
                    }
                    files_index++;
                    if(submit_method == "ajax" || submit_method == "chunked") {
                        added_files++;
                    }
                }

            }
            
            function preview_file(file, i) {
                var reader  = new FileReader();

                getOrientation(file, function(orientation) {
                    var rotate_class = "";
                    if(orientation == 8) {
                        rotate_class = "rotate_90";
                    } else if(orientation == 3) {
                        rotate_class = "rotate_180";
                    } else if(orientation == 6) {
                        rotate_class = "rotate_270";
                    }
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').addClass(rotate_class);
                });
                
                // Check file type
                if(file.type.match('image/*')) {
                    reader.readAsDataURL(file);
                } else if(file.type.match('video/*')) {
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').html('<i class="pe-7s-video"></i>');
                } else if(file.type.match('audio/*')) {
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').html('<i class="pe-7s-volume"></i>');
                } else {
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').html('<i class="pe-7s-file"></i>');
                }

                reader.onloadend = function () {
                    // $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').attr('style', 'background-image: url("' + reader.result + '")');
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').append('<img src="' + reader.result + '" class="image_thumb"/>');
                    // Add hover layer
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').append('<div class="du_hover_layer"></div>');
                }
            }

            function file_upload_ajax(file,i) {
                $('#' + uploader_id).trigger( "file_upload_start", [ file.name ] );
                var xhr = new XMLHttpRequest();
                if(layout == "thumbnails") {
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').after('<div class="du_progress"></div>');
                } else {
                    $('#' + uploader_id + ' #selected_file_' + i).append('<div class="du_progress"></div>');
                }
                var progress_el = $('#' + uploader_id + ' #selected_file_' + i + ' .du_progress');
                (xhr.upload || xhr).addEventListener('progress', function(e) {
                    var done = e.position || e.loaded
                    var total = e.totalSize || e.total;
                    var progress = Math.round(done/total*100);
                    draw_round_progress(progress_el[0], progress / 100, layout);
                });
                xhr.addEventListener('load', function(e) {
                    var response = JSON.parse(this.response);
                    $('#' + uploader_id + ' #selected_file_' + i + ' .du_progress').fadeOut('slow');
                    if(response.success) {
                        $('#' + uploader_id).trigger( "file_upload_end", [ file.name ] );
                        // Add delete button
                        var du_delete_button = $('<i class="pe-7s-trash action-delete" data-fileid="' + response.file_id + '"></i>').hide();
                        if(layout == "thumbnails") {
                            $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').append(du_delete_button);
                        } else if (layout == "list") {
                            $('#' + uploader_id + ' #selected_file_' + i).append(du_delete_button);
                        }
                        du_delete_button.delay(500).fadeIn("slow");
                        // Add hidden input with file id
                        $('#' + uploader_id).append('<input id="hidden_file_' + i + '" type="hidden" name="' + input_name + '" value="' + response.file_id + '" >');
                        // Add delete buton listener
                        $('#' + uploader_id + ' #selected_file_' + i + ' i.action-delete').on("click", function(event) {
                            var fileid = $(this).data("fileid");
                            $.ajax({
                                url: delete_url,
                                data: "fileid=" + fileid,
                            }).done(function() {
                                $('#' + uploader_id + ' #selected_file_' + i).delay(500).fadeOut("slow");
                                $('#' + uploader_id + ' #hidden_file_' + i).remove();
                                added_files--;
                            });
                        });
                    } else {
                        set_error(response.message);
                        remove_file(i);
                    }
                });
                xhr.open('post', submit_url, true);
                var fdata = new FormData;
                fdata.append(input_name.replace('[]',''), file);
                xhr.send(fdata);
            }

            function file_upload_chunked(file,i) {
                $('#' + uploader_id).trigger( "file_upload_start", [ file.name ] );

                if(layout == "thumbnails") {
                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').after('<div class="du_progress"></div>');
                } else {
                    $('#' + uploader_id + ' #selected_file_' + i).append('<div class="du_progress"></div>');
                }

                var size = file.size;
                var sliceSize = options.chunk_size;
                var start = 0;
                var chunk = 0;

                loop();

                function loop() {
                    var end = start + sliceSize;

                    if (size - end < 0) {
                        end = size;
                    }

                    var s = slice(file, start, end);

                    send(s, start, end, size, sliceSize);

                    chunk++;

                    if (end < size) {
                        start += sliceSize;
                    }
                }

                function send(piece, start, end, size, sliceSize) {
                    var formdata = new FormData();
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', submit_url, true);

                    formdata.append('start', start);
                    formdata.append('end', end);
                    formdata.append(input_name.replace('[]',''), piece);
                    formdata.append('chunk', chunk);
                    formdata.append('file_name', file.name);
                    if (end < size) {
                        formdata.append('chunk_last', false);
                    } else {
                        formdata.append('chunk_last', true);
                    }

                    xhr.onreadystatechange = function() {
                        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

                            var response = JSON.parse(this.response);

                            // Draw progress
                            var progress_el = $('#' + uploader_id + ' #selected_file_' + i + ' .du_progress');

                            draw_round_progress(progress_el[0], end / size, layout);

                            if (end < size) {
                                loop();
                            } else if(response.success && response.type == 'file') {
                                // Upload Completed
                                $('#' + uploader_id + ' #selected_file_' + i + ' .du_progress').fadeOut('slow');

                                $('#' + uploader_id).trigger( "file_upload_end", [ file.name ] );
                                // Add delete button
                                var du_delete_button = $('<i class="pe-7s-trash action-delete" data-fileid="' + response.file_id + '"></i>').hide();
                                if(layout == "thumbnails") {
                                    $('#' + uploader_id + ' #selected_file_' + i + ' div.thumbnail').append(du_delete_button);
                                } else if (layout == "list") {
                                    $('#' + uploader_id + ' #selected_file_' + i).append(du_delete_button);
                                }
                                du_delete_button.delay(500).fadeIn("slow");
                                // Add hidden input with file id
                                $('#' + uploader_id).append('<input id="hidden_file_' + i + '" type="hidden" name="' + input_name + '" value="' + response.file_id + '" >');
                                // Add delete buton listener
                                $('#' + uploader_id + ' #selected_file_' + i + ' i.action-delete').on("click", function(event) {
                                    var fileid = $(this).data("fileid");
                                    $.ajax({
                                        url: delete_url,
                                        data: "fileid=" + fileid,
                                    }).done(function() {
                                        $('#' + uploader_id + ' #selected_file_' + i).delay(500).fadeOut("slow");
                                        $('#' + uploader_id + ' #hidden_file_' + i).remove();
                                        added_files--;
                                    });
                                });
                            }
                        }
                    }

                    xhr.send(formdata);
                }
            }

            function slice(file, start, end) {
                var slice = file.mozSlice ? file.mozSlice :
                            file.webkitSlice ? file.webkitSlice :
                            file.slice ? file.slice : noop;

                return slice.bind(file)(start, end);
            }

            function noop() {
  
            }

            function remove_file(i) {
                $('#' + uploader_id + ' #selected_file_' + i).delay(options.time_show_errors * 1000).fadeOut("slow");
            }

            function set_error(text) {
                $('#' + uploader_id + ' .errors').html('<p>' + text + '</p>');
                if (options.time_show_errors > 0) {
                    setTimeout(clear_error, options.time_show_errors * 1000);
                }
            }

            function clear_error() {
                $('#' + uploader_id + ' .errors p').fadeOut("slow", function() {
                    $('#' + uploader_id + ' .errors p').remove();
                });
            }

            function get_file_size_readable(bytes) {
                if      (bytes>=1000000000) {bytes=(bytes/1000000000).toFixed(2)+' GB';}
                else if (bytes>=1000000)    {bytes=(bytes/1000000).toFixed(2)+' MB';}
                else if (bytes>=1000)       {bytes=(bytes/1000).toFixed(2)+' KB';}
                else if (bytes>1)           {bytes=bytes+' bytes';}
                else if (bytes==1)          {bytes=bytes+' byte';}
                else                        {bytes='0 byte';}
                return bytes;
            };

            function check_files(files) {
                var allow_file_add = true;
                // Check multiple file support
                if (file_multiple) {
                    if(file_multiple_count) {
                        console.log(added_files);
                        if ((files.length + added_files) > file_multiple_count) {
                            set_error(options.allowed_before_error_text + ' ' + file_multiple_count + ' ' + options.allowed_after_error_text);
                            if(submit_method == "normal") {
                                added_files = 0;
                            }
                            return false;
                        } else {
                            allow_file_add = true;
                        }
                    } else {
                        allow_file_add = true;
                    }
                } else {
                    if (files.length > 1 || added_files > 0) {
                        set_error(options.only_one_error_text);
                        return false;
                    } else {
                        allow_file_add = true;
                    }
                }
                // Check file type support
                if(file_accept === undefined) {
                    allow_file_add = true;
                } else {
                    var accept_array = file_accept.split(',');
                    for (var i = 0; i < files.length; i++) {
                        var match_count = 0;
                        for (var a = 0; a < accept_array.length; a++) {
                            var match_string = accept_array[a].replace('/','.').trim();
                            if(files[i].type.match(match_string) != null) {
                                match_count++;
                            }
                        }
                        if(match_count == 0) {
                            set_error(options.not_allowed_error_text);
                            return false;
                        }
                    }
                }
                // Check file size
                for (var i = 0; i < files.length; i++) {
                    if(files[i].size > max_file_size && max_file_size > 0) {
                        set_error(options.big_file_before_error_text + ' ' + get_file_size_readable(max_file_size) + ' ' + options.big_file_after_error_text);
                        return false;
                        
                    }
                }
                return allow_file_add;
            }

            function maximizeInput(v) {
                var drop_zone = $(v).parent(".drop_zone");
                var position = drop_zone.position();
                var top = position.top + parseInt(drop_zone.css('marginTop'), 10);
                var left = position.left + parseInt(drop_zone.css('marginLeft'), 10);
                $(v).css({top: top, left: left, position:'absolute', width: drop_zone.width(), height: drop_zone.height(), display:'block'});
            }

            function minimizeInput(v) {
                $(v).css({display:'none'});
            }

            function get_random_id() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for( var i=0; i < 15; i++ )
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }

            function draw_round_progress(el, percent, layout) {

                var canvas = el.children[0];

                var color = hex_to_rgba(options.progress_color);

                if(canvas === undefined) {
                    canvas = document.createElement('canvas');    
                }

                if(layout == "thumbnails") {
                    canvas.width = 100;
                    canvas.height = 100;
                    canvas.style.width = "50px";
                    canvas.style.height = "50px";
                    var diameter = 96;
                    var line_width = 8;
                } else {
                    canvas.width = 48;
                    canvas.height = 48;
                    canvas.style.width = "24px";
                    canvas.style.height = "24px";
                    var diameter = 48;
                    var line_width = 4;
                }

                el.appendChild(canvas);
                    
                if (typeof(G_vmlCanvasManager) !== 'undefined') {
                    G_vmlCanvasManager.initElement(canvas);
                }

                var ctx = canvas.getContext('2d');

                ctx.translate(diameter / 2, diameter / 2); // change center
                ctx.rotate((-1 / 2 + 0 / 180) * Math.PI); // rotate -90 deg
                
                var radius = (diameter - line_width) / 2; 
                percent = Math.min(Math.max(0, percent || 1), 1);
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                ctx.strokeStyle = color;
                ctx.lineCap = 'round'; // butt, round or square
                ctx.lineWidth = line_width;
                ctx.stroke();
            }

            function hex_to_rgba(hex) {
                var c;
                if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                    c= hex.substring(1).split('');
                    if(c.length== 3){
                        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                    }
                    c= '0x'+c.join('');
                    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',.8)';
                } else {
                    // return default color
                    return 'rgba(74, 144, 226, .8)';
                }
            }

            function getOrientation(file, callback) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var view = new DataView(e.target.result);
                    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
                    var length = view.byteLength, offset = 2;
                    while (offset < length) {
                        var marker = view.getUint16(offset, false);
                        offset += 2;
                        if (marker == 0xFFE1) {
                            if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                            var little = view.getUint16(offset += 6, false) == 0x4949;
                            offset += view.getUint32(offset + 4, little);
                            var tags = view.getUint16(offset, little);
                            offset += 2;
                            for (var i = 0; i < tags; i++)
                            if (view.getUint16(offset + (i * 12), little) == 0x0112)
                                return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                        else if ((marker & 0xFF00) != 0xFF00) break;
                        else offset += view.getUint16(offset, false);
                    }
                    return callback(-1);
                };
                reader.readAsArrayBuffer(file);
            }
        });
    };
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkcm9wVXBsb2FkL2Ryb3B1cGxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2h0dHA6Ly9kZW1vLmJvcmlzb2xob3IuY29tL2Ryb3AtdXBsb2FkZXIvXHJcblxyXG4vL01PZGlmaWNhZG8gMDkvMjAyMFxyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuICAgIGpRdWVyeS5mbi5kcm9wX3VwbG9hZGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIC8vIExvY2FsaXphdGlvblxyXG4gICAgICAgICAgICB1cGxvYWRlcl90ZXh0OiAnRHJvcCBmaWxlcyB0byB1cGxvYWQsIG9yJyxcclxuICAgICAgICAgICAgYnJvd3NlX3RleHQ6ICdCcm93c2UnLFxyXG4gICAgICAgICAgICBzZWNvbmRhcnlfdGV4dDogJycsXHJcbiAgICAgICAgICAgIG9ubHlfb25lX2Vycm9yX3RleHQ6ICdPbmx5IG9uZSBmaWxlIGFsbG93ZWQnLFxyXG4gICAgICAgICAgICBub3RfYWxsb3dlZF9lcnJvcl90ZXh0OiAnRmlsZSB0eXBlIGlzIG5vdCBhbGxvd2VkJyxcclxuICAgICAgICAgICAgYmlnX2ZpbGVfYmVmb3JlX2Vycm9yX3RleHQ6ICdGaWxlcywgYmlnZ2VyIHRoYW4nLFxyXG4gICAgICAgICAgICBiaWdfZmlsZV9hZnRlcl9lcnJvcl90ZXh0OiAnaXMgbm90IGFsbG93ZWQnLFxyXG4gICAgICAgICAgICBhbGxvd2VkX2JlZm9yZV9lcnJvcl90ZXh0OiAnT25seScsXHJcbiAgICAgICAgICAgIGFsbG93ZWRfYWZ0ZXJfZXJyb3JfdGV4dDogJ2ZpbGVzIGFsbG93ZWQnLFxyXG4gICAgICAgICAgICAvLyBDU1NcclxuICAgICAgICAgICAgYnJvd3NlX2Nzc19jbGFzczogJ2J1dHRvbiBidXR0b24tcHJpbWFyeScsXHJcbiAgICAgICAgICAgIGJyb3dzZV9jc3Nfc2VsZWN0b3I6ICdmaWxlX2Jyb3dzZScsXHJcbiAgICAgICAgICAgIHVwbG9hZGVyX2ljb246ICc8aSBjbGFzcz1cInBlLTdzLWNsb3VkLXVwbG9hZFwiPjwvaT4nLFxyXG4gICAgICAgICAgICBmaWxlX2ljb246ICc8aSBjbGFzcz1cInBlLTdzLWZpbGVcIj48L2k+JyxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NfY29sb3I6ICcjNGE5MGUyJyxcclxuICAgICAgICAgICAgLy8gTWFpbiBPcHRpb25zXHJcbiAgICAgICAgICAgIHRpbWVfc2hvd19lcnJvcnM6IDUsXHJcbiAgICAgICAgICAgIGxheW91dDogJ3RodW1ibmFpbHMnLCAvLyB0aHVtYm5haWxzL2xpc3RcclxuICAgICAgICAgICAgbWV0aG9kOiAnbm9ybWFsJywgLy8gbm9ybWFsL2FqYXgvY2h1bmtlZFxyXG4gICAgICAgICAgICBjaHVua19zaXplOiAxMDAwMDAwLCBcclxuICAgICAgICAgICAgLy8gQUpBWCBVUkxcclxuICAgICAgICAgICAgdXJsOiAnYWpheF91cGxvYWQucGhwJyxcclxuICAgICAgICAgICAgZGVsZXRlX3VybDogJ2FqYXhfZGVsZXRlLnBocCcsXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCB2YWwpIHtcclxuICAgICAgICAgICAgdmFyIHYgPSB2YWw7XHJcbiAgICAgICAgICAgIC8vIEdldCBpbnB1dCBmaWxlIHBhcmFtc1xyXG4gICAgICAgICAgICB2YXIgZmlsZV9hY2NlcHQgPSAkKHYpLmF0dHIoXCJhY2NlcHRcIik7XHJcbiAgICAgICAgICAgIHZhciBmaWxlX211bHRpcGxlID0gJCh2KS5wcm9wKFwibXVsdGlwbGVcIik7XHJcbiAgICAgICAgICAgIHZhciBmaWxlX211bHRpcGxlX2NvdW50ID0gcGFyc2VJbnQoJCh2KS5kYXRhKFwiY291bnRcIikpO1xyXG4gICAgICAgICAgICB2YXIgaW5wdXRfbmFtZSA9ICQodikucHJvcChcIm5hbWVcIik7XHJcbiAgICAgICAgICAgIHZhciBtYXhfZmlsZV9zaXplID0gMDsgXHJcblxyXG4gICAgICAgICAgICB2YXIgdXBsb2FkZXJfaWQgPSAnZHJvcF91cGxvYWRlcl8nICsgaTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRlZF9maWxlcyA9IDA7XHJcbiAgICAgICAgICAgIHZhciBmaWxlc19pbmRleCA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VyX2Zvcm0gPSAkKHYpLnBhcmVudChcImZvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dF9tYXhfZmlsZV9zaXplID0gJChjdXJfZm9ybSkuZmluZChcImlucHV0W25hbWU9TUFYX0ZJTEVfU0laRV1cIikudmFsKCk7XHJcbiAgICAgICAgICAgIGlmKGlucHV0X21heF9maWxlX3NpemUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbWF4X2ZpbGVfc2l6ZSA9IHBhcnNlSW50KGlucHV0X21heF9maWxlX3NpemUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YV9tYXhfZmlsZV9zaXplID0gJCh2KS5kYXRhKFwibWF4ZmlsZXNpemVcIik7XHJcbiAgICAgICAgICAgIGlmKGRhdGFfbWF4X2ZpbGVfc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhfZmlsZV9zaXplID0gcGFyc2VJbnQoZGF0YV9tYXhfZmlsZV9zaXplKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxheW91dCA9IG9wdGlvbnMubGF5b3V0O1xyXG4gICAgICAgICAgICBpZigkKHYpLmRhdGEoXCJsYXlvdXRcIikgPT0gXCJ0aHVtYm5haWxzXCIpIHtcclxuICAgICAgICAgICAgICAgIGxheW91dCA9IFwidGh1bWJuYWlsc1wiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoJCh2KS5kYXRhKFwibGF5b3V0XCIpID09IFwibGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQgPSBcImxpc3RcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHN1Ym1pdF9tZXRob2QgPSBvcHRpb25zLm1ldGhvZDtcclxuICAgICAgICAgICAgaWYoJCh2KS5kYXRhKFwibWV0aG9kXCIpID09IFwibm9ybWFsXCIpIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdF9tZXRob2QgPSBcIm5vcm1hbFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoJCh2KS5kYXRhKFwibWV0aG9kXCIpID09IFwiYWpheFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRfbWV0aG9kID0gXCJhamF4XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZigkKHYpLmRhdGEoXCJtZXRob2RcIikgPT0gXCJjaHVua2VkXCIpIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdF9tZXRob2QgPSBcImNodW5rZWRcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHN1Ym1pdF91cmwgPSBvcHRpb25zLnVybDtcclxuICAgICAgICAgICAgaWYoJCh2KS5kYXRhKFwidXJsXCIpICE9IFwiXCIgJiYgJCh2KS5kYXRhKFwidXJsXCIpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdF91cmwgPSAkKHYpLmRhdGEoXCJ1cmxcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkZWxldGVfdXJsID0gb3B0aW9ucy5kZWxldGVfdXJsO1xyXG4gICAgICAgICAgICBpZigkKHYpLmRhdGEoXCJkZWxldGV1cmxcIikgIT0gXCJcIiAmJiAkKHYpLmRhdGEoXCJkZWxldGV1cmxcIikgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlX3VybCA9ICQodikuZGF0YShcImRlbGV0ZXVybFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV3JhcCBmaWxlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgICAgICQodikuYXR0cignaWQnLCBnZXRfcmFuZG9tX2lkKCkpO1xyXG4gICAgICAgICAgICAkKHYpLndyYXAoJzxkaXYgaWQ9XCInICsgdXBsb2FkZXJfaWQgKyAnXCIgY2xhc3M9XCJkcm9wX3VwbG9hZGVyIGRyb3Bfem9uZVwiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAkKHYpLmJlZm9yZSgnPGRpdiBjbGFzcz1cInRleHRfd3JhcHBlclwiPicgKyBvcHRpb25zLnVwbG9hZGVyX2ljb24gKyAnIDxzcGFuIGNsYXNzPVwidGV4dFwiPicgKyBvcHRpb25zLnVwbG9hZGVyX3RleHQgKyAnIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCInICsgb3B0aW9ucy5icm93c2VfY3NzX2NsYXNzICsgJyAnICsgb3B0aW9ucy5icm93c2VfY3NzX3NlbGVjdG9yICsgJ1wiPicgKyBvcHRpb25zLmJyb3dzZV90ZXh0ICsgJzxzcGFuIGNsYXNzPVwic3VidGl0bGVcIj4nICsgb3B0aW9ucy5zZWNvbmRhcnlfdGV4dCAgKyc8L3NwYW4+PC9hPjwvc3Bhbj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgJCh2KS5iZWZvcmUoJzxzcGFuIGNsYXNzPVwiZXJyb3JzXCI+PC9zcGFuPicpO1xyXG4gICAgICAgICAgICBpZihzdWJtaXRfbWV0aG9kID09IFwiYWpheFwiIHx8IHN1Ym1pdF9tZXRob2QgPT0gXCJjaHVua2VkXCIpIHtcclxuICAgICAgICAgICAgICAgICQodikuYXR0cignbmFtZScsICcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHVsX2NsYXNzZXMgPSBcImZpbGVzXCI7XHJcblxyXG4gICAgICAgICAgICBpZihsYXlvdXQgPT0gXCJ0aHVtYm5haWxzXCIpIHtcclxuICAgICAgICAgICAgICAgIHVsX2NsYXNzZXMgKz0gXCIgdGh1bWJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHN1Ym1pdF9tZXRob2QgPT0gXCJhamF4XCIpIHtcclxuICAgICAgICAgICAgICAgIHVsX2NsYXNzZXMgKz0gXCIgYWpheFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc3VibWl0X21ldGhvZCA9PSBcImNodW5rZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdWxfY2xhc3NlcyArPSBcIiBhamF4XCJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCh2KS5iZWZvcmUoJzx1bCBjbGFzcz1cIicgKyB1bF9jbGFzc2VzICsgJ1wiPjwvdWw+Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZHJvcF96b25lID0gJCgnIycgKyB1cGxvYWRlcl9pZCk7XHJcblxyXG4gICAgICAgICAgICBkcm9wX3pvbmVbMF0ub25kcmFnb3ZlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wX3pvbmUuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICBpZihzdWJtaXRfbWV0aG9kID09IFwibm9ybWFsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhpbWl6ZUlucHV0KHYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzdWJtaXRfbWV0aG9kID09IFwiYWpheFwiIHx8IHN1Ym1pdF9tZXRob2QgPT0gXCJjaHVua2VkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbmltaXplSW5wdXQodik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBkcm9wX3pvbmVbMF0ub25kcmFnbGVhdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZHJvcF96b25lLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgLy9taW5pbWl6ZUlucHV0KHYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRyb3Bfem9uZVswXS5vbmRyb3AgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgbWluaW1pemVJbnB1dCh2KTtcclxuICAgICAgICAgICAgICAgIGNsZWFyX2Vycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBpZihzdWJtaXRfbWV0aG9kID09IFwibm9ybWFsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZXMgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgRmlsZXNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hlY2tfcmVzdWx0ID0gY2hlY2tfZmlsZXMoZmlsZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoZWNrX3Jlc3VsdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAuZmlsZXMnKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIGlucHV0IGFuZCBjcmVhdGUgbmV3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdfaWQgPSBnZXRfcmFuZG9tX2lkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJfaW5wdXRfaHRtbCA9ICQodilbMF0ub3V0ZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X3YgPSAkLnBhcnNlSFRNTChjdXJfaW5wdXRfaHRtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQobmV3X3YpLmF0dHIoJ2lkJywgbmV3X2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh2KS5iZWZvcmUobmV3X3YpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHYpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gJCgnIycrbmV3X2lkKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh2KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc19hZGRlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgPyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIDogKGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzdWJtaXRfbWV0aG9kID09IFwiYWpheFwiIHx8IHN1Ym1pdF9tZXRob2QgPT0gXCJjaHVua2VkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiAoZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGVja19yZXN1bHQgPSBjaGVja19maWxlcyhmaWxlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hlY2tfcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzX2FkZGVkKGZpbGVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoZHJvcF96b25lKS5maW5kKFwiLlwiICsgb3B0aW9ucy5icm93c2VfY3NzX3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgPyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIDogKGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgJCh2KS5jbGljaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cgYWRkZWQgZmlsZXNcclxuICAgICAgICAgICAgJCh2KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZXMgPSAkKHYpWzBdLmZpbGVzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrX3Jlc3VsdCA9IGNoZWNrX2ZpbGVzKGZpbGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdWJtaXRfbWV0aG9kID09IFwibm9ybWFsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihjaGVja19yZXN1bHQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCArICcgLmZpbGVzJykuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlbGV0ZSBpbnB1dCBhbmQgY3JlYXRlIG5ld1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X2lkID0gZ2V0X3JhbmRvbV9pZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VyX2lucHV0X2h0bWwgPSAkKHYpWzBdLm91dGVySFRNTDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld192ID0gJC5wYXJzZUhUTUwoY3VyX2lucHV0X2h0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG5ld192KS5hdHRyKCdpZCcsIG5ld19pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodikuYmVmb3JlKG5ld192KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh2KS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9ICQoJyMnK25ld19pZClbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodikuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNfYWRkZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID8gZXZlbnQucHJldmVudERlZmF1bHQoKSA6IChldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlc19hZGRlZChmaWxlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHN1Ym1pdF9tZXRob2QgPT0gXCJhamF4XCIgfHwgc3VibWl0X21ldGhvZCA9PSBcImNodW5rZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoZWNrX3Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlc19hZGRlZChmaWxlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpbGVzX2FkZGVkKGZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZihmaWxlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVzID0gJCh2KVswXS5maWxlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHN1Ym1pdF9tZXRob2QgPT0gXCJub3JtYWxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnIC5maWxlcycpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdG9tYW1vcyBlbCBtb2RhbFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc191cGxvYWRtb2RhbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVTaXplID0gZ2V0X2ZpbGVfc2l6ZV9yZWFkYWJsZShmaWxlc1tpXS5zaXplKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGUgZGFtb3MgZWwgaWQgZGVsIGFyY2hpdm9cclxuICAgICAgICAgICAgICAgICAgICBtb2RhbC5pZD0gdXBsb2FkZXJfaWRcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbmZpZ3VyYW1vcyBmZWNoYSB5IGhvcmEgcGFyYSBtb3N0cmFyIGVuIG1vZGFsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLypUT0RPIERFVjogUGFzYXIgbGFuZyAnZW4nIHggY29uZmlnICovXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVRpbWVGb3JtYXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgnZW4nLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnMi1kaWdpdCcgLCBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnfSkgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW3sgdmFsdWU6IG1vbnRoIH0sLHsgdmFsdWU6IGRheSB9LCx7IHZhbHVlOiB5ZWFyIH0sLHsgdmFsdWU6IGhvdXIgfSwseyB2YWx1ZTogbWludXRlIH1dID0gZGF0ZVRpbWVGb3JtYXQgLmZvcm1hdFRvUGFydHMoZGF0ZSApIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxheW91dCA9PSBcInRodW1ibmFpbHNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaSBlcyBtaW5pYXR1cmEgbyB0aHVtYm5haWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWdyZWdhbmRvIGFyY2hpdm9zIGEgbGEgbGlzdGEgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdFVsID0gJCgnIycgKyB1cGxvYWRlcl9pZCArICcgLmZpbGVzLnRodW1iJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3RJdGVtID0gJzxsaSBpZD1cInNlbGVjdGVkX2ZpbGVfJyArIGZpbGVzX2luZGV4ICsgJ1wiPjxkaXYgY2xhc3M9XCJ0aHVtYm5haWxcIj48L2Rpdj48c3BhbiBjbGFzcz1cInRpdGxlXCIgdGl0bGU9XCInICsgZmlsZXNbaV0ubmFtZSArICdcIj48c3BhbiBjbGFzcz1cImxlZnRcIj4nICsgZmlsZXNbaV0ubmFtZSArJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPiAnKyBmaWxlU2l6ZSAgKycgPC9zcGFuPjwvc3Bhbj48L2xpPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFVsLmFwcGVuZChsaXN0SXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpZXdfZmlsZShmaWxlc1tpXSxmaWxlc19pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gRFNHOiBTT0xPIERFQkUgUkVNT1ZFUlNFIEVMIEVMRU1OVE8gQ09OIENMSUNLIEVOIENSVVpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQobGlzdFVsKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnJlbW92ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcF96b25lLmFkZENsYXNzKCdob3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhY2lhbW9zIGVsIGJvZHkgZGVsIG1vZGFsIGNvbiBjYWRhIHN1YmlkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kYWxib2R5ID0gJCgnIycgKyB1cGxvYWRlcl9pZCArICcgLm1vZGFsLWJvZHknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbGJvZHkuaHRtbCgnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hZ3JlZ2Ftb3MgZWwgZWxlbWVudG8gcXVlIHRpZW5lIG5vbWJyZSwgZmVjaGEgeSBob3JhIGRlbCBhcmNoaXZvIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZUluZm8gPSAnPGRpdiBjbGFzcz1cImlucHV0X2ZpbGVcIj48bGFiZWwgY2xhc3M9XCJmaWxlc19jb250YWluZXIgZmVhdHVyZV9yb3dfYmdfY29sb3IgdXBcIj48c3BhbiBjbGFzcz1cImljb24gaWNvbi1zZWxlY3RlZFwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLXNlbGVjdGVkLXJvd1wiPjwvc3Bhbj48L3NwYW4+PHNwYW4gY2xhc3M9XCJmaWxlX3VwbG9hZGVkXCIgdGl0bGU9XCInKyBmaWxlc1tpXS5uYW1lICsnXCI+JysgZmlsZXNbaV0ubmFtZSArJzwvc3Bhbj48c3BhbiBjbGFzcz1cImRhdGVfdGltZVwiPjxzcGFuIGNsYXNzPVwiZGF0ZVwiPicrIGAke2RheX0gICR7bW9udGh9ICR7eWVhciB9YCArJzwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbWVcIj4nKyBgICR7aG91ciB9OiR7bWludXRlIH0gaHNgICsnPC9zcGFuPjwvc3Bhbj48L2xhYmVsPjwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxib2R5LmFwcGVuZChmaWxlSW5mbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9BZ3JlZ2Ftb3MgbGEgaW1hZ2VuIHN1YmlkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZUl0ZW0gPSAnPGRpdiBpZD1cInNlbGVjdGVkX2ZpbGVfJyArIGZpbGVzX2luZGV4ICsgJ1wiIGNsYXNzPVwicHJldmlld19pbWdcIj48ZGl2IGNsYXNzPVwidGh1bWJuYWlsXCI+PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbGJvZHkuYXBwZW5kKGZpbGVJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmVwYXJhbW9zIGVsIG5vbWJyZSB5IHBlc28gZGVsIGFyY2hpdm8gYSBtb3N0cmFyIHkgbG8gYWdyZWdhbW9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaXN0VWwgPSAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAuZmlsZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbkNsb3NlID0gJCgnIycgKyB1cGxvYWRlcl9pZCArICcgLmZpbGVzIC5pY29uLWNsb3NlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3RJdGVtID0gb3B0aW9ucy5maWxlX2ljb24gKyc8c3BhbiBjbGFzcz1cImljb24gaWNvbi1jaGVja3VwbG9hZFwiID48L3NwYW4+PGxpIGlkPVwic2VsZWN0ZWRfZmlsZV8nICsgZmlsZXNfaW5kZXggKyAnXCIgY2xhc3M9XCJsaXN0X2l0ZW1cIj4nICsgICcgPHNwYW4gY2xhc3M9XCJsZWZ0XCI+JyArIGZpbGVzW2ldLm5hbWUgKyc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicmlnaHRcIj4gJysgZmlsZVNpemUgICsnIDwvc3Bhbj4gPC9saT4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpZXdfZmlsZShmaWxlc1tpXSxmaWxlc19pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9zdHJhbW9zIGVsIG1vZGFsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanNfdXBsb2FkbW9kYWwnKS5tb2RhbCgnc2hvdycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BbCBjbGljayBkZSBzdWJpciBlbGltaW5hIGNsYXNlcywgZXNjb25kZSBtb2RhbCwgYWdyZWdhIGFsIGRyb3Agbm9tYnJlIHkgcGVzbyBkZWwgYXJjaGl2b1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFyYSBsdWVnbyBzZXIgbGV2YW50YWRvIHBvciBkZXYuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPIERFVjogR1JBQkFSIEVOIERCIGxvcyBhcmNoaXZvcyBzdWJpZG9zIGFsIGNsaWNrIGVuIEdVQVJEQVJcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzX2xvYWRcIikub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wX3pvbmUucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RVbC5hcHBlbmQobGlzdEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0VWwuYWRkQ2xhc3MoJ2FkZGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RVbC5wYXJlbnRzKCcuZHJvcF93cmFwcGVyJykuYWRkQ2xhc3MoJ2l0ZW1zX2FkZGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzX3VwbG9hZG1vZGFsJykubW9kYWwoJ2hpZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGltcGlhbW9zIGNhcmdhIGNvbXBsZXRhIGRlIGRyb3BzIHNpIHBvbmVtb3MgQ0FOQ0VMQVJcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmpzX2NsZWFuX2Zvcm0sIC5qc19jYW5jZWxcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcF96b25lLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmRyb3Bfem9uZVwiKS5yZW1vdmVDbGFzcygnaXRlbXNfYWRkZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmFkZGVkXCIpLmVtcHR5KCkucmVtb3ZlQ2xhc3MoJ2FkZGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpY29uQ2xvc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9EZWJlIGJvcnJhcnNlIGFsIGNsaWNrIGRlIGxhIGNydXpcclxuICAgICAgICAgICAgICAgICAgICAkKGxpc3RVbCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RVbC5jaGlsZHJlbigpLnJlbW92ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RVbC5yZW1vdmVDbGFzcygnYWRkZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0VWwucGFyZW50cygnLmRyb3Bfd3JhcHBlcicpLnJlbW92ZUNsYXNzKCdpdGVtc19hZGRlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTm93IHVwbG9hZCBmaWxlcyB2aWEgQUpBWFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN1Ym1pdF9tZXRob2QgPT0gXCJhamF4XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV91cGxvYWRfYWpheChmaWxlc1tpXSxmaWxlc19pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHN1Ym1pdF9tZXRob2QgPT0gXCJjaHVua2VkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV91cGxvYWRfY2h1bmtlZChmaWxlc1tpXSxmaWxlc19pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzX2luZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3VibWl0X21ldGhvZCA9PSBcImFqYXhcIiB8fCBzdWJtaXRfbWV0aG9kID09IFwiY2h1bmtlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGVkX2ZpbGVzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZnVuY3Rpb24gcHJldmlld19maWxlKGZpbGUsIGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXRPcmllbnRhdGlvbihmaWxlLCBmdW5jdGlvbihvcmllbnRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGVfY2xhc3MgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9yaWVudGF0aW9uID09IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlX2NsYXNzID0gXCJyb3RhdGVfOTBcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVfY2xhc3MgPSBcInJvdGF0ZV8xODBcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVfY2xhc3MgPSBcInJvdGF0ZV8yNzBcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkgKyAnIGRpdi50aHVtYm5haWwnKS5hZGRDbGFzcyhyb3RhdGVfY2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZpbGUgdHlwZVxyXG4gICAgICAgICAgICAgICAgaWYoZmlsZS50eXBlLm1hdGNoKCdpbWFnZS8qJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihmaWxlLnR5cGUubWF0Y2goJ3ZpZGVvLyonKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyBkaXYudGh1bWJuYWlsJykuaHRtbCgnPGkgY2xhc3M9XCJwZS03cy12aWRlb1wiPjwvaT4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihmaWxlLnR5cGUubWF0Y2goJ2F1ZGlvLyonKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyBkaXYudGh1bWJuYWlsJykuaHRtbCgnPGkgY2xhc3M9XCJwZS03cy12b2x1bWVcIj48L2k+Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyBkaXYudGh1bWJuYWlsJykuaHRtbCgnPGkgY2xhc3M9XCJwZS03cy1maWxlXCI+PC9pPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkgKyAnIGRpdi50aHVtYm5haWwnKS5hdHRyKCdzdHlsZScsICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCInICsgcmVhZGVyLnJlc3VsdCArICdcIiknKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAjc2VsZWN0ZWRfZmlsZV8nICsgaSArICcgZGl2LnRodW1ibmFpbCcpLmFwcGVuZCgnPGltZyBzcmM9XCInICsgcmVhZGVyLnJlc3VsdCArICdcIiBjbGFzcz1cImltYWdlX3RodW1iXCIvPicpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBob3ZlciBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyBkaXYudGh1bWJuYWlsJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZHVfaG92ZXJfbGF5ZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZmlsZV91cGxvYWRfYWpheChmaWxlLGkpIHtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQpLnRyaWdnZXIoIFwiZmlsZV91cGxvYWRfc3RhcnRcIiwgWyBmaWxlLm5hbWUgXSApO1xyXG4gICAgICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0ID09IFwidGh1bWJuYWlsc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkgKyAnIGRpdi50aHVtYm5haWwnKS5hZnRlcignPGRpdiBjbGFzcz1cImR1X3Byb2dyZXNzXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJkdV9wcm9ncmVzc1wiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzX2VsID0gJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkgKyAnIC5kdV9wcm9ncmVzcycpO1xyXG4gICAgICAgICAgICAgICAgKHhoci51cGxvYWQgfHwgeGhyKS5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9uZSA9IGUucG9zaXRpb24gfHwgZS5sb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG90YWwgPSBlLnRvdGFsU2l6ZSB8fCBlLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IE1hdGgucm91bmQoZG9uZS90b3RhbCoxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdfcm91bmRfcHJvZ3Jlc3MocHJvZ3Jlc3NfZWxbMF0sIHByb2dyZXNzIC8gMTAwLCBsYXlvdXQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyAuZHVfcHJvZ3Jlc3MnKS5mYWRlT3V0KCdzbG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkKS50cmlnZ2VyKCBcImZpbGVfdXBsb2FkX2VuZFwiLCBbIGZpbGUubmFtZSBdICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBkZWxldGUgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdV9kZWxldGVfYnV0dG9uID0gJCgnPGkgY2xhc3M9XCJwZS03cy10cmFzaCBhY3Rpb24tZGVsZXRlXCIgZGF0YS1maWxlaWQ9XCInICsgcmVzcG9uc2UuZmlsZV9pZCArICdcIj48L2k+JykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXlvdXQgPT0gXCJ0aHVtYm5haWxzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyBkaXYudGh1bWJuYWlsJykuYXBwZW5kKGR1X2RlbGV0ZV9idXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PSBcImxpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkpLmFwcGVuZChkdV9kZWxldGVfYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdV9kZWxldGVfYnV0dG9uLmRlbGF5KDUwMCkuZmFkZUluKFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGhpZGRlbiBpbnB1dCB3aXRoIGZpbGUgaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCkuYXBwZW5kKCc8aW5wdXQgaWQ9XCJoaWRkZW5fZmlsZV8nICsgaSArICdcIiB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIicgKyBpbnB1dF9uYW1lICsgJ1wiIHZhbHVlPVwiJyArIHJlc3BvbnNlLmZpbGVfaWQgKyAnXCIgPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZGVsZXRlIGJ1dG9uIGxpc3RlbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyBpLmFjdGlvbi1kZWxldGUnKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZWlkID0gJCh0aGlzKS5kYXRhKFwiZmlsZWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGRlbGV0ZV91cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogXCJmaWxlaWQ9XCIgKyBmaWxlaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpKS5kZWxheSg1MDApLmZhZGVPdXQoXCJzbG93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNoaWRkZW5fZmlsZV8nICsgaSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRfZmlsZXMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRfZXJyb3IocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZV9maWxlKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4oJ3Bvc3QnLCBzdWJtaXRfdXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHZhciBmZGF0YSA9IG5ldyBGb3JtRGF0YTtcclxuICAgICAgICAgICAgICAgIGZkYXRhLmFwcGVuZChpbnB1dF9uYW1lLnJlcGxhY2UoJ1tdJywnJyksIGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoZmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaWxlX3VwbG9hZF9jaHVua2VkKGZpbGUsaSkge1xyXG4gICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCkudHJpZ2dlciggXCJmaWxlX3VwbG9hZF9zdGFydFwiLCBbIGZpbGUubmFtZSBdICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobGF5b3V0ID09IFwidGh1bWJuYWlsc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkgKyAnIGRpdi50aHVtYm5haWwnKS5hZnRlcignPGRpdiBjbGFzcz1cImR1X3Byb2dyZXNzXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJkdV9wcm9ncmVzc1wiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gZmlsZS5zaXplO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWNlU2l6ZSA9IG9wdGlvbnMuY2h1bmtfc2l6ZTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2h1bmsgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmQgPSBzdGFydCArIHNsaWNlU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgLSBlbmQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHNsaWNlKGZpbGUsIHN0YXJ0LCBlbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZW5kKHMsIHN0YXJ0LCBlbmQsIHNpemUsIHNsaWNlU2l6ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNodW5rKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmQgPCBzaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ICs9IHNsaWNlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2VuZChwaWVjZSwgc3RhcnQsIGVuZCwgc2l6ZSwgc2xpY2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1kYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB4aHIub3BlbignUE9TVCcsIHN1Ym1pdF91cmwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtZGF0YS5hcHBlbmQoJ3N0YXJ0Jywgc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1kYXRhLmFwcGVuZCgnZW5kJywgZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtZGF0YS5hcHBlbmQoaW5wdXRfbmFtZS5yZXBsYWNlKCdbXScsJycpLCBwaWVjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWRhdGEuYXBwZW5kKCdjaHVuaycsIGNodW5rKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtZGF0YS5hcHBlbmQoJ2ZpbGVfbmFtZScsIGZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZCA8IHNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWRhdGEuYXBwZW5kKCdjaHVua19sYXN0JywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1kYXRhLmFwcGVuZCgnY2h1bmtfbGFzdCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEcmF3IHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfZWwgPSAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAjc2VsZWN0ZWRfZmlsZV8nICsgaSArICcgLmR1X3Byb2dyZXNzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhd19yb3VuZF9wcm9ncmVzcyhwcm9ncmVzc19lbFswXSwgZW5kIC8gc2l6ZSwgbGF5b3V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5kIDwgc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyZXNwb25zZS5zdWNjZXNzICYmIHJlc3BvbnNlLnR5cGUgPT0gJ2ZpbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBsb2FkIENvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQgKyAnICNzZWxlY3RlZF9maWxlXycgKyBpICsgJyAuZHVfcHJvZ3Jlc3MnKS5mYWRlT3V0KCdzbG93Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQpLnRyaWdnZXIoIFwiZmlsZV91cGxvYWRfZW5kXCIsIFsgZmlsZS5uYW1lIF0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZGVsZXRlIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdV9kZWxldGVfYnV0dG9uID0gJCgnPGkgY2xhc3M9XCJwZS03cy10cmFzaCBhY3Rpb24tZGVsZXRlXCIgZGF0YS1maWxlaWQ9XCInICsgcmVzcG9uc2UuZmlsZV9pZCArICdcIj48L2k+JykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxheW91dCA9PSBcInRodW1ibmFpbHNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAjc2VsZWN0ZWRfZmlsZV8nICsgaSArICcgZGl2LnRodW1ibmFpbCcpLmFwcGVuZChkdV9kZWxldGVfYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PSBcImxpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAjc2VsZWN0ZWRfZmlsZV8nICsgaSkuYXBwZW5kKGR1X2RlbGV0ZV9idXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdV9kZWxldGVfYnV0dG9uLmRlbGF5KDUwMCkuZmFkZUluKFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgaGlkZGVuIGlucHV0IHdpdGggZmlsZSBpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgdXBsb2FkZXJfaWQpLmFwcGVuZCgnPGlucHV0IGlkPVwiaGlkZGVuX2ZpbGVfJyArIGkgKyAnXCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCInICsgaW5wdXRfbmFtZSArICdcIiB2YWx1ZT1cIicgKyByZXNwb25zZS5maWxlX2lkICsgJ1wiID4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZGVsZXRlIGJ1dG9uIGxpc3RlbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkgKyAnIGkuYWN0aW9uLWRlbGV0ZScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVpZCA9ICQodGhpcykuZGF0YShcImZpbGVpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZGVsZXRlX3VybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFwiZmlsZWlkPVwiICsgZmlsZWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyB1cGxvYWRlcl9pZCArICcgI3NlbGVjdGVkX2ZpbGVfJyArIGkpLmRlbGF5KDUwMCkuZmFkZU91dChcInNsb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAjaGlkZGVuX2ZpbGVfJyArIGkpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRfZmlsZXMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHhoci5zZW5kKGZvcm1kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2xpY2UoZmlsZSwgc3RhcnQsIGVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWNlID0gZmlsZS5tb3pTbGljZSA/IGZpbGUubW96U2xpY2UgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS53ZWJraXRTbGljZSA/IGZpbGUud2Via2l0U2xpY2UgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5zbGljZSA/IGZpbGUuc2xpY2UgOiBub29wO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzbGljZS5iaW5kKGZpbGUpKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBub29wKCkge1xyXG4gIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVfZmlsZShpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAjc2VsZWN0ZWRfZmlsZV8nICsgaSkuZGVsYXkob3B0aW9ucy50aW1lX3Nob3dfZXJyb3JzICogMTAwMCkuZmFkZU91dChcInNsb3dcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldF9lcnJvcih0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAuZXJyb3JzJykuaHRtbCgnPHA+JyArIHRleHQgKyAnPC9wPicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGltZV9zaG93X2Vycm9ycyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFyX2Vycm9yLCBvcHRpb25zLnRpbWVfc2hvd19lcnJvcnMgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJfZXJyb3IoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAuZXJyb3JzIHAnKS5mYWRlT3V0KFwic2xvd1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHVwbG9hZGVyX2lkICsgJyAuZXJyb3JzIHAnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRfZmlsZV9zaXplX3JlYWRhYmxlKGJ5dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAgICAgIChieXRlcz49MTAwMDAwMDAwMCkge2J5dGVzPShieXRlcy8xMDAwMDAwMDAwKS50b0ZpeGVkKDIpKycgR0InO31cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGJ5dGVzPj0xMDAwMDAwKSAgICB7Ynl0ZXM9KGJ5dGVzLzEwMDAwMDApLnRvRml4ZWQoMikrJyBNQic7fVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYnl0ZXM+PTEwMDApICAgICAgIHtieXRlcz0oYnl0ZXMvMTAwMCkudG9GaXhlZCgyKSsnIEtCJzt9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChieXRlcz4xKSAgICAgICAgICAge2J5dGVzPWJ5dGVzKycgYnl0ZXMnO31cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGJ5dGVzPT0xKSAgICAgICAgICB7Ynl0ZXM9Ynl0ZXMrJyBieXRlJzt9XHJcbiAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAge2J5dGVzPScwIGJ5dGUnO31cclxuICAgICAgICAgICAgICAgIHJldHVybiBieXRlcztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrX2ZpbGVzKGZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dfZmlsZV9hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgbXVsdGlwbGUgZmlsZSBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsZV9tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZpbGVfbXVsdGlwbGVfY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWRkZWRfZmlsZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZpbGVzLmxlbmd0aCArIGFkZGVkX2ZpbGVzKSA+IGZpbGVfbXVsdGlwbGVfY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldF9lcnJvcihvcHRpb25zLmFsbG93ZWRfYmVmb3JlX2Vycm9yX3RleHQgKyAnICcgKyBmaWxlX211bHRpcGxlX2NvdW50ICsgJyAnICsgb3B0aW9ucy5hbGxvd2VkX2FmdGVyX2Vycm9yX3RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3VibWl0X21ldGhvZCA9PSBcIm5vcm1hbFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRfZmlsZXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dfZmlsZV9hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dfZmlsZV9hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IDEgfHwgYWRkZWRfZmlsZXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldF9lcnJvcihvcHRpb25zLm9ubHlfb25lX2Vycm9yX3RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dfZmlsZV9hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZpbGUgdHlwZSBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgICBpZihmaWxlX2FjY2VwdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dfZmlsZV9hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0X2FycmF5ID0gZmlsZV9hY2NlcHQuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaF9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgYWNjZXB0X2FycmF5Lmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hfc3RyaW5nID0gYWNjZXB0X2FycmF5W2FdLnJlcGxhY2UoJy8nLCcuJykudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXNbaV0udHlwZS5tYXRjaChtYXRjaF9zdHJpbmcpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaF9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1hdGNoX2NvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldF9lcnJvcihvcHRpb25zLm5vdF9hbGxvd2VkX2Vycm9yX3RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZmlsZSBzaXplXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmlsZXNbaV0uc2l6ZSA+IG1heF9maWxlX3NpemUgJiYgbWF4X2ZpbGVfc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0X2Vycm9yKG9wdGlvbnMuYmlnX2ZpbGVfYmVmb3JlX2Vycm9yX3RleHQgKyAnICcgKyBnZXRfZmlsZV9zaXplX3JlYWRhYmxlKG1heF9maWxlX3NpemUpICsgJyAnICsgb3B0aW9ucy5iaWdfZmlsZV9hZnRlcl9lcnJvcl90ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsb3dfZmlsZV9hZGQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1heGltaXplSW5wdXQodikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRyb3Bfem9uZSA9ICQodikucGFyZW50KFwiLmRyb3Bfem9uZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGRyb3Bfem9uZS5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IHBvc2l0aW9uLnRvcCArIHBhcnNlSW50KGRyb3Bfem9uZS5jc3MoJ21hcmdpblRvcCcpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IHBvc2l0aW9uLmxlZnQgKyBwYXJzZUludChkcm9wX3pvbmUuY3NzKCdtYXJnaW5MZWZ0JyksIDEwKTtcclxuICAgICAgICAgICAgICAgICQodikuY3NzKHt0b3A6IHRvcCwgbGVmdDogbGVmdCwgcG9zaXRpb246J2Fic29sdXRlJywgd2lkdGg6IGRyb3Bfem9uZS53aWR0aCgpLCBoZWlnaHQ6IGRyb3Bfem9uZS5oZWlnaHQoKSwgZGlzcGxheTonYmxvY2snfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1pbmltaXplSW5wdXQodikge1xyXG4gICAgICAgICAgICAgICAgJCh2KS5jc3Moe2Rpc3BsYXk6J25vbmUnfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldF9yYW5kb21faWQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaT0wOyBpIDwgMTU7IGkrKyApXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRyYXdfcm91bmRfcHJvZ3Jlc3MoZWwsIHBlcmNlbnQsIGxheW91dCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSBlbC5jaGlsZHJlblswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBoZXhfdG9fcmdiYShvcHRpb25zLnByb2dyZXNzX2NvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjYW52YXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsYXlvdXQgPT0gXCJ0aHVtYm5haWxzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUud2lkdGggPSBcIjUwcHhcIjtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCI1MHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpYW1ldGVyID0gOTY7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVfd2lkdGggPSA4O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSA0ODtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gNDg7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gXCIyNHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMjRweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWFtZXRlciA9IDQ4O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lX3dpZHRoID0gNDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihHX3ZtbENhbnZhc01hbmFnZXIpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIEdfdm1sQ2FudmFzTWFuYWdlci5pbml0RWxlbWVudChjYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKGRpYW1ldGVyIC8gMiwgZGlhbWV0ZXIgLyAyKTsgLy8gY2hhbmdlIGNlbnRlclxyXG4gICAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgoLTEgLyAyICsgMCAvIDE4MCkgKiBNYXRoLlBJKTsgLy8gcm90YXRlIC05MCBkZWdcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhZGl1cyA9IChkaWFtZXRlciAtIGxpbmVfd2lkdGgpIC8gMjsgXHJcbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgcGVyY2VudCB8fCAxKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguYXJjKDAsIDAsIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIgKiBwZXJjZW50LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lQ2FwID0gJ3JvdW5kJzsgLy8gYnV0dCwgcm91bmQgb3Igc3F1YXJlXHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gbGluZV93aWR0aDtcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaGV4X3RvX3JnYmEoaGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYztcclxuICAgICAgICAgICAgICAgIGlmKC9eIyhbQS1GYS1mMC05XXszfSl7MSwyfSQvLnRlc3QoaGV4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYz0gaGV4LnN1YnN0cmluZygxKS5zcGxpdCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYy5sZW5ndGg9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYz0gW2NbMF0sIGNbMF0sIGNbMV0sIGNbMV0sIGNbMl0sIGNbMl1dO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjPSAnMHgnK2Muam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcrWyhjPj4xNikmMjU1LCAoYz4+OCkmMjU1LCBjJjI1NV0uam9pbignLCcpKycsLjgpJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGRlZmF1bHQgY29sb3JcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYmEoNzQsIDE0NCwgMjI2LCAuOCknO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRPcmllbnRhdGlvbihmaWxlLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IERhdGFWaWV3KGUudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXcuZ2V0VWludDE2KDAsIGZhbHNlKSAhPSAweEZGRDgpIHJldHVybiBjYWxsYmFjaygtMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHZpZXcuYnl0ZUxlbmd0aCwgb2Zmc2V0ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXJrZXIgPSB2aWV3LmdldFVpbnQxNihvZmZzZXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIgPT0gMHhGRkUxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlldy5nZXRVaW50MzIob2Zmc2V0ICs9IDIsIGZhbHNlKSAhPSAweDQ1Nzg2OTY2KSByZXR1cm4gY2FsbGJhY2soLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpdHRsZSA9IHZpZXcuZ2V0VWludDE2KG9mZnNldCArPSA2LCBmYWxzZSkgPT0gMHg0OTQ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IHZpZXcuZ2V0VWludDMyKG9mZnNldCArIDQsIGxpdHRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFncyA9IHZpZXcuZ2V0VWludDE2KG9mZnNldCwgbGl0dGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWdzOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlldy5nZXRVaW50MTYob2Zmc2V0ICsgKGkgKiAxMiksIGxpdHRsZSkgPT0gMHgwMTEyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh2aWV3LmdldFVpbnQxNihvZmZzZXQgKyAoaSAqIDEyKSArIDgsIGxpdHRsZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChtYXJrZXIgJiAweEZGMDApICE9IDB4RkYwMCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Ugb2Zmc2V0ICs9IHZpZXcuZ2V0VWludDE2KG9mZnNldCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soLTEpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufSkoalF1ZXJ5KTsiXSwiZmlsZSI6ImRyb3BVcGxvYWQvZHJvcHVwbG9hZGVyLmpzIn0=
