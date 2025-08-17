

let flower_list = ["angela","barb","caro","caro_1","carol","david","deborah","douglas","emily","emma","everett","greg","hillary","jesse",
"john","jordan","krista","margie","mary_1","mary_jane","mary","matthis","meaghan","mystery","papa","patrick","phoebe",
"shosh","tanner","whitney"];

let drwg = [];

let k = 0;

function preload(){

	for(let i=0;i<flower_list.length;i++){
		drwg.push(loadJSON("flower data/00_"+flower_list[i]+".json"));
	}
	
}

function setup(){

	createCanvas(7200,3600);

	background(255);
	let margin = 1800;
	let x = margin;
	let y = margin*0.25;

	for(let i=0;i<flower_list.length;i++){
		push();

			translate(x-250,y);
			showFlower(drwg[i]);
			x += 500;
			if(x > width-margin){
				y += 500;
				x = margin; 
			}
		pop();
	}
}

function keyPressed(){
	if(keyCode==DOWN_ARROW){
		save("flowers.png");
	}
}

function draw(){
}

class Drawing{

constructor(){
}

show(){

}

draw(){

}
}


function  showFlower(flower){
  let name = flower.name;
  let coord = flower.coords;

  push();
  noFill();
  strokeWeight(5);
  beginShape();
  for(let i=0;i<coord.length; i++){
    let x = coord[i].x;
    let y = coord[i].y;
    if(x < 0){
      endShape();
      stroke(coord[i].col.levels);
      beginShape();
    }else{
      vertex(x,y);
    }
  }
  endShape();
  fill(255);
  noStroke();
  text(name,width*0.05,height*0.95);
  pop();
  

}