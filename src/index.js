import './css/styles.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const API_KEY = '33457502-2f0900523bf20d938f40b8c6d';
const BASE_URL = 'https://pixabay.com/api/';

function createMarkup () {
    return `<div class="photo-card">
        <img src="" alt="" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            </p>
            <p class="info-item">
            <b>Views</b>
            </p>
            <p class="info-item">
            <b>Comments</b>
            </p>
            <p class="info-item">
            <b>Downloads</b>
            </p>
        </div>
    </div>`;
}