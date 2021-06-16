export const playAudio = (audio: HTMLAudioElement) => {
  let playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then((_) => {})
      .catch((error) => {
        console.log(error);
      });
  }
};
