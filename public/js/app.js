const movie_container = document.getElementById("movies");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const nextBtn = document.getElementById("next");
const prvBtn = document.getElementById("previous");

const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let pagenumber = 1;

function createMovieItems(movies) {
  movies.map((movie) => {
    const new_movie = document.createElement("div");
    new_movie.dataset.title = movie.title;
    new_movie.classList.add("movie");
    new_movie.innerHTML = `<div class="movieimg">
                                <img src="${
                                  IMG_PATH + movie.poster_path
                                }" alt="${movie.title}">
                            </div>
                           <div class="movie-info">
                                <h3>${movie.title}</h3>
                                <span>${movie.vote_average}</span>
                           </div>
                            <div class="overview">
                                ${movie.overview}
                            </div>`;

    movie_container.appendChild(new_movie);
  });
}

async function fetchMovies(url) {
  try {
    const res = await fetch(url);
    const resdata = await res.json();
    console.log(resdata);

    createMovieItems(resdata.results);
  } catch (err) {
    console.error(err);
  }
}

function handleSearch(e) {
  e.preventDefault();

  const inputValue = searchInput.value;

  if (inputValue.trim()) {
    movie_container.innerHTML = "";
    fetchMovies(SEARCH_API + inputValue);
  }

  inputValue.value = "";
}

function fetchNextMovies() {
  if (pagenumber >= 500) return;

  pagenumber += 1;

  movie_container.innerHTML = "";

  fetchMovies(API_URL + pagenumber);
}

function fetchPrevMovies() {
  if (pagenumber <= 1) return;

  pagenumber -= 1;

  movie_container.innerHTML = "";

  fetchMovies(API_URL + pagenumber);
}

// events
searchForm.addEventListener("submit", handleSearch);
nextBtn.addEventListener("click", fetchNextMovies);
prvBtn.addEventListener("click", fetchPrevMovies);
window.addEventListener("load", () => {
  fetchMovies(API_URL);
});
