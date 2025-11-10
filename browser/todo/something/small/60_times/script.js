
let click = [];
let count = 0;
let started = false;
let word = "click";
let length;

function loadSounds(){
	for(i=0;i<28;i++){
		click.push(new Audio("samples/click"+i+".mp3"));
	}
}
loadSounds();

window.onload = ()=>{
	let startbox = document.getElementById("startbox");
	startbox.addEventListener("click",start);
}
function start(){
		document.getElementById("startbox").setAttribute("style","display:none;");
		noCursor();
		countDown();
}

function countDown(){
	count++;
	if(count<4){
		word = 4-count;
	}else if(count>=4){
		word = VERBSVB[Math.floor(Math.random()*VERBSVB.length)];
		click[Math.floor(Math.random()*click.length)].play();
	}

	if(count<64){
		setTimeout(countDown,1000);
	}else{
		count = 0;
		setTimeout(()=>{
			word = "click";
			cursor();
			document.getElementById("startbox").setAttribute("style","display:block;");
		},3000);
	}
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	stroke(255,0,255);
	fill(255,0,255);
	textSize(20);
	if(width>height){
		length = height*0.3;
	}else{
		length = width*0.45;
	}
}

function draw(){
	translate(width/2,height/2);
	background(30);
	if(count>=4){
		rotate((6*(count-4)));
	}
	text(word,-length,0);
	line(0,0,-length+2,0);
}
