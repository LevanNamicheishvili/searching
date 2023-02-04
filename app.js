let pagenumber = 1;
let apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`;
const iMGpath = 'https://image.tmdb.org/t/p/w1280';
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById('search');
const nextBtn = document.getElementById('next')
const prvBtn = document.getElementById('previous')

getmovies(apiUrl);

async function getmovies(url){
    const resp = await fetch(url + pagenumber);
    const respdata = await resp.json();

    showmovies(respdata.results);
}
nextBtn.addEventListener("click", function() { 
  pagenumber = pagenumber + 1;
  getmovies(apiUrl, pagenumber);
})

prvBtn.addEventListener("click",  function() { 
    pagenumber = pagenumber - 1 ;
    getmovies(apiUrl, pagenumber)
})



        movieposter.innerHTML = 
        `
        <div class="movieimg">
        <img src="${iMGpath + poster_path}" alt="${title}">
        </div>
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
            <div class="overview">
                ${overview}
            </div>
            `
        ;
        main.appendChild(movieposter);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searching = search.value;

    if(searching){
        getmovies(searchAPI + searching);

        search.value = '';
    }
});



