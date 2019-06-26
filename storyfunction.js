function story() {
    storyLevel1();
}
var player;
var boden1;
var dekoration;
var tod;
var himmel;
var portal;
//lvl2
var leben = 3;
var lebenText;
// var player;
var boden;
var hintergrund;
var sofa;
var pflanze;
var lampe;
var fernseher;
var hindernisseUeberleben;
var cursors;
var HimmelFenster;
var WandStrasse;
var graben;


function storyLevel1() {

    var config = {
        type: Phaser.AUTO,
        top: 0,
        left: 0,
        width: 1000,
        height: 608,
        parent: "field",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var game = new Phaser.Game(config);
    //    var player;
    //    var boden;
    //    var dekoration;
    //    var tod;
    //    var himmel;
    //    var portal;

    function preload() {
        this.load.image('Level1Ground', 'assets/tiled/lvl1Ground.png');
        this.load.image('Level1Extras', 'assets/tiled/lvl1Background.png');
        this.load.tilemapTiledJSON('map', 'assets/tiled/lvl1.json');

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 64,
            frameHeight: 80
        });
    }

    function create() {

        //HINTERGRUND
        map = this.make.tilemap({
            key: 'map'
        });
        //tileset preload
        var Ground = map.addTilesetImage('Ground', 'Level1Ground');
        var Extras = map.addTilesetImage('Background', 'Level1Extras');

        himmel = map.createStaticLayer('Skylvl1', [Extras], 0, 0);
        //        tod = map.createStaticLayer('Deathlvl1', [Extras, Ground], 0, 0);
        dekoration = map.createStaticLayer('Backgroundlvl1', [Extras], 0, 0);
        portal = map.createStaticLayer('Portallvl1', [Extras], 0, 0);
        boden1 = map.createStaticLayer('Groundlvl1', [Ground], 0, 0); //Layer [tilesetimage]	
        //reihnfolge bestimmt auch die Layerposition(vorne - hinten)
        //            map.x = -30750;
        //            boden.x = -30750;
        boden1.x = -31000;
        //        tod.x = -31000;
        portal.x = -31000;
        dekoration.x = -31000;
        himmel.x = -31000;

        //PLAYER
        player = this.physics.add.sprite(750, 175, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT
        //            this.physics.world.bounds.height = map.heightInPixels;
        //            this.player.setCollideWorldBounds(true);
        //            player.setBounce(0.2) //LEICHTER SPRUNG WIEDR HOCH
        //            player.setCollideWorldBounds(true);
        //            player.body.setGravityY(300)
        //            this.physics.add.collider(player, map.bodenLayer);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 10,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });
        //        this.physics.add.overlap(player, dekoration, function (){ 
        //            this.gameStarts = false;
        //            console.log("Overlapping!");
        //        }, null, this);
        //            this.physics.add.collider(player, tod, gameOver, null, this);

        //            this.physics.overlapTiles(player, tod, death, null, this);
        //        this.physics.add.collider(player, tod, death, null, this);
        //            map.setTileIndexCallback(tod,death,this);
        //Collision


        //        this.physics.add.collider(player, portal, pauseGame, null, this);
        this.physics.add.collider(player, portal, nextLevel(game), null, this);
        portal.setCollisionByExclusion([-1]);
        //              this.physics.world.collide(player,boden);
        this.physics.add.collider(player, boden1);
        map.setCollisionByProperty({
            collision: true
        });

        //camera
        //             set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(-31000, 0, map.widthInPixels, map.heightInPixels);
        //                        this.cameras.setCollideWorldBounds(true);
        this.cameras.main.startFollow(player);

        //Leben
        //        lebenText = this.add.text(30, 30, 'Leben: ' + leben, {
        //            fontSize: '32px',
        //            fill: '#ffffff'
        //        })
        //        lebenText.setScrollFactor(0);
        //        
        //TASTATUR

        cursors = this.input.keyboard.createCursorKeys();

    }

    function update() {

        //        let sound = new Audio();
        //        sound.src = 'assets/sound/mario.mp3';
        //        sound.volume = 0.5;
        //        sound.play();
        //        
        if (cursors.space.isDown || cursors.up.isDown) {
            this.gameStarts = true;

        }

        if (this.gameStarts == true) {
            player.setVelocityX(-100);
            //        this.cameras.setVelocityX(-100);
            player.anims.play('left', true);
            //            console.log(boden.x);
            //            console.log(player.x);
            //            this.cameras.main.scrollX = 300;
            //            console.log(map.widthInPixels);

        }

        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
            player.setVelocityY(-250);

        }
        //    this.physics.world.bounds.height = groundLayer.height;
        //    else if (cursors.left.isDown) {
        //        player.setVelocityX(0);
        //        player.anims.play('left', true);
        //    }
        if (cursors.right.isDown) {
            //            this.gameStarts = false;
            pauseGame();
            //        gameOver(this);
        }
        //            game.physics.arcade.collide(player, boden, null, this);

        if (player.y > 680) {
            storygameOver(this);
        }
    }

    //   function nextLevel(game) {
    ////        game.gameStarts = false;
    //        
    //        console.log("next Level");
    //        Level2();
    //        //        game.scene.restart();
    //    }
}

