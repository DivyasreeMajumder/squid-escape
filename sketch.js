var PLAY = 1;
var END = 0;
var gameState = PLAY;
var reset;


var water,waterImage;
var squid,squidImage,squidCollidedImage,squidJumpingImage;
var invisibleGround;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var score=0;
var gameOver,gameOverImage;
var restart,restartImage;
var jumpSound , checkPointSound, dieSound

function preload(){
  waterImage=loadImage("Water background.jpg");
  squidImage=loadImage("squid 2.png");
  obstacle1=loadImage("obstacle 1.png");
  obstacle2=loadImage("obstacle 2.png");
  obstacle3=loadImage("obstacle 3.png");
  obstacle4=loadImage("obstacle 4.png");
  obstacle5=loadImage("obstacle 5.png");
  gameOverImage=loadImage("Game over.png");
  restartImage=loadImage("RESTART.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  



  


}
function setup() {
  createCanvas(displayWidth-20,displayHeight-100);
  water=createSprite(125,0,1000,450);
  water.addImage(waterImage);
  water.x=water.width/2;
  water.velocityX=-4;
  squid=createSprite(50,500,20,50);
  squid.addImage(squidImage);
  squid.scale=0.3;

  invisibleGround = createSprite(20,550,100000,20);
  invisibleGround.visible = false;
  obstaclesGroup = new Group();

  gameOver=createSprite(displayWidth/2,displayHeight/2-100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  

  restart=createSprite(displayWidth/2,displayHeight/2+100);
  restart.addImage(restartImage);
  restart.scale=0.3;
  restart.visible=false;
  score = 0;

  
  
  
  
  
}

function draw() {
  background("lightblue");
  //squid.debug=true
  squid.collide(invisibleGround)
  if(gameState===PLAY){
    water.velocityX = -(6 + 3*score/100);
    if (water.x < 0){
      water.x = water.width/2;
    }  
    console.log(squid.y);
    if(keyDown("space") && squid.y >= 480.45){
      squid.velocityY = -12;
      jumpSound.play();
      
    }
    squid.velocityY = squid.velocityY + 0.2;
    if(score>0 && score%100 === 0){
      checkPointSound.play() 
   }
    if(obstaclesGroup.isTouching(squid)){
      gameState=END
      dieSound.play()
    }
    
    score = score + Math.round(getFrameRate()/60);
  
    spawnObstacles();

  }else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    water.velocityX=0;
    squid.velocityY=0;
    
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();

  
  
 
  
  
  fill("black");
  textSize(30)
  text("Score: "+score,displayWidth-200,50)

  
}

function spawnObstacles(){
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(500,500);
    //obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    obstacle.velocityX=-4;
    
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);

    
  }
  }

  function reset(){
    gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  score=0;
  }

