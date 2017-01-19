

const FallingWords = {};

// Constants not tweakable by editors.
FallingWords.CURRENT_ID = 0;
FallingWords.MAX_Y_POSITION = 755;
FallingWords.PARTICLE_MAX_OFFSET = 150;
FallingWords.AUDIO_IS_MUTED = false;


// Tweakable by editors via form.
FallingWords.GAME_TIME_IN_SECONDS = 60;

FallingWords.NEW_QUESTION_TIMER_IN_SECONDS = 10;
FallingWords.SPAWN_TIME_IN_SECONDS = 1.35;

FallingWords.ANSWER_FALL_TIME = 20;
FallingWords.MAX_ROTATION = 20;

FallingWords.CORRECT_SPAWN_PERCENT = 50;

FallingWords.CORRECT_ANSWER_POINTS = 10;
FallingWords.WRONG_ANSWER_POINTS = 10;

FallingWords.EASING_FUNCTION_TO_USE = 'linear';



FallingWords.getPercentChance = (maxPercent) => {
  return (Math.floor(Math.random() * 100) > maxPercent) ? false:true;
};

FallingWords.getRandomIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

FallingWords.getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

FallingWords.removePreloader = () => {
  $('body').removeClass('loading');
};