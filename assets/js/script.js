// var marvel_api_key = 'd0ef214546c2e9f0b1d4ba6d35921915';
// var marvel_characters_by_name = [];
// var marvel_hash = c782de09ab3d4d512283595db3e5905b;
var nameEl = document.getElementById('character-name');
var bioEl = document.getElementById('character-bio');
var thumbNailEl = document.getElementById('char-thumbnail');

function getAllMarvelCharactersByName(){
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){

        })

};

function getCharacterByName(){
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=Hulk&ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var thumbnail = document.createElement('img')
            thumbnail.src = data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension;
            console.log(data);
            console.log(data.data.results[0].name);
            console.log(data.data.results[0].thumbnail);
            nameEl.textContent = data.data.results[0].name;
            bioEl.textContent = data.data.results[0].description;
            thumbNailEl.append(thumbnail);
        })
};

getCharacterByName();
