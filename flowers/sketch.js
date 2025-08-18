

let flower_list = ["angela","barb","caro","caro_1","carol","david","deborah","douglas","emily","emma","everett","greg","hillary","jesse",
"john","jordan","krista","margie","mary_1","mary_jane","mary","matthis","meaghan","mystery","papa","patrick","phoebe",
"shosh","tanner","whitney","unknown_2","matthis_2","krista_2","tiger","boob","make","matthis_3","beverly","drew","drew_2","emma_2","emma_3",
"dahlia","tanner_2","carleigh","evan","robyn","frances","warren","jordan_2","rec","mary_3","mary_4","mary_5","unknown_3",
"test","matthis_4","mary_2","romie_2","unknown","anna","whitney_2"];

let drwg = [];

let k = 0;

function preload(){

	for(let i=0;i<flower_list.length;i++){
		drwg.push(loadJSON("flower data/00_"+flower_list[i]+".json"));
	}
	
}

function setup(){

	createCanvas(500,500);

	background(255);
	let margin = 1000;
	let x = margin;
	let y = margin*0.25;


}

function keyPressed(){
	if(keyCode==RIGHT_ARROW){
		k++;
	}
	if(k>=drwg.length){
		k=0;
	}
	clear();
	showFlower(drwg[k]);
	save("2_flower.png")
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
 //	 text(name,width*0.05,height*0.95);
  pop();
  

}