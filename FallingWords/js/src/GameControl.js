

FallingWords.GameControl = (dataObject) => {

  'use strict';
  const instance = {};

  const infoBar = dataObject.infoBar;
  const spawnControl = dataObject.spawnControl;
  const feedbacView = dataObject.feedbacView;
  const particles = dataObject.particles;
  const soundControl = dataObject.soundControl;

  let newQuestionTimeout;

  let currentTarget;
  let $target;


  
  const init = () => {

    addGameView();

    makeNewQuestionTimeout();

    infoBar.init();
    
    infoBar.setQuestion( spawnControl.getQuestion() );
    spawnControl.startSpawn();

    addEventListnerForClicking();
    addEventListnerForMute();
    addEventListnerForGameEnd();
    addEventListnerForRestart();
  };

  const makeNewQuestionTimeout = () => {
    console.log( 'FallingWords.NEW_QUESTION_TIMER_IN_SECONDS', FallingWords.NEW_QUESTION_TIMER_IN_SECONDS );
    newQuestionTimeout = setTimeout(() => {
      infoBar.setQuestion( spawnControl.getQuestion() );
      soundControl.play('change');
      makeNewQuestionTimeout();
    }, FallingWords.NEW_QUESTION_TIMER_IN_SECONDS * 1000);
  };

  const addEventListnerForClicking = () => {
    $('#gameView').on('click', onGameViewClicked);
  };

  const removeEventListnerForClicking = () => {
    $('#gameView').off('click', onGameViewClicked);
  };

  const addEventListnerForMute = () => {
    $(infoBar).on('onAudioMute', onAudioMuteHandler);
  };

  const removeEventListnerForMute = () => {
    $(infoBar).off('onAudioMute', onAudioMuteHandler);
  };

  const addEventListnerForGameEnd = () => {
    $(infoBar).one('onEndOfTime', onEndOfTimeHandler);
  };

  const addEventListnerForRestart = () => {
    $(feedbacView).one('onFeedbackViewClicked', () => {
      init();
    });
  };

  const onAudioMuteHandler = (e, data) => {
    soundControl.muteAudio(data.muteAudio);
  };

  const onEndOfTimeHandler = (e) => {
    spawnControl.stopSpawn();
    removeEventListnerForMute();
    // clearInterval(newQuestionInterval);
    clearTimeout(newQuestionTimeout);
    feedbacView.init( infoBar.getScore() );
    resetViews();
  };

  const onGameViewClicked = (e) => {

    $target = $(e.target);
    
    if($target.hasClass('view')) {
      console.log('view clicked');
      return;
    }

    $target.attr({
      'data-clickable' : false
    });

    const id = parseInt($target.attr('data-id'));
    const textOfTarget = $target.find('.textWrapper p').text();
    
    checkForMatch({
      answer: $target,
      id : id,
      text: textOfTarget
    });
  };

  const checkForMatch = (clickedAnswer) => {
    // if(clickedAnswer.id === FallingWords.CURRENT_ID) {
    //   handleCorrect(clickedAnswer);
    // } else {
    //   handleWrong(clickedAnswer);
    // }
    if(spawnControl.getCorrectAnswersArray().indexOf(clickedAnswer.text) === -1) {
      handleWrong(clickedAnswer);
    } else {
      handleCorrect(clickedAnswer);
    }
  };

  const handleCorrect = (dataObject) => {
    spawnControl.scaleAnswer( dataObject.answer );
    infoBar.incrementScore();
    console.log('Create PARTICLE');
    particles.makeParticles({
      parent : dataObject.answer,
      numberOfParticles : 24,
      type: 'sphere'
    });
  };

  const handleWrong = (dataObject) => {
    spawnControl.shakeAnswer( dataObject.answer );
    infoBar.decrementScore();
    dataObject.answer.attr({
      'data-clickable' : ''
    });
  };

  const addGameView = () => {
    $('#contentWrapper').prepend('<div id="gameView" class="view"></div>');
  };

  const removeGameView = () => {
    removeEventListnerForClicking();
    $('#contentWrapper #gameView').remove();
    // $('#contentWrapper').empty();
  };

  const resetViews = () => {
    removeGameView();
    spawnControl.reset();
    infoBar.reset();
  };



  /* API */
  instance.init = () => {
    init();
  };
  
  console.log('GameControl ready');
  return instance;
};