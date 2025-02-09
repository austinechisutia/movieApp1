$(document).ready(()=>{
    $('#searchForm').on("submit", (e)=>{
        let searchText = $("#searchText").val()
        getText(searchText)
        e.preventDefault();
    });
})

function getText(searchText){
        console.log($("#searchText").val())
    axios.get(`https://www.omdbapi.com/?apikey=c270fbb2&s=${searchText}`)
    .then((response)=>{
        console.log(response);

        let movies = response.data.Search;
        let output = "";

        $.each(movies, (index, movie)=>{
            output+=`
                <div class = "con">
                    <div class = "col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick = "movieSelected('${movie.imdbID}')" class="btn btn-primary" htref="#">Movie Details</a>
                    </div>
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
    window.location = 'movies.html';
    return false
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`https://www.omdbapi.com/?apikey=c270fbb2&i=${movieId}`)
    .then((response)=>{
        console.log(response);

        let movie = response.data;

        let output = `
            <div class = "row">
                <div class = "col-md-4">
                    <img src = "${movie.Poster}"class="thumbnail">
                </div>
                 <div class = "col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <strong>Genre:</strong> ${movie.Genre}
                        </li>
                        <li class="list-group-item">
                            <strong>Released:</strong> ${movie.Released}
                            
                        </li><li class="list-group-item">
                           <strong>Rating:</strong> ${movie.Rated}
                          
                        </li><li class="list-group-item">
                             <strong>imdbRating:</strong> ${movie.imdbRating}
                          
                        </li><li class="list-group-item">
                              <strong>Director:</strong> ${movie.Director}
                          
                        </li><li class="list-group-item">
                           <strong>Writer:</strong> ${movie.Writer}
                        </li><li class="list-group-item">
                            <strong>Actors:</strong> ${movie.Actors}

                        </li>
                    </ul>
                </div>
            </div>

            <div class = "row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                </div>
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target = "_blank" class="btn btn-primary">View iMDB</a>
                <a href="index.html" class="btn btn-default">Go Back to Search</a>
            </div>
        `;
        $('#movie').html(output)

        
    })
    .catch((err)=>{
        console.log(err);
        
    })

}