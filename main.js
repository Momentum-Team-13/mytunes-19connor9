//document.getElementById("submitButton").addEventListener("click", submit)

const form = document.querySelector("#myForm")
const inputField = document.querySelector("#search")


const musicBox = document.querySelector("#musicBox");
musicBox.addEventListener('click', populateAudio);
const audioBox = document.getElementById("audioBox");
const nowPlaying = document.getElementById("nowPlaying");
console.log(nowPlaying)
console.log(audioBox)
console.log(musicBox)

audioBox.src = ""
let itunesURL = ""


form.addEventListener("submit", function (event) {
    //submit  handles submission by click and by enter (and any other accessibility tools used)

    event.preventDefault();
    //what does preventDefault do? default behavior is for the page to reload, which we don't want because the results will go away until we ask them to with a new search
    submit(inputField.value)
    console.log(inputField.value)
});




function submit(search) {
    // let search = document.getElementById("search").value;
    console.log(search);
    itunesURL = `https://itunes.apple.com/search?term=${textFix(search)}&entity=song`;
    console.log(itunesURL)
    nowPlaying.innerText = "Press a song for preview"
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
        .catch(err => alert(err))

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
    musicBox.innerHTML = "";
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
