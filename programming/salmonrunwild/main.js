var health = 10;
var canvas;
var highscore = 215;
var score = 0;
var stage = 0;
var zzz = 0;


var imgFish = [];
var imgFly;
var imgGull = [];
var imgDiving = [];
var imgFlying = [];


var bubbles = [];
var flies = [];
var roe = [];
var bottom = [];
var shore = [];
var numFlies = 3;
var numBottom = 10;
var sizeBottom;
var waterDepth;

var salmon, water, gull,start;

////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  canvas = createCanvas(800,600);
  textSize(32);

  //constant variables referencing canvas size
  waterDepth = ((height / 3) * 2);
  sizeBottom = width/numBottom;

  //generate fly objects in array
  for (i = 0; i < numFlies; i++) {
    flies.push(new flyObj());
  }
  //bottom objects in array
  for (i = 0; i<numBottom+2; i++){
    bottom.push(new bottomObj(i,0,-190));
  }
  //shore objects in array
    for (i = 0; i<numBottom+2; i++){
    shore.push(new shoreObj(i,0,-400));
  }
  // eggs in array
  for (i = 0; i<15; i++){
    roe.push(new roeObj(200,200,10));
  }
  //bubbles in array
  for(i=0; i<3;i++){
    bubbles.push(new bubbleObj());
  }
  //loading animation images for gull and fish
  for (var q = 0; q < 11; q++) {
    imgFish[q] = loadImage("assets/fish/fish" + [q] + ".png");
  }

  for(e = 0;e<2;e++){
    imgGull[e] = loadImage("assets/gull/gull"+[e]+".png")
  }

    for(e = 0;e<2;e++){
    imgDiving[e] = loadImage("assets/gull/diving"+[e]+".png")
  }

    for(e = 0;e<2;e++){
    imgFlying[e] = loadImage("assets/gull/flying"+[e]+".png")
  }

  //declare single objects
  gull = new gullObj();
  salmon = new Fish();
  water = new Water();
  start = new Start();
}

//////////////////////////////setup over////////////////////////draw below

function draw() {
  background(200);
  translate(0, height / 3);

  if (stage === 0) {
    start.display();
    if (keyIsPressed) {
      stage = 1;
    }
  } else if (stage == 1) {
/////////////////////////////////////////  display shore below
    for(e=0;e<numBottom+2;e++){
        if(shore[e].stage ===0){
          shore[e].there();
        } else if(bottom[e].stage ==1){
          shore[e].halt();
        }
      }
///////////////////////////////////////////display gull below
    if(bottom[0].z>-200 || health>5){
        if(gull.stage === 0){
          gull.floating();
          gull.collide();
            }else if(gull.stage == 1){
              gull.attack();
              gull.collide();
                 } else if(gull.stage ==2){
                    stage = 2;
      }
    }
/////////////////////////////////////////////////display salmon below

      for(i=0;i<3;i++){
        bubbles[i].rise();
        }
     salmon.display();


///////////////////////////////////////////////display bottom below

      for(e=0;e<numBottom+2;e++){
        if(bottom[e].stage ===0){

          bottom[e].there();
          bottom[e].collide();
        } else if(bottom[e].stage ==1){
          text("SUCCESS",300,0);
          bottom[e].halt();
          salmon.bob = 0;
          bottom[e].zzz++;
             if(bottom[e].zzz>500){
             stage=0;
             }
        }
      }

//////////////////////////////////////////// display roe below
    push();
      noStroke();
      translate(0,waterDepth);
      fill(255);
    if(bottom[0].z<-200){
      for(i=0;i<15;i++){
        if(roe[i].stage===0){
          roe[i].lay(bottom[0].x, bottom[0].z-bottom[0].size/2);
          roe[i].collide();
          if(bottom[0].x< 0 && floor(bottom[0].z)%5===0){
                  roe[i].up =0;
                  roe[i].stage = 0;
          }
        }else if(roe[i].stage==1){
          roe[i].lay(bottom[0].x, bottom[0].z-bottom[0].size/2);
          roe[i].fertilize();
                    if(bottom[0].x< 0){
                  roe[i].up =0;
                  roe[i].stage = 0;
                  roe[i].expand = 0
          }
        }
      }
    }
    // if(roe[12].hit){
    //   health -=1;
    //   this.up = 1000;
    // }
    pop();

      /////////////////////////////////////////// display flies below
      for (e = 0; e < numFlies; e++) {
        flies[e].flying();
        flies[e].collide();
      }
      water.display();
      SCORE();
     /////////////////////////////////////////// control below
      if (keyIsPressed && salmon.y >= 0 && salmon.y<waterDepth) {
        salmon.sinking();
      }else if (salmon.y < 0) {
        salmon.flying();
      } else if (salmon.y > 0) {
        salmon.bobbing();
      }

      if(health === 0){
        salmon.y += 1;
        salmon.bob = 0;
        text("SUCCESS",300,0);
      for(e=0;e<numBottom+2;e++){
        bottom[e].speed *= 0.99;

          bottom[e].halt();
          bottom[e].zzz++;
                if(bottom[e].zzz>500){
             stage=0;
        }
       }
      }


  }else if(stage == 2){
        for(e=0;e<numBottom+2;e++){
        shore[e].there();
        }
        gull.carry();
        salmon.caught();
        salmon.display();
        water.display();
        for(e=0;e<numBottom+2;e++){
        bottom[e].there();
        }
      SCORE();
      print(zzz);
      push();
      fill(255,150,150,map(salmon.y,200,-500,0,255));
      rect(0,-height/3,width,height);
      pop();
      }
}
