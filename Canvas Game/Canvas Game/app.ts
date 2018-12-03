let gameObjectList: Array<GameObject> = new Array<GameObject>();

class Main {

    public static canvas: HTMLCanvasElement = document.createElement('canvas');
    public static ctx: CanvasRenderingContext2D = Main.canvas.getContext("2d");


    public static roomWidth: number = 640;
    public static roomHeight: number = 480;

    public static main(): void {

        //Generate Canvas
        this.canvas.width = this.roomWidth;
        this.canvas.height = this.roomHeight;
        this.canvas.style.border = "1px solid";
        document.body.appendChild(this.canvas);

        //Add game objects
        gameObjectList = new Array<GameObject>();
        


        //Perform Create Events
        let index: number = 0;
        while (index < gameObjectList.length) {
            gameObjectList[index].create();
            index++;
        }

        let fps: number = 60;
        setInterval(this.run, 1000 / fps);

    }

    public static run(): void {

        //Do the Step and Draw Events
        let index: number = 0;
        Main.ctx.clearRect(0, 0, Main.roomWidth, Main.roomHeight);
        while (index < gameObjectList.length) {
            gameObjectList[index].step();
            gameObjectList[index].draw();
            index++;
        }
    }

    public static RandomRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

//object interface
interface GameObject {
    x: Number;
    y: Number;
    hspeed: Number;
    vspeed: Number;
    create(): void;
    step(): void;
    draw(): void;
}


