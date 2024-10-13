import { tag } from "./handler.js";
import { Routes } from "./types";

let animFrame: number;
const ball = {
	x: 75,
	y: 50,
	vx: 5,
	vy: 2,
	maxvX: 10,
	maxvY: 4,
	radius: 17.5,
	color: "red",
	move(canvas: HTMLCanvasElement) {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			if (this.vx > 0 && this.vx < this.maxvX) this.vx += 1;
			else if (this.vx < 0 && this.vx > -this.maxvX) this.vx -= 1;
			this.vx *= -1;
		}
		if (
			this.y + this.radius >= canvas.height ||
			this.y - this.radius <= 0
		) {
			if (this.vy > 0 && this.vy < this.maxvY) this.vy += 1;
			else if (this.vy < 0 && this.vy > -this.maxvY) this.vy -= 1;
			this.vy *= -1;
		}
		// console.log("Ball X: ", this.x, ", velocity X: ", this.vx);
		// console.log("Ball Y: ", this.y, ", velocity Y: ", this.vy);
		return this;
	},
	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		return this;
	},
};

const paddleLeft = {
	x: 0,
	y: 50,
	vy: 10,
	width: 50,
	height: 100,
	color: "blue",
	keys: {
		up: false,
		down: false,
		upKey: "w",
		downKey: "s",
	},
	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		return this;
	},
	move(ctx: CanvasRenderingContext2D) {
		if (this.keys.up) this.y -= this.vy;
		if (this.keys.down) this.y += this.vy;
	},
	keyHandler(event: KeyboardEvent, value: boolean) {
		if (event.key == this.keys.upKey) this.keys.up = value;
		if (event.key == this.keys.downKey) this.keys.down = value;
	},
};

const paddleRight = {
	x: 0,
	y: 50,
	vy: 10,
	width: 50,
	height: 100,
	color: "green",
	keys: {
		up: false,
		down: false,
		upKey: "ArrowUp",
		downKey: "ArrowDown",
	},
	draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx.fillRect(
			canvas.width - this.width,
			this.y,
			this.width,
			this.height
		);
		return this;
	},
	move(ctx: CanvasRenderingContext2D) {
		if (this.keys.up) this.y -= this.vy;
		if (this.keys.down) this.y += this.vy;
	},
	keyHandler(event: KeyboardEvent, value: boolean) {
		if (event.key == this.keys.upKey) this.keys.up = value;
		if (event.key == this.keys.downKey) this.keys.down = value;
	},
};

export const gameHandler = (route: Routes) => {
	console.log("current route: ", route.description);
	const entry = document.getElementById("entry");
	const gameBoard = document.getElementById(
		"game-board"
	) as HTMLCanvasElement;
	const ctx = gameBoard.getContext("2d");

	// console.log(gameBoard);
	// console.log(ctx);

	const clear = () => {
		// ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
		ctx.fillStyle = "rgb(255 255 255 / 30%)";
		ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
	};

	const draw = () => {
		clear();
		ball.draw(ctx).move(gameBoard);
		paddleLeft.draw(ctx).move(gameBoard);
		paddleRight.draw(gameBoard, ctx).move(gameBoard);
		animFrame = window.requestAnimationFrame(draw);
	};

	gameBoard.addEventListener("mouseover", (e: MouseEvent) => {
		animFrame = window.requestAnimationFrame(draw);
	});

	gameBoard.addEventListener("mouseout", (e: MouseEvent) => {
		window.cancelAnimationFrame(animFrame);
	});

	document.addEventListener("keydown", (e) => {
		paddleLeft.keyHandler(e, true);
		paddleRight.keyHandler(e, true);
	});

	document.addEventListener("keyup", (e) => {
		paddleLeft.keyHandler(e, false);
		paddleRight.keyHandler(e, false);
	});

	ball.draw(ctx);
	paddleLeft.draw(ctx);

	const elements = tag("div", "hello world!");
	entry.appendChild(elements);
};
