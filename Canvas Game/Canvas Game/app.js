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
        //Do the Step and Draw Events
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
//# sourceMappingURL=app.js.map