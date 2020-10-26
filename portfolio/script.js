$(document).ready(function(){

	$('.portfolio-item').click(function(event){

// 		event.preventDefault();
// 		$(this).animate(200,function(){
// 				scrollTop: $(this).attr("id");
// 		});

		$(".content-wrapper:visible").delay(0).slideToggle(200,function(){
				$(this).find(".content-wrapper:hidden").slideToggle(200);
		});
		$(this).find(".content-wrapper:hidden").delay(0).slideToggle(200);
	});
}); 


// 						$(".portfolio-item").click(function(){
// 							$(".content-wrapper:visible").slideToggle(200,function(){
// 								$(this).find(".content-wrapper:hidden").slideToggle(200);
// 							});
// 							$(this).find(".content-wrapper:hidden").delay(200).slideToggle(200);
// 						});

