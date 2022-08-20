let courses_list = document.querySelector(".coursesquare");
let content = " ";
const fetchCourses = async () => {
  let response = await fetch("http://localhost:3000/courses");
  let json = await response.json();
  return json;
};
function editSearch() {
  fetchCourses().then((x) => {
    x.forEach(coursesAppend);
  });
}

function coursesAppend(block) {
  let blockSection = document.createElement("section");
  blockSection.setAttribute("class", "courseBlock");
  let img = document.createElement("img");
  let courseName = document.createElement("h1");
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
  for (let i = rating; i <= 5; ++i) {
    let falseStar = document.createElement("span");
    falseStar.setAttribute("class", "fa fa-star");
    blockSection.append(falseStar);
  }
  blockSection.appendChild(price);
  let o = JSON.stringify(block.title);
  console.log(o);
  if (block.title.toLowerCase().search(content.toLowerCase()) != -1) {
    courses_list.appendChild(blockSection);
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
