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
                <div class = "col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick = "movieSelected('${movie.imdbID}')" class="btn btn-primary" htref="#">Movie Details</a>
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