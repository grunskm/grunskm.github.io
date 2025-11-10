
let letter = [];
let space = 1;
let phrase = " revo dna";
let mouseP = [
  {
    x:0,
    y:0
  }
];

function setup(){
  createCanvas(windowWidth,windowHeight);
  textSize(20);
  for(i=0;i<phrase.length;i++){
    letter.push(phrase.charAt(i));
  }
}

function draw(){
  background(255);
  if(mouseP.length==1){
    text("o",width/2,height/2);
  }
  let diff_x = mouseP[0].x-mouseX;
  let diff_y = mouseP[0].y-mouseY;
//  print(diff_y);
  if(diff_x < -space ||
    diff_x > space ||
    diff_y < -space ||
    diff_y > space
  ){
    mouseP.unshift(
      {
        x:mouseX,
        y:mouseY
      }
    );
    if(mouseP.length>=1000){
     mouseP.pop();
    }
  }

  for(i=0;i<mouseP.length/6;i++){
    text(letter[i%letter.length],mouseP[i*6].x,mouseP[i*6].y);
  }
}

function touchStarted(){
  return false;
}

function mouseDragged(){
  return false;
}

function touchMoved(){
  return false;
}





// let letter = [];
// let space = 20;
// let phrase = " revo dna";
// let mouseP = [
//   {
//     x:0,
//     y:0
//   }
// ];
//
// function setup(){
//   createCanvas(windowWidth,windowHeight);
//   textSize(20);
//   for(i=0;i<phrase.length;i++){
//     letter.push(phrase.charAt(i));
//   }
// }
//
// function draw(){
//   background(255);
//   let diff_x = mouseP[0].x-mouseX;
//   let diff_y = mouseP[0].y-mouseY;
//   print(diff_y);
//   if(diff_x < -space ||
//     diff_x > space ||
//     diff_y < -space ||
//     diff_y > space
//   ){
//     mouseP.unshift(
//       {
//         x:mouseX,
//         y:mouseY
//       }
//     );
//     // if(mouseP.length>=letter.length){
//     // //  mouseP.pop();
//     // }
//   }
//
//   for(i=0;i<mouseP.length;i++){
//     text(letter[i%letter.length],mouseP[i].x,mouseP[i].y);
//   }
// }
