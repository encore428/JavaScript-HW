let videoElem = document.getElementById('vision-video');
let playButton = document.getElementById('play-video-btn');

playButton.addEventListener('click', handlePlayButton, false);

async function playVideo() {
  try {
    await videoElem.play();
    playButton.classList.add('playing');
  } catch (err) {
    playButton.classList.remove('playing');
  }
}

function handlePlayButton() {
  if (videoElem.paused) {
    playVideo();
    playButton.innerHTML = 'Pause video';
  } else {
    videoElem.pause();
    playButton.innerHTML = 'Watch video';
  }
}
