const API_KEY = "live_EiO9q0YpB8fImWcju9OuenAXLHNY91yxpi4G1nYfVSFa6Hu0bTaRGG2bJorXBMgB";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");


const inputEl = document.getElementById("breedSelect").value;
const url = `https://api.thecatapi.com/v1/breeds`
let inputData = "";
/**
* 4. Change all of your fetch() functions to axios!
* - axios has already been imported for you within index.js.
* - If you've done everything correctly up to this point, this should be simple.
* - If it is not simple, take a moment to re-evaluate your original code.
* - Hint: Axios has the ability to set default headers. Use this to your advantage
*   by setting a default header with your API key so that you do not have to
*   send it manually with all of your requests! You can also set a default base URL!
*/

axios.get(url)
.then(reponse => {
    console.log(response.data); // This is Axios response data being accessed
})
.catch(error => {
    console.log('Error', error);
});

async function initalLoad() {
    const breedSelect = document.getElementById("breedSelect");
    try{
        const reponse = await axios.get(url); 
        const breeds = response.data; 
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching cat breeds', error);
    }
}

const carousel = document.getElementById('carousel');

breedSelect.addEventListener('change', async function(event) {
    // Clearing up the carousel and infoDump
    carousel.innerHTML = '';
    infoDump.innerHTML = '';
    
    try {
        const breedId = event.target.value;
        const response = await axios.get(url);
        const data = response.json();
        data.forEach(image => {
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.breeds[0].name;
            carousel.appendChild(img);
        });

        const breedInfo = data[0];
        const title = document.createElement('h2');
        title.textContent = breedInfo.name;
        const description = document.createElement('p');
        description.textContent = breedInfo.description;
        const lifespan = document.createElement('p');
        lifespan.textContent = `Lifespan:${breedInfo.life_span}`;
        const temperament = document.createElement('p');
        temperament.textContent = `Temperament: ${breedInfo.temperament}`;

        infoDump.appendChild(title);
        infoDump.appendChild(description);
        infoDump.appendChild(lifespan);
        infoDump.appendChild(temperament);
    } catch (error) {
        console.error('Error fetching breed info:' , error);
    }
});

/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

// Adding a request interceptor 
axios.interceptors.request.use(function(config){
    // Logging whent he reuqest happens
    console.log('Request initiated at:' , new Date().toLocaleDateString());
return config;
}, function(error){
    return Promise.reject(error);
});

// Adding a reponse iterceptor
axios.interceptors.response.use(function(response){
    // Calculating the time taken for teh request-reponse cycle
    const reponseTime = new Date().getTime() - response.config.metadata.startTime;
    console.log('Reponse received in', reponseTime, 'milliseconds');
    return response;
}, function(error) {
    return Promise.reject(error);
});

breedSelect.addEventListener('change', async function(event){
    carousel.innerHTML = '';
    infoDump.innerHTML = '';

    try {
        const breedId = event.target.value;
    // storing teh start tiem of the request in the request's metadata
    const startTime = new Date().getTime();
    const response = await axios.get(url, {metadata: { startTime }});
    const data = response.data; // Accessing data property of response
    data.forEach(image => {
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.breeds[0].name;
        carousel.appendChild(img);
    });
    const breedInfo = data[0];
    const title = document.createElement('h2');
    title.textContent = breedInfo.name;
    const description = document.createElement('p');
    description.textContent = breedInfo.description;
    const lifespan = document.createElement('p');
    lifespan.textContent = `Lifespan:${breedInfo.life_span}`;
    const temperament = document.createElement('p');
    temperament.textContent = `Temperament: ${breedInfo.temperament}`;

    infoDump.appendChild(title);
    infoDump.appendChild(description);
    infoDump.appendChild(lifespan);
    infoDump.appendChild(temperament);
} catch (error) {
    console.error('Error fetching breed info:' , error);
    }
})

