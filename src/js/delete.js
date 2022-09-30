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