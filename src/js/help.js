var help = {
   init: function () {
      $(".help .help_item").on("click", function () {
         $(this).toggleClass("help-item_expanded");
      });
   },
};

$(function () {
   help.init();
});
