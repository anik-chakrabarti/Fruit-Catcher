class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    reset(){
        database.ref('/').set({
            gameState: 0,
            playerCount:0
        });
    }

    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];
        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            y=500;
            x = 500-allPlayers[plr].distance;

            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket.

            if(index === player.index){
              fill("black"); 
              textSize(25);
              text(allPlayers[plr].name,x - 20 ,y + 20 );

              fill("white");
              textSize(20);
              text(allPlayers.player1.name + " :  " + allPlayers.player1.score , 20,30);
              text(allPlayers.player2.name + " :  " + allPlayers.player2.score , 20,80);

            for(var i =0 ; i < fruitGroup.length ; i++){
              if(fruitGroup.get(i).isTouching(players[index -1])){
                player.score+=1 ;
                fruitGroup.get(i).destroy();
             }
            }
    
            }
        }

        console.log(player.index);

        // Give movements for the players using arrow keys
        if(keyIsDown(LEFT_ARROW)&& player.index != null &&  gameState == 1){
            player.distance = player.distance + 10 ;
            player.update();
            console.log("move left");
          }

        if(keyIsDown(RIGHT_ARROW)&& player.index != null &&  gameState == 1){
            player.distance = player.distance - 10 ;
            player.update();
            console.log("move right");
          }
        // Create and spawn fruits randomly
        if(frameCount % 20 === 0 ){

            fruits = createSprite(random(100,1000),0,10,10);
            fruits.velocityY = 6 ;

            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1" , fruit1_img); 
                break ;
                case 2: fruits.addImage("fruit2" , fruit2_img); 
                break ;
                case 3: fruits.addImage("fruit3" , fruit3_img); 
                break ;
                case 4: fruits.addImage("fruit4" , fruit4_img); 
                break ;
                case 5: fruits.addImage("fruit5" , fruit5_img); 
                break ;
            }

            fruitGroup.add(fruits);
        }          
        
    }

    end(){
       console.log("Game Ended");
    }
}