

FallingWords.TitleView = (dataObject) => {

  'use strict';
  const instance = {};
  instance.data = dataObject.data;



  const createView = () => {
    const viewString = 
    `
    <div id="titleView" class="view">
      <div class="viewContent">
        <p class="annotation">${instance.data.text}</p>
        <div class="button">
          <p>${instance.data.button}</p>
        </div>
      </div>
    </div>
    `;

    $('#contentWrapper').append(viewString);
    $('#contentWrapper #titleView .button').one('click', onButtonClick);
  };

  const onButtonClick = (e) => {
    $(instance).trigger('onTitleViewClicked');
    $('#contentWrapper #titleView').remove();
  };



  /* API */
  instance.init = () => {
    createView();
  };
  
  console.log('TitleView ready');
  return instance;
};

/* TEMPLATE

<div id="titleView" class="view">
  <div class="viewContent">
    <p class="annotation" data-i18n="[html]titleView.text"></p>
    <div class="button">
      <p data-i18n="[html]titleView.button"></p>
    </div>
  </div>
</div>

*/