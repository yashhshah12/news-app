
import {getNewz} from './api.js'
import {getSavedArticle  , isArticleSaved ,addArticle ,removeArticle ,addArticlemultiple ,checkAllArticleSaved , removeAll} from './storage.js'
const cardGrid = document.getElementById("card-grid");
const categories = document.querySelectorAll("#categories button")
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pagenumber = document.getElementById("page-number");
const savedAll = document.getElementById("saved-all");
const pagination = document.getElementById("pagination");
let state = {
    region:"General",
    page:1,
    articles : [],
    isLoading: false,
}

async function loadNewz() {
    state.isLoading = true;
    showskeleton()
     pagenumber.textContent = `Page ${state.page}`
   
    if (state.region == "saved") {
          state.isLoading = false;
           pagination.style.display = "none";
          state.articles =  await getSavedArticle();

          renderNews();
    }else{
         pagination.style.display = "flex";
    state.articles = await getNewz(state.region , state.page);
    renderNews();
    }
}
function renderNews() {
    

     cardGrid.innerHTML = "";
     if (!state.articles || state.articles.length == 0) {
          cardGrid.innerHTML = `<p class= "error-message" >No news found.</p>`;
          return ;
     }
     state.articles.forEach((articledata , index)=> {      
        const saved = isArticleSaved(articledata.url);
        const btnclass = saved ? "remove-class" : "save-button"
        const btnText = saved ? "❌ Remove":"⭐ Save";
        const datacard = document.createElement("div");
        
        datacard.className = "card";
        datacard.innerHTML = `
                    <img src="${articledata.urlToImage}" alt="">
                 <div class="news-content">
                    <h3>${articledata.title}</h3>
                     <p>${articledata.description ? articledata.description.substring(0 ,100) + '...' : "No description found" }</p>
                    <div class="action-control">
                        <a href="${articledata.url }" target="_blank">Read more</a>
                        <button class="${btnclass}" onclick="toggleBookmark(${index})">${btnText}</button>
                    </div>
                        </div>              
                          `
            cardGrid.appendChild(datacard)
    });
    updateSaveAllButton();
}

categories.forEach(btn =>{
btn.addEventListener("click",()=>{
    categories.forEach(b =>{
        b.classList.remove("active");
    })
    btn.classList.add("active");
    state.region = btn.dataset.category;
    state.page = 1;
    loadNewz();
})
})
next.addEventListener("click",()=>{
       state.page++;
    loadNewz();

})
prev.addEventListener("click" , ()=>{
    if (state.page > 1) {
     state.page--;
   
        loadNewz()
    }
})


function showskeleton() {
   cardGrid.innerHTML = ""; 
    for(let i = 0 ; i < 6 ; i++){
        const aboutcard = document.createElement("div");
        aboutcard.className = "card skeleton-card";
         aboutcard.innerHTML = `
                <div class="skeleton skeleton-1"></div>
                <div class="skeleton-group">
                    <div class="skeleton skeleton-2" ></div>
                    <div class="skeleton skeleton-3"></div>
              </div>`
        
          cardGrid.appendChild(aboutcard)
    }

}
window.toggleBookmark = function (index) {
    const articel = state.articles[index];
    if (isArticleSaved(articel.url)) {
        removeArticle(articel.url);
        showMessage("Article removed from bookmarks", "error")
    }else{
         showMessage("Article saved to bookmarks", "success");
        addArticle(articel);
    }

    if (state.region == "saved") {
        loadNewz()
    }else{
        renderNews()
    }
    updateSaveAllButton();
}
savedAll.addEventListener("click",()=>{
   if (checkAllArticleSaved(state.articles)) {
        console.log( "This is the function is script.js " , state.articles);
        removeAll(state.articles);
        savedAll.textContent = "⭐ Save All"
          showMessage(" All Article removed from bookmarks", "error")
    }else{
        addArticlemultiple(state.articles);    
        savedAll.textContent = "❌ Remove"
         showMessage(" All Article saved to bookmarks", "success");
    }
    updateSaveAllButton();
    if (state.region == "saved") {
        loadNewz()
    }else{
        renderNews()
    }
})


function updateSaveAllButton() {
    // 1. Check if all articles on the current page are saved
    const allSaved = checkAllArticleSaved(state.articles);

    // 2. Update the button text based on the result
    if (allSaved) {
        savedAll.textContent = "❌ Remove All";
    } else {
        savedAll.textContent = "⭐ Save All";
    }
}
function showMessage(message , type) {
    const toastbox = document.getElementById("toast-box");
    const toast = document.createElement("div");
    toast.classList.add("toast");
    const icon = type ===  "success" ? "✅" : "🗑️";
    toast.innerHTML = `<span>${icon} </span> ${message} `;
    toastbox.appendChild(toast);

    setTimeout(() => {
        toast.remove()
    }, 3000);
}

loadNewz()