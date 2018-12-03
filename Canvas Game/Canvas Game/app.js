var gameObjectList = new Array();
var Main = (function () {
    function Main() {
    }
    Main.main = function () {
        //Generate Canvas
        this.canvas.width = this.roomWidth;
        this.canvas.height = this.roomHeight;
        this.canvas.style.border = "1px solid";
        document.body.appendChild(this.canvas);
        //Add game objects
        gameObjectList = new Array();
        gameObjectList.push(new Circle(this.RandomRange(1, this.roomWidth - 1), this.RandomRange(1, this.roomHeight - 1)));
        //Perform Create Events
        var index = 0;
        while (index < gameObjectList.length) {
            gameObjectList[index].create();
            index++;
        }
        var fps = 60;
        setInterval(this.run, 1000 / fps);
    };
    Main.run = function () {
        //Perform Step and Draw Events
        var index = 0;
        Main.ctx.clearRect(0, 0, Main.roomWidth, Main.roomHeight);
        while (index < gameObjectList.length) {
            gameObjectList[index].step();
            gameObjectList[index].draw();
            index++;
        }
    };
    Main.RandomRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Main.canvas = document.createElement('canvas');
    Main.ctx = Main.canvas.getContext("2d");
    Main.roomWidth = 640;
    Main.roomHeight = 480;
    return Main;
}());
//Circle class
var Circle = (function () {
    function Circle(x, y) {
        this.x = x;
        this.y = y;
    }
    Circle.prototype.create = function () {
        this.hspeed = 5;
        this.vspeed = 5;
    };
    Circle.prototype.step = function () {
        if (this.x + this.hspeed < 0 || this.x + this.hspeed > Main.roomWidth) {
            this.hspeed *= -1;
        }
        else {
            this.x += this.hspeed;
        }
        if (this.y + this.vspeed < 0 || this.y + this.vspeed > Main.roomHeight) {
            this.vspeed *= -1;
        }
        else {
            this.y += this.vspeed;
        }
    };
    Circle.prototype.draw = function () {
        Main.ctx.beginPath();
        Main.ctx.fillStyle = "yellow";
        Main.ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
        Main.ctx.fill();
    };
    return Circle;
}());
//# sourceMappingURL=app.js.map