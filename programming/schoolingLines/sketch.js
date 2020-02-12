var worm = [];
var n= 50;
var p = 0;


function setup() {
  let w = select('body');
  print(w.style.width);
  createCanvas(windowHeight*0.9,windowHeight*0.9);
  angleMode(DEGREES);
  stroke(0);
  for(w=0;w<n;w++){
  worm.push(new Worm());
  }
}
function draw(){
  background(255);
  p+=-0.3;
  translate(width/2,height/2);
  rotate(p);
  for(w=0;w<n;w++){
  worm[w].happen();
  }
}

function Worm(){
    this.speed = random(0.4,0.6);
	this.radius = random(20,height*0.25);
	this.amp = 75;
    this.deg = random(10,20);
    this.inc =1;
    this.ang = random(0,100000);
    this.a;
    this.r;
    this.w = width/2;//random(width*0.2,width*0.8);
    this.h = height/2//random(height*0.2,height*0.8);
    
    this.happen = function(){
      this.ang +=this.speed;
      this.a = this.ang;
      for(q=0;q<this.deg;q++){
      this.a+=this.inc;
      this.r = (noise(this.a/this.amp)*100)+this.radius;
      this.x = this.r*cos(this.a);
      this.y = this.r*sin(this.a);
      push();
      //translate(this.w,this.h);
  	  strokeWeight(map(this.r,20,height*0.25,0.5,2));
      line(this.x,this.y,this.x2,this.y2);
      pop();
      this.x2 = this.x;
      this.y2 = this.y;
      }
      this.x2 = undefined;
      this.y2 = undefined;
    }
}

