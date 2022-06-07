document.getElementById("submitButton").addEventListener("click", submit){
    submit.preventDefault;
};

const musicBox = document.querySelector("#musicBox");
musicBox.addEventListener('click', populateAudio);
const audioBox = document.getElementById("audioBox");
const nowPlaying = document.getElementById("nowPlaying");
console.log(nowPlaying)
console.log(audioBox)
console.log(musicBox);

audioBox.src = ""
let itunesURL = ""


function submit() {
    let search = document.getElementById("search").value;
    console.log(search);
    itunesURL = `https://itunes.apple.com/search?term=${textFix(search)}&entity=song`;
    console.log(itunesURL)
    fetch(itunesURL, {
        method: 'GET',
        header: { 'Content-Type': 'application/json' }

    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("response from Itunes API:", data)
            populateSongs(data);


        })

}
/*
function searchForAudio(e) {
    fetch(itunesURL, {
        method: 'GET',
        header: { 'Content-Type': 'application/json' }

    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("response from Itunes API:", data)
            for (let song of data.results){
                if(song.trackName===e.trackName){
                    if(song.artistName){
                        return song.previewUrl
                    }
                }
            }


        })

}
*/
function populateSongs(data) {
    console.log(data.results["artistsName"])

    for (let song of data.results) {
        console.log(song.artistName)
        let songElement = document.createElement('div')
        songElement.classList.add('song')
        musicBox.appendChild(songElement)

        let imgElement = document.createElement('img')
        imgElement.src = song.artworkUrl100;
        imgElement.alt = song.collectionName;


        let songTitleElement = document.createElement('div')
        songTitleElement.classList.add("songTitle")
        songTitleElement.innerText = `${song.trackName}`



        let artistTitleElement = document.createElement('div')
        artistTitleElement.classList.add("artistName")
        artistTitleElement.innerText = `${song.artistName}`


        let audioElement = document.createElement('div')
        audioElement.classList.add("audioFile")
        audioElement.innerText = `${song.previewUrl}`


        songElement.appendChild(imgElement)
        songElement.appendChild(songTitleElement)
        songElement.appendChild(artistTitleElement)
        songElement.appendChild(audioElement)


    }
}
function populateAudio(evt) {
    let event = evt.target
    let parEvent = event.parentElement
    console.log(parEvent)
    let audioLink = parEvent.querySelector(".audioFile")
    let songLink = parEvent.querySelector(".songTitle")
    nowPlaying.innerText = (`Now playing, ${songLink.innerText}`)
    audioBox.src = audioLink.innerText


}
function textFix(text) {
    return text.replaceAll(" ", "+")
}




