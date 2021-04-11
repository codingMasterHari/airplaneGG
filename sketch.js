var cargoPIMG, cargoP, packageIMG, packageSprite, packageMain, truckIMG, truckPickup;
var myPackageBody, myGround;
var boxPosition, boxY;
var boxleftSprite, boxleftBody, boxBase, boxBottomBody, boxRightSprite, boxRightBody;
var bgImg, lightImg, light, planeR, smokeImg, smoke, bannerImg, banner;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

const bgSound = new Audio("bgSound.wav");
bgSound.volume = 0.15;
const ThankY = new Audio("ThankY.wav");

function preload() {
	cargoPIMG = loadImage("airplane.png");
  planeR = loadImage("planeReverse.png");
	packageIMG = loadImage("package.png");
  truckIMG = loadImage("truck.png");
  bgImg = loadImage("bg.jpg");
  lightImg = loadImage("flash.png");
  smokeImg = loadImage("SilencerS.png");
  bannerImg = loadImage("thankYouB.png");
}

function setup() {
	createCanvas(1400, 600);

  engine = Engine.create();
	world = engine.world;

  truckPickup = createSprite(740, 530);
	truckPickup.addImage(truckIMG)
	truckPickup.scale = 0.2;

  packageSprite = createSprite(width/2, 87.5);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.03;

  packageMain = createSprite(650, 480);
	packageMain.addImage(packageIMG)
	packageMain.scale = 0.03;
  packageMain.visible = false;

  smoke = createSprite(550, 530);
	smoke.addImage(smokeImg)
	smoke.scale = 0.2;
  smoke.visible = false;

  light = createSprite(890, 520);
  light.addImage(lightImg);
	light.scale = 0.009;
  light.visible = false;

	packageBody = Bodies.circle(width/2 , 87.5, 20, {restitution:0.3, isStatic:true});
	World.add(world, packageBody);

  cargoP = createSprite(width/2, 90);
	cargoP.addImage(cargoPIMG)
	cargoP.scale = 0.6;

  banner = createSprite(cargoP.x+260, cargoP.y-15);
	banner.addImage(bannerImg)
	banner.scale = 0.45;
  banner.visible = false;

  groundSprite = createSprite(width/2, 580, width, 10);
	groundSprite.shapeColor=color(255);
  groundSprite.visible = false;
	
	ground = Bodies.rectangle(width/2, 580, width, 10, {isStatic:true});
 	World.add(world, ground);

 	boxPosition = width/2-100;
 	boxY = 484;

 	boxleftSprite = createSprite(boxPosition-8.3, boxY-7, 5, 50);
 	boxleftSprite.shapeColor = color(255,0,0);
  boxleftSprite.visible = false;

 	boxLeftBody = Bodies.rectangle(boxPosition-8.3, boxY-7, 5, 50, {isStatic:true});
 	World.add(world, boxLeftBody);

 	boxBase = createSprite(boxPosition+50, boxY+29, 125, 20);
 	boxBase.shapeColor = color(53, 153, 120);

 	boxBottomBody = Bodies.rectangle(boxPosition+50, boxY+29, 125, 20, {isStatic:true});
 	World.add(world, boxBottomBody);

 	boxRightSprite = createSprite(boxPosition+108.5, boxY-7, 10, 50);
 	boxRightSprite.shapeColor = color(255,0,0);
  boxRightSprite.visible = false;

 	boxRightBody = Bodies.rectangle(boxPosition+108.5, boxY-7, 10, 50, {isStatic:true});
 	World.add(world, boxRightBody);

	Engine.run(engine);
}


function draw() {
  background(bgImg);
  rectMode(CENTER);
  Engine.update(engine);

  // packageBody.position.x = packageSprite.x;
  // packageBody.position.y = packageSprite.y;

  // boxRightSprite.x = boxRightBody.position.x;
  // boxRightSprite.y = boxRightBody.position.y;

  // boxleftSprite.x = boxLeftBody.position.x;
  // boxleftSprite.y = boxLeftBody.position.y;

  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y;
  
  boxBottomBody.position.x = boxBase.x;
  boxBottomBody.position.y = boxBase.y;

  boxRightBody.position.x = boxRightSprite.x;
  boxRightBody.position.y = boxRightSprite.y;

  boxLeftBody.position.x = boxleftSprite.x;
  boxLeftBody.position.y = boxleftSprite.y;

  bgSound.play();
	bgSound.loop = true;

  if(packageSprite.isTouching(boxBase)) {
    truckPickup.velocityX = 5; //truck
    boxBase.velocityX = 5; // orange base
    boxRightSprite.velocityX = 5; //left bordor
    boxleftSprite.velocityX = 5; //right bordor
    cargoP.addImage(planeR);
    cargoP.velocityX = -7;
    ThankY.play();
    ThankY.loop = false;
    smoke.visible = true;
    smoke.velocityX = 5;
    banner.visible = true;
    banner.velocityX = -7;

    // packageBody.position.x = boxBase.x;
    // packageBody.position.y = boxBase.y;
    packageSprite.visible = false;
    packageMain.visible = true;
    packageMain.velocityX = 5; // package
    light.visible = true;
    light.velocityX = 5;
  }

  drawSprites();
}

function keyPressed() {
  if(keyCode == 40) {
    // packageSprite.velocityY = 4;
    Matter.Body.setStatic(packageBody, false);
  } else if(keyCode == 37) {
    cargoP.x -= 20;
    if(packageBody.position.y < 100 && packageSprite.y < 100) {
      // packageSprite.x -= 20;
      Matter.Body.translate(packageBody, {x: -20, y: 0})
    }
  } else if(keyCode == 39) {
    cargoP.x += 20;
    if(packageBody.position.y < 100 && packageSprite.y < 100) {
      // packageSprite.x += 20;
      Matter.Body.translate(packageBody, {x: 20, y: 0})
    }  
  }
}