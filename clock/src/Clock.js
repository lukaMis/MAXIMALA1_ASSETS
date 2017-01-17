

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



const Clock = (configObject) => {
  
  'use strict';
  const instance = {};
  let handsData = [
    {
      hand: 'hours',
      angle: 0
    },
    {
      hand: 'minutes',
      angle: 0
    },
    {
      hand: 'seconds',
      angle: 0
    }
  ];
  let handsDataOld = [
    {
      hand: 'hours',
      angle: 0
    },
    {
      hand: 'minutes',
      angle: 0
    },
    {
      hand: 'seconds',
      angle: 0
    }
  ];

  let clockId;

  let clockSpeed = 1;


  const makeAClock = (configObject) => {

    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

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

    const initialStyle = 'translate(-50%) rotate(0deg)';
    // ' translate(-50%) ' + ' ' + 'rotate('+ handsData[j].angle +'deg)';

    let _clock_string = '';
    let _clock_0 = '<div class="clock" id="' + clockId + '" data-face-color="' + clockSkin + '">';
    let _clock_1 = '<div class="dialWrapper">';
    let _clock_2 = '';
    let _clock_3 = '<div class="handsWrapper">';
    let _clock_4 = `<div class="clockHand" data-type="hours" style="${initialStyle}"></div>`;
    let _clock_5 = `<div class="clockHand" data-type="minutes" style="${initialStyle}"></div>`;
    let _clock_6 = `<div class="clockHand" data-type="seconds" style="${initialStyle}"></div>`;


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
  };


  const setClockTime = (data) => {
    // Create an object with each hand and it's angle in degrees

    // if(data.skipTransitionListner === true) {
    //   console.log('skip adding transition event listner');
    // } else {
    //   $('#' + clockId + ' div[data-type="hours"]').one('transitionend', onHandTransitionComplete);
    // }

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

    let angleForHour = (data.hours * 30) + (data.minutes / 2);
    if(angleForHour >= 360) {
      angleForHour -= 360;
    }
    let angleForMinutes = (data.minutes * 6);
    if(angleForMinutes >= 360) {
      angleForMinutes -= 360;
    }
    let angleForSeconds = (data.seconds * 6);
    if(angleForSeconds >= 360) {
      angleForSeconds -= 360;
    }


    if(handsDataOld[0]) {
      console.log(' ');
      console.log( 'handsDataOld[0].angle', handsDataOld[0].angle );
      console.log( 'angleForHour', angleForHour );
      if(angleForHour < handsDataOld[0].angle) {
        angleForHour += 360;
      }
      if(angleForMinutes < handsDataOld[1].angle) {
        angleForMinutes += 360;
      }
      if(angleForSeconds < handsDataOld[2].angle) {
        angleForSeconds += 360;
      }
    }

    handsData = [
      {
        hand: 'hours',
        angle: angleForHour
      },
      {
        hand: 'minutes',
        angle: angleForMinutes
      },
      {
        hand: 'seconds',
        angle: angleForSeconds
      }
    ];

    // Loop through each of these handsData to set their angle
    // for (let j = 0; j < handsData.length; j++) {
    //   let elements = document.getElementById(clockId).querySelectorAll('[data-type="' + handsData[j].hand + '"]');
    //   for (let k = 0; k < elements.length; k++) {
    //     elements[k].style.transform = ' translate(-50%) ' + ' ' + 'rotate('+ handsData[j].angle +'deg)';
    //     elements[k].style['transition-duration'] = '';
    //   }
    // }
    console.log('angleForHour', angleForHour);
    // console.log('selector', '#' + clockId + ' div[data-type="' + handsData[0].hand + '"]' );
    // console.log( 'handsData[0].angle', handsData[0].angle, handsData[0].angle + 360 );

    TweenLite.to('#' + clockId + ' div[data-type="' + handsData[0].hand + '"]', 3 * clockSpeed, {
     rotation: handsData[0].angle,
     ease:Linear.easeNone,
     onComplete: function(e) {
      console.log('on complete hour');
      resetAngles();
      $(instance).trigger('onTimeSet', {id:clockId});
     }
    });
    TweenLite.to('#' + clockId + ' div[data-type="' + handsData[1].hand + '"]', 2 * clockSpeed, {
     rotation: handsData[1].angle,
     ease:Linear.easeNone
    });
    TweenLite.to('#' + clockId + ' div[data-type="' + handsData[2].hand + '"]', 1 * clockSpeed, {
     rotation: handsData[2].angle,
     ease:Linear.easeNone
    });

    handsDataOld.length = 0;
    handsDataOld = [
      {
        hand: 'hours',
        angle: angleForHour
      },
      {
        hand: 'minutes',
        angle: angleForMinutes
      },
      {
        hand: 'seconds',
        angle: angleForSeconds
      }
    ];
  };


  const onHandTransitionComplete = (e) => {
    $('#' + clockId + ' div[data-type="hours"]').off('transitionend', onHandTransitionComplete);
    $(instance).trigger('onTimeSet', {id:clockId});
    resetAngles();
  };


  const resetAngles = () => {
    let hour = handsDataOld[0].angle;
    if(hour >= 360) {
      hour -= 360;
      handsDataOld[0].angle = hour;
      console.log('hour reset by 360');
    }
    let min = handsDataOld[1].angle;
    if(min >= 360) {
      min -= 360;
      handsDataOld[1].angle = min;
      console.log('min reset by 360');
    }
    let sec = handsDataOld[2].angle;
    if(sec >= 360) {
      sec -= 360;
      handsDataOld[2].angle = sec;
      console.log('sec reset by 360');
    }

    // for (let j = 0; j < handsDataOld.length; j++) {
    //   let elements = document.getElementById(clockId).querySelectorAll('[data-type="' + handsDataOld[j].hand + '"]');
    //   for (let k = 0; k < elements.length; k++) {
    //     elements[k].style.transform = ' translate(-50%) ' + ' ' + 'rotate('+ handsDataOld[j].angle +'deg)';
    //     elements[k].style['transition-duration'] = '0s';
    //   }
    // }

    TweenLite.to('#' + clockId + ' div[data-type="' + handsData[0].hand + '"]', 0, {
     rotation: handsDataOld[0].angle,
     ease:Linear.easeNone
    });
    TweenLite.to('#' + clockId + ' div[data-type="' + handsData[1].hand + '"]', 0, {
     rotation: handsDataOld[1].angle,
     ease:Linear.easeNone
    });
    TweenLite.to('#' + clockId + ' div[data-type="' + handsData[2].hand + '"]', 0, {
     rotation: handsDataOld[2].angle,
     ease:Linear.easeNone
    });

    console.log('data reset');
  };


  const getTimeOfDay = () => {
    const date = new Date();
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }
  };


  const init = () => {
    makeAClock(configObject);
  };
  init();



  /* API */
  instance.setTime = (object) => {
    setClockTime(object);
  };
  instance.setInitialTime = () => {
    setClockTime({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    $(instance).trigger('onTimeSet', {id:clockId});
  };
  instance.setCurrentTime = () => {
    setClockTime(getTimeOfDay());
  };
  instance.getId = () => { return clockId };
  instance.setClockSpeed = (newSpeed) => {
    clockSpeed = newSpeed;
    console.log('clockSpeed', clockSpeed);
  };
  instance.getClockSpeed = () => {
    return clockSpeed;
  };

  return instance;
};