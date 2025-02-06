$(document).ready(()=>{
    $('#searchForm').on('submit', (e)=>{
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
})

function getMovies(searchText) {
    axios.get(`https://www.omdbapi.com/?apikey=c270fbb2&s=${searchText}`)
        .then((response)=>{
            console.log(response.data)

            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie)=>{
                output += `
                    <div class="col-md-3 text-centered">
                        <div class="well">
                            <img src = "${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class = "btn btn-primary" href"#">Movie Details</a>
                        </div>
                    </div>
                `
            })
            $('#movies').html(output)
        })
        .catch((err)=>{
            console.log(err);
        })
}
function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false
}
function getMovie(){
    let movieId = sessionStorage.getItem('movieId');


    axios.get(`https://www.omdbapi.com/?apikey=c270fbb2&i=${movieId}`)
        .then((response)=>{
            console.log(response.data)
            let movie = response.data;

        })
        .catch((err)=>{
            console.log(err);
        })
}