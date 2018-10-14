const BLOCK_AIR = 0;
const BLOCK_ITEM1 = 4;
const BLOCK_ITEM2 = 5;
const BLOCK_ITEM3 = 6;
const BLOCK_BLOCK1 = 7;
const BLOCK_BLOCK2 = 8;

var bodyWrapper = $("#bodyWrapper");
var canvasBox = $("#canvasBox");
var optionBox = $("#optionBox");
var resetBtn = $("#resetBtn");
var convertBtn = $("#convertBtn");
var itemBtns = $(".selectBtn");
var canvas = $("#canvas");

var resultDialog = $("#resultDialog");
var resultInput = $("#resultInput");
var cancelBtn = $("#cancelBtn");

var blockImgs = new Array();

var mouse = {
  x: 0,
  y: 0,
  state: new Array()
};

var map = null;
var mapSize = 0;
var blockSize = 0;
var curBlock = BLOCK_ITEM1;

function init() {
    map = new Array(20);
    for (var i = 0;i < 20;i ++) {
        map[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    loadImagePath();

    var width = bodyWrapper.width();
    var height = bodyWrapper.height();
    mapSize = height * 0.8;
    blockSize = mapSize / 20;
    canvasBox.css("margin-top", height * 0.1 + "px");
    canvasBox.css("width", mapSize + "px");
    canvasBox.css("height", mapSize + "px");
    canvas.on('contextmenu', function() {
      return false;
    });
    canvas.attr("width", mapSize);
    canvas.attr("height", mapSize);
    canvas.css("width", mapSize + "px");
    canvas.css("height", mapSize + "px");

    itemBtns.on("click", function(event) {
        itemBtns.css("background-color", "#ffffff");
        var target = $(event.currentTarget);
        var id = target[0].id;
        target.css("background-color", "#dddddd");

        if (id == "item1Btn") {
            curBlock = BLOCK_ITEM1;
        } else if (id == "item2Btn") {
            curBlock = BLOCK_ITEM2;
        } else if (id == "item3Btn") {
            curBlock = BLOCK_ITEM3;
        } else if (id == "block1Btn") {
            curBlock = BLOCK_BLOCK1;
        } else if (id == "block2Btn") {
            curBlock = BLOCK_BLOCK2;
        }
    })

    resetBtn.on("click", init);
    convertBtn.on("click", convert);

    cancelBtn.on("click", function(event) {
      resultDialog.css("display", "none");
    });

    console.log("Map Size: " + mapSize);
    console.log("Block Size: " + blockSize);

    var color = "";
    for (var xpos = 0;xpos < 20;xpos ++) {
        for (var ypos = 0;ypos < 20;ypos ++) {
            if ((xpos + ypos) % 2 == 1) {
                color = "#FFFF79";
            } else if ((xpos + ypos) % 2 == 0) {
                color = "#FFD133";
            }

            canvas.drawRect({
              fillStyle: color,
              x: (xpos + 0.5) * blockSize,
              y: (ypos + 0.5) * blockSize,
              width: blockSize,
              height: blockSize
            });
        }
    }

    canvas.on("mousedown", function(event) {
        var x = Math.floor(event.offsetX / blockSize);
        var y = Math.floor(event.offsetY / blockSize);
        console.log(x + "\t" + y);
        if (event.button == 0) {
            mouse.state[0] = 1;
            put(x, y, curBlock);
        } else if (event.button = 2) {
            mouse.state[2] = 1;
            remove(x, y);
        }
    });
    canvas.on("mouseup", function(event) {
        if (event.button == 0) {
            mouse.state[0] = 0;
        } else if (event.button = 2) {
            mouse.state[2] = 0;
        }
    });
    canvas.on("mousemove", function(event) {
        var x = Math.floor(event.offsetX / blockSize);
        var y = Math.floor(event.offsetY / blockSize);

      if (mouse.state[0] == 1) {
          put(x, y, curBlock);
      } else if (mouse.state[2] == 1) {
          remove(x, y);
      }
    });
    canvas.on("mouseleave", function(event) {
        mouse.state[0] = 0;
        mouse.state[2] = 0;
    });
}

function loadImagePath() {
    blockImgs[BLOCK_ITEM1] = "res/img/gamapgen/item1.png";
    blockImgs[BLOCK_ITEM2] = "res/img/gamapgen/item2.png";
    blockImgs[BLOCK_ITEM3] = "res/img/gamapgen/item3.png";
    blockImgs[BLOCK_BLOCK1] = "res/img/gamapgen/block1.png";
    blockImgs[BLOCK_BLOCK2] = "res/img/gamapgen/block2.png";
}

function put(xpos, ypos, block) {
    remove(xpos, ypos);
    canvas.drawImage({
      source: blockImgs[block],
      x: (xpos + 0.5) * blockSize,
      y: (ypos + 0.5) * blockSize,
      width: blockSize,
      height: blockSize
    });
    map[xpos][ypos] = block;
}

function remove(xpos, ypos) {
    var color = ((xpos + ypos) % 2 == 1) ? "#FFFF79" : "#FFD133";
    canvas.drawRect({
      fillStyle: color,
      x: (xpos + 0.5) * blockSize,
      y: (ypos + 0.5) * blockSize,
      width: blockSize,
      height: blockSize
    });
    map[xpos][ypos] = 0;
}

function convert() {
    var str = "{\n";

    for (var x = 0;x < 20;x ++) {
        str += "{"
        for (var y = 19;y >= 0;y --) {
            str += map[x][y];
            if (y > 0) {
                str += ", "
            }
        }
        str += "}"
        if (x < 19) {
            str += ","
        }
        str += "\n";
    }

    str += "}";

    resultInput.val(str);
    resultDialog.css("display", "block");
    console.log(str);
}

init();
