import axios from "axios";
const elem = {
    breedSelect: document.querySelector(".breed-select"),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}

function fetchBreeds() {
    elem.loader.hidden = false;
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .finally(() => {
            elem.loader.hidden = true;
        });
}

function fetchCatByBreed(breedId) {
    let params = new URLSearchParams({
        breed_ids: breedId,
    });
    elem.loader.hidden = false;
    return axios.get(`https://api.thecatapi.com/v1/images/search?${params}`).then((response) => {
        if (!response.data) {
            new Error(response.status);
        }
        else {
            return response.data[0];
        }
    })
        .finally(() => {
            elem.loader.hidden = true;
        });
}

export { fetchBreeds, fetchCatByBreed };



