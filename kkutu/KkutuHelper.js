var frame = document.createElement('iframe');
document.body.appendChild(frame);
_setInterval = frame.contentWindow.setInterval;
_setTimeout = frame.contentWindow.setTimeout;

const HELPER_HTML = "<div id='kkutu_helper' class='dialog dialog-front' style='width: 300px; height: 300px; left: 287px; top: 328.5px;'> <div class='dialog-head'> <div id='kkutu_helper_title' class='dialog-title' style='width: 280px;'>Kkutu Helper</div> <div id='kkutu_helper_closeBtn' class='closeBtn'></div> </div>  <div class='dialog-body' style='font-size: 13px;'> <div id='kkutu_helper_tab' style='width: 100%; height: 30px;'>  <button id='kkutu_helper_tab_kkutu' class='helper_tab' style='width: 50%; background-color: #EAEAEA; float: left; box-sizing: border-box;' value='kkutu'>끝말잇기</button>  <button id='kkutu_helper_tab_typing' class='helper_tab' style='width: 50%; background-color: #DDDDDD; float: left; box-sizing: border-box;' value='typing'>타자대결</button> </div> </div>  <div class='dialog-bar'> <div style='width: 100%; height: 30px;'>  <div style='width: 50%; height: 15px; margin-top: 15px; font-size: 15px;line-height: 15px; color: black; float: left;'>단어 입력 속도</div>  <div style='width: 25%; height: 15px; margin-top: 15px; padding-left: 15px; font-size: 15px; line-height: 15px; border-left: 1px solid gray; color: black; float: left; box-sizing: border-box;'>절대 속도</div>   <input id='kkutu_helper_absDelay' type='checkbox' style='width: 20%; margin-top: 15px; float: left; box-sizing: border-box;'> </div> <div style='width: 100%; height: 33px;'>  <input id='kkutu_helper_delay' type='range' min='0' max='1000' value='0' style='width: 70%; height: auto; float: left;'>  <div id='kkutu_helper_delay_view' style='width: 20%; height: 100%; text-align: center; line-height: 33px; font-size: 13px; color: black; float: left;'>0 ms</div> </div> </div>  <div class='dialog-bar tail-button' style='width: 100%; height: 60px;'> <div style='width: 102px; height: 100%; float: right;'>  <div style='width: 102px; text-align: center;'>Active</div>  <button id='kkutu_helper_activeBtn' style='background-color: #EDEDED;'>OFF</button> </div>  <div class='product-title' style='width: 190px; height: 90%;'>  <div style='width: 100px; font-size: 12px; float: left;'>내 턴?</div>  <div style='width: 15px; font-size: 12px; float: left;'>:</div>  <div id='kkutu_helper_myTurnView' style='width: 70px; font-size: 12px; float: left;'>false</div>  <div style='width: 100px; font-size: 12px; float: left;'>시작 단어</div>  <div style='width: 15px; font-size: 12px; float: left;'>:</div>  <div id='kkutu_helper_startWordView' style='width: 70px; font-size: 12px; float: left;'>undefined</div>  <div style='width: 100px; font-size: 12px; float: left;'>찾은 단어 수</div>  <div style='width: 15px; font-size: 12px; float: left;'>:</div>  <div id='kkutu_helper_foundWordCountView' style='width: 70px; font-size: 12px; float: left;'>0</div> </div> </div>  <div class='dialog-bar' style='width: 100%; height: auto;'> <h5 class='product-title'><i class='fa fa-comment'></i>채팅</h5> </div>  <div class='dialog-bar tail-button' style='margin: 2px 0;'> <button id='kkutu_helper_onlyFocusBtn' style='background-color: #EDEDED;'>OFF</button> <span style='display: block; line-height: 32px; font-size: 13px;'>기존 채팅창에 포커스 가지 않기</span> </div>  <div class='dialog-bar tail-button'> <div style='width: 100%;'>  <input id='kkutu_helper_talk' style='width: 230px; height: 14px; border-top-right-radius: 0px; border-bottom-right-radius: 0px; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);'>  <button id='kkutu_helper_chatBtn' style='width: 41px; height: 14px; border-top-left-radius: 0px; border-bottom-left-radius: 0px;'>전송</button> </div> </div> </div>"
const STATE_NONE = 0;
const STATE_TYPING = 1;
const STATE_END = 2;
const STATE_RESET = 3;

//var jq = document.createElement("script");
//jq.setAttribute("type", "text/javascript");
//jq.setAttribute("src", "https://code.jquery.com/jquery-2.1.1.min.js");
//document.body.appendChild(jq);
$("body").append(HELPER_HTML);
$("body").append("<script src='https://lwhgit.github.io/kkutu/words.js'></script>");

