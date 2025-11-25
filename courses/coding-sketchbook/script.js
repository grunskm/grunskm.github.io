

function showDiv(divId,col){
  
  let allDivs = document.getElementsByClassName("assignment");
  let body = document.getElementById("body");
  
  for(let i=0;i<allDivs.length;i++){
    allDivs[i].style.display = "none";
  }
  
  divId.style.display = "block";
  
  body.style.backgroundColor = col;

}

