


let rects = []
let pov = -180;
let fov = 0.002;

function setup() {
  createCanvas(windowWidth, windowWidth/2);
  for(let i=1;i<5;i++){
    rects.push(new RECT(0,pov,pow(i*7,2),height));
  }
  noStroke();
}

function mousePressed() {

  
  background(255);
  //   random(255),
  //   random(255),
  //   random(255)
  // );
  push();
    translate(width*0.25,height/2);
    rotate(-PI/2);
    translate(0,-pov);
    for(let i=0;i<rects.length;i++){
      rects[i].recolour();
      rects[i].show();
    }
  pop();
  push();
    translate(width*0.75,height/2);
    rotate(PI/2);
    translate(0,-pov);
    for(let i=0;i<rects.length;i++){
      rects[i].show();
    }
  pop();
  // fill(0);
  // circle(width*0.25,height*0.5,2);
  // circle(width*0.75,height*0.5,2);

}

class RECT{
  constructor(X,Y,Z,S){
    this.pos = [
      {
        x:X-S/2,
        y:Y-S/2,
        z:Z
      },
      {
        x:X+S/2,
        y:Y-S/2,
        z:Z
      },
      {
        x:X+S/2,
        y:Y+S/2,
        z:Z
      },
      {
        x:X-S/2,
        y:Y+S/2,
        z:Z
      },
    ];
    this.col = [];
    this.recolour();
  }
  show(){
    fill(this.col);
    beginShape();
    for(let i = this.pos.length-1; i>=0; i--){
      let x = this.pos[i].x;
      let y = this.pos[i].y;
      let z = this.pos[i].z;
      
      let s = 1/(1+z*fov);
      
      vertex(x*s,y*s);  
    }
    endShape(CLOSE);
  }
  recolour(){
    this.col = color(
      random(255),
      random(255),
      random(255)
    );
  }
  
}

function keyPressed(){
  save("homage.jpg");
}







