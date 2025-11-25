// TODO: allow for on-the-fly rearranging of elements within page
// dragging frame + source + buttons to better locations

// limit sample area
// limit frame size when big
// limit frame rate?
// step forward + backwards
// frame position persists until src boundary is exceeded(add reset button?) 
// 


let capture;
let src_img;
let new_capture = true;
let icon = [];
let frame;

let pvw_y;
let pvw_x;
let st = 10;
let mod = false;
let margin = 20;

let col_0, col_1, col_2, col_3;

//buttons
let button = [];

function preload(){
  icon = [
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-01.svg?v=1741469257218"), //wp
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-03.svg?v=1741469257855"), //wm
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-02.svg?v=1741469257522"), //hp
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-04.svg?v=1741469258171"), //hm
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-05.svg?v=1741469258494"), //g_lt
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-07.svg?v=1741469259170"), //g_rt
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-06.svg?v=1741469258809"), //g_up
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-08.svg?v=1741469259497"), //g_dn
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-10.svg?v=1741469260178"),  //pl
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-11.svg?v=1741469260575"), //f_p
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-09.svg?v=1741469259821"), //f_m
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-12.svg?v=1741469260877"),
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-13.svg?v=1741472957278"), //save/download
   loadImage("https://cdn.glitch.global/5533276e-d4fb-4e62-8c52-7cd5e01d63f3/icon-14.svg?v=1741472957620")
  ];
}

function set_buttons(){
  
  let x = width*0.75;
  let y = height*0.75;
  let w = height*0.1;
  let h = floor(sqrt(2*pow(w,2)))/2;
  
 // buttonCol = color(100,200,100);
  
  button[0]  = new Button(capture.width+margin,height*0.85,w*1.5,w*1.5,"CAPTURE",col_0, icon[13]);//tog_src
  
  let xoff = -h*3;
  let yoff = h
  
  button[1]  = new Button(x+xoff+h,y+h,w,w,"WIDTH+",col_4,icon[0]);//add_w
  button[2]  = new Button(x+xoff-h,y+h,w,w,"WIDTH-",col_4,icon[1]);//sub_w
  button[3]  = new Button(x+xoff,y-h+h,w,w,"HEIGHT+",col_4,icon[2]);//add_h
  button[4]  = new Button(x+xoff,y+h+h,w,w,"HEIGHT-",col_4,icon[3]);//sub_h
  
  xoff = h*3;
  
  button[5]  = new Button(x+xoff+h,y+h,w,w,"XPOS +",col_4,icon[5]);//add_xpos
  button[6]  = new Button(x+xoff-h,y+h,w,w,"XPOS -",col_4,icon[4]);//sub_xpos
  button[7]  = new Button(x+xoff,y+h+h,w,w,"YPOS +",col_4,icon[7]);//add_ypos
  button[8]  = new Button(x+xoff,y-h+h,w,w,"YPOS -",col_4,icon[6]);//sub_ypos
  
  xoff = h;
  
  button[9]  = new Button(x,y-xoff/2,w/2,w/2,"CONTROL",col_4,icon[11]);//tog_prec
  button[10] = new Button(x,y+xoff,w,w,"PLAY",col_4,icon[8]);//tog_play
  button[11] = new Button(width*0.95,width*0.05,w/2,w/2,"SAVE",col_4,icon[12]);//start_download
  
  button[12] = new Button(x-h,y+xoff+h,w,w,"F PRV",col_4,icon[10]);
  button[13] = new Button(x+h,y+xoff+h,w,w,"F FWD",col_4,icon[9]);
 }

function setup() {
  createCanvas(windowWidth, windowHeight);
  focus();
 // fullscreen();
  frameRate(10);
  imageMode(CENTER);
  rectMode(CENTER);
  stroke(255,0,0);
  strokeWeight(1);
  noFill();
  
  col_0 = color(255,100,90);
  col_1 = color(255, 160, 122);
  col_2 = color(255, 215, 0);
  col_3 = color(0,200,189);
  col_4 = color(150,150,150);


let constraints = {
  audio: false,
  video: {
    facingMode: {
      exact: "environment"
    }
  }    
};
capture = createCapture(constraints);



  
  capture.hide();
  src_img = createImage(0,0);
  frame = new Frame();

  set_buttons();
}

