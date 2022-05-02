// Ude Import export (MANDATORY)
import {navbar} from "../components/navbar.js"

let navbar_div=document.querySelector("#navbar");
navbar_div.innerHTML=navbar();

const search = () => {
    window.location.href="search.html";
    let query=document.querySelector("#search_input").value;
    localStorage.setItem("query", JSON.stringify(query));
}

document.querySelector("#search_input").addEventListener("change",search);

let news=JSON.parse(localStorage.getItem("news"));

news.map(function ({heading, image, des}){
    let div=document.createElement("div");
        div.setAttribute("class", "news");
        
        let img=document.createElement("img");
        img.src=image;

        // let content_div=document.createElement("div");

        let h3=document.createElement("h3");
        h3.innerText=heading;

        let p=document.createElement("p");
        p.innerText=des;

        // content_div.append(h3,p);
        div.append(img,h3,p);
        // div.onclick= function (){
        //     showNews({title,urlToImage,description});
        // }

        document.querySelector("#detailed_news").append(div);
})