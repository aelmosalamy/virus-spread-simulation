var circles = [];
const r = 10;
const numCircles = 100;
const initSick = 1;
function setup() {
	createCanvas(640, 480);

	stroke(255);
	//fill(255, 0, 255, 50)
	
	// Creating many circle objects without overlapping
	let count = 0;
	while (count < numCircles) {

		let circle = {
			x: random(width - r * 2) + r,
			y: random(height - r * 2) + r,
			r: r,
			isSick: count < initSick ? true : false,
			willCollide: false,
			dir: random(360),
			vel: {
						x: 0,
						y: 0
					},
			speedMult: {
						x: 1,
						y: 1
					}
		};

		let overlap = false;

		for (let j = 0; j < circles.length; j++) {
			let distance = dist(circle.x, circle.y, circles[j].x, circles[j].y);

			if (distance <= (circle.r) + (circles[j].r)) {
				// THEY ARE OVERLAPPING
				overlap = true;
				break;
			}
		}

		if (!overlap) {
			circles.push(circle)
			count++;
		}

	}

}

function draw() {
	background(55);
	// Move circles
	for (let i = 0; i < circles.length; i++) {
		update(circles[i])
	}

	// Drawing circles using the coordinates from our array
	for (let i = 0; i < circles.length; i++) {
		circles[i].isSick ? fill(255, 0, 0, 55) : fill(0, 255, 0, 55);
		ellipse(circles[i].x, circles[i].y, circles[i].r * 2)
	}
}

function update(circle) {
	let newX = circle.x + circle.vel.x;
	let newY = circle.y + circle.vel.y;
	// Check for collision
	// 1) With screen
	// 1.x
	if (newX + circle.r >= width) {
		circle.speedMult.x *= -1
	} else if (newX - circle.r <= 0) {
		circle.speedMult.x *= -1
	}
	// 1.y
	if (newY + circle.r >= height) {
		circle.speedMult.y *= -1
	} else if (newY - circle.r <= 0) {
		circle.speedMult.y *= -1
	}

	//2) With other circles
	for (let i = 0; i < circles.length; i++) {
		var other = circles[i]
		
		let distance = dist(circle.x, circle.y, other.x, other.y)

		if (other !== circle && distance <= circle.r + other.r) {
			
			if (circle.isSick) {
				other.isSick = true;
			}

			// Collision resolution - Right now it just goes to the direction opposite to where it was heading regardless of whichever side it collided at, work in progress
			circle.speedMult.x *= -1;
			circle.speedMult.y *= -1;

			break;
		}
		
	}

	circle.vel.x = Math.cos(circle.dir) * circle.speedMult.x
	circle.vel.y = Math.sin(circle.dir) * circle.speedMult.y

	circle.x += circle.vel.x
	circle.y += circle.vel.y

}