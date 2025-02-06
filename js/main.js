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
            console.log(response)
        })
        .catch((err)=>{
            console.log(err);
        })
}