import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

const API_KEY = '36135104-b4eff6e01978aa2902705eb38';

//Żądania http:
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
//przechowuje wartość wpisaną do pola wyszukiwania, // pierwsza strona wyników
let pageIndex = 1;

//zdarzenie wysyłania formularza wyszukiwania:

function searchFormSubmitEv(event) {
  event.preventDefault();
  page = 1;
  const searchQuery = searchInput.value;
  const URL =
    'https://pixabay.com/api/?key="+${API_KEY}+"&q="+encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`';
  fetch(URL)
    .then(response => {})
    .then(data => {})
    .catch(error => {});
}
