const API_KEY = "live_EiO9q0YpB8fImWcju9OuenAXLHNY91yxpi4G1nYfVSFa6Hu0bTaRGG2bJorXBMgB";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");


const inputEl = document.getElementById("breedSelect").value;
const url = `https://api.thecatapi.com/v1/breeds`
let inputData = "";

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
        lifespan.textContent = `Lifespan:${breedInfo,life_span}`;
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