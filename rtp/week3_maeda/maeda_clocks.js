
let clock = [clock0, clock1];
let char;
let time;
let hour;
let min;
let sec;

function preload(){
  char = loadJSON("chars.json");
}

function setup(){
  createCanvas(windowHeight*1.4,windowHeight*0.8);
  updateTime();
  background(100);
  stroke(200);
}

function draw(){
  if(frameCount%30==0){
    updateTime();
  }

  background(100);
  clock[1]();
}

function clock0(){
  let size = height*0.1;
  let vert = height*1.85;

  translate(width/2,-height);
  push();
  rotate(sin(frameCount*0.025)*PI*0.05);

  if(hour.length==1){
    charDots(-1*size-size*0.2,vert,char[hour[0]],size);
  }else{
    charDots(-2*size-size*0.2,vert,char[hour[0]],size);
    charDots(-1*size-size*0.2,vert,char[hour[1]],size);
  }
  if(frameCount%120<60){
    point(-size*0.1,vert+size*0.2);
    point(-size*0.1,vert+size*0.8);
  }
  if(min.length==2){
    charDots(0*size+size*0.2,vert,char[min[0]],size);
    charDots(1*size+size*0.2,vert,char[min[1]],size);
  }else{
    charDots(0*size+size*0.2,vert,char[0],size);
    charDots(1*size+size*0.2,vert,char[min[0]],size);
  }

  pop();
  push();
  rotate(-1*sin(frameCount*0.025)*PI*0.05);
  if(time.getHours()>12){
    charDots(-size/2,vert,char[11],size);//P
    charDots(size/2,vert,char[10],size);//M
  }else{
    charDots(-size/2,vert,char[12],size);//A
    charDots(size/2,vert,char[10],size);//M
  }
  pop();
}

function clock1(){
  let size = height*0.1;
  let scale = 0.005;

  view(width*0.33,height/2,-30);
  view(width*0.66,height/2, 30);


  function view(X,Y,OFF){
    let x = X;
    let y = Y;
    let z;
    let s;
    let offset;

    push();
      z = 200;
      offset = 1/(1+z*scale)*OFF;
      s = size*(z*0.015);
      translate(x+offset,y);
      rotate(map(time.getHours(),0,24,0,TAU));
      fill(0);
      if(hour.length==1){
        charRect(0,-s*0.6,char[hour[0]],s);
      }else{
        charRect(-s,-s*0.6,char[hour[0]],s);
        charRect(0,-s*0.6,char[hour[1]],s);
      }
    pop();
    push();
      z = 100;
      offset = 1/(1+z*scale)*OFF;
      s = size*(z*0.015);
      translate(x+offset,y);
      rotate(map(time.getMinutes(),0,60,0,TAU));
      fill(255);
      if(min.length==2){
        charRect(-s,-s*0.6,char[min[0]],s);
        charRect(0,-s*0.6,char[min[1]],s);
      }else{
        charRect(-s,-s*0.6,char[0],s);
        charRect(0,-s*0.6,char[min[0]],s);
      }
    pop();
    push();
      z = 0;
      offset = 1/(1+z*scale)*OFF;
      s = size;
      translate(x+offset,y);
      rotate(map(time.getSeconds(),0,60,0,TAU));
      fill(255,0,0);
      point(0,0);
      if(sec.length==2){
        charRect(-s,-s*0.6,char[sec[0]],s);
        charRect(0,-s*0.6,char[sec[1]],s);
      }else{
        charRect(-s,-s*0.6,char[0],s);
        charRect(0,-s*0.6,char[sec[0]],s);
      }

    pop();
  }
}

function updateTime(){
  time = new Date();
  hour = Array.from(String(time.getHours()), Number);
  min = Array.from(String(time.getMinutes()), Number);
  sec = Array.from(String(time.getSeconds()), Number);
}
function charDots(X,Y,D,S){
  let data = D;
  let space = S/6;

  for(q=0;q<5;q++){
    for(a=0;a<7;a++){

      if(data[q*7+a]>0){
        let x = X+q*space;
        let y = Y+a*space;
        strokeWeight(space*0.6);
        point(x,y);
      }
    }
  }
}
function charRect(X,Y,D,S){
  let data = D;
  let space = S/6;

  for(q=0;q<5;q++){
    for(a=0;a<7;a++){

      if(data[q*7+a]>0){
        let x = X+q*space;
        let y = Y+a*space;
        noStroke();
        rect(x,y,space+1,space+1);
      }
    }
  }

}
