var xPos = 0;
var yPos = 0;
var fuel = 300;
//setting up keyboard controls
$(document).keydown((key) => {
  switch (key.keyCode) {
    case 87: //UP (w)
      yPos = yPos - 7;
      fuel = fuel - 1;
      break;
    case 83: //DOWN (s)
      yPos = yPos + 7;
      fuel = fuel - 1;
      break;
    case 65: //LEFT (a)
      xPos = xPos - 7;
      fuel = fuel - 1;
      break;
    case 68: //RIGHT (d)
      xPos = xPos + 7;
      fuel = fuel - 1;
      break;
  }
});

$(document).ready(() => {
  function drawGame() {
    //distance calculation between player and platform
    var offsetData = [
      $('#lander').offset().left - $('#platform').offset().left,
      $('#lander').offset().top - $('#platform').offset().top
    ];
    //checking for game over cases
    if (
      yPos >= $(window).height()
        - parseFloat($('#lander').css('height'))
        - parseFloat($('#ground').css('height')) ||
      xPos >= $(window).width() - 20 ||
      xPos < 0 ||
      fuel <= 0
    ) {
      $('#gameover')
        .css({'display': 'block', 'background-color': '#f00'}).text('GAME OVER');
      clearInterval(drawGameId);
    };
    //checking for win case
    if (
      offsetData[0] >= 0 &&
      offsetData[0] <= parseFloat($('#platform').css('width')) &&
      offsetData[1] >= -72
    ) {
      $('#gameover').css({'display': 'block', 'background-color': '#0f0'}).text('YOU WIN');
      clearInterval(drawGameId);
    }
    // calculation of player movement incl. gravity and amount of fuel
    $('#lander').css({
      'top': () => {
        yPos = yPos + 0.18;
        return yPos;
      },
      'left': () => {
        return xPos;
      }
    });
    $('#fuel').text('FUEL: ' + fuel);
  };
  //drawing game at 30fps
  const drawGameId = setInterval(drawGame, 0.03);
});
