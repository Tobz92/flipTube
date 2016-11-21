mirrorIt = function() {
    var videoTag = document.querySelector('video');

    updateToggleControls();
    videoTag.style.transform =  videoTag.style.transform === 'scaleX(-1)' ? '' : 'scaleX(-1)';
 
};

/*
* Create the svg icon 
* return: give me the created svg
*/
getSVG = function() {
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#fff');
  pathOne = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathTwo = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathOne.setAttribute('d', 'M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z');
  pathTwo.setAttribute('d', 'M0 0h24v24H0z');
  pathTwo.setAttribute('fill', 'none');

  svg.appendChild(pathOne,pathTwo);
  return svg;
};

/*
* Checks the current state of the icon and toggles it
*/
updateToggleControls = function() {
  svg = document.querySelector('.mirrorTube-button svg');

  if(svg.title === undefined || svg.title === ''){
    svg.style.fill = '#f12b24';
    svg.style.transform = 'scaleX(-1)';
    svg.title = 'Mirrored!';
  }else{
    svg.style.fill = '#fff';
    svg.style.transform = '';
    svg.title = '';
  }
};


/*
* Create and attach the svg button on the Playerbar
*/
addToggleControls = function() {
  lftControls = document.querySelector('div.ytp-left-controls');

  if (!lftControls) return false;
  newButton = document.createElement('a');
  newButton.className = 'ytp-button mirrorTube-button';
  newButton.title = 'Mirror the video';
  newButton.appendChild(getSVG());
  lftControls.appendChild(newButton);
  return true;
};

var checkIt = setInterval(() => {
    if (addToggleControls()) {
      newButton.addEventListener('click', mirrorIt);
      clearInterval(checkIt);
    }
  }, 500);





