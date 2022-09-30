var dlt = {
    
    init: function () {

        //Init de select2 para combos y etiquetas
        $('.select2').select2({minimumResultsForSearch: Infinity});
        $('.select2').on('click', function(){
            $(".nano").nanoScroller();
        });

    },  
    
};


$(function () {
    dlt.init();
   
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZWxldGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGRsdCA9IHtcclxuICAgIFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvL0luaXQgZGUgc2VsZWN0MiBwYXJhIGNvbWJvcyB5IGV0aXF1ZXRhc1xyXG4gICAgICAgICQoJy5zZWxlY3QyJykuc2VsZWN0Mih7bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IEluZmluaXR5fSk7XHJcbiAgICAgICAgJCgnLnNlbGVjdDInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLm5hbm9cIikubmFub1Njcm9sbGVyKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSwgIFxyXG4gICAgXHJcbn07XHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBkbHQuaW5pdCgpO1xyXG4gICBcclxufSk7Il0sImZpbGUiOiJkZWxldGUuanMifQ==
