var elevation = [];

var img = [];
var imgs = 60;

var panel = [];
var panels = 10;

var timeDay = -1;
var timesOfDay = 3;

var imgSet = 0;
var imgSets = 2;

var ratio;
var fps;

function preload(){
  let num =0;
  for(i=0;i<timesOfDay;i++){
  elevation[i] = loadImage("assets/backgrounds/elevation"+[i]+".png");
  }
  for(e=0;e<timesOfDay;e++){
    num ++;
    img[e] = [];
    for(i=0;i<(floor(imgs/timesOfDay));i++){
    img[e][i] = loadImage("assets/images/image"+(i+(e*floor(imgs/timesOfDay)))+".jpg");
    }
  }
}

function setup() {
  noCursor();
  timeDay = 0;
  frameRate(60);
  createCanvas(elevation[1].width,windowHeight);
  ratio = width/elevation[1].width;
  initializePanels();
  imageW = width;
  imageH = elevation[1].height*ratio;
}

function draw() {
  if(timeDay===0){
  image(elevation[0],0,0,imageW,imageH);
}else if(timeDay==1){
  image(elevation[1],0,0,imageW,imageH);
}else if(timeDay==2){
  image(elevation[2],0,0,imageW,imageH);
}

   panel[7].display();
   panel[6].display();
   panel[5].display();
   panel[9].display();
   panel[8].display();
   panel[4].display();
   panel[3].display();
   panel[0].display();
   panel[1].display();
   panel[2].display();
  push();
  fill(255);
  rect(50,10,150,35);
  fill(255,0,0);
  text(imgSet,20,20);
  text(timeDay,20,40);
  textSize(30);
  fill(100,0,255);
  if(frameCount%50===0){
  fps = floor(getFrameRate());
  }
  if(timeDay==0){
    text("12:00PM   "+fps,60,40);
  }else if(timeDay==1){
    text("9:00 PM"+fps,60,40);
  }else if(timeDay==2){
    text("12:00 AM"+fps,60,40);
  }
   fill(255,0,0);
   textSize(15);
  point(mouseX,mouseY);
  text(mouseX,mouseX,mouseY-20);
  text(mouseY,mouseX-40,mouseY);
  pop();
}

function keyPressed(){
  if(keyCode==SHIFT){
    timeDay++;
    if(timeDay>=timesOfDay){
      timeDay = 0;
    }
  }
  if(keyCode==OPTION){
    imgSet ++;
    if(imgSet>=imgSets){
      imgSet = 0;
    }
  }
  initializePanels()
  print(panel[0].n);
}

window.onresize = function(){
  if(timeDay>=0){
  resizeCanvas(windowWidth,windowHeight);
  ratio = windowWidth/elevation[1].width; //resizing ratio
  imageW = windowWidth;
  imageH = elevation[1].height*ratio;//maintaining image proportion independent of window size
  initializePanels()
  }
}
