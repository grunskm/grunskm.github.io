let img = [];
let txt;
let n = 0;

let r1 = 0;
let r2 = 0;

let p1 = { x: 0, y: 0 };
let p2 = { x: 0, y: 0 };

let pt = [];
let t_pt = [];

let k = 0;

function preload() {

	for(let i=1;i<=44;i++){
		img.push(loadImage("images/"+i+".png"));
	}

}

function setup() {
  background(0);
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  blendMode(BLEND);
  textFont('Courier New');
  textSize(50);
  
  for(let i=0; i<5; i++){
  	t_pt.push({
  		x: random(width),
  		y: random(height),
  		n: i
  	});
  }
  
  for(let i=0; i<5; i++){
		pt.push({
		x: random(width),
		y: random(height),
		s: random(0.2,2),
		r: random(TWO_PI),
		n: i*4
		})
	}
  //noStroke();
}

function draw() {
  background(255);

		for(let i=0; i<pt.length; i++){
			pt[i].y += pt[i].s;
			if(pt[i].y > height){
				pt[i].y = 0;
				pt[i].x = random(width);
				pt[i].s = random(1,2);
				pt[i].n++;
			}
			push();
			translate(pt[i].x, pt[i].y);
			rotate(pt[i].r);
			blendMode(MULTIPLY);
			image(img[pt[i].n%img.length], 0, 0);
			pop();
	}
  
 	for(let i=0;i<t_pt.length;i++){
     fill(255);
     blendMode(BLEND);
     text(NOUNS[i],t_pt[i].x,t_pt[i].y);
     text(VERBS[i],t_pt[i].y,t_pt[i].x);
   }
   
   if(frameCount%50==0){
   	k++;
   	print(k%t_pt.length);
   	t_pt[k%t_pt.length].x = random(width);
   	t_pt[k%t_pt.length].y = random(height);
   	t_pt[k%t_pt.length].n = floor(random(0,t_pt.length));
   }

}