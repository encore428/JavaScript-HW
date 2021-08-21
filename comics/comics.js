let pageSize = 3;
let thisComic = undefined;
//const API_URL = "https://cors-anywhere.herokuapp.com/https://xkcd.com/"
const API_URL = "https://intro-to-js-playground.vercel.app/api/xkcd-comics/"
//const API_URL = "https://cors-anywhere.herokuapp.com/"



const getComic = (num) => {
// GET Request.
//fetch(`${API_URL}info.0.json`)
fetch(`${API_URL}${num}`)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => console.log(json)) // return comic
    .catch(err => console.log('Request Failed', err)); // Catch errors
	
}	
getComic(1);
console.log(thisComic);