let span = [];

window.onload = ()=>{
  let titles = document.getElementsByClassName("title");
  for(let i=0;i<titles.length;i++){
    let item = {
      title:titles[i],
      open:false
    }
    span.push(item);
    span[i].title.addEventListener("click",()=>{
      toggleChildren(i);
    });
  }
}

function toggleChildren(k){
  let child = span[k].title.parentElement.children;
  if(span[k].open==false){
    for(i=0;i<child.length-1;i++){
      child[i+1].style.display = "block";
      span[k].open = true;
    }
  }else{
    for(i=0;i<child.length-1;i++){
      child[i+1].style.display = "none";
      span[k].open = false;
    }
  }
}
