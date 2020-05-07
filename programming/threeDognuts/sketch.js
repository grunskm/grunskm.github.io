
let seedx;
let seedy;
let rad;
let rad2;
let inten;


function setup() {

	createCanvas(windowWidth,windowHeight*0.95);
	angleMode(DEGREES);
	noFill();
	stroke(0);
	strokeWeight(1);

	seedx = random(0,1000);
	seedy = random(0,1000);
	inten = 0.4;

	print("dognut");
	background(255);

	render();
}

function mousePressed(){
	if(mouseY<height){
	render();
	}
}

function render(){
	background(255);
	for(a=0;a<3;a++){
		rad = 70;
		rad2 = random(90,120);
		buttHole(a*width/4+width/4,height/2);
	}
}

function buttHole(x,y){
	seedx = random(0,10000);
	seedy = random(0,1000);
for(e=0;e<360;e++){
	let m = 1;
	let samplex = seedx+sin(e*m)*inten;
	let sampley = seedy+cos(e*m)*inten;
	let mr = noise(samplex,sampley)*rad2+50;
	let mx = sin(e*m)*mr+(x);
	let my = cos(e*m)*mr+(y);

	cir(mx,my);
// ellipse(mx,my,rad);

}
}

function cir(mx,my){
 for(i=0;i<180;i++){
   let r = rad;
   let xx = sin(i*2)*r+mx; 
   let yy = cos(i*2)*r+my;
   point(xx,yy);
 }
}