var canvas;
var count =0;
var notoReg;
var notoItal;
var img =[];
var n = 0;
var slide;
var backButton;
var nutton;


var title = [ 
"Sacs a Ordures",
"Computer Drawing of a New Painting",
"XX_Flowers_XX",
"Gumdrops",
"Dark Square",
"Neves",
"Focus Holes",
"Excess",
"DGYHU",
"Oh Baby",
"Jacks"
];
var caption = [
"Plaster, tissue paper, ink",
"Plaster, paper towel, ink",
"Plaster, decorated napkin, oil paint",
"Plaster, paper towel, ink",
"Plaster, toilet paper, ink",
"Plaster, paper towel, ink",
"Plaster, decorated napkin, oil paint",
"Plaster, paper towel, ink",
"Plaster, toilet paper, ink",
"Plaster, decorated napkin, ink, oil paint",
"Plaster, tissue paper, acrylic paint, ink",
]

function preload(){
 img[0] = loadImage("assets/image0.jpg");
 notoReg = loadFont("NotoSans-Regular.ttf");
 notoItal = loadFont("NotoSans-Italic.ttf");
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  slide = new Slide();
  textSize(20);
  imageMode(CENTER);
  slide.loadImg();
  resize();
}

function draw(){
  count++;
}

function mouseMoved(){
  slide.display();
  backButton.display();
  nextButton.display();
}

function mousePressed(){
	nextButton.click();
	backButton.click();
	backButton.display();
    nextButton.display();
}

window.onresize = function(){
resize();
}

//||||||||||||||||||||||||||||||||||||||||||||| main loop above

