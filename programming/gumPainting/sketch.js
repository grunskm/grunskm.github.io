


var painting;
var back;
var n = 0;
var backImg;

function preLoad(){
 	//backImg = loadImage("blank2.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  backImg = loadImage("blank2.png");
  painting = new Painting();
  imageMode(CENTER);
  noStroke();
  text("CLICK TO COMPOSE",width*0.45,height/2);
}

function mousePressed(){
  painting.recompose();
  painting.display();
}

function keyPressed(){
	if(keyCode==SHIFT){
	saveCanvas("composition"+n,"png");
	}
}

function Painting(){
  this.h = height*0.75;
  this.w = this.h;
  this.x = (width/2)-(this.w/2);
  this.y = (height/2)-(this.h/2);
  this.n;
  this.back = backImg;
  
  this.display = function(){
    background(210);
    image(this.back,width/2,height/2,this.w*1.365,this.h*1.375);
    fill(random(0,200),random(0,200),random(0,200));
    rect(this.x,this.y,this.w,this.h);
    for(i=0;i<this.n;i++){
     gum(this.x,this.y,this.w,this.h);
    }
  }
  
  this.recompose = function(){
    this.n = random(3,7);
  }
}


function gum(x,y,w,h){
  push();
  var r = w*0.055; // radius
  var pr = 0.5; // noise sampling radius
  var seed = random(0,10000); // ensures no duplication
  var col = [random(0,200),random(0,200),random(0,200)];
  
  //draw gum
  translate(random(x+(r*2),x+w-(r*2)),random(y+(r*2),y+h-(r*2)));
  fill(col[0],col[1],col[2]);
  beginShape();
  for(a=0;a<TWO_PI;a+=0.1){
      var px = sin(a)*pr+seed; // circle pattern for noise sampling
      var py = cos(a)*pr+seed;
      
      var wiggle = map(noise(px,py),0,1,0,r); // get noise value
      
	  var sx = sin(a)*(r+wiggle);
	  var sy = cos(a)*(r+wiggle);
	  
      vertex(sx,sy);
  }
  endShape();
  pop();
}

