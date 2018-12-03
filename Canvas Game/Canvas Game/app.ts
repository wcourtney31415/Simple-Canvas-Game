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
        gameObjectList.push(new Circle(this.RandomRange(1, this.roomWidth - 1), this.RandomRange(1, this.roomHeight - 1)));

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

        //Perform Step and Draw Events
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

//Circle class
class Circle implements GameObject {
    public x: number;
    public y: number;
    public hspeed: number;
    public vspeed: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    create(): void {
        this.hspeed = 5;
        this.vspeed = 5;
    }
    step(): void {
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
    }
    draw(): void {
        Main.ctx.beginPath();
        Main.ctx.fillStyle = "yellow";
        Main.ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
        Main.ctx.fill();
    }
}
