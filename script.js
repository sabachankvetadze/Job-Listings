import data from "./data.json" assert { type: "json" };

const list = document.querySelector(".filters");
const choose = document.querySelector(".removebutton");
const clearfilter = document.querySelector(".clear");

choose.style.display = "none";

const creatComponent = (tag, className, text, src, event, eventFc) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (src) {
    element.src = src;
  }
  if (text) {
    element.textContent = text;
  }
  if (event) {
    element[event] = () => {
      eventFc();
    };
  }
  return element;
};
let allArray = [];
function showButtons() {
  choose.innerHTML = "";
  for (let row = 0; row < allArray.length; row++) {
    const options = creatComponent("div", "option");
    const filCard = creatComponent("button", "filtercard", allArray[row]);
    const x = creatComponent("img", "remove", null, "./images/icon-remove.svg");
    options.append(filCard, x);
    choose.append(options, clearfilter);

    x.addEventListener("click", function () {
      allArray.splice(row, 1);
      showButtons();
      if (allArray.length === 0) {
        choose.style.display = "none";
      }
    //   allArray.map((allbtn)=>{
    //     if(allbtn=== btnall )
    //   })
     
      let filtered = arrayFilt();
      showCards(filtered);
    });
  }
}
clearfilter.addEventListener("click", () => {
  choose.style.display = "none";
  allArray = [];
  showButtons();
  showCards(data);
});

function showCards(cards) {
  list.innerHTML = "";
  for (let index = 0; index < cards.length; index++) {
    const {
      id,
      company,
      logo,
      new: recent,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = cards[index];

    const jobBox = creatComponent("div", "card");
    const photo = creatComponent("img", "cardphoto", null, logo);
    const compName = creatComponent("p", "take", company);
    const freshs = creatComponent("p", "fresh", "new");
    const feature = creatComponent("p", "featured", "featured");

    const member = creatComponent("div", "nefeatured");
    member.append(compName);
    if (recent) {
      member.append(freshs);
    }

    if (featured) {
      member.append(feature);
    }

    const positionElement = creatComponent("p", "developer", position);

    const time = creatComponent("div", "info");
    const day = creatComponent("p", "longevity", postedAt);
    const dot = creatComponent("div", "dot");
    const tense = creatComponent("p", "longevity", contract);
    const dots = creatComponent("div", "dot");
    const place = creatComponent("p", "longevity", location);
    time.append(day, dot, tense, dots, place);

    const line = creatComponent("div", "line");

    const allbutton = creatComponent("div", "buttonall");
    const roleS = creatComponent("button", "btnall", role);
    roleS.addEventListener("click", function () {
        let ro = allArray.includes(role)
        if(!ro){
            choose.style.display = "flex";
        allArray.push(role);
        showButtons();
        let filtered = arrayFilt();
        showCards(filtered); 
        }
    });

    const levels = creatComponent("button", "btnall", level);
    levels.addEventListener("click", function () {
    let lev = allArray.includes(level)
    if(!lev){
        choose.style.display = "flex";
    allArray.push(level);

    showButtons();
    let filtered = arrayFilt();
    showCards(filtered); 
    }
  
    
    });

    allbutton.append(roleS, levels);
    jobBox.append(photo, member, positionElement, time, line, allbutton);
    list.append(jobBox);

    for (let en = 0; en < languages.length; en++) {
      let lang = creatComponent("button", "btnall", languages);
      allbutton.append(lang);
      lang.textContent = languages[en];
      lang.addEventListener("click", function () {

         let eng = allArray.includes(languages[en])
        if(!eng){
            choose.style.display = "flex";
        allArray.push(languages[en]);
        showButtons();
        let filtered = arrayFilt();

        showCards(filtered); 
        }
      
        
      });
    }

    for (let t = 0; t < tools.length; t++) {
      let tool = creatComponent("button", "btnall", tools);
      allbutton.append(tool);
      tool.textContent = tools[t];

      tool.addEventListener("click", function () {
       eng = allArray.includes(tools[t])
        if(!eng){
            choose.style.display = "flex";
        allArray.push(tools[t]);

        showButtons();
        let filtered = arrayFilt();

        showCards(filtered); 
        }})
    }

    jobBox.append(photo, member, positionElement, time, line, allbutton);
    list.append(jobBox);
  }
}
showCards(data);
function arrayFilt() {
  let stayArray = data.filter((f) =>
    allArray.every(
      (same) =>
        f.role === same ||
        f.level === same ||
        f.languages.includes(same) ||
        f.tools.includes(same)
    )
  );
  return stayArray;
}