/** 
* 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

// Adding a request interceptor 
axios.interceptors.request.use(function(config){
    // Reseting the progress bar to 0%
    progressBar.style.width = '0%';
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response){
    // Calculating the time taken for teh request-reponse cycle
    const reponseTime = new Date().getTime() - response.config.metadata.startTime;
    console.log('Reponse received in', reponseTime, 'milliseconds');
    return response;
}, function(error) {
    return Promise.reject(error);
});

// Function to update the progress bar width based on the ProgreeEvent
function updateProgress(event){
    const progress = Math.round((event.loaded * 100) / event.total);
    console.log('Progress:' , progress);
    progressBar.style.width = `${progress}%`;
}

const progressBar = document.getElementById('progressBar');

breedSelect.addEventListener('change',  async function(event){
    carousel.innerHTML = '';
    infoDump.innerHTML = '';


        try {
            const breedId = event.target.value;
        // storing teh start tiem of the request in the request's metadata
        const startTime = new Date().getTime();
        const response = await axios.get(url, {metadata: { startTime }});
        const data = response.data; // Accessing data property of response
        data.forEach(image => {
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.breeds[0].name;
            carousel.appendChild(img);
        });
        const breedInfo = data[0];
        const title = document.createElement('h2');
        title.textContent = breedInfo.name;
        const description = document.createElement('p');
        description.textContent = breedInfo.description;
        const lifespan = document.createElement('p');
        lifespan.textContent = `Lifespan:${breedInfo.life_span}`;
        const temperament = document.createElement('p');
        temperament.textContent = `Temperament: ${breedInfo.temperament}`;
    
        infoDump.appendChild(title);
        infoDump.appendChild(description);
        infoDump.appendChild(lifespan);
        infoDump.appendChild(temperament);
    } catch (error) {
        console.error('Error fetching breed info:' , error);
        }
    });

    /**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */

    axios.interceptors.response.use(function(response){
        // Calculating the time taken for teh request-reponse cycle
        const reponseTime = new Date().getTime() - response.config.metadata.startTime;
        console.log('Reponse received in', reponseTime, 'milliseconds');
        // Then Removing the progress cursor style from the body element
        document.body.style.cursor ='auto';
        return reponse;
    }, function(eroor){
        // Removing the progress cursor style from the body element in case of error
        document.body.style.cursor = 'auto';
        return Promise.reject(error);
    });

/** 
    * 8. To practice posting data, we'll create a system to "favourite" certain images.
    * - The skeleton of this function has already been created for you.
    * - This function is used within Carousel.js to add the event listener as items are created.
    *  - This is why we use the export keyword for this function.
    * - Post to the cat API's favourites endpoint with the given ID.
    * - The API documentation gives examples of this functionality using fetch(); use Axios!
    * - Add additional logic to this function such that if the image is already favourited,
    *   you delete that favourite using the API, giving this function "toggle" functionality.
    * - You can call this function by clicking on the heart at the top right of any image.
    */

   export async function favourite(imgId) {
     try {
       // Checking if the image is already favorited by making a GET request to the favorite endpoint
       const response = await axios.get(`https://api.thecatapi.com/v1/favourites?image_id=${imgId}`);
       if (response.data.length > 0) {
           // If the image is already favorited, delete the favoriteusing the DELETE method
           await axios.delete(`https://api.thecatapi.com/v1/favourites/${response.data[0].id}`);
           console.log('Favorite removed successfully');
       } else {
           // If the image is not favorited, add it to favorites using the POST method 
           await axios.post(`https://api.thecatapi.com/v1/favorites`, { image_id: imgId});
           console.log('Image favorited successfully');
       }
     } catch (error) {
       console.log('Error favoriting image:' , error);
     }
   }


   /** 
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

// This fucntion gets all favorites from the cat API
export async function getFavourites() {
try {
    // Make a GET request to the favorites endpoint to retrieve all favorites
    const response = await axios.get(`https://api.thecatapi.com/v1/favourites?image_id=${imgId}`);
    return response.data; // Returning teh array of favorites
} catch (error) {
    console.error.apply('Error getting favorites:' , error);
    return[]; // Return empty array in case of error
    }
}
// Function to display favorites in the carousel
export async function displayFavorites() {
    const favorites = await getFavourites(); // gathering all favorites from the cat API
    carousel.innerHTML = ''; // Clearing it out
    // Going over the favorites and adding them to the carousel
    favorites.forEach(favorite => {
        const img = document.createElement('img');
        img.src = favorite.image.url;
        img.alt = favorite.image.breeds[0].name;
        carousel.appendChild(img);
    });
}

// Ensuring the binding of the event listener to a button
const getFavouritesBtn = document.getElementById('getFaouritesBtn');
getFavouritesBtn.addEventListener('click', displayFavorites);

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */

// FIN!!!
