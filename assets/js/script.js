// var marvel_api_key = 'd0ef214546c2e9f0b1d4ba6d35921915';
// var marvel_characters_by_name = [];
// var marvel_hash = c782de09ab3d4d512283595db3e5905b;
var nameEl = document.getElementById('character-name');
var bioEl = document.getElementById('character-bio');
var wikiInfoEl = document.getElementById('wiki-info');
var thumbNailEl = document.getElementById('char-thumbnail');
var characterSearchInput = document.querySelector('#character-input');
var searchFormEl = document.querySelector('#search-form');

// need to add checks
var submitHandler = function(event){
    event.preventDefault();

    var charName = characterSearchInput.value;

    getCharacterByName(charName);
    getWikiInfo(charName);
}


function getAllMarvelCharactersByName(){
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){

        })

};

// need to be able to place searched for name in url
function getCharacterByName(character_name){
    // var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=Hulk&ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + character_name + '&ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'

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

// Records search history onto local storage and page list (ADD HERE)

//
function getWikiInfo(character_name){
    var requestUrl = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=' + character_name + '&prop=wikitext%7Cdisplaytitle%7Csubtitle&sectiontitle=%7B%7BPublication%20history%7D%7D&formatversion=2';

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data.parse.wikitext);
            wikiInfoEl.textContent = data.parse.wikitext;
        })
};

searchFormEl.addEventListener('submit', submitHandler);
// getCharacterByName(nameEl);
