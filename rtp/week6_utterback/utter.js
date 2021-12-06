
let feed;
let copy;
let drop = [];

function preload(){
	feed = createCapture(VIDEO);
}

function setup(){

	createCanvas(640,480);



	for(let i=0;i<40;i++){
		drop.push(new Dropper());
	}
}

function draw(){



//	customThresh(map(mouseX,0,width,0,255),feed);
	//customThresh(100,feed);

	image(feed,0,0,width,height);

	for(let i in drop){
		drop[i].show();
		drop[i].fall(feed, 100);

	}

}

function customThresh(THRESH, IMG){
	IMG.loadPixels();
	for(let i=0;i<IMG.height;i++){
		for(let e=0;e<IMG.width;e++){
			let index = (i*IMG.width+e)*4;
			let sum = 0;
			for(let q=0;q<3;q++){
				sum += IMG.pixels[index+q];
			}
			let avg = sum/3;
			let f = 255;
			if(avg<THRESH){
				f = 0;
			}
			for(let q=0;q<3;q++){
				IMG.pixels[index+q] = f;
			}
		}
	}
	IMG.updatePixels();
}


function Dropper(){

	this.x = random(0,width);
	this.y = 50;

	this.speed = 1;
	this.gravity = 0.5;

	this.show = ()=>{
		ellipse(this.x,this.y,20,20);
	}

	this.fall = (IMG, THRESH)=>{

		this.speed += this.gravity;
		this.y+=this.speed;

		let f0 = IMG.get(this.x,this.y);
		let f1 = IMG.get(this.x,this.y+2);
		let f2 = IMG.get(this.x,this.y+40);

		f0 = (f0[0]+f0[1]+f0[2])/3;
		f1 = (f1[0]+f1[1]+f1[2])/3;
		f2 = (f2[0]+f2[1]+f2[2])/3;

		if(f0>THRESH && f1>THRESH && f2<THRESH){
			this.speed*=-0.2;
		}else if(f0>THRESH && f1<THRESH+5 && f1<THRESH-5 && f2<THRESH){
			this.speed = 0;
		}else if(this.y>0 && f0<THRESH && f1<THRESH && f2<THRESH){
			this.speed-=5;
		}



		if(this.y>height-30){
			this.y = 0;
			this.speed = 1;
		}

	}

}
