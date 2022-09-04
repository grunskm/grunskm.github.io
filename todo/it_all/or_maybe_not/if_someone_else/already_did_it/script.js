let imgs = 117;
let num = [];
for(i=0;i<imgs;i++){
  num.push(i);
}
window.onload = ()=>{
  let k;
  for(i=0;i<imgs;i++){
    k = num[Math.floor(Math.random()*num.length)];
    num.splice(num.indexOf(k),1);
    let img = document.createElement("IMG");
    img.setAttribute("src","assets/"+k+".jpg");
    img.setAttribute("alt","image"+i);
    img.setAttribute("class","slide");
		console.log(i);
//     img.setAttribute("width","400");
    if(i%2==0){
      document.getElementById("column1").appendChild(img);
    }else{
      document.getElementById("column2").appendChild(img);
    }
  }

}
