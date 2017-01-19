

FallingWords.InfoBar = (dataObject) => {

  'use strict';
  const instance = {};
  const DATA = dataObject.data;

  let timerCounter = 0;
  let timerInterval;

  let currentScore = 0;



  const createView = () => {
    const template = 
      `
      <div id="infoBar">
        <p id="time">
          <span id="m">00</span>:<span id="s">00</span>
        </p>
        <div id="muteButton" data-mute="${FallingWords.AUDIO_IS_MUTED}"></div>
        <p id="question">QUESTION</p>
        <p id="score"><span id="pointsInt">0</span> <span>${DATA.points}</span></p>
      </div>
      `;
    $('#contentWrapper').append(template);
    setTimeout(() => {
      addListnerToMuteButton();
    }, 50);
  };

  const setQuestion = (question) => {
    document.getElementById('question').innerHTML = question;
  };

  const setScore = (scoreObj) => {
    $('#score #pointsInt')
    .text(scoreObj.score)
    .attr({
      'data-increment' : '',
      'data-score' : scoreObj.increment ? FallingWords.CORRECT_ANSWER_POINTS:FallingWords.WRONG_ANSWER_POINTS
    });

    setTimeout(() => {
      $('#score #pointsInt').attr({
        'data-increment' : scoreObj.increment ? true:false
      });
    }, 50);
  };

  const incrementScore = () => {
    currentScore = currentScore + FallingWords.CORRECT_ANSWER_POINTS;
    setScore({
      score:currentScore,
      increment: true
    });
  };

  const decrementScore = () => {
    currentScore = currentScore - FallingWords.WRONG_ANSWER_POINTS;
    currentScore = currentScore < 0 ? 0:currentScore;
    setScore({
      score:currentScore,
      decrement: true
    });
  };

  const getScore = () => {
    return currentScore;
  };

  const createTimer = () => {
    timerInterval = setInterval( () => {
      timerIntervalTick();
    }, 1000);
    timerIntervalTick();
  };

  const timerIntervalTick = () => {

    if(timerCounter < FallingWords.GAME_TIME_IN_SECONDS + 1) {
      updateTimer(timerCounter);
      timerCounter++;
    } else {
      stopTheTimer();
      // console.log('onGameEnd');
      $(instance).trigger('onEndOfTime');
    }
  };

  const stopTheTimer = () => {
    clearInterval(timerInterval);
    console.log('timer stopped');
    timerCounter = 0;
  };

  const updateTimer = (counter) => {

    let secLeft = (FallingWords.GAME_TIME_IN_SECONDS - counter) % 60;
    let minLeft = Math.floor((FallingWords.GAME_TIME_IN_SECONDS - counter) / 60);

    secLeft = '0' + secLeft;
    const sec = secLeft.slice(-2);

    minLeft = '0' + minLeft;
    const min = minLeft.slice(-2);

    const timerString = `<span id="m">${min}</span>:<span id="s">${sec}</span>`;
    document.getElementById('time').innerHTML = timerString;
  };

  const onMuteButtonClick = (e) => {
    FallingWords.AUDIO_IS_MUTED = !FallingWords.AUDIO_IS_MUTED;
    $(instance).trigger('onAudioMute', {
      muteAudio: FallingWords.AUDIO_IS_MUTED
    });
    $('#muteButton').attr({
      'data-mute': FallingWords.AUDIO_IS_MUTED
    });
  };

  const addListnerToMuteButton = () => {
    $('#muteButton').on('click', onMuteButtonClick);
  };

  const removeListnerFromMuteButton = () => {
    $('#muteButton').off('click', onMuteButtonClick);
  };

  const reset = () => {
    timerCounter = 0;
    currentScore = 0;
    removeListnerFromMuteButton();
    setScore({score:currentScore});
    $('#contentWrapper #infoBar').remove();
  };



  /* API */
  instance.init = () => {
    createView();
    createTimer();
  };

  instance.setQuestion = (question) => {
    setQuestion(question);
  };

  instance.incrementScore = () => {
    incrementScore();
  };

  instance.decrementScore = () => {
    decrementScore();
  };

  instance.getScore = () => {
    return getScore();
  }

  instance.reset = () => {
    reset();
  }
  

  console.log('InfoBar ready');
  return instance;
};

/*
<div id="infoBar">
  <p id="time">00:00:00</p>
  <p id="question">QUESTION</p>
  <p id="points">40 points</p>
</div>
*/