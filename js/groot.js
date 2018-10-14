var humanInput = $("#humanInput");
var grootInput = $("#grootInput");
var humanToGroot = $("#humanToGroot");

humanToGroot.on("click", function() {
  var result = "";
  var tmp = ["아", "이", " ", "엠", " ", "그", "루", "트"];
  var str = humanInput.val();
  var codeArr = new Array();

  for (var i = 0;i < str.length;i ++) {
    codeArr.push(str.charCodeAt(i));
  }

  var num = Math.ceil(str.length / 7);

  for (var i = 0;i < num;i ++) {
    for (var j = 0;j < 8;j ++) {
      result += tmp[j];
      var code = codeArr[i * 7 + j];
      for (var k = 0;k < (code == undefined ? 0 : code);k ++) {
        result += String.fromCharCode(0);
      }
    }
  }

  grootInput.val(result);
});
