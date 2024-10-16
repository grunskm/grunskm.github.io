let input;
let original;
let frames = [];
let n = 0;
let pr_f = {
  x:0,
  y:0
}

let offset = {
  x:150,
  y:200
}

let f = {
  w:330,
  h:195
}

let rows = 16;
let cols = 13;

function preload(){
  original = loadImage("./IMG_04282.jpg");
}

function setup() {
  createCanvas(330, 195);
  image(original,0,0);
  
  noFill();
  
}

function draw() {
  image(original,0,0);
  if(frames.length>0){
    let n = floor(frameCount*0.25)%frames.length;
    image(frames[n],0,0); 
    // push();
    // tint(225,127);
    // image(frames[frames.length-1],mouseX,mouseY);
    // pop();
  }
  // rect(mouseX,mouseY,f.w,f.h);
  // rect(pr_f.x,pr_f.y,f.w,f.h);
}

function mousePressed(){
  let q = rows*cols;
  for(let i=0;i<q;i++){
    let x = n%cols;
    let y = floor(n/cols);
    print(x,y);

    frames.push(original.get(x*f.w+offset.x,y*f.h+offset.y,f.w,f.h));
    // pr_f.x = mouseX;
    // pr_f.y = mouseY;

    n++;
  }
}
