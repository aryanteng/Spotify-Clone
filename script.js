console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "1",filePath: "songs/1.mp3",coverPath:'covers/1.jpg'},
    {songName: "2",filePath: "songs/2.mp3",coverPath:'covers/2.jpg'},
    {songName: "3",filePath: "songs/3.mp3",coverPath:'covers/3.jpg'},
    {songName: "4",filePath: "songs/4.mp3",coverPath:'covers/4.jpg'},
    {songName: "5",filePath: "songs/5.mp3",coverPath:'covers/5.jpg'},
    {songName: "6",filePath: "songs/6.mp3",coverPath:'covers/6.jpg'},
    {songName: "7",filePath: "songs/7.mp3",coverPath:'covers/7.jpg'},
    {songName: "8",filePath: "songs/8.mp3",coverPath:'covers/8.jpg'},
    {songName: "9",filePath: "songs/9.mp3",coverPath:'covers/9.jpg'},
    {songName: "10",filePath: "songs/10.mp3",coverPath:'covers/10.jpg'},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});


masterPlay.addEventListener('click', ()=>{
   if(audioElement.paused || audioElement.currentTime <= 0){
       audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle');
       gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    document.getElementById('myProgressBar').value = progress;
});

document.getElementById('myProgressBar').addEventListener('change', ()=>{
    audioElement.currentTime = document.getElementById('myProgressBar').value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e) =>{
            makeAllPlays();
            songIndex = parseInt(e.target.id)
            if (audioElement.paused || audioElement.currentTime <= 0){
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = `songs/${songIndex+1}.mp3`;
                document.getElementById('name').innerText = songs[songIndex].songName
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
        
            }
            else{
                e.target.classList.add('fa-play-circle');
                e.target.classList.remove('fa-pause-circle');
                audioElement.src = `songs/${songIndex+1}.mp3`;
                document.getElementById('name').innerText = songs[songIndex].songName
                audioElement.pause();
                gif.style.opacity = 0;
                masterPlay.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
            }
        
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById('name').innerText = songs[songIndex].songName
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById('name').innerText = songs[songIndex].songName
})