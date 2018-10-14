const SPEC_CHAR = [
  {
    from: /  /g,
    to: " &nbsp;"
  },
  {
		org: /</g,
		to: "&#60;"
	},
  {
		org: />/g,
		to: "&#62;"
	},
];


var codes = [
  {
    title: "YoutubePass",
    code: 'var width = window.getComputedStyle(document.getElementById(\'player-container\'), null).width;\nwidth = width.substring(0, width.length - 2);\nvar height = window.getComputedStyle(document.getElementById(\'player-container\'), null).height;\nheight = height.substring(0, height.length - 2);\n\nvar errScreen = document.getElementById(\'error-screen\');\nerrScreen.style.visibility = \'hidden\';\nvar container = document.getElementById(\'player-container\');\nvar addr = location.href;\nvar id = addr.substring(addr.indexOf(\'=\') + 1, addr.indexOf(\'=\') + 12);\nvar html = \'<iframe width=\'\' + width + \'\' height=\'\' + height + \'\' src=\'https://www.youtube.com/embed/\' + id + \'\' frameborder=\'0\' allowfullscreen=\'\'></iframe>\'\ncontainer.innerHTML = html;\ncontainer.style.visibility = \'visible\';'
  }
];

var bodyBox = $("#bodyBox");
/*
for (var i = 0;i < codes.length;i ++)
  bodyBox.html("" + new CodeBox(codes[i].title, codes[i].code).generate());
*/

function CodeBox(title, code, config) {
  for (var i = 0;i < SPEC_CHAR.length;i ++) {
    code = code.replace(SPEC_CHAR[i].from, SPEC_CHAR[i].from);
  }

  code = code.split("\n");

  this.line = code.length;
  this.width = 1236;
  this.height = 62 + 21 * this.line;
  this.styles = ['width: 1236px; height: ' + this.height + 'px; margin-top: 64px; margin-left: 150px; background-color: #FFFFFF; border: 1px solid #DFDFDF; border-radius: 4px;',
                 'width: 1234px; height: 42px; padding-left: 36px; margin-bottom: 8px; background-color: #FAFAFA; font-family: initial; text-align: left; line-height: 42px; border-radius: 4px 4px 0 0;',
                 'width: 46px; height: 21px; color: #C8C8C8; font-size: 14px; font-family: initial; text-align: right; float: left;',
                 'width: 1180px; color: #000000; font-size: 14px; font-family: Consolas; text-align: left; float: right;'];
  this.parts = ['<div class="codeBoxWrapper" style="',                      // style
                '"> <div class="titleBox" style="',                         // style
                '">' + title + '</div> <div class="lineBox" style="',       // style
                '">',                                                       // lines
                '</div> <div class="codeBox" style="',                      // style
                '">',                                                       // code
                '</div> </div>'];

  this.trimCode = function() {
    var state = 0; // 0: normal, 1: in line annotation, 2: in block annotation, 3: in string by "", : in string bt ''
    for (var line = 0;line < this.line;line ++) {
      var str = code[line];
      for (var pos = 0;pos < str.length;pos ++) {
        if (state == 0) {
          if (str.indexOf("//") == pos) {
            state = 1;
          } else if (str.indexOf("//") == pos) {
            state = 2;
          } else if (str.indexOf("\"") == pos) {
            state = 3;
          } else if (str.indexOf("\'") == pos) {
            state = 4;
          }
        }
      }
    }
  };

  this.genLines = function() {
    var str = "";
    for (var i = 1;i <= this.line;i ++) {
      str += '<div class="line" style="width: 46px; height: 21px;">' + i + '</div>';
    }
    return str;
  };

  this.genCode = function() {
    var str = "";
    for (var i = 0;i < this.line;i ++) {
      str += '<div class="code">' + code[i] + '</div>';
    }
    return str;
  };

  this.generate = function() {
    return this.parts[0] + this.styles[0]
         + this.parts[1] + this.styles[1]
         + this.parts[2] + this.styles[2]
         + this.parts[3] + this.genLines()
         + this.parts[4] + this.styles[3]
         + this.parts[5] + this.genCode();
         + this.parts[6];
  };
}
