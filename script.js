function toggle_visibility(id) {


   let e = document.getElementById(id);
   if(e.style.display == 'block'){
      e.style.display = 'none';
   }else{
		 let c = document.getElementsByClassName("mobile-slide-info");
			for(i=0;i<c.length;i++){
				c[i].style.display = 'none';
			}
      e.style.display = 'block';
	}
}
