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