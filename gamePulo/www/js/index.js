

	var player,monster,cursors;
	    	var score = 0;
		var scoreText;

	var game = new Phaser.Game('100%', '100%', Phaser.CANVAS,
		'Game Pulo',
		{preload:preload, create:create, update:update}
		);

	function preload(){
		game.load.image('sky', 'img/sky.png');
	    game.load.image('ground', 'img/platform.png');
	    game.load.image('star', 'img/star.png');
	    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
	    game.load.audio('music','music/music1.mp3');
		game.load.audio('ping','sound/ping.mp3');
	}

	function create(){

		game.physics.startSystem(Phaser.Physics.ARCADE);
		var music = game.sound.play('music');
		music.volume = 0.5;
		music.loopFull();
		game.add.sprite(0,0,'sky');

		//fisica em grupo para objetos
		platforms =game.add.group();
		platforms.enableBody=true;
		var ground = platforms.create(0, game.world.height - 64, 'ground');
		//chão
		ground.scale.setTo(2,2);
		ground.body.immovable = true;
		
		//borda
		var ledge = platforms.create(200,400, 'ground');
	    ledge.body.immovable = true;

	    ledge = platforms.create(-150, 250, 'ground');
	    ledge.body.immovable = true;

	    ledge = platforms.create(350, 100, 'ground');
  	 	ledge.body.immovable = true;


	    //player
	    player = game.add.sprite(32,game.world.height -150,'dude');
	    game.physics.arcade.enable(player);
	    player.body.bounce.y=0.7;
	    player.body.gravity.y= 400;
	    player.body.collideWorldBounds=true;
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
   		player.animations.add('right', [5, 6, 7, 8], 10, true);
   		cursors = game.input.keyboard.createCursorKeys();

   		// stars
   		stars = game.add.group();

    stars.enableBody = true;

    	//score

		scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    for (var i = 0; i < 6; i++)
    {

        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 400;
        star.body.bounce.y = 0.7+ Math.random() * 0.2;
    }

	}

	function update(){
		  verificarLimiteTela();

		 var hitPlatform = game.physics.arcade.collide(player, platforms);
		 player.body.velocity.x = 0;
			if (cursors.left.isDown)
	    {
	       
	        player.body.velocity.x = -150;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {

	        player.body.velocity.x = 150;

	        player.animations.play('right');
	    }
	    else
	    {

	        player.animations.stop();

	        player.frame = 4;
	    }

	    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
	    {
	        player.body.velocity.y = -400;
	    }

	    //stars
	    game.physics.arcade.collide(stars, platforms);
	    game.physics.arcade.overlap(player, stars, collectStar, null, this);
	}

	function verificarLimiteTela() {
	  if (player.x >= (game.world.width - 50))
	    player.x = game.world.width - 50;

	  if (player.x < (0))
	    player.x = 0;

	  if (player.y >= (game.world.height - 50))
	    player.y = game.world.height - 50;

	  if (player.y < (0))
	    player.y = 0;
	}

	function collectStar (player, star) {
		game.sound.play('ping');
	    star.kill();


	    score += 10;
	    scoreText.text = 'Score: ' + score;

}
