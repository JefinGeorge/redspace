const fetch = require('node-fetch');
var planet;
var species = [];
var films = [];  

exports.StarWarsApiSearch = (req, res) => {

  // Getting People Details From SWAPI 
  fetch('https://swapi.dev/api/people/' + req.params.id,{
    method: 'GET'
  }).then((res) => {
    return res.json();
  })
  .then((json) => {    

  // Getting Planet Details From SWAPI 
  fetch(json.homeworld,{
    method: 'GET'
  }).then((res) => {
    return res.json();
  })
  .then((planets) => { 
    planet = { title : planets.name,
      terrain : planets.terrain,
      population : planets.population
     };
  })

  // Getting Species Details From SWAPI 
  for (i in json.species) {
    fetch(json.species[i],{
      method: 'GET'
    }).then((res) => {
      return res.json();
    })
    .then((specie) => {  
      temp = {name: specie.name, 
              average_lifespan : specie.average_lifespan, 
              classification : specie.classification, 
              language : specie.language};
      species.push(temp);
    });
  }

  // Getting Film Details From SWAPI 
  for (i in json.films) {
    fetch(json.films[i],{
      method: 'GET'
    }).then((res) => {
      return res.json();
    })
    .then((film) => {   
      temp = {title: film.title, 
             director : film.director, 
             producer : film.producer, 
             release_date : film.release_date};
      films.push(temp);
    });
  }

  // Creating responce object
  responseObj = {name : json.name,
                height : json.height,
                mass : json.mass,
                hairColor : json.hair_color,
                skinColor : json.skin_color,
                gender : json.gender,
                birthYear : json.birth_year,
                homePlanet : planet,
                species : species,
                films  : films
               }; 

  res.status(200).json({
    message: "Search Completed Succesfully!",
    info: responseObj
  });
    // Resetting temporary storage arrays
    species.length = 0;
    films.length = 0;
  })
  .catch(error => {
    res.status(500).json({
      message: "Search failed!",
      info: error
    });
  });
};