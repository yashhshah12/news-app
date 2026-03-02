const BASE_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = "2ec7cfc0618d4de18d05be339af8ec1b";

// 1. Create the empty filing cabinet
const apiCache = {}; 

export async function getNewz(region, page) {
    // 2. Create the label for the folder
    const cacheKey = `${region}_page_${page}`;

    // 3. THE BOUNCER: Check if we already have it
    if (apiCache[cacheKey]) {
        console.log(`⚡ Instant load! Found ${cacheKey} in cache.`);
        return apiCache[cacheKey]; // Hand it back instantly!
    }

    // 4. If not in cache, go to the internet
    try {
        console.log(`🌐 Fetching ${cacheKey} from API...`);
        const response = await fetch(`${BASE_URL}?category=${region}&pageSize=6&page=${page}&apiKey=${API_KEY}`);
        const article = await response.json();
        
        // 5. Check if we actually got articles
        if (article && article.articles) {
            // SAVE IT TO THE DRAWER FOR NEXT TIME!
            apiCache[cacheKey] = article.articles; 
            console.log( "This is cache memory data " , apiCache);
            
            return article.articles;
        } else {
            return [];
        }

    } catch (error) {
        console.log("No newz found", error);
        return [];
    }
}