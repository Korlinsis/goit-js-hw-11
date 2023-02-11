import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33457502-2f0900523bf20d938f40b8c6d';
const SEARCH_PARAMETERS = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export async function getPictures(request, page) {
    try {
      const {data} = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${request}${SEARCH_PARAMETERS}&page=${page}`);
      return data;
    } catch (error) {
      console.error(error);
    }
}