

FallingWords.Bootstrap = (configObject) => {

  'use strict';
  const instance = {};



  const themeControler = FallingWords.ThemeControler({
    'theme': (configObject) ? configObject.theme : 0
  });

  const dataHandler = FallingWords.DataHandler();

  const soundControl = FallingWords.SoundControl();
  $(soundControl).on('onAudioLoadComplete', (e) => {
    console.log('from bootstrap onAudioLoadComplete');
    titleView.init();
    FallingWords.removePreloader();
  });

  const feedbacView = FallingWords.FeedbackView({
    data: dataHandler.getFeedbackData()
  });

  const infoBar = FallingWords.InfoBar({
    data : dataHandler.getGameViewData()
  });

  const spawnControl = FallingWords.SpawnControl({
    data: dataHandler.getGameData()
  });

  const particles = FallingWords.Particles({
    parent : '#contentWrapper',
    numberOfParticles : 10,
    duration : 1,
    type : 'sphere'
  });

  const gameControl = FallingWords.GameControl({
    infoBar: infoBar,
    spawnControl: spawnControl,
    feedbacView: feedbacView,
    particles: particles,
    soundControl: soundControl
  });

  const titleView = FallingWords.TitleView({
    data: dataHandler.getTitleData()
  });
  $(titleView).on('onTitleViewClicked', (e) => {
    console.log('Start teh game');
    gameControl.init();
  });

  soundControl.init( dataHandler.getAudioData() );

  
  
  /* API */
  instance.init = () => {};
  
  console.log('Bootstrap ready');
  return instance;
};