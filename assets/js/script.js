// var marvel_api_key = 'd0ef214546c2e9f0b1d4ba6d35921915';
// var marvel_characters_by_name = [];
// var marvel_hash = c782de09ab3d4d512283595db3e5905b;
var nameEl = document.getElementById('character-name');

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
            
            console.log(data);
            console.log(data.data.results[0].name);
            nameEl.textContent = data.data.results[0].name;
        })
};

getCharacterByName();


