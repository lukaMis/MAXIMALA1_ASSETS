

FallingWords.DataHandler = () => {

  'use strict';
  const instance = {};



  /* API */
  instance.init = () => {};

  instance.getTitleData = () => {
    return i18n.t('titleView', {returnObjectTrees:true});
  };

  instance.getGameData = () => {
    return i18n.t('gameData', {returnObjectTrees:true});
  };
  instance.getFeedbackData = () => {
    return i18n.t('feedbackView', {returnObjectTrees:true});
  };

  instance.getGameViewData = () => {
    return i18n.t('gameView', {returnObjectTrees:true});
  };

  instance.getAudioData = () => {
    return i18n.t('audioData', {returnObjectTrees:true});
  };

  
  console.log('DataHandler ready');
  return instance;
};