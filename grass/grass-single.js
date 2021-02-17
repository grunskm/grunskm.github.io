
let n = 300;
let blade = [];
let cutHeight = 3
let r = 30;



function setup() {
  createCanvas(windowWidth,windowHeight);
	noFill();
	noCursor();
	stroke(30,100,80);
	for(i=0;i<n;i++){
		blade.push(new Grass(random(width*0.4,width*0.6),random(height*0.6,height*0.8)));
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

//
// let w = 20;
// let h = 10
// let blade = [];
// let cutHeight = 3
// let r = 30;
// let area = 200;
// let spaceW = area*2/w;
// let spaceH = area*2/h;
// let flowerX = [];
// let flowerY = [];
//
//
// function setup() {
//   createCanvas(windowWidth,windowHeight);
// 	noFill();
//   angleMode(DEGREES);
// 	noCursor();
// 	stroke(30,100,80);
//   strokeWeight(2);
//
// 	for(i=0;i<w;i++){
//       for(q=0;q<h;q++){
//         blade.push(new Grass((i*spaceW*1.25)+(width/2-area)+(q*5),(q*spaceH)+(height*0.6-area)));
//       }
// 	}
//   for(p=0;p<5;p++){
//     let x = sin(p*70)*4;
//     let y = cos(p*70)*4;
//     flowerX.push(x);
//     flowerY.push(y);
//   }
//
// }
//
// function draw() {
// 	background(30,20,20);
//
// 	let speed  = map(noise(frameCount*0.0001),0,1,0.005,0.02);
//
//   for(i=w*h-1;i>-1;i--){
// 		blade[i].display(speed);
// 		blade[i].collide();
// 	}
//   for(i=w*h-1;i>-1;i--){
//     blade[i].flower();
//   }
// 	ellipse(mouseX,mouseY,60,60);
// }
//
// function Grass(X,Y){
//
// 	this.x = X;
// 	this.y = Y;
//
// 	this.length = 10;
// 	this.height = 0;
//   this.top  = random(15,20);
//   this.mature = false;
//
// 	this.Xsample = X*0.001;
// 	this.Ysample = Y*0.005;
//
// 	this.cut = false;
//
//   this.force;
//   this.sway;
//
//   this.pointX;
//   this.pointY;
//
//
//
// 	this.display = (speed)=>{
//
//       if(this.height < this.top){
//         this.height+=0.05;
//       }else{
//         this.mature = true;
//       }
//
// 			if(this.cut == true){
// // 				this.y+=this.flyaway.y;
// // 				this.x+=this.flyaway.x;
// 					this.height=cutHeight;
// 					this.cut = false;
//           this.mature = false;
// 			}
// 			this.Xsample-=speed;
// 			this.Ysample-=speed*0.75;
// 			this.force = map(noise(this.Xsample,this.Ysample),0,1,0,0.02);
//
// 			beginShape();
// 			for(e=0;e<this.length;e++){
// 				this.sway = e*e*this.force*this.height;
//         this.pointX = this.x+this.sway;
//         this.pointY = this.y+this.sway-e*this.height;
// 				vertex(this.pointX,this.pointY);
// 			}
// 			endShape();
// 	}
//   this.flower  =  ()=>{
//     if(this.mature == true){
//       push();
//
//         stroke(100,50,60);
//         point(this.pointX,this.pointY);
//         //strokeWeight(1);
//         for(p=0;p<5;p++){
//           line(this.pointX,this.pointY,this.pointX+flowerX[p],this.pointY+flowerY[p]);
//         }
//       pop()
//     }
//   }
//
// 	this.collide = ()=>{
//
// 		if(this.height>cutHeight && mouseIsPressed && mouseX>this.x-r && mouseX<this.x+r && mouseY>this.y-r && mouseY<this.y+r){
// 			this.cut = true;
// 		}
// 	}
// }