var altKeyDown = false;
var hKeyDown = false;
var onlyFocus = false;
var isPc = false;
var typingDelay = 0;
var type = "kkutu";
var enable = false;
var currentState = 0;
var overlapWords = new Array();
var interval = null;
var absDelay = false;

var currentRound = 0;

var typingWord = "";

var gameInput = $(".game-input");
var gameInputForm = $("#game-input");
var gameDisplay = $("div[class='jjo-display ellipse']");
if (gameDisplay.length == 0) {
	gameDisplay = $("div[class='jjo-display']");
	//$(HELPER_OPEN_BUTTON_HTML).insertAfter("#menu-item-GAMES");
	isPc = false;
}else {
	//$(HELPER_OPEN_BUTTON_HTML).insertAfter("#menu-item-HOME");
	isPc = true;
}
var gameBoxProduct = $("div[class='GameBox Product']");
var talk = $(".product-body input");
var chatBtn = $("#ChatBtn");
var helper = $("#kkutu_helper");
var helperCloseBtn = $("#kkutu_helper_closeBtn");
var helperActiveBtn = $("#kkutu_helper_activeBtn");

var kkutuHelperTitle = $("#kkutu_helper_title")
var kkutuHelperMyTurnView = $("#kkutu_helper_myTurnView")
var kkutuHelperStartWordView = $("#kkutu_helper_startWordView")
var kkutuHelperFoundWordCountView = $("#kkutu_helper_foundWordCountView")
var kkutuHelperOnlyFocusBtn = $("#kkutu_helper_onlyFocusBtn");
var kkutuHelperTalk = $("#kkutu_helper_talk");
var kkutuHelperChatBtn = $("#kkutu_helper_chatBtn");

var tab = {
	kkutu: $("#kkutu_helper_tab_kkutu"),
	typing: $("#kkutu_helper_tab_typing"),
	all: $(".helper_tab")
};

var delay = {
	abs: $("#kkutu_helper_absDelay"),
	setter: $("#kkutu_helper_delay"),
	viewer: $("#kkutu_helper_delay_view"),
};

var isGameInputShowing = function() {
	return gameInput.css("display") == "block";
};

var isGaminig = function() {
	return gameBoxProduct.css("display") == "block";
};

var getStartWord = function() {
	var txt = gameDisplay.html();
	if (txt.startsWith("<label>")) {
		console.log(txt);
		return false;
	}else if (txt.length == 1 || (/^[가-힣][(][가-힣][)]$/).test(txt)) {
		return txt;
	}
};

var getTypingWord = function() {
	var txt = gameDisplay.html();
	return txt.substring(txt.indexOf(">") + 1, txt.lastIndexOf("<"));
};

var getText = function(word) {
	var arr = new Array();
	if (word.length == 1) {
		for (var i = 0;i < words.length;i ++) {
			var w = words[i];
			if (w.startsWith(word) && overlapWords.indexOf(w) == -1) {
				arr.push(w);
			}
		}
	}else {
		var firstWord = word.substring(0, 1);
		var secondWord = word.substring(2, 3);
		for (var i = 0;i < words.length;i ++) {
			var w = words[i];
			if (overlapWords.indexOf(w) == -1) {
				if (w.startsWith(firstWord) || w.startsWith(secondWord)) {
					arr.push(w);
				}
			}
		}
	}
	
	kkutuHelperFoundWordCountView.html(arr.length);
	
	arr.sort(function(a, b) {
		return b.length - a.length;
	});
		
	if (arr.length >= 0) {
		return arr[0];
	}else {
		return false;
	}
};

var getHistory = function() {
	var historyWords = $("div[class='ellipse history-item expl-mother']");
	var html = historyWords.html();
	if (html) {
		return html.substring(0, html.indexOf("<"));
	}
};

var getCurrentRound = function() {
	var rounds = $(".rounds label");
	
	for (var i = 0;i < rounds.size();i ++) {
		if (rounds.eq(i).attr("class") == "rounds-current") {
			return (i + 1);
		}
	}
};

function a(a, b, c) {
	var d = a.position();
	$(window).on("mousemove", function (e) {
		var f = e.pageX - b,
		g = e.pageY - c;
		a.css("left", d.left + f),
		a.css("top", d.top + g)
	})
}

function b(a) {
	$(window).off("mousemove")
}

