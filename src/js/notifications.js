var notifications = {
    
    init: function () {
        
        $('.notifications .notification_item').on('click', function() {   
            $(this).toggleClass('page-item_expanded') 
        })

    },  
    
};




$(function () {
    notifications.init();
   
});

