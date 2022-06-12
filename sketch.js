// Benedikt Groß
// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;

const drawBody = Helpers.drawBody;
const drawMouse = Helpers.drawMouse;
const drawConstraint = Helpers.drawConstraint;

let engine;
let ground;

let ball1;

let ramp;
let constraint;

let rampY = 520;
let weight = 0.01;


function setup() {
  const canvas = createCanvas(800, 600);

  // create an engine
  engine = Engine.create();

  // add revolute constraint for catapult
  ramp = Bodies.rectangle(400, 520, 1000, 20);
  constraint = Constraint.create({
    pointA: {x: 400, y: 300},
    bodyB: ramp,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [ramp, constraint]);

  // balls and catapult spacer for limit
  ball1 = Bodies.circle(360, -500, 50, {density: 0.01}); // make big one more 'heavy'
  World.add(engine.world, [ball1]);

  // ground
  ground = Bodies.rectangle(400, height-10, 810, 25, {isStatic: true});
  World.add(engine.world, [ground]);

  // setup mouse
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  stroke(255);
  fill(255);
  drawBody(ramp);
  drawBody(ball1);
  stroke(128);
  strokeWeight(2);
  //drawConstraint(constraint);

  noStroke();
  fill(128);
  drawBody(ground);

  drawMouse(mouseConstraint);
}

function incHeight(){
  Matter.World.remove(engine.world, ramp);
  Matter.World.remove(engine.world, ball1);

  rampY -= 10;

  ramp = Bodies.rectangle(400, rampY, 1000, 20);
  constraint = Constraint.create({
    pointA: {x: 400, y: rampY},
    bodyB: ramp,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [ramp, constraint]);

  ball1 = Bodies.circle(360, -500, 50, {density: 0.01}); // make big one more 'heavy'
  World.add(engine.world, [ball1]);

  draw();
}

function decHeight(){
  Matter.World.remove(engine.world, ramp);
  Matter.World.remove(engine.world, ball1);

  rampY += 10;

  ramp = Bodies.rectangle(400, rampY, 1000, 20);
  constraint = Constraint.create({
    pointA: {x: 400, y: rampY},
    bodyB: ramp,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [ramp, constraint]);

  ball1 = Bodies.circle(360, -500, 50, {density: 0.01}); // make big one more 'heavy'
  World.add(engine.world, [ball1]);

  draw();
}

function incWeight(){
  Matter.World.remove(engine.world, ramp);
  Matter.World.remove(engine.world, ball1);

  weight -= 0.01;

  ramp = Bodies.rectangle(400, rampY, 1000, 20);
  constraint = Constraint.create({
    pointA: {x: 400, y: rampY},
    bodyB: ramp,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [ramp, constraint]);

  ball1 = Bodies.circle(360, -500, 50, {density: weight}); // make big one more 'heavy'
  World.add(engine.world, [ball1]);

  draw();
}

function decWeight(){
  Matter.World.remove(engine.world, ramp);
  Matter.World.remove(engine.world, ball1);

  weight += 0.01;

  ramp = Bodies.rectangle(400, rampY, 1000, 20);
  constraint = Constraint.create({
    pointA: {x: 400, y: rampY},
    bodyB: ramp,
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [ramp, constraint]);

  ball1 = Bodies.circle(360, -500, 50, {density: weight}); // make big one more 'heavy'
  World.add(engine.world, [ball1]);

  draw();
}

