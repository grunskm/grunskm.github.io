

window.onload = ()=>{

  document.getElementById("nav_stack").addEventListener("mouseenter",()=>{
		toggle_navlinks();
  });

  document.getElementById("nav_stack").addEventListener("mouseleave",()=>{
		toggle_navlinks();
  });

  document.getElementById("mob_title_block").addEventListener("click",()=>{
		toggle_mob_navlinks();
  });

  let slide = document.getElementsByClassName("zoom_slide");

	for(let i=0; i<slide.length; i++){
		slide[i].addEventListener("click",()=>{
			zoom_src(slide[i]);
  	});
	}

	document.getElementById("overlay").addEventListener("click",()=>{
		let overlay = document.getElementById("overlay");
		overlay.style.display = "none";
	});
}

function zoom_src(slide){
		let img = slide.getAttribute("src");
		let zoom = document.getElementById("large-slide");

    zoom.setAttribute("src",img);
    // if(window.innerHeight>window.innerWidth){
    //   let temp_width = window.innerWidth*0.8;
    //   zoom.setAttribute("width",temp_width);
    // }else{
    //   let temp_height = window.innerHeight*0.8;
    //   zoom.setAttribute("width",temp_height);
    // }


		overlay.style.display = "block";
}

function toggle_navlinks(){
  let nav_item = document.getElementsByClassName('nav_item');
	let arrow = document.getElementById('indicator');

	if(nav_item[0].style.display == "block"){
    for(let q=0;q<nav_item.length;q++){
      nav_item[q].style.display = "none";
    }
		arrow.innerText = ">";
	}else{
		arrow.innerHTML = "&#8743;";
    for(let q=0;q<nav_item.length;q++){
      nav_item[q].style.display = "block";
    }
	}
}

function toggle_mob_navlinks(){
  let nav_item = document.getElementsByClassName('nav_item');
	let arrow = document.getElementById('mob_indicator');

	if(nav_item[0].style.display == "block"){
    for(let q=0;q<nav_item.length;q++){
      nav_item[q].style.display = "none";
    }
		arrow.innerText = ">";
	}else{
		arrow.innerHTML = "&#8743;";
    for(let q=0;q<nav_item.length;q++){
      nav_item[q].style.display = "block";
    }
	}
}
