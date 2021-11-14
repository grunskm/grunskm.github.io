
let clock = [clock0, clock1];
let fig;
let time;
let hour;
let min;
let sec;
let currentClock = 0;

function preload(){
  fig = loadJSON("chars.json");
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
  clock[currentClock]();
}

function clock0(){
  let size = height*0.1;
  let vert = height*1.85;
	let frq = 0.04;
	let amp = 0.09;
  background(20);

  push();
	translate(width*0.4,-height);

	if(sin(frameCount*frq)>0){
  	rotate(sin(frameCount*frq)*PI*amp);
	}

  if(hour.length==1){
    charDots(-1*size-size*0.2,vert,fig[hour[0]],size);
  }else{
    charDots(-2*size-size*0.2,vert,fig[hour[0]],size);
    charDots(-1*size-size*0.2,vert,fig[hour[1]],size);
  }
  if(frameCount%120<60){
    point(-size*0.1,vert+size*0.2);
    point(-size*0.1,vert+size*0.8);
  }
  if(min.length==2){
    charDots(0*size+size*0.2,vert,fig[min[0]],size);
    charDots(1*size+size*0.2,vert,fig[min[1]],size);
  }else{
    charDots(0*size+size*0.2,vert,fig[0],size);
    charDots(1*size+size*0.2,vert,fig[min[0]],size);
  }

  pop();
  push();
  translate(width*0.6,-height);
	if(sin(frameCount*frq)<0){
  	rotate(sin(frameCount*frq)*PI*amp);
	}
  if(time.getHours()>12){
    charDots(-size/2,vert,fig[11],size);//P
    charDots(size/2,vert,fig[10],size);//M
  }else{
    charDots(-size/2,vert,fig[12],size);//A
    charDots(size/2,vert,fig[10],size);//M
  }
  pop();
}

function clock1(){
  let size = height*0.1;
  let scale = 0.005;

	background(100);
  view(width*0.3,height/2,-30);
  view(width*0.7,height/2, 30);


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
        charRect(-s/2,-s*0.6,fig[hour[0]],s);
      }else{
        charRect(-s,-s*0.6,fig[hour[0]],s);
        charRect(0,-s*0.6,fig[hour[1]],s);
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
        charRect(-s,-s*0.6,fig[min[0]],s);
        charRect(0,-s*0.6,fig[min[1]],s);
      }else{
        charRect(-s,-s*0.6,fig[0],s);
        charRect(0,-s*0.6,fig[min[0]],s);
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
        charRect(-s,-s*0.6,fig[sec[0]],s);
        charRect(0,-s*0.6,fig[sec[1]],s);
      }else{
        charRect(-s,-s*0.6,fig[0],s);
        charRect(0,-s*0.6,fig[sec[0]],s);
      }

    pop();
  }
}

function updateTime(){
  time = new Date();
  hour = Array.from(String(time.getHours()%12), Number);
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

function mousePressed(){
	currentClock++;

	if(currentClock>=clock.length){
		currentClock=0;
	}

}



