import { tag } from "./handler.js";
import { Routes } from "./types";

let animFrame: number;

export const gameHandler = (route: Routes) => {
	console.log("current route: ", route.description);
	const entry = document.getElementById("entry");
	const gameBoard = document.getElementById(
		"game-board"
	) as HTMLCanvasElement;
	const ctx = gameBoard.getContext("2d");

	console.log(gameBoard);
	console.log(ctx);

	const ball = {
		x: 75,
		y: 50,
		vx: 5,
		vy: 2,
		radius: 17.5,
		color: "blue",
		move() {
			this.x += this.vx;
			this.y += this.vy;

			if (
				this.x + this.radius >= gameBoard.width ||
				this.x - this.radius <= 0
			)
				this.vx *= -1;
			if (
				this.y + this.radius >= gameBoard.height ||
				this.y - this.radius <= 0
			)
				this.vy *= -1;
			console.log("Ball X: ", this.x, ", velocity X: ", this.vx);
			console.log("Ball Y: ", this.y, ", velocity Y: ", this.vy);
			return this;
		},
		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();
			return this;
		},
	};

	const draw = () => {
		ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
		ball.draw().move();
		animFrame = window.requestAnimationFrame(draw);
	};

	gameBoard.addEventListener("mouseover", (e: MouseEvent) => {
		animFrame = window.requestAnimationFrame(draw);
	});

	gameBoard.addEventListener("mouseout", (e: MouseEvent) => {
		window.cancelAnimationFrame(animFrame);
	});

	ball.draw();

	const elements = tag("div", "hello world!");
	entry.appendChild(elements);
};
