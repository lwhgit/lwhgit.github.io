var ACCESS_TOKEN = "FAyw0XASVpAAAAAAAAAADFdilIoq6yS2HCRcPO9WuTEj2zmnUrtYKrgFGoAOUWUH";

var dbx = new Dropbox.Dropbox({
    accessToken: ACCESS_TOKEN
});

var loadingProgress = $("#loadingProgress");
var pathView = $("#pathView");
var listBox = $("#listBox");
var dirLists;           //  ----------------
var fileLists;          //  함수안에서 초기화
var optionBtns;         //  ----------------

var ui = {};
ui.genDirUI = function(entry) {
    return '<div class="dirList"> <i class="dirIcon material-icons">folder</i> <div class="titleView" >' + entry.name +'</div> <div class="optionBtn"> <i class="moreIcon material-icons">more_vert</i> </div> </div>';
};
ui.genFileUI = function(entry) {
    return'<div class="fileList"> <i class="fileIcon material-icons">insert_drive_file</i> <div class="titleView" >' + entry.name + '</div> <div class="optionBtn"> <i class="moreIcon material-icons">more_vert</i> </div> </div>';
};

var cloud = {};
cloud.path = [];
cloud.getCurrentPath = function() {
    var s = "";
    for (var  i = 0;i < cloud.path.length;i ++) {
        s += "/" + cloud.path[i];
    }
    return s;
};
cloud.list = [];

function initListener() {
    dirLists = $(".dirList");
    dirLists.on("click", function(event) {
        var target = $(event.currentTarget);
        var name = target.find(".titleView").text();
        cloud.path.push(name);
        refreshList();
    });

    fileLists = $(".fileList");
    fileLists.on("click", function(event) {
        console.log("FileList");
        console.log(event);
    });

    optionBtns = $(".optionBtn");
    optionBtns.on("click", function(event) {
        event.stopPropagation();
        console.log("Option");
        console.log(event);
    });

}

function refreshList() {
    pathView.text("lwhgit_Cloud" + cloud.getCurrentPath());
    loadingProgress.css("display", "block");
    dbx.filesListFolder({
        path: cloud.getCurrentPath()
    }).then(function(response) {
        cloud.list = response.entries;
        refreshUI();
    }).catch(function(error) {
        console.log(error);
    });
}

function refreshUI() {
    removeAllList();
    loadingProgress.css("display", "none");

    var dirs = [];
    var files = [];

    for (var i = 0;i < cloud.list.length;i ++) {
        f = cloud.list[i];

        if (f[".tag"] == "folder") {
            dirs.push(f);
        } else if (f[".tag"] == "file") {
            files.push(f);
        }
    }

    for (var i = 0;i < dirs.length;i ++) {
        d = dirs[i];
        listBox.append(ui.genDirUI(d));
    }

    for (var i = 0;i < files.length;i ++) {
        f = files[i];
        listBox.append(ui.genFileUI(f));
    }

    initListener();
}

function removeAllList() {
    listBox.html("");
}

function init() {
    refreshList();
    $(document).on("keydown", function(event) {
        console.log(event);

        if (event.keyCode == 8) {
            event.preventDefault();
            if (cloud.path.length > 0) {
                cloud.path.pop();
                refreshList();
            }
        }
    });
}

init();