function draw() {
  background(50);
  
  if(new_capture==true){
    image(capture,capture.width*0.5+20,capture.height*0.5+20);
  }else{
    image(src_img,src_img.width*0.5+20,src_img.height*0.5+20);
  }
  frame.show(width*0.75,src_img.height/2+margin);
  
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
  
  if(button[0].hit(x,y) && new_capture == true){
    src_img = capture.get();
    new_capture = false;
    frame.full_chop();
    recolour_control_buttons(col_2);
    recolour_transform_buttons(col_1);
    button[0].col = col_4;
  }else if(button[0].hit(x,y)){
    new_capture = true;
    src_img = createImage(0,0);
    frame.cell = [];
    recolour_control_buttons(col_4);
    recolour_transform_buttons(col_4);
    button[0].col = col_0;
  }
  
  if(new_capture==true){return}
  
  if(button[9].hit(x,y) && st == 10){ // alt or option
    st = 1;
    recolour_transform_buttons(col_3);
  }else if(button[9].hit(x,y)){ 
    recolour_transform_buttons(col_1);
    st = 10;
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
  
  if(button[12].hit(x,y)){
    if(frame.cell.length != (frame.rows*frame.cols) ){
     frame.full_chop(); 
    }
    frame.advance(-1);
  }else if(button[13].hit(x,y)){
    if(frame.cell.length != (frame.rows*frame.cols) ){
     frame.full_chop(); 
    }
    frame.advance(1);
  }
  
  if(button[11].hit(x,y)){
    //save_img();
  }
  
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
    if(frame.cell.length != (frame.rows*frame.cols) ){
     frame.full_chop(); 
    }
    frame.advance(1);
  }else if(keyCode==188){
    if(frame.cell.length != (frame.rows*frame.cols) ){
     frame.full_chop(); 
    }
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
    this.sc = 1;//(src_img.width/this.w)
    
   // this.chop();
  }
  show(X,Y){

    if(this.cell.length>0){
      image(this.cell[this.n].p,X,Y,frame.w*2,frame.h*2);

      for(let i=0;i<this.cell.length;i++){
        stroke(0,200,200);
        strokeWeight(1);
        let x = this.cell[i].x+this.w/2+margin;
        let y = this.cell[i].y+this.h/2+margin;
        rect(x,y,this.w,this.h);
        rect(X,Y,this.w*2,this.h*2);
      }
      stroke(255,0,0);
      strokeWeight(2);
      let x = this.cell[this.n].x+this.w/2+margin;
      let y = this.cell[this.n].y+this.h/2+margin;
      rect(x,y,this.w,this.h);
      rect(X,Y,this.w*2,this.h*2);
    }   
    this.advance(this.play);
  }
  half_chop(){
    if(src_img.width>0){
      print("half chop");
      this.cols = floor((src_img.width-this.x_inset)/this.w);
      this.rows = floor((src_img.height-this.y_inset)/this.h);
      //this.cell = [];
      //this.n = 0;
      let x = this.x_inset;
      let y = this.y_inset;
      this.cell[this.n] = {
        p:src_img.get(x,y,this.w,this.h),
        x:x,
        y:y
      };  
    }
  }
  full_chop(){
    if(src_img.width>0){
      print("full chop");
      if(this.h*this.sc > src_img.height){
        this.sc = src_img.height/3;
      }
      this.cols = floor((src_img.width-this.x_inset)/this.w);
      this.rows = floor((src_img.height-this.y_inset)/this.h);
      this.cell = [];
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
      if(this.n>=this.cell.length){
        this.n = 0;
      }
    }
  }
  adj_w(V){
    mod = true;
    this.w += V;
    this.n = 0;
    if(this.w<20){
      this.w = 20;
    }
    if(this.play == 0 && st != 10){
     this.full_chop();// this.half_chop(); // removed half chops due to grid confusion
    }else{
      this.full_chop();
    }
    print(this.w);
  }
  adj_h(V){
    mod = true;
    this.h += V;
    this.n = 0;
    if(this.h<20){
      this.h = 20;
    }
      if(this.play == 0 && st != 10){
       this.full_chop();// this.half_chop();
      }else{
        this.full_chop();
      }

    print(this.h);
  }
  adj_x_inset(V){
    mod = true;
    this.x_inset += V;
    this.n = 0;
    if(this.x_inset<0 || this.x_inset>src_img.width){
      this.x_inset = 0;
    }
    
    if(this.play == 0 && st != 10){
     this.full_chop();// this.half_chop();
    }else{
      this.full_chop();
    }
    
    print(this.x_inset);
  }
  adj_y_inset(V){
    mod = true;
    this.y_inset += V;
    this.n = 0;
    if(this.y_inset<0 || this.y_inset>src_img.height){
      this.y_inset = 0;
    }
    if(this.play == 0 && st != 10){
      this.full_chop();//this.half_chop();
    }else{
      this.full_chop();
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
    if(this.cell.length != this.rows*this.cols || mod == true){
      this.full_chop();
      this.n = 0;
      mod = false;
    }
    
    if(this.play==0){
      this.play = 1;
      button[10].col = col_1;
    }else{
      this.play = 0;
      button[10].col = col_2;
    }
  }
}

class Button{
  constructor(X,Y,W,H,TXT, COL, IMG){
    this.x = X;
    this.y = Y;
    this.w = W;
    this.h = H;
    this.col = COL;
    this.txt = TXT; 
    this.img = IMG;
  }
  show(){
    push();
    fill(this.col);
    translate(this.x,this.y);
    rotate(PI/4);
    rect(0,0,this.w-10,this.h-10);
    rotate(-PI/2);
    image(this.img,0,0,this.w-10,this.h-10);
    //fill(100);
    //text(this.txt,0-this.w*0.3,0);
    pop();
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

function recolour_transform_buttons(COL){
  button[1].col = COL;
  button[2].col = COL;
  button[3].col = COL;
  button[4].col = COL;
  button[5].col = COL;
  button[6].col = COL;
  button[7].col = COL;
  button[8].col = COL;
  button[9].col = COL;
}

function recolour_control_buttons(COL){
  button[10].col = COL;
  button[12].col = COL;
  button[13].col = COL;
 // button[11].col = COL;
}


function save_img(){
  
  if (src_img.width === 0 || src_img.height === 0) {
    console.log("No image captured.");
    return;
  }
  
  src_img.loadPixels();
  let imgDataURL = src_img.canvas.toDataURL("image/png"); // Base64 format

  // Prepare payload
  let pack = {
    img: imgDataURL,  // Base64 encoded image
    cols: frame.cols,
    rows: frame.rows,
    x_off: frame.x_inset,
    y_off: frame.y_inset,
    w: frame.w,
    h: frame.h,
    alt: "test image"
  };
  post("/save_img", pack);
  
}

function post(path, params, method='post') {

  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

