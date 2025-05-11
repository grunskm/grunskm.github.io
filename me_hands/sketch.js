let img = [];
let txt;
let n = 0;

let r1 = 0;
let r2 = 0;

let p1 = { x: 0, y: 0 };
let p2 = { x: 0, y: 0 };

let pt = [];

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
		pt.push({
		x: random(width),
		y: random(height),
		s: random(0.2,2),
		r: random(TWO_PI)
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
				pt[i].s = random(0.2,2);
				n++;
			}
			push();
			translate(pt[i].x, pt[i].y);
			rotate(pt[i].r);
			blendMode(MULTIPLY);
			image(img[(n+i)%pt.length], 0, 0);
			pop();
	}
  
//   if (frameCount % 70 == 0) {
//     let x = floor(random(width));
//     let y = floor(random(height));
//     fill(255);
//     blendMode(BLEND);
//    // text(NOUNS[floor(random(NOUNS.length))],x,y);
//    // text(VERBS[floor(random(VERBS.length))],y,x);
//    //text(ADJECTIVES2[floor(random(ADJECTIVES2.length))],x,y);
//    text(CHATGPT[floor(random(CHATGPT.length))],x,y);
// 
//   }

  // if(frameCount%50==0){
  //   background(250,20);
  //   r2 = random(0,TWO_PI);
  //   p2 = {
  //     x:width/2+random(-width/2,width/2),
  //     y:height/2+random(-height/2,height/2)
  //   }
  //   n2++;
  //   if(n2>=20){
  //     n2=0;
  //   }
  //   push();
  //   translate(p1.x,p1.y);
  //   rotate(r1);
  //   image(img[n2],0,0);
  //   pop();
  // }

  // image(img[n1],p1.x,p1.y);
  // image(img[n2],p2.x,p2.y);
}