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
        if (this.x + this.hspeed < 0 || this.x + this.hspeed > this.canvas.width) {
            this.hspeed *= -1;
        }
        else {
            this.x += this.hspeed;
        }

        if (this.y + this.vspeed < 0 || this.y + this.vspeed > this.canvas.height) {
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

    private canvas: HTMLCanvasElement;
    private objectList: Array<GameObject> = new Array<GameObject>();
    private ctx: CanvasRenderingContext2D;


    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.ctx = this.canvas.getContext("2d");

    }

    public add(gameObject: GameObject): void {

        gameObject.canvas = this.canvas;
        this.objectList.push(gameObject);
    }

    public performStartEvents(): void {

        //Perform Create Events
        let index: number = 0;
        while (index < this.objectList.length) {
            this.objectList[index].create();
            index++;
        }
    }

    public startGameLoop(): void {

        //Begin game Loop
        let fps: number = 60;

        setInterval(() => { this.run(); } , 1000 / fps);

    }

    public run(): void {

        //CODE BREAKING//
        //My hunch here is that something about the way that this "run" method is being called 
        //in the "setInterval" method is causing the "this.canvas" variable to appear empty.
        //After more testing it seems this method can't see values of instance variables for this class.
        //I think setInterval is calling this method in an odd way.
        



        //Perform Step and Draw Events
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let index: number = 0;
        while (index < this.objectList.length) {

            this.objectList[index].step();
            this.objectList[index].draw();
            index++;
        }
    }

}
