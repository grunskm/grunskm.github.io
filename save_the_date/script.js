
let i = 0;


let info = {
  attend: "",
  names: [],
  bike: "",
  note: ""
};

function nextMessage(){

  const messages = document.querySelectorAll(".message");
  if(i < messages.length-1){
    messages[i].classList.add("hidden");
    i++;
    messages[i].classList.remove("hidden");
  } 
}

function noMessage(){
  const messages = document.querySelectorAll(".message");
  const noMessage = document.querySelector(".no");
  console.log(noMessage);
  if(i < messages.length-1){
    messages[i].classList.add("hidden");
    noMessage.classList.remove("hidden");
  } 
}


function addName(){
  let name = document.getElementById('input_name');
  info.names.push(name.value);
  document.getElementById('name').innerText = info.names[0];
  name.value = "";
}
function addNameNo(){
  let name = document.getElementById('input_name_no');
  info.names.push(name.value);
  document.getElementById('name').innerText = info.names[0];
  name.value = "";
  document.getElementById("button_no").classList.add("hidden");
  document.getElementById("input_name_no").classList.add("hidden");
  document.getElementById("console").classList.add("hidden");
  document.getElementById("all_done").classList.remove("hidden");
  document.getElementById("whats_your_name").innerHTML = "Thanks for letting us know, "+info.names[0]+"."+"<br>"+"We hope to see you soon!";
}

function addGuest(){
  let guestName = document.getElementById("input_guest");
  info.names.push(guestName.value);
  console.log(info.names);

  let guest = document.createElement("div");
  let list = document.getElementById("guestList");
  
  guest.innerText = guestName.value;
  list.appendChild(guest);
  list.classList.remove("hidden");
  
  guestName.value = "";
  
  document.getElementById("solo").classList.add("hidden");
  document.getElementById("group").classList.remove("hidden");
}

function addNote(){
  let note = document.getElementById('input_note');
  info.note = note.value;
  console.log(info.note);
  note.value = "";
}

function sendInfo(){
  //console.log(info);
  post("/", info);
}

function post(path, params, method='post') {

  const form = document.createElement('form');
  form.method = method;
  form.action = path;


  const hiddenField = document.createElement('input');
  hiddenField.type = 'hidden';
  hiddenField.name = 'data';
  hiddenField.value = JSON.stringify(params);

  form.appendChild(hiddenField);

  document.body.appendChild(form);
  form.submit();
}