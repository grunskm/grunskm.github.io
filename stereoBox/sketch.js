
let offset = 0;
let off_amt = 40;
let r = 200;
let timeSet;
let fov = 0.002;

let date = new Date(); 

let x,y;

let nums = [
0.00765, 0.00861, 0.00162, 0.00621, 0.00544, 0.00220, 0.00428, 0.00370, 0.00667, 
0.00691, 0.00781, 0.00882, 0.00750, 0.00244, 0.00867, 0.00420, 0.00260, 0.00468, 
0.00233, 0.00264];

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
  
  push();
		fill(255);
		noStroke();
		text("offset: "+offset,50,50);
		text("off_amt: "+off_amt,50,100);
		text("fov: "+round(fov,5),50,150);
		text("rad: "+r,50,200);
	pop();
}

function squiggle(X,Y,T,OFF){
  //ellipse(X,Y,sin(T*0.005)*10+60);
  
  let px;
  let py;
  
  for(let i=0;i<20;i++){
    
    let a = T*0.1+(i*15);//(i*sin(T*0.001)*10);
   // let k = i;
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
    
    let z = 100;
           //cos(a*nums[i+2])*r+r;//+
//         sin(a*nums[k+9])*r+
//         cos(a*nums[k+10])*r+
//         sin(a*nums[k+11])*r;
    
    let s = 1/(1+(z*fov));
    
    x = ((x+offset)*s)+X;
    y = (y*s)+Y;
    
    ellipse(x,y,50*s);
    
    push()
    fill(255);
    noStroke();
    text(i,x,y);
    pop();
    
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
  	fov += 0.0005;
  }else if(keyCode == 83){
  	//s
  	// adj fov
  	fov -= 0.0005;
  }else if( keyCode == 90){
  	//z
  	off_amt += 5;
  }else if(keyCode == 88){
    //x
  	off_amt -= 5;
  }
  
  return false;
}

function mousePressed(){
	resizeCanvas(windowWidth,windowHeight);
	x = width/2;
  y = height/2;
}
