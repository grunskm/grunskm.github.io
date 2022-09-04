poemList=[
  poem1,
  poem2,
  poem3,
  poem4,
  poem5,
  poem6,
  poem7,
  poem8,
  poem9,
  poem10,
  poem11
];
let p = 0;

window.onload = ()=>{

  let wrapper = document.getElementById("body");

  wrapper.addEventListener("click",()=>{

    let image = document.getElementById("backgroundimage");
    let poem = document.getElementById("poem");
    // image.setAttribute("src","images/2.jpg");
    let num = Math.floor(1+(Math.random()*50));
  //  console.log(num);
    image.setAttribute("src","images/"+num+".jpg");
    let newpoem = num+". "+poemList[p]();
    poem.innerText = newpoem;
    console.log(newpoem);

    p++;
    if(p>10){
      p=0;
    }

  });

}

// function fadeout(element){
//   if(element.style.opacity>0){
//     element.style.opacity+= -1;
//     fadeout(element);
//   }
// }

function random(wordArr){
  let i = Math.floor(Math.random()*(wordArr.length-1));
	let choice = wordArr[i];
  console.log(choice);
	return choice;
}

//poemsbelow

function poem1(){
	let poem = "Find the "+random(ADJECTIVES)+" "+random(NOUNS);
	return poem;
}

function poem2(){
	let poem = "Finish the "+random(NOUNS)+" in the morning";
	return poem;
}

function poem3(){
	let poem = "Try not to "+random(VERBSVB)+" again";
	return poem;
}

function poem4(){
	let poem = "If I see them tomorrow, remember to "+random(VERBSVB);
	return poem;
}

function poem5(){
	let poem = "Talk to them about "+random(VERBSVBG);
	return poem;
}

function poem6(){
	let poem = "Make sure to "+random(VERBSVB)+" the "+random(NOUNS);
	return poem;
}

function poem7(){
	let poem = "I wonder if I can "+random(VERBSVB)+" "+random(ADVERBSRB);
	return poem;
}

function poem8(){
	let poem = "Remember to pick up the "+random(NOUNS);
	return poem;
}

function poem9(){
	let poem = "Don't forget to "+random(VERBSVB)+" the "+random(NOUNSNN);
	return poem;
}

function poem10(){
	let poem = "Write about the "+random(ADJECTIVES)+" "+random(NOUNSNN);
	return poem;
}

function poem11(){
	let poem = "Maybe I'll have time for "+random(VERBSVBG);
	return poem;
}
