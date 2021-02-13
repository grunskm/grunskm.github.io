
let n = 300;
let blade = [];
let cutHeight = 3
let r = 30;



function setup() {
  createCanvas(500,500);
	noFill();
	noCursor();
	stroke(30,100,80);
	for(i=0;i<n;i++){
		blade.push(new Grass(random(150,350),random(150,350)));
	}

}

function draw() {
	background(50,30,30);

	let speed  = map(noise(frameCount*0.0001),0,1,0.005,0.02);

  for(i=0;i<n;i++){
		blade[i].display(speed);
		blade[i].collide();
	}
	ellipse(mouseX,mouseY,60,60);
}

function Grass(X,Y){


	this.x = X;
	this.y = Y;
	this.length = 10;
	this.height = 0;

	this.Xsample = X*0.01;
	this.Ysample = Y*0.01;
	this.cut = false;
	this.flyaway = {
		x:random(-40,40),
		y:random(-40,40)
	}



	this.display = (speed)=>{
			
			this.height+=0.005;
			if(this.cut == true){
// 				this.y+=this.flyaway.y;
// 				this.x+=this.flyaway.x;
					this.height=cutHeight;
					this.cut = false;
				if(this.y>height){
					this.cut = false;
	// 				this.y = random(150,350);
// 					this.x = random(150,350);
					// this.height=2;
				}
			}
			this.Xsample-=speed;
			this.Ysample-=speed*0.75;
			let force = map(noise(this.Xsample,this.Ysample),0,1,0,0.02);

			beginShape();
			for(e=0;e<this.length;e++){
				sway = e*e*force*this.height;
				vertex(this.x+sway,sway+this.y-e*this.height);
			}
			endShape();

		
	}

	this.collide = ()=>{

		if(this.height>cutHeight && mouseIsPressed && mouseX>this.x-r && mouseX<this.x+r && mouseY>this.y-r && mouseY<this.y+r){
			print("CUT");
			this.cut = true;
		}
	}
}

