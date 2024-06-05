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