// Use Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import {navbar} from "../components/navbar.js"

let navbar_div=document.querySelector("#navbar");
navbar_div.innerHTML=navbar();

const search = () => {
    window.location.href="search.html";
    let query=document.querySelector("#search_input").value;
    localStorage.setItem("query", JSON.stringify(query));
}

document.querySelector("#search_input").addEventListener("change",search);

// export {append};
const searchNews = async (country_id) => {
    document.querySelector("#results").innerHTML="";
    let res = await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=${country_id}`);
    let data= await res.json();
    let news=data.articles;
    // console.log('news:', news)
    
    news.map(function ({title,urlToImage,description,content}){
        let div=document.createElement("div");
        div.setAttribute("class", "news");
        
        let img=document.createElement("img");
        img.src=urlToImage;

        let content_div=document.createElement("div");

        let h3=document.createElement("h3");
        h3.innerText=title;

        let p=document.createElement("p");
        p.innerText=description;

        content_div.append(h3,p);
        div.append(img,content_div);
        div.onclick= function (){
            showNews({title,urlToImage,content});
        }

        document.querySelector("#results").append(div);
    })

}
searchNews("in");
function cSearch(){
    // console.log(this.id)
    searchNews(this.id)
}
// cSearch(this.id);
let sidebar=document.querySelector("#sidebar").children;
for(let el of sidebar){
    if(el.innerText!=="Countries")
    {
        el.addEventListener("click", cSearch);
    }
}

const showNews = ({title,urlToImage,content}) => {
    let obj={
        heading: title,
        image: urlToImage,
        des: content
    }
    let news=[];
    news.push(obj);

    localStorage.setItem("news", JSON.stringify(news));
    window.location.href="news.html"
}