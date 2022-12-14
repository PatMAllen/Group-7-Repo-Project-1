// var marvel_api_key = 'd0ef214546c2e9f0b1d4ba6d35921915';
// var marvel_characters_by_name = [];
// var marvel_hash = c782de09ab3d4d512283595db3e5905b;
var nameEl = document.getElementById('character-name');
var bioEl = document.getElementById('character-bio');
var wikiInfoEl = document.getElementById('wiki-info');
var thumbNailEl = document.getElementById('char-thumbnail');
var characterSearchInput = document.querySelector('#character-input');
var searchFormEl = document.querySelector('#search-form');
var thumbnail = document.createElement('img');
var charHistory = [];
var historyEl = document.getElementById('history');

// need to add checks
var submitHandler = function(event){
    event.preventDefault();

    var charName = characterSearchInput.value;
    getCharacterByName(charName);
}


function getAllMarvelCharactersByName(){
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?limit=20&ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            data.data.results.forEach(element => {
                console.log(element.name);
            });
        })
    
};

// need to be able to place searched for name in url
// check character name against all characters in api to make sure it's valid
// provide feedback to user if name does not exist.
// provide alternative text if no description is provided
function getCharacterByName(character_name){
    // var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=Hulk&ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + character_name + '&ts=1812&apikey=d0ef214546c2e9f0b1d4ba6d35921915&hash=c782de09ab3d4d512283595db3e5905b'

    fetch(requestUrl)
        .then(function(response){
            if(response.ok){
                // console.log(response.json())
                return response.json();
            }
        })
        .then(function(data){

            
            if (data.data.total != 0){

                thumbnail.src = data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension;
                // console.log(data);
                // console.log(data.data.results[0].name);
                // console.log(data.data.results[0].thumbnail);
                nameEl.textContent = data.data.results[0].name;
                bioEl.textContent = data.data.results[0].description;
                thumbNailEl.append(thumbnail);

                if(charHistory.length == 10){
                    charHistory.pop();
                }
                charHistory.unshift(character_name);

                
                // get wiki info if character exists, otherwise won't even try
                getWikiInfo(character_name);
                storeHistory();
                renderHistory();
            } else {
                console.log("character not available");
                alert("Character not available, try again.");
    
            }

        })
    return true;
};


// need to only allow search of marvel character
function getWikiInfo(character_name){
    var requestUrl = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=' + character_name + '&prop=text%7Cdisplaytitle%7Csubtitle&sectiontitle=%7B%7BPublication%20history%7D%7D&formatversion=2';

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // console.log(data.parse.wikitext);
            try {
                wikiInfoEl.textContent = " ";
                wikiInfoEl.insertAdjacentHTML('beforeend', data.parse.text);
               // wikiInfoEl.append(data.parse.text);
                
            } catch (error) {
                console.log(error);
                alert("Information not available, try again.");
            }
        })
};

// history won't persist on page reload
function init(){

    var storedHistory = JSON.parse(localStorage.getItem("history"));
    if(storedHistory !== null){
        charHistory = storedHistory;

    }

    renderHistory();
}

function renderHistory(){
      
  historyEl.innerHTML = "";
    console.log(charHistory);
  // Render a new li for each character in history
  for (var i = 0; i < charHistory.length; i++) {
    var char = charHistory[i];

    var btn = document.createElement("btn");
    btn.textContent = char;

    historyEl.appendChild(btn);
  }
}

function storeHistory(){
    localStorage.setItem("history", JSON.stringify(charHistory));
}

searchFormEl.addEventListener('submit', submitHandler);

historyEl.addEventListener('click', function(event) {
    var element = event.target;

    if(element.matches("btn") === true){
        var char = element.textContent;
        getCharacterByName(char);
    }
})
