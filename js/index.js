var bodyBox = $("#bodyBox");
bodyBox.on("mousemove", function(event) {
    particle.addParticle(event, particle.type.MOVE);
});

var particle = {};
particle.obj.arr = [];
particle.obj.limit = 100;
particle.obj.index = 0;
particle.type = {};
particle.type.MOVE = 1;
particle.velocity = 0;
particle.x = 0;
particle.y = 0;

particle.addParticle = function(event, type) {
    var x = event.offsetX;
    var y = event.offsetY;
    particle.velocity = Math.sqrt(Math.pow(particle.x - x, 2) + Math.pow(particle.y - y, 2));

    if (type == 1) {

    }

    particle.x = x;
    particle.y = y;
};

particle.run = function() {
    for (var i = 0;i < particle.limit;i ++) {
        var obj = particle.obj.arr[i];

        if (obj.life > 0) {
            obj.run();
        }
    }
};
