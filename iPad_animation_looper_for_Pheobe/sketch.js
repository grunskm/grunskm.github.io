let capture;
let src_img;
let new_capture = true;

let frame;

let pvw_y;
let pvw_x;
let st = 10;

//buttons
let button = [];

function set_buttons(){
  
  let x = width*0.6;
  let y = height*0.8;
  let w = 100;
  let h = w/2;
  
  button[0]  = new Button(width*0.1,height*0.9,w,h,"CAPTURE");//tog_src
  
  button[1]  = new Button(x+w,y+h,w,h,"WIDTH+");//add_w
  button[2]  = new Button(x,  y+h,w,h,"WIDTH-");//sub_w
  button[3]  = new Button(x+h,y,  w,h,"HEIGHT+");//add_h
  button[4]  = new Button(x+h,y+w,w,h,"HEIGHT-");//sub_h
  
  button[5]  = new Button(x+w*3,y+h,w,h,"XPOS +");//add_xpos
  button[6]  = new Button(x+w*2,y+h,w,h,"XPOS -");//sub_xpos
  button[7]  = new Button(x+w*2+h,y+h*2,w,h,"YPOS +");//add_ypos
  button[8]  = new Button(x+w*2+h,y,w,h,"YPOS -");//sub_ypos
  
  button[9]  = new Button(x+w+h,y,w,h,"CONTROL");//tog_prec
  button[10]  = new Button(x+w+h,y+h*2,w,h,"PLAY");//tog_play
  button[11]  = new Button(width*0.4,height*0.9,w,h,"SAVE (disabled)");//start_download
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  focus();
  frameRate(15);
  imageMode(CENTER);
  rectMode(CENTER);
  stroke(255,0,0);
  strokeWeight(1);
  noFill();

//   let constraints = {
//     audio: false,
//     video: {
//       facingMode: {
//         exact: "environment"
//       }
//     }    
//   };
//   capture = createCapture(constraints);

  capture = createCapture(VIDEO); // for laptop 
  
  
  capture.hide();
  src_img = createImage(0,0);
  frame = new Frame();

  set_buttons();
}

function draw() {
  background(50);

  if(new_capture==true){
    image(capture,width*0.25,height*0.5);
  }else{
    image(src_img,width*0.25,height*0.5);
  }
  frame.show(width*0.75,height/2);
  
  push();
    noStroke();
    for(let i=0;i<button.length;i++){
      button[i].show();
    }
  pop();
}

function touchStarted(){
  let x = mouseX;
  let y = mouseY;
  if(button[9].hit(x,y) && st == 10){ // alt or option
    st = 1;
  }else if(button[9].hit(x,y)){ st = 10;}
  
  if(button[0].hit(x,y) && new_capture == true){
    src_img = capture.get();
    new_capture = false;
    frame.full_chop();
  }else if(button[0].hit(x,y)){
    new_capture = true;
    src_img = createImage(0,0);
    frame.cell = [];
  }
  
  if(button[10].hit(x,y)){ // z key
    frame.togglePlayback();
  }
  
  if(button[8].hit(x,y)){// w key
    frame.adj_y_inset(-st);
  }else if(button[7].hit(x,y)){ //s key
    frame.adj_y_inset(st);
  }else if(button[5].hit(x,y)){// d key
    frame.adj_x_inset(st);
  }else if(button[6].hit(x,y)){//a key
    frame.adj_x_inset(-st);
  }
  
  if(button[2].hit(x,y)){
    frame.adj_w(-st);
  }else if(button[1].hit(x,y)){ 
    frame.adj_w(st);
  }else if(button[4].hit(x,y)){
    frame.adj_h(-st);
  }else if(button[3].hit(x,y)){
    frame.adj_h(st);
  }
  
  // if(keyCode==190){
  //   frame.advance(1);
  // }else if(keyCode==188){
  //   frame.advance(-1);
  // }
  
  return false;
  
}

function keyPressed(){

  if(keyCode==18 && st == 10){ // alt or option
    st = 1;
  }else if(keyCode == 18){ st = 10;}
  
  if(keyCode== SHIFT && new_capture == true){
    src_img = capture.get();
    new_capture = false;
    frame.full_chop();
  }else if(keyCode == SHIFT){
    new_capture = true;
    src_img = createImage(0,0);
    frame.cell = [];
  }
  
  if(keyCode==90){ // z key
    frame.togglePlayback();
  }
  
  if(keyCode==87){// w key
    frame.adj_y_inset(-st);
  }else if(keyCode==83){ //s key
    frame.adj_y_inset(st);
  }else if(keyCode==68){// d key
    frame.adj_x_inset(st);
  }else if(keyCode==65){//a key
    frame.adj_x_inset(-st);
  }
  
  if(keyCode==LEFT_ARROW){
    frame.adj_w(-st);
  }else if(keyCode==RIGHT_ARROW){ 
    frame.adj_w(st);
  }else if(keyCode==UP_ARROW){
    frame.adj_h(-st);
  }else if(keyCode==DOWN_ARROW){
    frame.adj_h(st);
  }
  
  if(keyCode==190){
    frame.advance(1);
  }else if(keyCode==188){
    frame.advance(-1);
  }
  
  return false;
}

