import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from './commponents/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPictures } from './commponents/API';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let page = 0;
let request = '';
let lightbox = null;

searchForm.addEventListener('submit', showPictures);
loadMoreButton.addEventListener('click', loadMore);
loadMoreButton.classList.add('is-hidden');

function showPictures(e) {
    e.preventDefault();
    galleryContainer.innerHTML = '';
    loadMoreButton.classList.add('is-hidden');

    const {elements: { searchQuery }} = e.currentTarget;
    request = searchQuery.value.trim();
    page = 1;

    if (request === '') return;

    getPictures(request, page)
    .then(({hits, totalHits}) => {
        if (hits.length === 0) {
            throw new Error ('Not found.');
        } else {
            loadMoreButton.classList.remove('is-hidden');
            if (hits.length !== 40) loadMoreButton.classList.add('is-hidden');
            Notify.success(`Hooray! We found ${totalHits} images.`);
            return hits;
        }
    })
    .then(hits => {
        galleryContainer.innerHTML = hits.map(hit => createMarkup(hit)).join('');
        lightbox = new SimpleLightbox('.gallery a');
        page += 1;
    })
    .catch(requestError);   
}

function loadMore() {
    getPictures(request, page)
    .then (({hits}) => {
        if (hits.length !== 40) {
            Notify.info(`We're sorry, but you've reached the end of search results.`);
            loadMoreButton.classList.add('is-hidden');
        }
        galleryContainer.insertAdjacentHTML('beforeend', hits.map(hit => createMarkup(hit)).join(''));
        lightbox.refresh();
        smoothScroll();
        page += 1;
    })
    .catch(limitedAccess);
}

function requestError() {
    return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function limitedAccess() {
    return Notify.warning('Sorry, you are using the free version of Pixabay. Approve your account for full API access and get more pictures.');
}

function smoothScroll() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

