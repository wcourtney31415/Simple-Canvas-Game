let gameObjectList: Array<GameObject> = new Array<GameObject>();

class Main {

    public static main(): void {

        //Generate Canvas
        let canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);

        //Do Game stuff
        let mygame: Game = new Game(canvas);

        mygame.add(new Circle(100, 200));
        mygame.add(new Circle(100, 200));

        mygame.performStartEvents();
        mygame.startGameLoop();

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
    canvas: HTMLCanvasElement;
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
    public canvas: HTMLCanvasElement;
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

        let ctx: CanvasRenderingContext2D = this.canvas.getContext("2d");

        ctx.beginPath();

        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Game {

    private canvas;
    private objectList: Array<GameObject> = new Array<GameObject>();

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public add(gameObject: GameObject): void {
        gameObject.canvas = this.canvas;
        this.objectList.push(gameObject);
    }

    public performStartEvents(): void {
        //Perform Create Events
        let index: number = 0;
        while (index < this.objectList.length) {
            alert(index);
            this.objectList[index].create();
            index++;
        }
    }

    public startGameLoop(): void {
        //Begin game Loop
        let fps: number = 60;
        setInterval(Main.run, 1000 / fps);
    }

}
