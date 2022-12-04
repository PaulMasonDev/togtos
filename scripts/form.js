import TMDB_API_KEY from "./apikey.js";
// https://www.youtube.com/watch?v=2J3xbMkH2K4

const form = document.getElementById("search-form");

const handleFormSubmit = (event) => event.preventDefault();

form.addEventListener("submit", handleFormSubmit);

console.log(TMDB_API_KEY);
