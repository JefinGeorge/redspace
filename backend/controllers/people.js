const fetch = require('node-fetch');
var species = [];
var films = [];

exports.StarWarsApiSearch = (req, res) => {

  fetch('https://swapi.dev/api/people/' + req.params.id,{
    method: 'GET'
  }).then((res) => {
    return res.json();
  })
  .then((json) => {    

  fetch(json.homeworld,{
    method: 'GET'
  }).then((res) => {
    return res.json();
  })
  .then((json) => { 
    temp = { title : json.name,
      terrain : json.terrain,
      population : json.population
     };
    planet = temp;
  });

  for (i in json.species) {
    fetch(json.species[i],{
      method: 'GET'
    }).then((res) => {
      return res.json();
    })
    .then((json) => {   
      temp = {name: json.name, 
        average_lifespan : json.average_lifespan, 
        classification : json.classification, 
        language : json.language};
      species.push(temp);
    });
  }

  for (i in json.films) {
    fetch(json.films[i],{
      method: 'GET'
    }).then((res) => {
      return res.json();
    })
    .then((json) => {   
      temp = {title: json.title, 
            director : json.director, 
            producer : json.producer, 
            release_date : json.release_date};
      films.push(temp);
    });
  }

  responseObj = {name : json.name,
    height : json.height,
    mass : json.mass,
    hairColor : json.hair_color,
    skinColor : json.skin_color,
    gender : json.gender,
    birthYear : json.birth_year,
    homePlanet : planet,
    species : species ,
    films  : films
  };

  res.status(200).json({
    message: "Search Completed Succesfully!",
    info: responseObj
  });

  })
  .catch(error => {
    res.status(500).json({
      message: "Search failed!",
      info: error
    });
  });
};