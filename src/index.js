import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

const resultsContainer = document.getElementById('img-container');
const API_KEY = '36135104-b4eff6e01978aa2902705eb38';
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const searchInput = document.getElementById('search-dev');

//przechowuje wartość wpisaną do pola wyszukiwania, // pierwsza strona wyników
let page = 1;

//zdarzenie wysyłania formularza wyszukiwania:
function searchFormSubmitEv(event) {
  event.preventDefault();
  page = 1;
  const searchQuery = searchInput.value;
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      if (parseInt(data.totalHits) > 0) {
        render(data.hits);
        console.log('działa');
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => {});
}

function render(hits) {
  resultsContainer.innerHTML = '';
  hits.forEach(hit => {
    const imgElement = document.createElement('img');
    imgElement.classList.add('img-look');
    imgElement.src = hit.webformatURL;
    imgElement.alt = hit.tags;
    imgElement.loading = 'lazy';
    const infoElement = document.createElement('div');
    infoElement.classList.add('info');
    const likesElement = document.createElement('p');
    likesElement.classList.add('info-item');
    likesElement.innerHTML = `<b>Likes:</b> ${hit.likes}`;
    const viewsElement = document.createElement('p');
    viewsElement.classList.add('info-item');
    viewsElement.innerHTML = `<b>Views:</b> ${hit.views}`;
    const commentsElement = document.createElement('p');
    commentsElement.classList.add('info-item');
    commentsElement.innerHTML = `<b>Comments:</b> ${hit.comments}`;
    const downloadsElement = document.createElement('p');
    downloadsElement.classList.add('info-item');
    downloadsElement.innerHTML = `<b>Downloads:</b> ${hit.downloads}`;
    infoElement.appendChild(likesElement);
    infoElement.appendChild(viewsElement);
    infoElement.appendChild(commentsElement);
    infoElement.appendChild(downloadsElement);
    const cardElement = document.createElement('a');
    cardElement.href = hit.imageURL;
    cardElement.classList.add('photo-card');
    cardElement.appendChild(imgElement);
    cardElement.appendChild(infoElement);
    resultsContainer.appendChild(cardElement);
  });
}

searchForm.addEventListener('submit', searchFormSubmitEv);
