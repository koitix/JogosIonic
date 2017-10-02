var map, player, layer_terreno, cursors,txtScore,score,coin,monster;
var na_escada = false;

var game = new Phaser.Game(
  '100%',
  '100%',
  Phaser.CANVAS,
  'Game Demo',
  { preload: preload, create: create, update: update }
)

function preload() {
  game.load.tilemap('map', 'map/fase1.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles_32x32', 'map/tiles_32x32.png');
  game.load.image('player', 'img/player.jpg');
  game.load.audio('music','music/saxguy.mp3');
  game.load.audio('ping','sound/ping.mp3');
  game.load.image('coin','map/tiles_32x32.png');
  game.load.image('monster', 'img/monster.jpg');
}

function create() {
  var music = game.sound.play('music');
    music.volume = 0.5;
    music.loopFull();

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#0989b5';
  map = game.add.tilemap('map');
  map.addTilesetImage('tiles_32x32');
  layer_terreno = map.createLayer('terreno');
  layer_terreno.resizeWorld();
  map.setCollisionBetween(0,35);

  // var xRandom = Math.random() * game.width;
  //   var yRandom = Math.random() * game.height;
  //   monster = game.add.sprite(xRandom,yRandom,'monster');
  //     game.physics.enable(monster, Phaser.Physics.ARCADE);


  player = game.add.sprite(100, 200, 'player');
  game.physics.enable(player);
  player.body.bounce.set(0.3);
  game.camera.follow(player);
  game.physics.arcade.gravity.y = 500;

  //score
  score=0;
  var style = {font:'25px Arial', fill:'#bddb28'};
  txtScore = game.add.text(10,10, score.toString(),style);

  cursors = game.input.keyboard.createCursorKeys();

  map.setTileIndexCallback(45,hitEscada,this);

  function hitEscada(sprite, escadaObject){
    na_escada = true;
  }
}

function update() {
  game.physics.arcade.collide(player, layer_terreno);

  player.body.velocity.x = 0;
  if(cursors.up.isDown){
    if(player.body.onFloor() || na_escada){
      player.body.velocity.y= -300;
      na_escada = false
    }else if (na_escada ==true){
      player.body.velocity.x= 0 ;
    }
  }

  if(cursors.left.isDown){
    player.body.velocity.x = -150;
  }
  else if(cursors.right.isDown){
    player.body.velocity.x = 150;
  }
  game.physics.arcade.overlap(player,coin,coinHitScore);
  game.physics.arcade.overlap(player,monster, monsterHitHandler);
}

//monster
function monsterHitHandler(playerObject, monsterObject){
      
      monsterObject.x=Math.random() * game.width;
      monsterObject.y=Math.random() * game.height;
      
      vida--;
      txtScore.setText(score.toString());
      game.sound.play('ping');
    }
  

//coins
  function coinHitScore(playerObject,coinObject){

    score++;
    txtScore.setText(score.toString);
    game.sound.play('ping');
  }