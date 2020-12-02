var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var survivalTime;
var PLAY = 1;
var END = 2;
var gameState = PLAY;
var bananasEaten;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
  
  createCanvas(600, 400)
  
  monkey = createSprite(80, 315);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  survivalTime = 0;
  bananasEaten = 0;
  
  ground = createSprite(400, 350, 9000, 10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() 
{
  
  background("lightBlue");
  
  fill("magenta");
  textSize(15)
  text("Survival Time: " + survivalTime, 450, 50);
  
  fill("magenta");
  textSize(15)
  text("Bananas Eaten: " + bananasEaten, 450, 70);
  
  if(gameState === PLAY)
    {
      
      if(ground.x < 0)
        {
          
          ground.x = ground.width/2;
          
        }
      
      if(keyDown("space"))
        {
          
          monkey.velocityY = -10;
          
        }
      
      bananas();
      obstacles();
      
      
      survivalTime =Math.ceil(frameCount/frameRate());
      console.log(survivalTime);
      
      if(monkey.isTouching(bananasGroup))
        {
          
          bananasGroup.destroyEach();
          bananasEaten = bananasEaten + 1;
        
        }
      
      if(monkey.isTouching(obstaclesGroup))
        {
          
          gameState = END;
        
        }
      
    }
  
  if(gameState === END)
    {
      
      bananasGroup.destroyEach();
      obstaclesGroup.destroyEach();
      monkey.destroy();
      
      textSize(40);
      fill("green");
      text("GAME OVER", 200, 150);
      
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);

  drawSprites();
  
}

function bananas()
{
  if(frameCount % 80 === 0)
   {
    
    banana=createSprite(650,Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 65;
    bananasGroup.add(banana);
     
   }

}

function obstacles()
{
  
  if(frameCount % 300 === 0)
   {
   
    obstacle=createSprite(650,325);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -10;
    obstacle.lifetime = 65;
    obstaclesGroup.add(obstacle);
    
   }
  
}
