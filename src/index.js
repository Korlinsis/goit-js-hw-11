import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from './commponents/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPictures } from './commponents/API';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', showPictures);
loadMoreButton.addEventListener('click', loadMore);



function showPictures(e) {
    e.preventDefault();
    const {elements: { searchQuery }} = e.currentTarget;
    if (searchQuery.value.trim() === '') return;

    getPictures(searchQuery.value.trim())
    .then(({hits, totalHits}) => {
        if (hits.length === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
        Notify.success(`Hooray! We found ${totalHits} images.`);
        return hits;
    }})
    .then(hits => {
        galleryContainer.innerHTML = hits.map(hit => createMarkup(hit)).join('');
        new SimpleLightbox('.gallery a');
    })    
}

function loadMore() {

}

