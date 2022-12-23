
let num = 10;
let rects = [];
let off;
let blank = true;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noStroke();
		off = width*0.01;
	for(let i=0; i<num;i++){
		let x = width*0.1+(random(-off,off));
		let y = height*0.15+(random(-off,off));
		rects.push(new wrect(x,y,width*0.19,height*0.21));
	}

}

function draw(){
	background(0);
	if(blank){
		text('CLICK TO START');
	}

	for(let i=0; i<rects.length;i++){
		rects[i].adv();
		rects[i].show();
	}
}

function mousePressed(){
	blank=false;
}

function wrect(X,Y,W,H){
	this.x = X;
	this.y = Y;
	this.w = W;
	this.h = H;
	//this.img = createImage(this.w,this.h);
	this.seed = random(0,100);
	this.speed = random(0.2,0.5);
	this.a = 100;
	this.pace;

	this.show = ()=>{
		
		
		let x = this.x+noise(this.seed*0.25)*20;
		let y = this.y+noise(this.seed*0.25)*20;
		
		
		for(let i=0;i<4;i++){
			for(let e=0;e<3;e++){
					fill(noise((i+this.seed)*0.1,(e+this.seed)*0.1)*255,this.a);
					rect(x+i*(this.w+25),y+e*(this.h+25),this.w,this.h);
			}
		}

		
// 		this.img.loadPixels();
// 		for(let i=0;i<this.img.width;i++){
// 			for(let e=0;e<this.img.height;e++){
// 			
// 				let col = color(255,noise((i*0.005)+noise(sin(this.seed*0.2)*5),(e*0.005)+noise(cos(this.seed*0.2)*5))*100);
// 				let n = 4*(i*this.img.height)+e;
// 				
//  				this.img.set(i,e,col);
// 			}
// 		}
// 		this.img.updatePixels();
// 		image(this.img,this.x,this.y);
	
	}
	this.adv = ()=>{
		
		this.seed += noise(this.seed)*this.speed;
		this.a = noise(this.seed*0.2)*75;
	}
}