class Frame{
  constructor(){
    this.x_inset = 0;
    this.y_inset = 0;
    this.w = 60;
    this.h = 40;
    this.cols = 0;
    this.rows = 0;
    this.cell = [];
    this.n = 0;
    this.play = 0;
    
   // this.chop();
  }
  show(X,Y){

    if(this.cell.length>0){
      image(this.cell[this.n].p,X,Y,frame.w*4,frame.h*4);

      let x = this.cell[this.n].x+width*0.25-src_img.width*0.5+this.w/2;
      let y = this.cell[this.n].y+height/2-src_img.height/2+this.h/2;
      rect(x,y,this.w,this.h);
      rect(X,Y,this.w*4,this.h*4);
    }
    this.advance(this.play);
  }
  half_chop(){
    if(src_img.width>0){
      print("half chop");
      this.cols = floor((src_img.width-this.x_inset)/this.w);
      this.rows = floor((src_img.height-this.y_inset)/this.h);
      this.cell = [];
      this.n = 0;
      let x = this.x_inset;
      let y = this.y_inset;
      this.cell.push({
        p:src_img.get(x,y,this.w,this.h),
        x:x,
        y:y
      });  
    }
  }
  full_chop(){
    if(src_img.width>0){
      print("full chop");
      this.cols = floor((src_img.width-this.x_inset)/this.w);
      this.rows = floor((src_img.height-this.y_inset)/this.h);
      this.cell = [];
      this.n = 0;
      for(let row = 0; row<this.rows; row++){
        for(let col = 0; col<this.cols; col++){
          let x = col*this.w+this.x_inset;
          let y = row*this.h+this.y_inset;
          this.cell.push({
            p:src_img.get(x,y,this.w,this.h),
            x:x,
            y:y
          });
        }
      }
    }
  }
  adj_w(V){
    this.w += V;
    if(this.w<20){
      this.w = 20;
    }
    this.n = 0;
    if(this.play == 0){
      this.half_chop();
    }else{
      this.full_chop();
    }
    print(this.w);
  }
  adj_h(V){
    this.h += V;
    if(this.h<20){
      this.h = 20;
    }
    this.n = 0;
      if(this.play == 0){
        this.half_chop();
      }else{
        this.full_chop();
      }

    print(this.h);
  }
  adj_x_inset(V){
    this.x_inset += V;
    if(this.x_inset<0 || this.x_inset>src_img.width){
      this.x_inset = 0;
    }else{
      this.n = 0;
      if(this.play == 0){
        this.half_chop();
      }else{
        this.full_chop();
      }
    }
    print(this.x_inset);
  }
  adj_y_inset(V){
    this.y_inset += V;
    if(this.y_inset<0 || this.y_inset>src_img.height){
      this.y_inset = 0;
    }else{
      this.n = 0;
      if(this.play == 0){
        this.half_chop();
      }else{
        this.full_chop();
      }
    }
    print(this.y_inset);
  }
  advance(V){
    if(this.cell.length!=0){
      this.n += V;
      if(V>0 && this.n>=this.cell.length){
        this.n = 0;
      }else if(V<0 && this.n<0){
        this.n = this.cell.length-1;
      }
    }
    // account for playing frames backwards
  }
  togglePlayback(){
    if(this.play==0){
      this.play = 1;
      this.full_chop();
    }else{
      this.play = 0;
    }
  }
}

class Button{
  constructor(X,Y,W,H,TXT){
    this.x = X;
    this.y = Y;
    this.w = W;
    this.h = H;
    this.txt = TXT; 
  }
  show(){
    fill(200);
    rect(this.x,this.y,this.w-10,this.h-10);
    fill(100);
    text(this.txt,this.x-this.w*0.3,this.y);
  }
  hit(X,Y){
    if(
      X>this.x-this.w/2 &&
      Y>this.y-this.h/2 &&
      X<this.x+this.w/2 &&
      Y<this.y+this.h/2
    ){
      return true
    }else{return false}
  }
}


