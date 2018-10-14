var canvas = $("#canvas");

var key = new Array();

var mouse = {
  x: 0,
  y: 0,
  state: new Array()
};

var picture = {
  log: [["init"], []],
  currentIndex: 0,
  currentAction: 0,
  redraw: function() {
    canvasInit();

    for (var i = 0;i < this.currentIndex;i ++) {
      var actions = this.log[i];
      for (var j = 0;j < actions.length;j ++) {
        var action = actions[j].split(" ");

        if (action[0] == "line") {
          canvas.drawLine({
            strokeStyle: '#000',
            strokeWidth: 1,
            x1: parseInt(action[1]), y1: parseInt(action[2]),
            x2: parseInt(action[3]), y2: parseInt(action[4]),
          });
        }
      }
    }
  }
};

function init() {
  canvas.on('contextmenu', function() {
    return false;
  });

  canvasInit();

  canvas.on("mousemove", function(event) {
    if (mouse.state[0] == 1) {
      var speed = Math.sqrt(Math.pow(mouse.x - event.offsetX, 2) + Math.pow(mouse.y - event.offsetY, 2));
      var size = 1.2 / Math.sqrt(speed / 8);

      canvas.drawLine({
        strokeStyle: '#000',
        strokeWidth: 1,
        x1: mouse.x, y1: mouse.y,
        x2: event.offsetX, y2: event.offsetY,
      });

      log("line " + mouse.x + " " + mouse.y + " " + event.offsetX + " " + event.offsetY + " " + size);
    }

    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
  });

  canvas.on("mousedown", function(event) {
    if (event.button == 0) {
      mouse.state[0] = 1;
      picture.log.push([]);
      //log("mousedown 0");
    }
  });

  canvas.on("mouseup", function(event) {
    if (event.button == 0) {
      mouse.state[0] = 0;
      picture.currentIndex ++;
      picture.currentAction = 0;
      //log("mouseup 0");
    }
  });

  canvas.on("mouseleave", function(event) {
    if (event.button == 0) {
      mouse.state[0] = 0;
      //log("mouseup 0");
    }
  });

  $(document).on("keydown", function(event) {
    key[event.keyCode] = 1;

    if (key[17] == 1 && event.keyCode == 90 && !key[16]) {
      if (picture.currentIndex == 0) return;
      picture.currentIndex --;
      picture.redraw();
    } else if (key[17] == 1 && event.keyCode == 90 && key[16] == 1) {
      if (picture.currentIndex == picture.log.length - 2) return;
      picture.currentIndex ++;
      picture.redraw();
    }
  });
  $(document).on("keyup", function(event) {
    key[event.keyCode] = 0;
  });
}

function canvasInit() {
  canvas.clearCanvas({
    x: 256,
    y: 256,
    width: 512,
    height: 512
  });
  canvas.drawRect({
    fillStyle: '#FFFF',
    x: 256,
    y: 256,
    width: 512,
    height: 512
  });
}

function log(s) {
  if (picture.currentAction == 0 && picture.log[picture.currentIndex].length > 0) picture.log[picture.currentIndex] = [];
  picture.log[picture.currentIndex][picture.currentAction] = s;
  picture.currentAction ++;
}

init();
