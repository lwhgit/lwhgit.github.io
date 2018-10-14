const REG_LINK = /^https{0,1}:\/\/[(www\.youtube\.com\/watch\?v=.{11,11})(youtu\.be\/.{11,11})]/;
var link = [];

var videoBox = $("#videoBox");

var listBox = $("#listBox")
var delBtn = $(".delBtn");

var addDialog = $("#addDialog");
var linkInput = $("#linkInput");
var playBtn = $("#playBtn");
var addBtn = $("#addBtn");
var cancelBtn = $("#cancelBtn");
var regBtn = $("#regBtn");

var ytArray = new Array();
var curPos = 0;

var ytPlayer;
var player;

var getVideoId = function(link) {
    var i = link.indexOf("v=");
    return link.substring(i + 2, i + 13);
};

var genComponent = function(link) {
  return '<div class="componentBox elevation1"><div class="indexView"></div><div class="regedLink">' + link
   + '</div><div class="delBtn"><i class="material-icons delIco">clear</i></div></div>';
};

var registerLink = function(link) {
  var id = getVideoId(link);
  ytArray.push(id);
  var html = genComponent(link);
  listBox.html(listBox.html() + html);
  M.toast({html: id});
  refreshEvent();
};

var refreshEvent = function() {
  delBtn = $(".delBtn");
  delBtn.on("click", function(event) {
    var curTarget = event.currentTarget;
    var parTarget = curTarget.parentElement;
    var index = parseInt(parTarget.firstChild.innerHTML);
    console.log(parTarget);
    ytArray.slice(index, 1);
    $(parTarget).remove();
  });
}

var setVideo = function(index) {
    videoBox.html('<div id="player"></div>');
    ytPlayer = new YT.Player('player', {
        playerVars: {
            'autoplay': 0,
            "cc_load_policy": 0,
            'controls': 3,
            "iv_load_policy": 1,
            "hl": "ko",
            'disablekb': 1,
        },
        videoId: ytArray[index],
        events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
        }
    });
    ytPlayer.setSize(1024, 576);
}

playBtn.on("click", function(event) {
  setVideo(curPos);
  //player = $("#player");
});

addBtn.on("click", function(event) {
  addDialog.css("display", "block");
});

cancelBtn.on("click", function(event) {
  addDialog.css("display", "none");
  linkInput.val("");
});

regBtn.on("click", function(event) {
  addDialog.css("display", "none");
  var link = linkInput.val();
  if (REG_LINK.test(link)) {
    registerLink(link);
  } else {
    M.toast({html: "This is not a youtube link."});
  }
  linkInput.val("");
});

function onPlayerReady(event) {
    ytPlayer.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log("Asdasd");
        curPos++;
        setVideo(curPos);
    }
}

registerLink("https://www.youtube.com/watch?v=QbhkI4KXpXs");
registerLink("https://www.youtube.com/watch?v=Fm5iP0S1z9w");

/*
for (var i = 0;i < link.length;i ++) {
  console.log(link[i] + "\n\t" + REG_LINK.test(link[i]));
}*/
