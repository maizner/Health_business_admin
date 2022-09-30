/*! Bootstrap integration for DataTables' Editor
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-bs4')(root, $).$;
			}

			if ( ! $.fn.dataTable.Editor ) {
				require('datatables.net-editor')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/*
 * Set the default display controller to be our bootstrap control 
 */
DataTable.Editor.defaults.display = "bootstrap";


/*
 * Alter the buttons that Editor adds to TableTools so they are suitable for bootstrap
 */
var i18nDefaults = DataTable.Editor.defaults.i18n;
i18nDefaults.create.title = '<h5 class="modal-title">'+i18nDefaults.create.title+'</h5>';
i18nDefaults.edit.title = '<h5 class="modal-title">'+i18nDefaults.edit.title+'</h5>';
i18nDefaults.remove.title = '<h5 class="modal-title">'+i18nDefaults.remove.title+'</h5>';

var tt = DataTable.TableTools;
if ( tt ) {
	tt.BUTTONS.editor_create.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_edit.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_remove.formButtons[0].className = "btn btn-danger";
}


/*
 * Change the default classes from Editor to be classes for Bootstrap
 */
$.extend( true, $.fn.dataTable.Editor.classes, {
	"header": {
		"wrapper": "DTE_Header modal-header"
	},
	"body": {
		"wrapper": "DTE_Body modal-body"
	},
	"footer": {
		"wrapper": "DTE_Footer modal-footer"
	},
	"form": {
		"tag": "form-horizontal",
		"button": "btn",
		"buttonInternal": "btn btn-outline-secondary"
	},
	"field": {
		"wrapper": "DTE_Field form-group row",
		"label":   "col-lg-4 col-form-label",
		"input":   "col-lg-8",
		"error":   "error is-invalid",
		"msg-labelInfo": "form-text text-secondary small",
		"msg-info":      "form-text text-secondary small",
		"msg-message":   "form-text text-secondary small",
		"msg-error":     "form-text text-danger small",
		"multiValue":    "card multi-value",
		"multiInfo":     "small",
		"multiRestore":  "card multi-restore"
	}
} );

$.extend( true, DataTable.ext.buttons, {
	create: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	edit: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	remove: {
		formButtons: {
			className: 'btn-danger'
		}
	}
} );


/*
 * Bootstrap display controller - this is effectively a proxy to the Bootstrap
 * modal control.
 */

var self;

