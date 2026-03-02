

export const STORAGE_KEY = "newsdata";

export function getSavedArticle() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function isArticleSaved(url) {
    const saved = getSavedArticle();
    return saved.some(article => article.url == url);
}
export function addArticle(article) {
    const saved = getSavedArticle();
    if (!isArticleSaved(article.url)) {
        saved.push(article);
        localStorage.setItem(STORAGE_KEY , JSON.stringify(saved))
    }

}
export function removeArticle(url) {
 let remove = getSavedArticle();
    remove = remove.filter(c => c.url != url);
    localStorage.setItem(STORAGE_KEY , JSON.stringify(remove))
}
export function addArticlemultiple(articel){
    const saved = getSavedArticle();
    articel.forEach(element => {
        if (!isArticleSaved(element.url)) {
            saved.push(element);
        }

    });
    localStorage.setItem(STORAGE_KEY ,JSON.stringify(saved));
}
export function removeAll(articel) {
    console.log(articel  , "This is for articel remove");
    
     articel.forEach(element => {
        if (isArticleSaved(element.url)) {
            let remove = getSavedArticle();
           remove =  remove.filter(c => c.url != element.url);
           localStorage.setItem(STORAGE_KEY , JSON.stringify(remove));
        }

    });
}

export function checkAllArticleSaved(articelArray) {
    console.log("This is incoming articles:", articelArray);
    
    const saved = getSavedArticle();
    console.log("This is saved articles:", saved);
    
    // Check if EVERY article in the incoming array exists in the saved array
    const exists = articelArray.every(incomingArticle => {
        // For each incoming article, check if SOME article in 'saved' has the same URL
        return saved.some(savedArticle => savedArticle.url === incomingArticle.url);
    });
    // articelArray.forEach(element =>{
    //     const result = saved.some(c => c.url != element.url);
    //     if (result) {
    //         return true;
    //     }
    // })
   return exists


}
// Input: We receive the WHOLE object (Title, Image, URL)
