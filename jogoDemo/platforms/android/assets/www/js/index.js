	
	//definindo largura e altura
	var widht = window.innerWidht;
	var height	=window.innerHeight;


	//Criando os elementos()
	var player,monster,cursors,txtScore,score;

	//Criando o jogo
	var game = new Phaser.Game(
		'100%',
		'100%',
		Phaser.CANVAS,
		'Game Demo',
		{ preload:preload, create:create, update:update}
	)
	



	//pré carregando os elementos
	function preload(){
	game.load.spritesheet('player',	'img/player.png',32,48);
	// game.load.image('player', 'img/player.jpg');
	game.load.image('monster', 'img/monster.jpg');
	game.load.image('background', 'img/bg.jpg');
	
	game.load.audio('music','music/music2.mp3');
	game.load.audio('ping','sound/ping.mp3');
	}

	//Criando o cenário e os personagems
	function create (){

		var music = game.sound.play('music');
		music.volme = 0.5;
		music.loopFull();
		game.add.sprite(0,0, 'background');

		player = game.add.sprite(100,100, 'player');
		game.physics.enable(player, Phaser.Physics.ARCADE);

		var xRandom = Math.random() * game.width;
		var yRandom = Math.random() * game.height;
		monster = game.add.sprite(xRandom,yRandom,'monster');
		// player = game.add.sprite(xRandom,yRandom,'player');
		game.physics.enable(monster, Phaser.Physics.ARCADE);

		player.animations.add('walkDown',[0,1,2,3]);
		player.animations.add('walkLeft',[4,5,6,7]);
		player.animations.add('walkRight',[8,9,10,11]);
		player.animations.add('walkUp',[12,13,14,15]);

		
		score=0;
		var style = {font:'25px Arial', fill: '#bddb28'};
		txtScore = game.add.text(10,10, score.toString(), style);

		cursors = game.input.keyboard.createCursorKeys();
	}
	//Atualização do jogo constante
	function update() {
		if(cursors.left.isDown){
			player.animations.play('walkLeft',5,true);
			player.x -=2;
		}
		else if(cursors.right.isDown){
			player.animations.play('walkRight',5,true);
			player.x+= 2;
		}
		else if(cursors.up.isDown){
			player.animations.play('walkUp',5,true);
			player.y -= 2;
		}
		else if(cursors.down.isDown){
			player.animations.play('walkDown',5,true);
			player.y +=2;
		}
		if(!cursors.down.isDown && !cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown){	
			player.animations.stop();
		}
		game.physics.arcade.overlap(player,monster, monsterHitHandler);
	}


		// function fair(player,monster){
		// 	if(player.x == monster)
		// }

		function monsterHitHandler(playerObject, monsterObject){
			
			monsterObject.x=Math.random() * game.width;
			monsterObject.y=Math.random() * game.height;
			
			score++;
			txtScore.setText(score.toString());
			game.sound.play('ping');
		}
	


