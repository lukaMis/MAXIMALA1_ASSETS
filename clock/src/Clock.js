

/*
  Class: Clock
  Autor: Luka Mis
  
  Usage:

  Instantiate the clock:
  let clock = Clock({
    parent: parent_dom_selector,
    id: 'optional_id_dom_selector', // is generated if not provided
    skin: 'green' // blue is default
  });

  Set clock time:
  clock.setTime({
    hours: 15,
    minutes: 32,
    seconds: 0
  });
  
  Get clock id:
  clock.getId();
*/



let Clock = function(configObject) {
  
  'use strict';
  let instance = {};

  let handsData = [];

  let clockId;


  let makeAClock = (function(configObject) {

    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    clockId = configObject.id;

    let clockSkin = configObject.skin || 'blue';

    if(configObject.id === undefined) {
      // if id for clock is not provided generate it
      clockId = Math.floor( hours.toString() + minutes.toString() + seconds.toString() + (Math.random() * 999999).toString() ).toString();
    }
    
    if(document.getElementById(clockId) != null) {
      // if id of the clock exists append some random numbers to newly created id so it is unique
      clockId = document.getElementById(clockId).id + '_' + Math.floor( hours.toString() + minutes.toString() + seconds.toString() + (Math.random() * 999999).toString() ).toString();
    }

    let _clock_string = '';
    let _clock_0 = '<div class="clock" id="' + clockId + '" data-face-color="' + clockSkin + '">';
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

    if(configObject.parent) {
      document.getElementById(configObject.parent).innerHTML = _clock_string;
    } else {
      throw new Error('missing parent selector for Clock');
    }
  })(configObject);


  let setClockTime = function setClockTime(data) {
    // Create an object with each hand and it's angle in degrees

    if(data.hours === undefined) {
      data.hours = 0;
    }
    
    if(data.minutes === undefined) {
      data.minutes = 0;
    }
    
    if(data.seconds === undefined) {
      data.seconds = 0;
    }

    handsData.length = 0;
    handsData = [
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
    // Loop through each of these handsData to set their angle
    for (let j = 0; j < handsData.length; j++) {
      let elements = document.getElementById(clockId).querySelectorAll('[data-type="' + handsData[j].hand + '"]');
      for (let k = 0; k < elements.length; k++) {
        elements[k].style.transform = ' translate(-50%) ' + ' ' + 'rotate('+ handsData[j].angle +'deg)';
      }
    }
  };



  /* API */
  instance.setTime = function(object) {
    setClockTime(object);
  };
  instance.getId = function(object) {
    return clockId;
  };


  return instance;
};