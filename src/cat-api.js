import axios from "axios";

function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds");
}

function fetchCatByBreed(breedId) {
    let params = new URLSearchParams({
        breed_ids: breedId,
    });
    return axios.get(`https://api.thecatapi.com/v1/images/search?${params}`).then((response) => {
        if (!response.data) {
            new Error(response.status);
        }
        else {
            return response.data[0];
        }
    })
}


export { fetchBreeds, fetchCatByBreed };



