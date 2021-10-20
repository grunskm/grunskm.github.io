let divs = 50;
let space;
let dark;
let off;
let canvas;

let pattern = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  frameRate(15);
  noStroke();
  
	dark = color(100,20,30);
	light = color(255,130,10);
	resize();

  for(e=0;e<divs;e++){
    pattern.push([]);
    for(i=0;i<divs;i++){
      let tempV = 0;
      if(i>divs-20 && i<divs-5 && e>5 && e<divs-5){
        tempV = floor(random(0,2));
      }
      pattern[e].push(tempV);
    }
  }
  drawGrid();
}

function draw(){
  
  for(e=1;e<divs-1;e++){
    for(i=1;i<divs-1;i++){
      let Nsum = sumAdj(i,e);
      let fact = 3;
      
      if(i>divs-20 && i<divs-5 && e>5 && e<divs-5){
        fact = 2;
      }
      
      if(pattern[e][i] > 0.5 && Nsum > 2 && Nsum < 5 ){
        pattern[e][i] = 1;
      }else if(pattern[e][i] <0.5 && Nsum == fact ){
        pattern[e][i] = 1;
      }else if(pattern[e][i] >0.5){
        pattern[e][i] = 0;
      }
      
    }
  }
  
  drawGrid();
}

function drawGrid(){
		background(dark);
    for(e=0;e<divs;e++){
    for(i=0;i<divs;i++){
      let x = i*space+off;
      let y = e*space;
      
      if(pattern[i][e]<0.5){
        fill(dark);
      }else{
        fill(light);
      }
      
      rect(x,y,space+1,space+1);
    }
  }
}

function sumAdj(I,E){
  let sum =         
        pattern[E][I]+
        pattern[E][I+1]+
        //pattern[E][I-1]+
        pattern[E+1][I]+
        pattern[E+1][I-1]+
        pattern[E+1][I+1]+
        pattern[E-1][I]+
        pattern[E-1][I-1]+
        pattern[E-1][I+1];
  return sum;
}

function resize(){
	canvas.resize(windowWidth, windowHeight);
	space = height/divs;
	off = (width-height)/2;
}

window.onresize = ()=>{
	resize();
}