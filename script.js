let courses_list = document.querySelector(".coursesquare");
const fetchCourses = async () => {
    let response = await fetch("http://localhost:3000/courses");
    let json = await response.json();
    return json;
};

fetchCourses().then((x) => {
    x.forEach(coursesAppend);
});
function coursesAppend(block){
    let blockSection=document.createElement("section");
   // blockSection.className="coursesquare";
    blockSection.setAttribute("class","courseBlock");
    let img=document.createElement("img");
    let courseName=document.createElement("h1");
    let instructorName=document.createElement("h6");
    let price=document.createElement("h4");
    img.setAttribute("src",block.image);
    courseName.innerHTML+=block.title;
    instructorName.innerHTML+=block.author;
    price.innerHTML+="$ "+block.price;
    let rating = block.rating;
    blockSection.appendChild(img);
    blockSection.appendChild(courseName);
    blockSection.appendChild(instructorName);
    for (let i=1;i<=rating;i++){
        let trueStar=document.createElement("span");
        trueStar.setAttribute("class","fa fa-star checked");
        blockSection.append(trueStar);
        
    }
    for (let i=rating;i<=5;++i){
        let falseStar=document.createElement("span");
        falseStar.setAttribute("class","fa fa-star");
        blockSection.append(falseStar);
    }
    blockSection.appendChild(price);
    courses_list.appendChild(blockSection);
}