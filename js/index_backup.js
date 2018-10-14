var body = $("body").eq(0);
var bodyBox = $("#bodyBox");
var canvas = $("#canvas");
var empty = $("#empty");
var paintBtn = $("#paintBtn");
var emptySize = 128;

empty.css("width", emptySize + "px");
empty.css("height", emptySize + "px");
canvas.css("width", (bodyBox.width() - 17));
canvas.css("height", bodyBox.height());
canvas.attr("width", (bodyBox.width() - 17));
canvas.attr("height", bodyBox.height());
empty.css("margin-left", (((bodyBox.width() - 17) - emptySize) / 2) + "px");
empty.css("margin-top", "-" + (((bodyBox.height()) + emptySize) /2 + 6) + "px");
empty.on("click", drawContent);
paintBtn.css("left", customCoordX2(-430 - 250) + "px");
paintBtn.css("top", customCoordY2(-300) + "px");
paintBtn.on("click", function() {
  location.href = "paint.html";
});

function drawContent() {
  drawLine(customCoordX(70), customCoordY(-71), customCoordX(70), customCoordY(71), 50); // 아래
  drawLine(customCoordX(71), customCoordY(-70), customCoordX(-71), customCoordY(-70), 50); // 왼
  drawLine(customCoordX(-70), customCoordY(71), customCoordX(-70), customCoordY(-71), 50); // 위
  drawLine(customCoordX(-71), customCoordY(70), customCoordX(71), customCoordY(70), 50, function() {
    drawLine(customCoordX(-70), customCoordY(-30), customCoordX(-300), customCoordY(-30), 50, function() {
      drawLine(customCoordX(-300), customCoordY(-28), customCoordX(-302), customCoordY(-300), 50, function() {
        drawLine(customCoordX(-300), customCoordY(-300), customCoordX(-430), customCoordY(-300), 30, function() {
          paintBtn.css("display", "block");
          var i = 0;
          var interval = setInterval(function() {
            i += 0.01;
            if (i > 1) {
              clearInterval(interval);
            }
            paintBtn.css("opacity", i);
          }, 10);
        });
      });
    });

    drawLine(customCoordX(-70), customCoordY(0), customCoordX(-310), customCoordY(0), 60, function() {
      drawLine(customCoordX(-310), customCoordY(2), customCoordX(-310), customCoordY(-102), 30, function() {
        drawLine(customCoordX(-310), customCoordY(-100), customCoordX(-430), customCoordY(-100), 50, function() {

        });
      });
    });
  }); // 오른
}

function drawLine(x1, y1, x2, y2, delay, runnable) {
  var dx = (x2 - x1) / delay;
  var dy = (y2 - y1) / delay;
  var i = 0;
  var interval = setInterval(function() {
    i ++;

    if (i == delay) {
      clearInterval(interval);
      if (runnable)
        runnable();
    }

    canvas.drawLine({
      strokeStyle: '#000',
      strokeWidth: 3,
      x1: x1 + dx * (i - 1), y1: y1 + dy * (i - 1),
      x2: x1 + dx * i, y2: y1 + dy * i,
    });

  }, 10)
}

function customCoordX(dx) {
  return canvas.width() / 2 + dx;
}

function customCoordY(dy) {
  return canvas.height() / 2 + dy;
}

function customCoordX2(dx) {
  return body.width() / 2 + dx;
}

function customCoordY2(dy) {
  return body.height() / 2 + dy;
}
