
let offset = 40;
let r = 50;
let timeSet;
let fov = 0.005;

let date = new Date(); 

let x,y;

let nums = [
0.007655058815766031, 0.00861935100356585, 0.001625494918899669, 0.006211573360531657, 0.005443251466642351, 0.002203401637627903, 0.004286729139140091, 0.003700400719641234, 0.006671704131174448, 0.00691153703028416, 0.007811381040041536, 0.008823331134931563, 0.007507301833880587, 0.002449936983379344, 0.008672932841651089, 0.004206434091959687, 0.002608380397041759, 0.004684579372486889, 0.002338168447174316, 0.002648575681496868];

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1);
  //stroke(222, 224, 65);
  stroke(255);
  strokeWeight(2);
  noFill();
  
  timeSet = date.getTime();
  x = width/2;
  y = height/2;
  
  for(let i=0;i<20;i++){
    nums.push(random(100,900)*0.00001);
    print(nums[i]);
  }
}

function draw() {
  background(0);
  
  let t = timeSet+millis();
  
  squiggle(x,y,t,offset);

}

function squiggle(X,Y,T,OFF){
  //ellipse(X,Y,sin(T*0.005)*10+60);
  
  let px;
  let py;
  
  for(let i=0;i<100;i++){
    
    let a = T+(i*5);//(i*sin(T*0.001)*10);
    
    let x = 
        cos(a*nums[0])*r+
        sin(a*nums[1])*r+
        cos(a*nums[2])*r+
        sin(a*nums[3])*r;
    
    let y = 
        sin(a*nums[4])*r+
        cos(a*nums[5])*r+
        sin(a*nums[6])*r+
        cos(a*nums[7])*r;
    
    let z = 
        cos(a*nums[8])*r+
        sin(a*nums[9])*r+
        cos(a*nums[10])*r+
        sin(a*nums[11])*r;
    
    let s = 1/(1+z*fov);
    
    x = ((x+OFF)*s)+X;
    y = (y*s)+Y;
    if(i!=0){

      line(px,py,x,y);
    }
    
    px = x;
    py = y;
  }

  
}

function keyPressed(){
  let sp = 10;
  if(keyCode==UP_ARROW){
    y -= sp;
  }else if(keyCode==DOWN_ARROW){
    y += sp;
  }else if(keyCode==LEFT_ARROW){
    x -= sp;
  }else if(keyCode==RIGHT_ARROW){
    x += sp;
  }else if(keyCode == 9){
    offset *= -1; //toggle left/right
    print(offset);
  }
  
  return false;
}

function mousePressed(){
	resizeCanvas(windowWidth,windowHeight);
	x = width/2;
  y = height/2;
}
