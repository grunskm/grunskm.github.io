let mobile = [];
let count = 0;
let max = 7;
let scale = 0.003;
let angt = 0;
let rot2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mobile = new Wire();
  blendMode(MULTIPLY);
}

function draw() {
  //background(10);
  clear();
  push();
	translate(width*0.5,height/2);

	rot2 += 0.001;

	mobile.calculate(0,0,200);

  translate(width*0.2,0);
	fill(255,0,0);
	stroke(255,0,0);
	mobile.show(30);
	
	translate(-width*0.4,0);
	//fill(255,255,0);
	stroke(255,0,0);
	mobile.show(-30);
	pop();
}

class Wire{
  constructor(){
    this.i = count;
    count++;
    
    this.angZ = PI*(0.1*this.i)+PI*0.23;
    
    this.rad1 = 50;
    this.rad2 = 300-(this.i*20);
    this.size = 60;
    this.child = undefined;

    if(this.i<max){
      this.child = new Wire();
    }
  }
  
  calculate(X,Y,Z){
  
    this.pos = [];
    
    let wobble = this.angZ+sin(frameCount*0.008+this.i*1.7)*PI*0.03;
    
    this.pos[0] = new p5.Vector(
      X+sin(wobble)*this.rad1,
      Y+cos(wobble)*this.rad1,
      Z
    );
    
    this.pos[1] = new p5.Vector(
      X+sin(wobble-PI)*this.rad2,
      Y+cos(wobble-PI)*this.rad2,
      Z
    );
    
    this.circ = PI*this.size/2;
	  this.st = TWO_PI/this.circ;
    
    for(let i=0;i<=this.circ;i++){
    	this.pos[i+2]=
				new p5.Vector(
				this.pos[1].x+sin(i*this.st)*this.size/2,
				this.pos[1].y+cos(i*this.st)*this.size/2,
				Z
			);
		}
		if(this.child == undefined){
		//print('add exta circle');
			for(let i=0;i<=this.circ;i++){
				this.pos.push(
					new p5.Vector(
					this.pos[0].x+sin(i*this.st)*this.size/2,
					this.pos[0].y+cos(i*this.st)*this.size/2,
					Z
				));
			}
    }
  
   	let dist;
 	  let ang;
 	  
		let r = sin(frameCount*0.00001+this.i*0.2)*2;
    
    for(let i=0;i<this.pos.length;i++){
			
			dist = sqrt(pow(this.pos[i].x-X,2)+pow(this.pos[i].z-Z,2));
			ang = atan2(this.pos[i].x-X,this.pos[i].z-Z);
			this.pos[i].x = sin(ang+rot2+r)*dist+X;
			this.pos[i].z = cos(ang+rot2+r)*dist+Z;

    }
  }
  
  show(OFF){
    
		let s1 = 1/(1+(this.pos[0].z)*scale);
		let x1 = (this.pos[0].x+OFF)*s1;
		let y1 = this.pos[0].y*s1;
		
		let s2 = 1/(1+(this.pos[1].z)*scale);
		let x2 = (this.pos[1].x+OFF)*s2;
		let y2 = this.pos[1].y*s2;
    
    if(this.child != undefined){
    
      strokeWeight(1);
		//	stroke(100);
      line(x1,y1,x2,y2);
     //	stroke(255,0,0);
     	beginShape();
				for(let i=2;i<=this.circ+2;i++){
					let s = 1/(1+(this.pos[i].z)*scale);
					let x = (this.pos[i].x+OFF)*s;
					let y = this.pos[i].y*s;
					vertex(x,y);
				}
			endShape();
      this.child.calculate(this.pos[0].x,this.pos[0].y,this.pos[0].z);
      this.child.show(OFF);
      
    }else{
      strokeWeight(1);
      line(x1,y1,x2,y2);
      
      noStroke();
    	beginShape();
				for(let i=1;i<this.circ;i++){
					  let index = this.pos.length-i;
						let s = 1/(1+(this.pos[index].z)*scale);
						let x = (this.pos[index].x+OFF)*s;
						let y = this.pos[index].y*s;
						vertex(x,y);
				}
			endShape();
			
			beginShape();
				for(let i=2;i<=this.circ+2;i++){
					let s = 1/(1+(this.pos[i].z)*scale);
					let x = (this.pos[i].x+OFF)*s;
					let y = this.pos[i].y*s;
					vertex(x,y);
				}
			endShape();
    } 
  }
}


