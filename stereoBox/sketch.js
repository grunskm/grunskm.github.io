
let offset = 0;
let off_amt = 40;
let r = 80;
let timeSet;
let fov = 0.002;

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
  
  squiggle(x,y,t);

}

function squiggle(X,Y,T,OFF){
  //ellipse(X,Y,sin(T*0.005)*10+60);
  
  let px;
  let py;
  
  for(let i=1;i<10;i++){
    
    let a = T*0.01;//(i*sin(T*0.001)*10);
    let k = i%nums.length;
    let x = 
        cos(a*nums[k+0])*r+
        sin(a*nums[k+1])*r+
        cos(a*nums[k+2])*r+
        sin(a*nums[k+3])*r;
    
    let y = 
        sin(a*nums[k+4])*r+
        cos(a*nums[k+5])*r+
        sin(a*nums[k+6])*r+
        cos(a*nums[k+7])*r;
    
    let z = 
        cos(a*nums[k+8])*r+
        sin(a*nums[k+9])*r+
        cos(a*nums[k+10])*r+
        sin(a*nums[k+11])*r;
    
    let s = 1/(1+(z+100)*fov);
    
    x = ((x+offset)*s)+X;
    y = (y*s)+Y;
    
    ellipse(x,y,50*s);
//     if(i!=0){
// 
//       line(px,py,x,y);
//     }
//     
//     px = x;
//     py = y;
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
  }else if(keyCode == 81){
  	//q
    offset  = -30;
  }else if(keyCode == 69){
  	//e
  	offset = 30;
  }else if(keyCode == 87){
  	//w
  	offset = 0;
  }else if(keyCode == 65){
  	//a
  	//adj fov
  	fov += 0.0001;
  }else if(keyCode == 83){
  	//s
  	// adj fov
  	fov -= 0.0001;
  }else if( keyCode == 90){
  	//z
  	r += 5;
  }else if(keyCode == 88){
    //x
  	r -= 5;
  }
  
  return false;
}

function mousePressed(){
	resizeCanvas(windowWidth,windowHeight);
	x = width/2;
  y = height/2;
}
