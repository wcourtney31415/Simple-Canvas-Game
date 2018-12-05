var gameObjectList = new Array();
var Main = (function () {
    function Main() {
    }
    Main.main = function () {
        //Generate Canvas
        var canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        //Do Game stuff
        var mygame = new Game(canvas);
        mygame.add(new Circle(100, 200));
        mygame.add(new Circle(100, 200));
        mygame.performStartEvents();
        mygame.startGameLoop();
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
        var ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
        ctx.fill();
    };
    return Circle;
}());
var Game = (function () {
    function Game(canvas) {
        this.objectList = new Array();
        this.canvas = canvas;
    }
    Game.prototype.add = function (gameObject) {
        gameObject.canvas = this.canvas;
        this.objectList.push(gameObject);
    };
    Game.prototype.performStartEvents = function () {
        //Perform Create Events
        var index = 0;
        while (index < this.objectList.length) {
            alert(index);
            this.objectList[index].create();
            index++;
        }
    };
    Game.prototype.startGameLoop = function () {
        //Begin game Loop
        var fps = 60;
        setInterval(Main.run, 1000 / fps);
    };
    return Game;
}());
//# sourceMappingURL=app.js.map