function showKkutuHelper() {
	var c = [$(window).width(), $(window).height()];
	helper.show().addClass("dialog-front").css({
		left: .5 * (c[0] - helper.width()),
		top: .5 * (c[1] - helper.height())
	});
				
	$(".dialog-head .dialog-title").on("mousedown", function (b) {
		var c = $(b.currentTarget).parents(".dialog");
		$(".dialog-front").removeClass("dialog-front"),
		c.addClass("dialog-front"),
		a(c, b.pageX, b.pageY)
	}).on("mouseup", function (a) {
		b();
	});
}

function sendTextRelatively(str) {
	currentState = STATE_TYPING;
	talk.val("");
	
	if (isPc) {
		var i = 0;
		interval = _setInterval(function() {
			talk.val(talk.val() + str.charAt(i));
			i ++;
			
			if (i == str.length) {
				chatBtn.trigger("click");
				currentState = STATE_END;
				clearInterval(interval);
			}
		}, typingDelay);
	}
}

function sendTextAbsolutely(str) {
	currentState = STATE_TYPING;
	
	if (isPc) {
		talk.val(str);
		_setTimeout(function() {
			chatBtn.trigger("click");
			currentState = STATE_END;
		}, typingDelay);
	}
}

$("html").keydown(function(event) {
	if (event.keyCode == 18) {
		altKeyDown = true;
	}
	
	if (event.keyCode == 72 && altKeyDown == true && hKeyDown == false) {
		hKeyDown = true;
		if (helper.css("display") == "block") {
			helper.hide();
		}else {
			showKkutuHelper();
		}
	}
}).keyup(function(event) {
	if (event.keyCode == 18) {
		altKeyDown = false;
	}
	
	if (event.keyCode == 72) {
		hKeyDown = false;
	}
});

helperCloseBtn.click(function() {
	helper.hide();
});

tab.all.click(function() {
	tab.all.css("background-color", "#DDDDDD");
	var tg = $(event.target);
	tg.css("background-color", "#EAEAEA");
	type = tg.val();
	console.log(type);
});

delay.setter.on("input change", function() {
	typingDelay = delay.setter.val();
	delay.viewer.text(delay.setter.val() + " ms");
});

delay.abs.click(function() {
	absDelay = delay.abs.is(":checked");
});

helperActiveBtn.click(function() {
	enable = !enable;
	myTurn = false;
	overlapWords = new Array();
	
	if (enable) {
		helperActiveBtn.css("background-color", "#FFEDED");
		helperActiveBtn.css("color", "#FF8888");
		helperActiveBtn.text("ON");
	}else {
		helperActiveBtn.css("background-color", "#EDEDED");
		helperActiveBtn.css("color", "#000000");
		helperActiveBtn.text("OFF");
		
		kkutuHelperTitle.html("Kkutu Helper");
	}
});

_setInterval(function() {
	if (enable) {
		
		var isMyTurn = (isGameInputShowing() == true && currentState == STATE_NONE);
		kkutuHelperMyTurnView.html("" + isMyTurn);
		
		var gamming = isGaminig();
		if (gamming) {
			kkutuHelperTitle.html("Kkutu Helper - 게임중");
		}else {
			kkutuHelperTitle.html("Kkutu Helper - 대기중");
			overlapWords = new Array();
		}
		
		if (gamming) {
			if (type == "kkutu") {
				if (isGameInputShowing() == false && currentState == STATE_END) {
					currentState = STATE_NONE;
				}
				var s = getStartWord();
				
				if (isMyTurn) {
					if (s) {
						kkutuHelperStartWordView.html(s);
						var w = getText(s);
						if (w) {
							if (absDelay) {
								sendTextAbsolutely(w);
							}else {
								sendTextRelatively(w);
							}
						}else {
							console.log(w + " : Couldn't find word.");
						}
					}
				}
				var tmp = getCurrentRound();
				
				if (currentRound != tmp) {
					console.log("Helper Reset.");
					
					overlapWords = new Array();
					currentState = 0;
					currentRound = 0;
					typingWord = "";
					
					currentRound = tmp;
				}
				
				var h = getHistory();
				if(h) {
					if (overlapWords.indexOf(h) == -1) {
						overlapWords.push(h);
					}
				}
			}else if (type == "typing") {
				var recentWord = getTypingWord();
				
				if (typingWord != recentWord && currentState == STATE_END) {
					currentState = STATE_NONE;
				}
				
				if (isMyTurn) {
					if (recentWord) {
						kkutuHelperStartWordView.html(recentWord);
						if (absDelay) {
							sendTextAbsolutely(recentWord);
						}else {
							sendTextRelatively(recentWord);
						}
						
						
						typingWord = recentWord;
					}
				}
			}
		}
	}
}, 1);
showKkutuHelper();