DataTable.Editor.display.bootstrap = $.extend( true, {}, DataTable.Editor.models.displayController, {
	/*
	 * API methods
	 */
	"init": function ( dte ) {
		// init can be called multiple times (one for each Editor instance), but
		// we only support a single construct here (shared between all Editor
		// instances)
		if ( ! self._dom.content ) {
			self._dom.content = $(
				'<div class="modal fade DTED">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content"/>'+
					'</div>'+
				'</div>'
			);

			self._dom.close = $('<button class="close">&times;</div>');

			self._dom.close.click( function () {
				self._dte.close('icon');
			} );

			$(document).on('click', 'div.modal', function (e) {
				if ( $(e.target).hasClass('modal') && self._shown ) {
					self._dte.background();
				}
			} );
		}

		// Add `form-control` to required elements
		dte.on( 'displayOrder.dtebs', function ( e, display, action, form ) {
			$.each( dte.s.fields, function ( key, field ) {
				$('input:not([type=checkbox]):not([type=radio]), select, textarea', field.node() )
					.addClass( 'form-control' );
			} );
		} );

		return self;
	},

	"open": function ( dte, append, callback ) {
		if ( self._shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		self._dte = dte;
		self._shown = true;
		self._fullyDisplayed = false;

		var content = self._dom.content.find('div.modal-content');
		content.children().detach();
		content.append( append );

		$('div.modal-header', append).append( self._dom.close );

		$(self._dom.content)
			.one('shown.bs.modal', function () {
				// Can only give elements focus when shown
				if ( self._dte.s.setFocus ) {
					self._dte.s.setFocus.focus();
				}

				self._fullyDisplayed = true;

				if ( callback ) {
					callback();
				}
			})
			.one('hidden', function () {
				self._shown = false;
			})
			.appendTo( 'body' )
			.modal( {
				backdrop: "static",
				keyboard: false
			} );
	},

	"close": function ( dte, callback ) {
		if ( !self._shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		// Check if actually displayed or not before hiding. BS4 doesn't like `hide`
		// before it has been fully displayed
		if ( ! self._fullyDisplayed ) {
			$(self._dom.content)
				.one('shown.bs.modal', function () {
					self.close( dte, callback );
				} );

			return;
		}

		$(self._dom.content)
			.one( 'hidden.bs.modal', function () {
				$(this).detach();
			} )
			.modal('hide');

		self._dte = dte;
		self._shown = false;
		self._fullyDisplayed = false;

		if ( callback ) {
			callback();
		}
	},

	node: function ( dte ) {
		return self._dom.content[0];
	},


	/*
	 * Private properties
	 */
	 "_shown": false,
	"_dte": null,
	"_dom": {}
} );

self = DataTable.Editor.display.bootstrap;


return DataTable.Editor;
}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvZGF0YVRhYmxlcy9lZGl0b3IuYm9vdHN0cmFwNC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgQm9vdHN0cmFwIGludGVncmF0aW9uIGZvciBEYXRhVGFibGVzJyBFZGl0b3JcbiAqIMKpMjAxNSBTcHJ5TWVkaWEgTHRkIC0gZGF0YXRhYmxlcy5uZXQvbGljZW5zZVxuICovXG5cbihmdW5jdGlvbiggZmFjdG9yeSApe1xuXHRpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoIFsnanF1ZXJ5JywgJ2RhdGF0YWJsZXMubmV0LWJzNCcsICdkYXRhdGFibGVzLm5ldC1lZGl0b3InXSwgZnVuY3Rpb24gKCAkICkge1xuXHRcdFx0cmV0dXJuIGZhY3RvcnkoICQsIHdpbmRvdywgZG9jdW1lbnQgKTtcblx0XHR9ICk7XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJvb3QsICQpIHtcblx0XHRcdGlmICggISByb290ICkge1xuXHRcdFx0XHRyb290ID0gd2luZG93O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoICEgJCB8fCAhICQuZm4uZGF0YVRhYmxlICkge1xuXHRcdFx0XHQkID0gcmVxdWlyZSgnZGF0YXRhYmxlcy5uZXQtYnM0Jykocm9vdCwgJCkuJDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhICQuZm4uZGF0YVRhYmxlLkVkaXRvciApIHtcblx0XHRcdFx0cmVxdWlyZSgnZGF0YXRhYmxlcy5uZXQtZWRpdG9yJykocm9vdCwgJCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWN0b3J5KCAkLCByb290LCByb290LmRvY3VtZW50ICk7XG5cdFx0fTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBCcm93c2VyXG5cdFx0ZmFjdG9yeSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7XG5cdH1cbn0oZnVuY3Rpb24oICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcbid1c2Ugc3RyaWN0JztcbnZhciBEYXRhVGFibGUgPSAkLmZuLmRhdGFUYWJsZTtcblxuXG4vKlxuICogU2V0IHRoZSBkZWZhdWx0IGRpc3BsYXkgY29udHJvbGxlciB0byBiZSBvdXIgYm9vdHN0cmFwIGNvbnRyb2wgXG4gKi9cbkRhdGFUYWJsZS5FZGl0b3IuZGVmYXVsdHMuZGlzcGxheSA9IFwiYm9vdHN0cmFwXCI7XG5cblxuLypcbiAqIEFsdGVyIHRoZSBidXR0b25zIHRoYXQgRWRpdG9yIGFkZHMgdG8gVGFibGVUb29scyBzbyB0aGV5IGFyZSBzdWl0YWJsZSBmb3IgYm9vdHN0cmFwXG4gKi9cbnZhciBpMThuRGVmYXVsdHMgPSBEYXRhVGFibGUuRWRpdG9yLmRlZmF1bHRzLmkxOG47XG5pMThuRGVmYXVsdHMuY3JlYXRlLnRpdGxlID0gJzxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JytpMThuRGVmYXVsdHMuY3JlYXRlLnRpdGxlKyc8L2g1Pic7XG5pMThuRGVmYXVsdHMuZWRpdC50aXRsZSA9ICc8aDUgY2xhc3M9XCJtb2RhbC10aXRsZVwiPicraTE4bkRlZmF1bHRzLmVkaXQudGl0bGUrJzwvaDU+JztcbmkxOG5EZWZhdWx0cy5yZW1vdmUudGl0bGUgPSAnPGg1IGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nK2kxOG5EZWZhdWx0cy5yZW1vdmUudGl0bGUrJzwvaDU+JztcblxudmFyIHR0ID0gRGF0YVRhYmxlLlRhYmxlVG9vbHM7XG5pZiAoIHR0ICkge1xuXHR0dC5CVVRUT05TLmVkaXRvcl9jcmVhdGUuZm9ybUJ1dHRvbnNbMF0uY2xhc3NOYW1lID0gXCJidG4gYnRuLXByaW1hcnlcIjtcblx0dHQuQlVUVE9OUy5lZGl0b3JfZWRpdC5mb3JtQnV0dG9uc1swXS5jbGFzc05hbWUgPSBcImJ0biBidG4tcHJpbWFyeVwiO1xuXHR0dC5CVVRUT05TLmVkaXRvcl9yZW1vdmUuZm9ybUJ1dHRvbnNbMF0uY2xhc3NOYW1lID0gXCJidG4gYnRuLWRhbmdlclwiO1xufVxuXG5cbi8qXG4gKiBDaGFuZ2UgdGhlIGRlZmF1bHQgY2xhc3NlcyBmcm9tIEVkaXRvciB0byBiZSBjbGFzc2VzIGZvciBCb290c3RyYXBcbiAqL1xuJC5leHRlbmQoIHRydWUsICQuZm4uZGF0YVRhYmxlLkVkaXRvci5jbGFzc2VzLCB7XG5cdFwiaGVhZGVyXCI6IHtcblx0XHRcIndyYXBwZXJcIjogXCJEVEVfSGVhZGVyIG1vZGFsLWhlYWRlclwiXG5cdH0sXG5cdFwiYm9keVwiOiB7XG5cdFx0XCJ3cmFwcGVyXCI6IFwiRFRFX0JvZHkgbW9kYWwtYm9keVwiXG5cdH0sXG5cdFwiZm9vdGVyXCI6IHtcblx0XHRcIndyYXBwZXJcIjogXCJEVEVfRm9vdGVyIG1vZGFsLWZvb3RlclwiXG5cdH0sXG5cdFwiZm9ybVwiOiB7XG5cdFx0XCJ0YWdcIjogXCJmb3JtLWhvcml6b250YWxcIixcblx0XHRcImJ1dHRvblwiOiBcImJ0blwiLFxuXHRcdFwiYnV0dG9uSW50ZXJuYWxcIjogXCJidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5XCJcblx0fSxcblx0XCJmaWVsZFwiOiB7XG5cdFx0XCJ3cmFwcGVyXCI6IFwiRFRFX0ZpZWxkIGZvcm0tZ3JvdXAgcm93XCIsXG5cdFx0XCJsYWJlbFwiOiAgIFwiY29sLWxnLTQgY29sLWZvcm0tbGFiZWxcIixcblx0XHRcImlucHV0XCI6ICAgXCJjb2wtbGctOFwiLFxuXHRcdFwiZXJyb3JcIjogICBcImVycm9yIGlzLWludmFsaWRcIixcblx0XHRcIm1zZy1sYWJlbEluZm9cIjogXCJmb3JtLXRleHQgdGV4dC1zZWNvbmRhcnkgc21hbGxcIixcblx0XHRcIm1zZy1pbmZvXCI6ICAgICAgXCJmb3JtLXRleHQgdGV4dC1zZWNvbmRhcnkgc21hbGxcIixcblx0XHRcIm1zZy1tZXNzYWdlXCI6ICAgXCJmb3JtLXRleHQgdGV4dC1zZWNvbmRhcnkgc21hbGxcIixcblx0XHRcIm1zZy1lcnJvclwiOiAgICAgXCJmb3JtLXRleHQgdGV4dC1kYW5nZXIgc21hbGxcIixcblx0XHRcIm11bHRpVmFsdWVcIjogICAgXCJjYXJkIG11bHRpLXZhbHVlXCIsXG5cdFx0XCJtdWx0aUluZm9cIjogICAgIFwic21hbGxcIixcblx0XHRcIm11bHRpUmVzdG9yZVwiOiAgXCJjYXJkIG11bHRpLXJlc3RvcmVcIlxuXHR9XG59ICk7XG5cbiQuZXh0ZW5kKCB0cnVlLCBEYXRhVGFibGUuZXh0LmJ1dHRvbnMsIHtcblx0Y3JlYXRlOiB7XG5cdFx0Zm9ybUJ1dHRvbnM6IHtcblx0XHRcdGNsYXNzTmFtZTogJ2J0bi1wcmltYXJ5J1xuXHRcdH1cblx0fSxcblx0ZWRpdDoge1xuXHRcdGZvcm1CdXR0b25zOiB7XG5cdFx0XHRjbGFzc05hbWU6ICdidG4tcHJpbWFyeSdcblx0XHR9XG5cdH0sXG5cdHJlbW92ZToge1xuXHRcdGZvcm1CdXR0b25zOiB7XG5cdFx0XHRjbGFzc05hbWU6ICdidG4tZGFuZ2VyJ1xuXHRcdH1cblx0fVxufSApO1xuXG5cbi8qXG4gKiBCb290c3RyYXAgZGlzcGxheSBjb250cm9sbGVyIC0gdGhpcyBpcyBlZmZlY3RpdmVseSBhIHByb3h5IHRvIHRoZSBCb290c3RyYXBcbiAqIG1vZGFsIGNvbnRyb2wuXG4gKi9cblxudmFyIHNlbGY7XG5cbkRhdGFUYWJsZS5FZGl0b3IuZGlzcGxheS5ib290c3RyYXAgPSAkLmV4dGVuZCggdHJ1ZSwge30sIERhdGFUYWJsZS5FZGl0b3IubW9kZWxzLmRpc3BsYXlDb250cm9sbGVyLCB7XG5cdC8qXG5cdCAqIEFQSSBtZXRob2RzXG5cdCAqL1xuXHRcImluaXRcIjogZnVuY3Rpb24gKCBkdGUgKSB7XG5cdFx0Ly8gaW5pdCBjYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIChvbmUgZm9yIGVhY2ggRWRpdG9yIGluc3RhbmNlKSwgYnV0XG5cdFx0Ly8gd2Ugb25seSBzdXBwb3J0IGEgc2luZ2xlIGNvbnN0cnVjdCBoZXJlIChzaGFyZWQgYmV0d2VlbiBhbGwgRWRpdG9yXG5cdFx0Ly8gaW5zdGFuY2VzKVxuXHRcdGlmICggISBzZWxmLl9kb20uY29udGVudCApIHtcblx0XHRcdHNlbGYuX2RvbS5jb250ZW50ID0gJChcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlIERURURcIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+Jytcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiLz4nK1xuXHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+J1xuXHRcdFx0KTtcblxuXHRcdFx0c2VsZi5fZG9tLmNsb3NlID0gJCgnPGJ1dHRvbiBjbGFzcz1cImNsb3NlXCI+JnRpbWVzOzwvZGl2PicpO1xuXG5cdFx0XHRzZWxmLl9kb20uY2xvc2UuY2xpY2soIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0c2VsZi5fZHRlLmNsb3NlKCdpY29uJyk7XG5cdFx0XHR9ICk7XG5cblx0XHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdkaXYubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoICQoZS50YXJnZXQpLmhhc0NsYXNzKCdtb2RhbCcpICYmIHNlbGYuX3Nob3duICkge1xuXHRcdFx0XHRcdHNlbGYuX2R0ZS5iYWNrZ3JvdW5kKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHQvLyBBZGQgYGZvcm0tY29udHJvbGAgdG8gcmVxdWlyZWQgZWxlbWVudHNcblx0XHRkdGUub24oICdkaXNwbGF5T3JkZXIuZHRlYnMnLCBmdW5jdGlvbiAoIGUsIGRpc3BsYXksIGFjdGlvbiwgZm9ybSApIHtcblx0XHRcdCQuZWFjaCggZHRlLnMuZmllbGRzLCBmdW5jdGlvbiAoIGtleSwgZmllbGQgKSB7XG5cdFx0XHRcdCQoJ2lucHV0Om5vdChbdHlwZT1jaGVja2JveF0pOm5vdChbdHlwZT1yYWRpb10pLCBzZWxlY3QsIHRleHRhcmVhJywgZmllbGQubm9kZSgpIClcblx0XHRcdFx0XHQuYWRkQ2xhc3MoICdmb3JtLWNvbnRyb2wnICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH0sXG5cblx0XCJvcGVuXCI6IGZ1bmN0aW9uICggZHRlLCBhcHBlbmQsIGNhbGxiYWNrICkge1xuXHRcdGlmICggc2VsZi5fc2hvd24gKSB7XG5cdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHNlbGYuX2R0ZSA9IGR0ZTtcblx0XHRzZWxmLl9zaG93biA9IHRydWU7XG5cdFx0c2VsZi5fZnVsbHlEaXNwbGF5ZWQgPSBmYWxzZTtcblxuXHRcdHZhciBjb250ZW50ID0gc2VsZi5fZG9tLmNvbnRlbnQuZmluZCgnZGl2Lm1vZGFsLWNvbnRlbnQnKTtcblx0XHRjb250ZW50LmNoaWxkcmVuKCkuZGV0YWNoKCk7XG5cdFx0Y29udGVudC5hcHBlbmQoIGFwcGVuZCApO1xuXG5cdFx0JCgnZGl2Lm1vZGFsLWhlYWRlcicsIGFwcGVuZCkuYXBwZW5kKCBzZWxmLl9kb20uY2xvc2UgKTtcblxuXHRcdCQoc2VsZi5fZG9tLmNvbnRlbnQpXG5cdFx0XHQub25lKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly8gQ2FuIG9ubHkgZ2l2ZSBlbGVtZW50cyBmb2N1cyB3aGVuIHNob3duXG5cdFx0XHRcdGlmICggc2VsZi5fZHRlLnMuc2V0Rm9jdXMgKSB7XG5cdFx0XHRcdFx0c2VsZi5fZHRlLnMuc2V0Rm9jdXMuZm9jdXMoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNlbGYuX2Z1bGx5RGlzcGxheWVkID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQub25lKCdoaWRkZW4nLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHNlbGYuX3Nob3duID0gZmFsc2U7XG5cdFx0XHR9KVxuXHRcdFx0LmFwcGVuZFRvKCAnYm9keScgKVxuXHRcdFx0Lm1vZGFsKCB7XG5cdFx0XHRcdGJhY2tkcm9wOiBcInN0YXRpY1wiLFxuXHRcdFx0XHRrZXlib2FyZDogZmFsc2Vcblx0XHRcdH0gKTtcblx0fSxcblxuXHRcImNsb3NlXCI6IGZ1bmN0aW9uICggZHRlLCBjYWxsYmFjayApIHtcblx0XHRpZiAoICFzZWxmLl9zaG93biApIHtcblx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgaWYgYWN0dWFsbHkgZGlzcGxheWVkIG9yIG5vdCBiZWZvcmUgaGlkaW5nLiBCUzQgZG9lc24ndCBsaWtlIGBoaWRlYFxuXHRcdC8vIGJlZm9yZSBpdCBoYXMgYmVlbiBmdWxseSBkaXNwbGF5ZWRcblx0XHRpZiAoICEgc2VsZi5fZnVsbHlEaXNwbGF5ZWQgKSB7XG5cdFx0XHQkKHNlbGYuX2RvbS5jb250ZW50KVxuXHRcdFx0XHQub25lKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLmNsb3NlKCBkdGUsIGNhbGxiYWNrICk7XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCQoc2VsZi5fZG9tLmNvbnRlbnQpXG5cdFx0XHQub25lKCAnaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLmRldGFjaCgpO1xuXHRcdFx0fSApXG5cdFx0XHQubW9kYWwoJ2hpZGUnKTtcblxuXHRcdHNlbGYuX2R0ZSA9IGR0ZTtcblx0XHRzZWxmLl9zaG93biA9IGZhbHNlO1xuXHRcdHNlbGYuX2Z1bGx5RGlzcGxheWVkID0gZmFsc2U7XG5cblx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0Y2FsbGJhY2soKTtcblx0XHR9XG5cdH0sXG5cblx0bm9kZTogZnVuY3Rpb24gKCBkdGUgKSB7XG5cdFx0cmV0dXJuIHNlbGYuX2RvbS5jb250ZW50WzBdO1xuXHR9LFxuXG5cblx0Lypcblx0ICogUHJpdmF0ZSBwcm9wZXJ0aWVzXG5cdCAqL1xuXHQgXCJfc2hvd25cIjogZmFsc2UsXG5cdFwiX2R0ZVwiOiBudWxsLFxuXHRcIl9kb21cIjoge31cbn0gKTtcblxuc2VsZiA9IERhdGFUYWJsZS5FZGl0b3IuZGlzcGxheS5ib290c3RyYXA7XG5cblxucmV0dXJuIERhdGFUYWJsZS5FZGl0b3I7XG59KSk7XG4iXSwiZmlsZSI6InZlbmRvci9kYXRhVGFibGVzL2VkaXRvci5ib290c3RyYXA0LmpzIn0=
