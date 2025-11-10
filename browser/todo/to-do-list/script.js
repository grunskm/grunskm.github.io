



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

let mark = [  //short, mid, long for each
  [ //blank = 0
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fnoting.png?v=1615787382990"
  ],
  [//bullet = 1
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fbullet0.png?v=1616017934945",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fbullet1.png?v=1616017937445",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fbullet6.png?v=1616017958262",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fbullet2.png?v=1616017940286",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fbullet3.png?v=1616017942794",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fbullet4.png?v=1616017945918",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fbullet5.png?v=1616017952404"
  ],
  [ //star = 2
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstar0.png?v=1616009907523",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstar1.png?v=1616009904238",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstar2.png?v=1616009901345",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstar0.png?v=1616009907523",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstar1.png?v=1616009904238",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstar2.png?v=1616009901345",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstar0.png?v=1616009907523"
  ],
  [//check = 3
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fcheck0.png?v=1616018415785",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fcheck1.png?v=1616018418087",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fcheck2.png?v=1616018420700",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fcheck3.png?v=1616018423920",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fcheck4.png?v=1616018426510",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fcheck5.png?v=1616018428631",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fcheck6.png?v=1616018432015"
  ],
  [//strike = 4
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstrike0.png?v=1616020188184",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstrike2.png?v=1616019905174",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstrike1.png?v=1616019899063",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstrike3.png?v=1616019906379",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstrike4.png?v=1616019909920",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstrike5.png?v=1616019913259",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fstrike6.png?v=1616019916524"
  ],
  [//scratch = 5
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fscratch0.png?v=1616020195508",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fscratch1.png?v=1616019713310",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fscratch2.png?v=1616019717084",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fscratch3.png?v=1616019728836",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fscratch4.png?v=1616019737535",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fscratch5.png?v=1616019741566",
    "https://cdn.glitch.com/d05e28c5-9791-419b-a321-6112658ecf53%2Fscratch6.png?v=1616019745669"
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