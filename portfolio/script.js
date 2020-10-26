$(document).ready(function(){
  $(".portfolio-item").click(function(){
		$(".content-wrapper:visible").slideToggle();
    $(this).find(".content-wrapper:hidden").slideToggle();
  });
}); 