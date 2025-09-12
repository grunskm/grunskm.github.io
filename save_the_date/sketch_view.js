
let canvas;
let n = 0;
let flowers;

function preload(){
  flowers = loadJSON("M.E._flower.json");
}

function setup(){
  canvas = createCanvas(400,400);

  textSize(20);
}

function draw(){
  background(111, 141, 106);
  if(!flowers[n]){
    n=0;
  }
  showFlower(flowers);    
}

function mousePressed(){
  n++;
  print("next flower");
  if(keyCode==TAB){
    save(flowers, "new_flowers.json");
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


