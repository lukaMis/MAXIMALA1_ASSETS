  

FallingWords.FeedbackView = (dataObject) => {

  'use strict';
  const instance = {};

  const INSTANCE_DATA = dataObject.data;



  const createView = (pointsAchived) => {

    // console.log('instance.data.text', instance.data.text);
    // update text with points achived
    let pointsAchivedText = INSTANCE_DATA.text;
    pointsAchivedText = pointsAchivedText.replace('***', `<span>${pointsAchived}</span>`);

    const viewString = 
    `
    <div id="feedbackView" class="view">
      <div class="viewContent">
        <p class="annotation">${pointsAchivedText}</p>
        <div class="button">
          <p>${INSTANCE_DATA.button}</p>
        </div>
      </div>
    </div>
    `;

    $('#contentWrapper').append(viewString);
    $('#contentWrapper #feedbackView .button').one('click', onButtonClick);
  };

  const onButtonClick = (e) => {
    $('#contentWrapper #feedbackView').remove();
    $(instance).trigger('onFeedbackViewClicked');
  };



  /* API */
  instance.init = (pointsAchived = 0) => {
    createView(pointsAchived);
  };
  
  console.log('FeedbackView ready');
  return instance;
};


/* TEMPLATE

<!-- <div id="feedbackView" class="view">
          <div class="viewContent">
            <p class="annotation" data-i18n="[html]feedbackView.text"></p>
            <div class="button">
              <p data-i18n="[html]feedbackView.button"></p>
            </div>
          </div>
        </div> -->
*/