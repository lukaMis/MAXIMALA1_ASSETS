

FallingWords.SoundControl = () => {

  'use strict';
  const instance = {};

  let filesLoaded = 0;
  let filesToLoad = 0;



  const loadAudio = (configObj) => {
    createjs.Sound.on('fileload', onSoundLoaded);

    filesToLoad = Object.keys(configObj).length;
    console.log('filesToLoad', filesToLoad);

    // for (let i = 0; i < filesToLoad; i++) {
    //   console.log(configObj[i]);
    //   // filesToLoad++;
    //   // register sound
    // }
    for (let key of Object.keys(configObj)) {
      createjs.Sound.registerSound(`../assets/FallingWords/audio/${configObj[key]}.mp3`, key);
    }
  };

  const onSoundLoaded = (e) => {
    filesLoaded++;
    if(filesLoaded === filesToLoad) {
      filesLoaded = null;
      filesToLoad = null;
      console.log('all audio completed');
      $(instance).trigger('onAudioLoadComplete');
    }
  };

  const playAudio = (id) => {
    const player = createjs.Sound.play(id);
    player.on('complete', onAudioCompleted);
  };

  const onAudioCompleted = (e) => {
    e.target.off('complete', onAudioCompleted);
    $(instance).trigger('onAudioCompleted');
  };

  const muteAudio = (isAudioMuted) => {
    createjs.Sound.muted = isAudioMuted;
  };



  /* API */
  instance.init = (configObj) => {
    loadAudio(configObj);
  };

  instance.play = (id) => {
    playAudio(id);
  };

  instance.muteAudio = (isAudioMuted) => {
    muteAudio(isAudioMuted);
  };
  

  console.log('SoundControl ready');
  return instance;
};