function nextLevel(game) {
    game.gameStarts = false;

    console.log("next Level");
    //    storyLevel2();
    //
    //    let canvas = document.querySelector("canvas");
    //    canvas.parentNode.removeChild(canvas);
    //        game.scene.restart();
}

function death() {
    //        this.scene.restart();
    //    this.physics.pause();
    player.setVelocityX(0);
    player.anims.play('left', false);
    //        leben--;
    //        this.gameStarts = false;
    console.log("Overlapping!");

}

function storygameOver(game) {
    //    game.scene.restart();
    console.log("next death Level");

    let canvas = document.querySelector("canvas");
    canvas.parentNode.removeChild(canvas);
    storyLevel2();
}

function pauseGame() {
    this.gameStarts = false;
}

function storyLevel2() {
    var config = {
        type: Phaser.AUTO,
        width: 1000,
        height: 608,
        parent: "field",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 350
                },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);


    function preload() {
        this.load.image('Level2Ground', 'assets/tiled/BodenLevel2.png');
        this.load.image('Level2Background', 'assets/tiled/HintergrundLevel2.png');
        this.load.image('Level2Sofa', 'assets/tiled/SofaLevel2.png');
        this.load.image('Level2Pflanze', 'assets/tiled/PflanzeLevel2.png');
        this.load.image('Level2Lampe', 'assets/tiled/LampeLevel2.png');
        this.load.image('Level2Fernseher', 'assets/tiled/FernseherLevel2.png');

        this.load.image('Level2HimmelFenster', 'assets/tiled/HimmelLevel2.png');
        this.load.image('Level2WandStrasse', 'assets/tiled/SteinLevel2.png');
        this.load.image('Level2Graben', 'assets/tiled/SteinLevel2.png');


        this.load.tilemapTiledJSON('map', 'assets/tiled/Level2.json');

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 64,
            frameHeight: 80
        });
    }

    function create() {



        //HINTERGRUND
        map = this.make.tilemap({
            key: 'map'
        });
        var Ground = map.addTilesetImage('Ground', 'Level2Ground');
        var Background = map.addTilesetImage('Background', 'Level2Background');
        var HindernisSofa = map.addTilesetImage('Sofa', 'Level2Sofa');
        var HindernisPflanze = map.addTilesetImage('Pflanze', 'Level2Pflanze');
        var HindernisLampe = map.addTilesetImage('Lampe', 'Level2Lampe');
        var HindernisFernseher = map.addTilesetImage('Fernseher', 'Level2Fernseher');

        var HintergrundWandStrasse = map.addTilesetImage('WandStrasse', 'Level2WandStrasse');

        var Graben = map.addTilesetImage('WandStrasse', 'Level2Graben');
        var HintergrundHimmelFenster = map.addTilesetImage('HimmelFenster', 'Level2HimmelFenster');



        //Layer [tilesetimage]	
        hintergrund = map.createStaticLayer('BackgroundLevel2', [Background], 0, 0)
        boden = map.createStaticLayer('GroundLevel2', [Ground], 0, 0);
        sofa = map.createStaticLayer('SofaLevel2', [HindernisSofa], 0, 0)
        pflanze = map.createStaticLayer('PflanzeLevel2', [HindernisPflanze], 0, 0)
        lampe = map.createStaticLayer('LampeLevel2', [HindernisLampe], 0, 0)
        fernseher = map.createStaticLayer('FernseherLevel2', [HindernisFernseher], 0, 0)
        hindernisseUeberleben = map.createStaticLayer('HindernisseUeberleben', [HindernisFernseher, HindernisSofa, HintergrundWandStrasse], 0, 0)


        strasseWand = map.createStaticLayer('WandStrasseLevel2', [HintergrundWandStrasse], 0, 0)
        graben = map.createStaticLayer('GrabenLevel2', [Graben], 0, 0)
        fensterHimmel = map.createStaticLayer('HimmelFensterLevel2', [HintergrundHimmelFenster], 0, 0)

        //reihnfolge bestimmt auch die Layerposition(vorne - hinten)
        boden.x = -500 * 31;
        hintergrund.x = -500 * 31;
        sofa.x = -500 * 31;
        pflanze.x = -500 * 31;
        lampe.x = -500 * 31;
        hindernisseUeberleben.x = -500 * 31;
        fernseher.x = -500 * 31;

        fensterHimmel.x = -500 * 31;
        strasseWand.x = -500 * 31;
        graben.x = -500 * 31;

        //PLAYER
        // player = this.physics.add.sprite(300, 100, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT
        player = this.physics.add.sprite(300, 465, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT

        this.physics.add.collider(player, map.bodenLayer);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 12,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        //Collision

        this.physics.add.collider(player, sofa, death, null, this);
        this.physics.add.collider(player, pflanze, death, null, this);
        this.physics.add.collider(player, fernseher, death, null, this);

        this.physics.add.collider(player, hindernisseUeberleben);

        sofa.setCollisionByExclusion([-1]);
        pflanze.setCollisionByExclusion([-1]);
        fernseher.setCollisionByExclusion([-1]);
        hindernisseUeberleben.setCollisionByExclusion([-1]);


        this.physics.add.collider(player, boden);
        map.setCollisionByProperty({
            collision: true
        });

        boden.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, boden);

        //             set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(-15500, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);


        //Leben
        lebenText = this.add.text(30, 30, 'Leben: ' + leben, {
            fontSize: '32px',
            fill: '#ffffff'
        })
        lebenText.setScrollFactor(0);



        //TASTATUR

        cursors = this.input.keyboard.createCursorKeys();

    }

    function update() {
        //if (cursors.space.isDown || cursors.up.isDown) {
        //this.gameStarts = true;
        let sound = new Audio();
        sound.src = 'assets/sound/mario.mp3';
        sound.volume = 0.5;
        sound.play();
        // }

        //if (this.gameStarts == true) {
        player.setVelocityX(-120);
        player.anims.play('left', true);
        // }

        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
            player.setVelocityY(-420);
        }
        if (player.y > 680) {

            this.scene.restart();
            //    this.physics.pause();
            player.setVelocityX(0);
            player.anims.play('left', false);
            leben--;
            //    this.gameStarts = false;
        }
    }

}

function death() {
    this.scene.restart();
    //    this.physics.pause();
    player.setVelocityX(0);
    player.anims.play('left', false);
    leben--;
    //    this.gameStarts = false;
}
