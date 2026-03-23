



//var init_data = fs.readFileSync('list.json');
var item_list = [
  {
    "item": "handstand for 30 mins",
    "mark": 4,
    "len": 3,
    "index": 0
  },
  {
    "item": "graduate before I'm 57",
    "mark": 5,
    "len": 3,
    "index": 1
  },
  {
    "item": "think about all the beds",
    "mark": 0,
    "len": 0,
    "index": 2
  },
  {
    "item": "cry",
    "mark": 4,
    "len": 0,
    "index": 3
  },
  {
    "item": "make the call",
    "mark": 5,
    "len": 1,
    "index": 4
  },
  {
    "item": "BOAT",
    "mark": 4,
    "len": 0,
    "index": 5
  },
  {
    "item": "TRANSFER CANNOLIS",
    "mark": 4,
    "len": 2,
    "index": 6
  },
  {
    "item": "Make a dentist appointment ",
    "mark": 5,
    "len": 4,
    "index": 7
  },
  {
    "item": "Email dad ",
    "mark": 4,
    "len": 0,
    "index": 8
  },
  {
    "item": "Get some Easter Eggs",
    "mark": 5,
    "len": 3,
    "index": 9
  },
  {
    "item": "Make a new mask",
    "mark": 2,
    "len": 2,
    "index": 10
  },
  {
    "item": "Eat a sandwich",
    "mark": 1,
    "len": 1,
    "index": 11
  },
  {
    "item": "Dust",
    "mark": 4,
    "len": 0,
    "index": 12
  },
  {
    "item": "Learn a new thing",
    "mark": 2,
    "len": 2,
    "index": 13
  },
  {
    "item": "Carry on",
    "mark": 3,
    "len": 0,
    "index": 14
  },
  {
    "item": "Walk the dog",
    "mark": 4,
    "len": 1,
    "index": 15
  },
  {
    "item": "LAUNDRY",
    "mark": 5,
    "len": 0,
    "index": 16
  },
  {
    "item": "Pick up eggs",
    "mark": 3,
    "len": 1,
    "index": 17
  },
  {
    "item": "Exercise",
    "mark": 5,
    "len": 0,
    "index": 18
  },
  {
    "item": "email crush",
    "mark": 4,
    "len": 1,
    "index": 19
  },
  {
    "item": "Sit in the sun",
    "mark": 0,
    "len": 0,
    "index": 20
  },
  {
    "item": "Etransfer ",
    "mark": 5,
    "len": 0,
    "index": 21
  },
  {
    "item": "procrastinate ",
    "mark": 2,
    "len": 1,
    "index": 22
  },
  {
    "item": "do nothing for 3 hours",
    "mark": 2,
    "len": 3,
    "index": 23
  },
  {
    "item": "imagine post covid world",
    "mark": 2,
    "len": 3,
    "index": 24
  },
  {
    "item": "remember pre covid world",
    "mark": 3,
    "len": 3,
    "index": 25
  },
  {
    "item": "drink water",
    "mark": 1,
    "len": 1,
    "index": 26
  },
  {
    "item": "feed starter",
    "mark": 5,
    "len": 1,
    "index": 27
  },
  {
    "item": "check promotions tab",
    "mark": 1,
    "len": 3,
    "index": 28
  },
  {
    "item": "stand in front of the fridge",
    "mark": 3,
    "len": 4,
    "index": 29
  },
  {
    "item": "develop the film",
    "mark": 2,
    "len": 2,
    "index": 30
  },
  {
    "item": "hug my kid",
    "mark": 3,
    "len": 1,
    "index": 31
  },
  {
    "item": "play",
    "mark": 2,
    "len": 0,
    "index": 32
  },
  {
    "item": "Play Minecraft ",
    "mark": 3,
    "len": 1,
    "index": 33
  },
  {
    "item": "Play piano",
    "mark": 3,
    "len": 1,
    "index": 34
  },
  {
    "item": "Play frisbee",
    "mark": 0,
    "len": 0,
    "index": 35
  },
  {
    "item": "start a new notebook",
    "mark": 0,
    "len": 0,
    "index": 36
  }
]

const MARKUP_BASE = "./markup_imgs";
let mark = [  //short, mid, long for each
  [ //blank = 0 (fallback uses bullet0; noting.png is not present locally)
    `${MARKUP_BASE}/bullet0.png`
  ],
  [//bullet = 1
    `${MARKUP_BASE}/bullet0.png`,
    `${MARKUP_BASE}/bullet1.png`,
    `${MARKUP_BASE}/bullet6.png`,
    `${MARKUP_BASE}/bullet2.png`,
    `${MARKUP_BASE}/bullet3.png`,
    `${MARKUP_BASE}/bullet4.png`,
    `${MARKUP_BASE}/bullet5.png`
  ],
  [ //star = 2 (fallback uses bullet set; star PNGs are not present locally)
    `${MARKUP_BASE}/bullet0.png`,
    `${MARKUP_BASE}/bullet1.png`,
    `${MARKUP_BASE}/bullet2.png`,
    `${MARKUP_BASE}/bullet3.png`,
    `${MARKUP_BASE}/bullet4.png`,
    `${MARKUP_BASE}/bullet5.png`,
    `${MARKUP_BASE}/bullet6.png`
  ],
  [//check = 3
    `${MARKUP_BASE}/check0.png`,
    `${MARKUP_BASE}/check1.png`,
    `${MARKUP_BASE}/check2.png`,
    `${MARKUP_BASE}/check3.png`,
    `${MARKUP_BASE}/check4.png`,
    `${MARKUP_BASE}/check5.png`,
    `${MARKUP_BASE}/check6.png`
  ],
  [//strike = 4
    `${MARKUP_BASE}/strike0.png`,
    `${MARKUP_BASE}/strike2.png`,
    `${MARKUP_BASE}/strike1.png`,
    `${MARKUP_BASE}/strike3.png`,
    `${MARKUP_BASE}/strike4.png`,
    `${MARKUP_BASE}/strike5.png`,
    `${MARKUP_BASE}/strike6.png`
  ],
  [//scratch = 5
    `${MARKUP_BASE}/scratch0.png`,
    `${MARKUP_BASE}/scratch1.png`,
    `${MARKUP_BASE}/scratch2.png`,
    `${MARKUP_BASE}/scratch3.png`,
    `${MARKUP_BASE}/scratch4.png`,
    `${MARKUP_BASE}/scratch5.png`,
    `${MARKUP_BASE}/scratch6.png`
  ]
];

window.onload = () => {
	for (let i = 0; i < item_list.length; i++) {
		addNew(item_list[i]);
	}
}

function addNew(data) {
  let big_list = document.getElementById("big_list");
  
  let div = document.createElement("DIV");
  div.setAttribute("class", "list_item");
  div.setAttribute("id",data.index);
  div.addEventListener("click", () => {
    selectItem(div);
  });
  big_list.appendChild(div);

  let img = document.createElement("IMG");
  img.setAttribute("src", mark[data.mark][data.len]);
  img.setAttribute("alt", "checkmark");
  img.setAttribute("id","mark"+data.index);
  img.setAttribute("z-index", "999");
  img.classList.add("checkmark");
  div.appendChild(img);

  let item = document.createElement("SPAN");
  item.setAttribute("class", "task");
  item.setAttribute("id","task"+data.index);
  item.innerText = data.item;
  div.appendChild(item);
}
