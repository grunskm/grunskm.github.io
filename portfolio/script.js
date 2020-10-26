$(document).ready(function(){
	$('.portfolio-item').click(function(event){
		$(this).find(".content-wrapper:visible").slideUp(300);
		$(this).find(".content-wrapper:hidden").slideDown(300);
	}); 
}); 


// 						$(".portfolio-item").click(function(){
// 							$(".content-wrapper:visible").slideToggle(200,function(){
// 								$(this).find(".content-wrapper:hidden").slideToggle(200);
// 							});
// 							$(this).find(".content-wrapper:hidden").delay(200).slideToggle(200);
// 						});

// 		event.preventDefault();
// 		$(this).animate(200,function(){
// 				scrollTop: $(this).attr("id");
// 		});