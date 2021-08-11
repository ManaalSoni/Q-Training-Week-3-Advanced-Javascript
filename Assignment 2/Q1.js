const fetch = require('node-fetch');

getMovies = async (key, data, kind) =>{
    if(kind=='actor'){
        let moviesByActor=[]
        data.forEach(movie => {
        if(movie.cast.includes(key)){
            moviesByActor.push(movie.title)
        }
    });
    return moviesByActor
    }

    else{
        let moviesByGenre=[]
        data.forEach(movie => {
            if(movie.genres.includes(key)){
                moviesByGenre.push(movie.title)
            }
        });
    return moviesByGenre
    }
};

async function getData(url){

    const response = await fetch(url);
    let data = await response.json();
    act = []
    gen = []
    data.forEach( record => {
        record['cast'].forEach( actor => {
            if(!act.includes(actor))
                act.push(actor)
        })
        
        record['genres'].forEach( genre => {
            if(!gen.includes(genre))
                gen.push(genre)
        })
    });

    // console.log(actors)
    let movies_by_actor = {}
    Actors=[]
    act.forEach(actor =>{
        movies_by_actor = {
            name:actor,
            movies : getMovies(actor,data,'actor')
        }
        Actors.push(movies_by_actor)
    })

    Genres=[]
    let movies_by_genre = {}
    gen.forEach(genre =>{
        movies_by_genre = {
            type:genre,
            movies : getMovies(genre,data,'genre')
        }
        Genres.push(movies_by_genre)
    })
    let result = {
        Actors : Actors,
        Genres : Genres
    }
    console.log(result)
    }
    
const link = ' https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json'
getData(link)