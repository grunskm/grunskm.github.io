let mobile = [];
let count = 0;
let max = 7;
let scale = 0.004;
let angt = 0;
let rot2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mobile = new Wire();
  blendMode(MULTIPLY);
  noStroke();
}

function draw() {
  //background(10);
  clear();
	translate(width*0.5,height/2);
	//angt = mouseX*0.005;
	rot2+=0.001;
	
	fill(255);
	//stroke(0);
	mobile.show(0,0,50,0,0);
	
	fill(255,0,0);
	//stroke(255,0,0);
	mobile.show(0,0,50,0,-50);
	
	fill(0,255,255);
	//stroke(0,255,255);
	mobile.show(0,0,50,0,50);


}

class Wire{
  constructor(){
    this.i = count;
    count++;
    
    this.angZ = PI*(0.1*this.i)+PI*0.1;
    
    this.rad1 = 30;
    this.rad2 = 200-(this.i*10);
    this.size = 30;
    this.child = undefined;

    if(this.i<max){
      this.child = new Wire();
    }
  }
  
  show(X,Y,Z,R,OFF){
 		let dist;
 	  let ang;
		
    let ya = this.angZ+sin(frameCount*0.005+this.i*3)*PI*0.03;
    let r = sin(frameCount*0.001+this.i*0.2)*3;
    
    let pos1 = new p5.Vector(
      X+sin(ya)*this.rad1,
      Y+cos(ya)*this.rad1,
      Z
    );
    
    dist = sqrt(pow(pos1.x-X,2)+pow(pos1.z-Z,2));
		ang = atan2(pos1.x-X,pos1.z-Z);
		pos1.x = sin(ang+angt+rot2+r)*dist+X;
		pos1.z = cos(ang+angt+rot2+r)*dist+Z;
    
    let s1 = 1/(1+(pos1.z)*scale);
    let x1 = (pos1.x+OFF)*s1;
    let y1 = pos1.y*s1;
    
    let size1 = this.size*s1;
    
    let pos2 = new p5.Vector(
      X+sin(ya-PI)*this.rad2,
      Y+cos(ya-PI)*this.rad2,
      Z
    );
    
   	dist = sqrt(pow(pos2.x-X,2)+pow(pos2.z-Z,2));
		ang = atan2(pos2.x-X,pos2.z-Z);
		pos2.x = sin(ang+angt+rot2+r)*dist+X;
		pos2.z = cos(ang+angt+rot2+r)*dist+Z;
    
    let s2 = 1/(1+(pos2.z)*scale);
    let x2 = (pos2.x+OFF)*s2;
    let y2 = pos2.y*s2;
    
    let size2 = this.size*s2;
    
    if(this.child != undefined){
    
      strokeWeight(1);
      line(x1,y1,x2,y2);
      
      //noStroke();
     // fill(255,255,0);
      circle(x2,y2,size2);
      
      this.child.show(pos1.x,pos1.y,pos1.z,R+0.05,OFF);
      
    }else{
      strokeWeight(1);
     // stroke(0);
      line(x1,y1,x2,y2);
      
      noStroke();
      circle(x2,y2,size2);
      
     // fill(255);
      circle(x1,y1,size1);
    } 
  }
  
}



