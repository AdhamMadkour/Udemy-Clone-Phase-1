let courses_list = document.querySelector(".carousel-inner");

let cardWrap = document.createElement("div");
let courseNumInWrapper = 0,
  page = 0;
let content = "Python";
let tabs = ["Python", "Excel", "Web", "JavaScript", "Data"];
const fetchCourses = async () => {
  let response = await fetch("http://localhost:3000/courses?name=python");
  let json = await response.json();
  // console.log(json);
  return json;
};
function editSearch() {
  courseNumInWrapper = 0;
  page = 0;
  courses_list.innerHTML = "";
  cardWrap.innerHTML = "";
  let styleCourse = document.createElement("style");
  let cssCode =
    ".courseBlock {width: 250px;height: 225px;margin: 0.25em;font-size: medium;display: block;background-color: white;} .courseBlock>img {  width: 240px;  height: 135px;} .courseBlock>h1,h4,h6 {  line-height: 15px; margin: 2px;} h4{ font-size: small;} h6{font-size:small;}";
  styleCourse.innerHTML = cssCode;
  courses_list.append(styleCourse);

  cardWrap.setAttribute("class", "cards-wrapper");
  let idx = 0;
  fetchCourses().then((x) => {
    x.forEach(coursesAppend);
    if (courseNumInWrapper >= 1 && courseNumInWrapper <= 4) {
      courseNumInWrapper = 0;
      console.log(cardWrap);
      if (page == 0) {
        let cara = document.createElement("div");
        cara.setAttribute("class", "carousel-item active");

        // cara.innerHTML = cardWrap.;
        cara.innerHTML =
          '<div class="cards-wrapper">' + cardWrap.innerHTML + "</div>";
        courses_list.appendChild(cara);

        cardWrap.innerHTML = "";
        page++;
      } else {
        let cara = document.createElement("div");
        cara.setAttribute("class", "carousel-item");

        cara.innerHTML =
          '<div class="cards-wrapper">' + cardWrap.innerHTML + "</div>";

        courses_list.appendChild(cara);
        console.log(cara);
        cardWrap.innerHTML = "";
        page++;
      }
    }
  });
}
function coursesAppend(block) {
  let blockSection = document.createElement("section");
  blockSection.setAttribute("class", "courseBlock");

  let card = document.createElement("div");
  card.setAttribute("class", "card");

  blockSection.setAttribute("id", "CB");
  let img = document.createElement("img");
  let courseName = document.createElement("h4");
  let instructorName = document.createElement("h6");
  let price = document.createElement("h4");
  img.setAttribute("src", block.image);
  courseName.innerHTML += block.title;
  instructorName.innerHTML += block.author;
  price.innerHTML += "$ " + block.price;
  let rating = block.rating;
  blockSection.appendChild(img);
  blockSection.appendChild(courseName);
  blockSection.appendChild(instructorName);
  for (let i = 1; i <= rating; i++) {
    let trueStar = document.createElement("span");
    trueStar.setAttribute("class", "fa fa-star checked");
    blockSection.append(trueStar);
  }
  for (let i = Math.floor(rating) + 1; i <= 5; ++i) {
    let falseStar = document.createElement("span");
    falseStar.setAttribute("class", "fa fa-star");
    blockSection.append(falseStar);
  }
  blockSection.appendChild(price);

  if (block.category.toLowerCase().search(content.toLowerCase()) != -1) {
    card.appendChild(blockSection);
    cardWrap.appendChild(card);
    // console.log("*****************");
    console.log(card);
    // console.log(cardWrap);
    courseNumInWrapper++;

    if (courseNumInWrapper == 4) {
      courseNumInWrapper = 0;

      if (page == 0) {
        let cara = document.createElement("div");
        cara.setAttribute("class", "carousel-item active");

        // cara.innerHTML = cardWrap.;
        cara.innerHTML =
          '<div class="cards-wrapper">' + cardWrap.innerHTML + "</div>";
        courses_list.appendChild(cara);

        //console.log(cara);
        cardWrap.innerHTML = "";
        page++;
      } else {
        let cara = document.createElement("div");
        cara.setAttribute("class", "carousel-item");

        cara.innerHTML =
          '<div class="cards-wrapper">' + cardWrap.innerHTML + "</div>";
        courses_list.appendChild(cara);
        console.log(cara);
        cardWrap.innerHTML = "";
        page++;
      }
    }
  }
}

const find = async () => {
  editSearch();
  searchInfo = document.getElementById("searchPlace");
  const searchClick = document.getElementById("searchButton");
  searchClick.addEventListener("click", (e) => {
    e.preventDefault();
    courses_list.innerHTML = "";
    content = searchInfo.value;
    editSearch();
  });
};

find();
for (let i = 0; i < tabs.length; ++i) {
  const tab_button = document.getElementById(tabs[i] + "-tab");
  tab_button.addEventListener("click", (x) => {
    for (let j = 0; j < tabs.length; ++j) {
      const li = document.getElementById(tabs[j] + "-tab");
      li.setAttribute("class", "nav-link");
    }

    tab_button.setAttribute("class", "nav-link active");

    console.log(tab_button);
    content = tabs[i];

    find();
    console.log("DONE 2");
  });
}
// json-server --watch courses.json
