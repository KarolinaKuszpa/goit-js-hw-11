import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const resultsContainer = document.getElementById('img-container');
const API_KEY = '36135104-b4eff6e01978aa2902705eb38';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-dev');

// Przechowuje wartość wpisaną do pola wyszukiwania oraz numer strony wyników
let searchQuery = '';
let page = 1;

// Funkcja obsługi zdarzenia wysłania formularza wyszukiwania
function searchFormSubmitEv(event) {
  event.preventDefault();
  page = 1;
  searchQuery = searchInput.value;
  fetchImages();
}

// Funkcja pobierająca i renderująca wyniki wyszukiwania
function fetchImages() {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      if (parseInt(data.totalHits) > 0) {
        render(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => console.log(error));
}

// Funkcja renderująca wyniki wyszukiwania
function render(hits) {
  resultsContainer.innerHTML = '';
  const lightbox = new SimpleLightbox('.img-look');

  hits.forEach(hit => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('photo-card');

    const imgLinkElement = document.createElement('a');
    imgLinkElement.classList.add('img-look');
    imgLinkElement.href = hit.webformatURL;
    imgLinkElement.title = hit.tags;

    const imgElement = document.createElement('img');
    imgElement.src = hit.webformatURL;
    imgElement.alt = hit.tags;
    imgElement.loading = 'lazy';

    imgElement.classList.add('photo-image');

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

    imgLinkElement.appendChild(imgElement);
    cardElement.appendChild(imgLinkElement);
    cardElement.appendChild(infoElement);

    resultsContainer.appendChild(cardElement);
  });

  lightbox.refresh();
}

searchForm.addEventListener('submit', searchFormSubmitEv);

// Początkowo przycisk powinien być ukryty
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

// Funkcja obsługi zdarzenia dla przycisku "Load more"
function loadMoreBtnClickEv() {
  page++;
  fetchImages();
}

// Funkcja aktualizująca widoczność przycisku "Load more" na podstawie całkowitej liczby wyników
function updateLoadMoreBtn(totalHits) {
  if (totalHits <= page * 40) {
    loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Funkcja pobierająca i renderująca wyniki wyszukiwania
function fetchImages() {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      if (parseInt(data.totalHits) > 0) {
        render(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        updateLoadMoreBtn(data.totalHits);
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });
}

// Funkcja obsługi zdarzenia wysłania formularza wyszukiwania
function searchFormSubmitEv(event) {
  event.preventDefault();
  page = 1;
  searchQuery = searchInput.value;
  fetchImages();
  loadMoreBtn.style.display = 'none';
}
