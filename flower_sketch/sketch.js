let stage = 0;
let flower;
let curr_col;
let col_pick = [];
let init_coord;
let but_1, but_2, but_3;
let soil;
let canvas;

function setup(){
  canvas = createCanvas(400,400);
  let w = window.innerWidth;
  if(w < width){
    resizeCanvas(w,w);
  }
  canvas.parent('wrapper');
  canvas.elt.style.display = "none";
  curr_col = color(146, 181, 88);
  
  flower = new Flower();

  let x = width*0.0;
  let y = height*0.0;
  let s = width/7;
  
  col_pick.push(new colour_picker(x,y,s,s, color(146, 181, 88)));
  col_pick.push(new colour_picker(x,y+s*1,s,s, color(245, 223, 77)));
  col_pick.push(new colour_picker(x,y+s*2,s,s, color(195, 68, 122)));
  col_pick.push(new colour_picker(x,y+s*3,s,s, color(225, 93, 68)));
  col_pick.push(new colour_picker(x,y+s*4,s,s, color(232, 181, 206)));
  col_pick.push(new colour_picker(x,y+s*5,s,s, color(111, 159, 216)));
  col_pick.push(new colour_picker(x,y+s*6,s,s, color(52, 49, 72)));
  
}

function draw(){
  background(111, 141, 106);

  if(stage===0){
    // flower drawing
    flower.create();
    flower.show();
    for(let i=0;i<col_pick.length;i++){
      col_pick[i].show();
    }
  }else if(stage === 1){
    flower.show();    
  }
}

function touchStarted(){
  init_coord = {
    x: mouseX,
    y: mouseY
  }
  //return false;
}

function touchEnded(){
  if(flower.coord[flower.coord.length-1].x > -1){
    flower.coord.push({
      x:-1,
      y:-1,
      col: curr_col
    });  
  }else{
    for(let i=0;i<col_pick.length;i++){
      col_pick[i].click();
    }
  }
  //return false;
}

function touchMoved(){
  return false;
}

function mousePressed(){
  init_coord = {
    x: mouseX,
    y: mouseY
  }
}

function mouseClicked(){
  if(flower.coord[flower.coord.length-1].x > -1){
    flower.coord.push({
      x:-1,
      y:-1,
      col: curr_col
    });
    
  }else{
    for(let i=0;i<col_pick.length;i++){
      col_pick[i].click();
    }
  }
}

class Scroller{
  constructor(){
    
  }
  show(){
    translate(width*0.5,height*0.5);
    text( "",0,0);
    
  }
  scroll(){
    
  }
}


class Flower{
  constructor(){
    this.coord = [{x:-1, y:-1, col:curr_col}];
  }
  create(){
    ellipse(mouseX,mouseY,10,10);

    if(mouseIsPressed){
      let d = dist(init_coord.x,init_coord.y, mouseX, mouseY);
      if(d > 5){
        this.coord.push({
          x:mouseX,
          y:mouseY
        });
      }
      this.show();
    }
  }
  show(){
    
    push();
    noFill();
    strokeWeight(5);
    stroke(curr_col);
    beginShape();
    for(let i=0;i<this.coord.length; i++){
      let x = this.coord[i].x;
      let y = this.coord[i].y;
      if(x < 0){
        endShape();
        stroke(this.coord[i].col);
        beginShape();
      }else{
        vertex(x,y);
      }
    }
    endShape();
    pop();
    
  }
  erase_last(){
    let x = 0;
    
    while(x>=0){
      this.coord.pop();
      x = this.coord[this.coord.length-1].x;
    }
    flower.coord.pop();
    if(this.coord.length === 0){
      this.coord = [{x:-1, y:-1, col:curr_col}];
    }
  }
  erase_all(){
    this.coord = [{x:-1, y:-1, col:curr_col}];
  }
}

class colour_picker{
  constructor(X,Y,W,H,COL){
    this.x = X;
    this.y = Y;
    this.w = W;
    this.h = H;
    this.col = COL;
  }
  show(){
    strokeWeight(2);
    if((mouseX > this.x &&
     mouseY > this.y &&
    mouseX < this.x+this.w &&
    mouseY < this.y+this.h)||
      curr_col == this.col){
      stroke(255);
    }else{noStroke();}
    
    fill(this.col);
    rect(this.x,this.y,this.w,this.h);
  }
  click(){
    if(mouseX > this.x &&
       mouseY > this.y &&
      mouseX < this.x+this.w &&
      mouseY < this.y+this.h){
      curr_col = this.col;
      flower.coord[flower.coord.length-1].col = this.col;
      print(curr_col);
    }
  }
}



