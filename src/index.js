import SlimSelect from 'slim-select';
import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const elem = {
    breedSelect: document.querySelector(".breed-select"),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}
axios.defaults.headers.common["x-api-key"] = "live_PWrSv0OvGndMIxe7FqSVXuoADmkBJg2KRNn3xb0A0aYxxUKLCyoAetLUTLYtelqi";
fetchBreeds()
    .then(response => {
        elem.breedSelect.insertAdjacentHTML('beforeend', createMarkup(response.data));
        new SlimSelect({
            select: elem.breedSelect,
            settings: {
                searchPlaceholder: 'what kind of kitty do you want?'
            }
        });
    })
    .catch(error => {
        Notiflix.Notify.failure('OOPS...kitty ran away');
    });
elem.breedSelect.addEventListener('change', function (event) {
    const breedId = event.currentTarget.value;
    console.log('Breed ID:', breedId);
    fetchCatByBreed(breedId)
        .then(data => {
            console.log(data);
            createMarkupDescription(data);
        })
        .catch(error => {
            Notiflix.Notify.failure('OOPS...kitty ran away');
        });
});

function createMarkupDescription(data) {
    const breedInfo = data.breeds[0];
    const img = {
        url: data.url,
        alt: breedInfo.name,
    };
    const markup = `
        <div class="card">
            <img src="${img.url}" alt="Cat breed ${img.alt}" class="image">
            <div class="description">
                <h2 class="header">${breedInfo.name}</h2>
                <p class="text">${breedInfo.description}</p>
                <p class="text"><b>Temperament:</b> ${breedInfo.temperament}</p>
            </div>
        </div>
    `;
    elem.catInfo.innerHTML = markup;
}

function createMarkup(arr) {
    return arr.map(({ id, name }) => `<option value="${id}">${name}</option>`).join(``)
}




