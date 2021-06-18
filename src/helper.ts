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

export const name2url = (name: string): string =>
  name.replace(/ /gi, "-").toLowerCase();

export const baseUrlEndpoint =
  "https://virtserver.swaggerhub.com/selfdecode.com/game-challenge/1.0.0/";
