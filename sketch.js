//Global Variables
var banana_image, BananaGroup;
var obstacle_image, ObstacleGroup;
var back, back_image, ground, ground_image;
var monkey, monkey_image, monkeyImg;
var score;
var gameState;


function preload() {
  banana_image = loadImage("Banana.png");
  obstacle_image = loadImage("stone.png")
  back_image = loadImage("jungle.jpg");
  ground_image = loadImage("ground.jpg");
  monkey_image = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkeyImg = loadImage("Monkey_01.png");
}


function setup() {
  createCanvas(600, 300);

  back = createSprite(300, 50, 600, 300);
  back.addImage(back_image);
  back.scale = 1.15;
  back.x = back.width / 2;
  back.velocityX = -3;
  ground = createSprite(300, 275, 600, 15);
  ground.visible = false;

  monkey = createSprite(70, 230, 20, 20);
  monkey.addAnimation("monkey", monkey_image);
  monkey.scale = 0.05;

  BananaGroup = new Group();
  ObstacleGroup = new Group();

  score = 0;
  gameState = "play"
    
}


function draw() {
  background(2000);

  if(gameState === "play"){

      if (back.x < 0) {
        back.x = back.width / 2;
      }

      if (keyDown("space")) {
        monkey.velocityY = -12;
      }
      monkey.velocityY = monkey.velocityY + 1;
      monkey.collide(ground);


      for (var i = 0; i < BananaGroup.length; i++) {
        var bananaTemp = BananaGroup.get(i);
        if (monkey.isTouching(bananaTemp)) {
          bananaTemp.destroy();
          score = score + 10;
          monkey.scale = monkey.scale + 0.01;
        }
      }

      for (var j = 0; j < ObstacleGroup.length; j++) {
        var obsTemp = ObstacleGroup.get(j);
        if (monkey.isTouching(obsTemp)) {
          obsTemp.destroy();
          score = score - 30;
          monkey.scale = monkey.scale - 0.03;
        }
      }


      bananas();
      obstacle();
    
  }
 

  drawSprites();

  fill("white");
  textSize(20);
  text("Score: " + score, 460, 40);
  
 /* switch(score){
   case 10 : monkey.scale=0.06;
      break;
  case 20 : monkey.scale=0.07;
      break;
  case 30 : monkey.scale=0.08;
      break;
  case 40 : monkey.scale=0.09;
      break;
  case 50 : monkey.scale=0.1;
      break;
  case 60 : monkey.scale=0.12;
      break;
  case 70 : monkey.scale=0.13;
      break;
  case 80 : monkey.scale=0.14;
      break;
  case 90 : monkey.scale=0.15;
      break;
  case 100 : monkey.scale=0.16;
      break;
  case 110 : monkey.scale=0.17;
      break;
  case 120 : monkey.scale=0.18;
      break;
  case 130 : monkey.scale=0.19;
      break;
  case 140 : monkey.scale=0.20;
      break;
    default: break;
  }*/
  
  if(score<0){
    gameState = "end";
  }
  if(gameState === "end"){
    BananaGroup.setVelocityEach(0);
    BananaGroup.destroyEach();
    ObstacleGroup.setVelocityEach(0);
    ObstacleGroup.destroyEach();
    back.velocity = 0;
    monkey.velocityY = 0
    monkey.x = 300;
    monkey.y = 200;
    monkey.scale = 0.08;
    back.x = 300;
    back.y = 50;
    textSize(30);
    text("You Lose",250,120);
  }

}

function bananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600, random(30, 200));
    banana.addImage(banana_image);
    banana.scale = 0.05;
    banana.velocityX = -4
    //banana.velocityX = -(4 + score/300);
    banana.lifetime = 160;
    BananaGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 280 === 0) {
    var obs = createSprite(600, random(100, 200));
    obs.addImage(obstacle_image);
    obs.scale = 0.1;
    obs.velocityX = -4
    //obs.velocityX = -(4 + score/300);
    obs.lifetime = 160;
    ObstacleGroup.add(obs);
  }
}