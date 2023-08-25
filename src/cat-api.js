import axios from "axios";
const elem = {
    breedSelect: document.querySelector(".breed-select"),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}

// function fetchBreeds() {
//     // elem.loader.classList.remove(`loader`);
//     return axios.get("https://api.thecatapi.com/v1/breeds");
// }

function fetchBreeds() {
    // elem.loader.classList.remove('loader');
    return axios.get("https://api.thecatapi.com/v1/breeds")
    // .finally(() => {
    //     elem.loader.classList.add('loader');
    // });
}


function fetchCatByBreed(breedId) {
    let params = new URLSearchParams({
        breed_ids: breedId,
    });
    elem.loader.classList.remove('loader');
    return axios.get(`https://api.thecatapi.com/v1/images/search?${params}`).then((response) => {
        if (!response.data) {
            new Error(response.status);
        }
        else {
            return response.data[0];
        }
    })
        .finally(() => {
            elem.loader.classList.add('loader');
        });
}


export { fetchBreeds, fetchCatByBreed };



