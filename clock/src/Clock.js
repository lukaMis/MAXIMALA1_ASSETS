



// setClockTime({
//   hours: 15,
//   minutes: 32,
//   seconds: 0
// });

// setClockTime({
//   hours: getRandomInt(0, 24),
//   minutes: getRandomInt(0, 60),
//   seconds: getRandomInt(0, 60)
// });

// setInterval(function() {
//   setClockTime({
//     hours: getRandomInt(0, 24),
//     minutes: getRandomInt(0, 60),
//     seconds: getRandomInt(0, 60)
//   });
// }, 3000);





let Clock = function(parentDiv) {
  
  'use strict';
  let instance = {};


  let makeAClock = (function() {
    /*
    let clockString = 
    '<div class="clock" data-face-color="blue">
            <div class="dialWrapper">
              <div class="dial" data-dial="1"></div>
              <div class="dial" data-dial="2"></div>
              <div class="dial" data-dial="3"></div>
              <div class="dial" data-dial="4"></div>
              <div class="dial" data-dial="5"></div>
              <div class="dial" data-dial="6"></div>
              <div class="dial" data-dial="7"></div>
              <div class="dial" data-dial="8"></div>
              <div class="dial" data-dial="9"></div>
              <div class="dial" data-dial="10"></div>
              <div class="dial" data-dial="11"></div>
              <div class="dial" data-dial="12"></div>
            </div>
            <div class="handsWrapper">
              <div class="clockHand" data-type="hours"></div>
              <div class="clockHand" data-type="minutes"></div>
              <div class="clockHand" data-type="seconds"></div>
            </div>
          </div>';
          */
    let _clock_string = '';
    let _clock_0 = '<div class="clock" data-face-color="blue">';
    let _clock_1 = '<div class="dialWrapper">';
    let _clock_2 = '';
    let _clock_3 = '<div class="handsWrapper">';
    let _clock_4 = '<div class="clockHand" data-type="hours"></div>';
    let _clock_5 = '<div class="clockHand" data-type="minutes"></div>';
    let _clock_6 = '<div class="clockHand" data-type="seconds"></div>';

    let _close_div = '</div>';

    for (let i = 1; i < 13; i++) {
      let _dialString = '<div class="dial" data-dial="' + i + '"></div>';
      _clock_2 += _dialString;
    }
    _clock_string = _clock_0 + _clock_1 +_clock_2 + _close_div + _clock_3 + _clock_4 + _clock_5 + _clock_6 + _close_div + _close_div;

    if(parentDiv) {
      $(parentDiv).append(_clock_string);
    } else {
      throw new Error('missing parent selector for Clock');
    }
    
  })();


  function _setClockTime(data) {
    // Create an object with each hand and it's angle in degrees
    let hands = [
      {
        hand: 'hours',
        angle: (data.hours * 30) + (data.minutes / 2)
      },
      {
        hand: 'minutes',
        angle: (data.minutes * 6)
      },
      {
        hand: 'seconds',
        angle: (data.seconds * 6)
      }
    ];
    // Loop through each of these hands to set their angle
    for (let j = 0; j < hands.length; j++) {
      let elements = document.querySelectorAll('[data-type="' + hands[j].hand + '"]');
      for (let k = 0; k < elements.length; k++) {
        elements[k].style.transform = ' translate(-50%) ' + ' ' + 'rotate('+ hands[j].angle +'deg)';
      }
    }
  };


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  instance.setTime = function(object) {
    _setClockTime(object);
  };

  return instance;
};