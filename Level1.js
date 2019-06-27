function Level1() {

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
    var player;
    var boden;
    var dekoration;
    var tod;
    var himmel;
    var auto;
    var leben = 3;
    var lebenText;
    var portal;
    var herz1;
    var herz2;
    var herz3;
    var cameraX = 0;

    function preload() {
        this.load.image('Level1Ground', 'assets/tiled/lvl1Ground.png');
        this.load.image('Level1Extras', 'assets/tiled/lvl1Background.png');
        this.load.tilemapTiledJSON('map', 'assets/tiled/lvl1.json');
        this.load.image('herz', 'assets/herz.png');

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        this.load.spritesheet('portalAusgang', 'assets/portalVonLinks.png', {
            frameWidth: 64,
            frameHeight: 96
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
        boden = map.createStaticLayer('Groundlvl1', [Ground, Extras], 0, 0);
        dekoration = map.createStaticLayer('Backgroundlvl1', [Extras], 0, 0);
        auto = map.createStaticLayer('Autolvl1', [Extras], 0, 0);
        //Layer [tilesetimage]	
        //reihnfolge bestimmt auch die Layerposition(vorne - hinten)

        boden.x = -360 * 31;
        auto.x = -360 * 31;
        dekoration.x = -360 * 31;
        himmel.x = -360 * 31;
        //PLAYER
        player = this.physics.add.sprite(70, 175, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT
        //        player.setOffset(64,80);
        //        player.setSize( 64, 80, );

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 10,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });

        this.anims.create({
            key: 'stands',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 4,
                end: 4
            }),
            frameRate: 1,
            repeat: -1
        });


        portalAusgang = this.physics.add.sprite(-10000, 370, 'portalAusgang'); //POSTITION VON DER ER RUNTER FÄLLT
        this.anims.create({
            key: 'startAusgang',
            frames: this.anims.generateFrameNumbers('portalAusgang', {
                start: 0,
                end: 3 //FRAMES DIE GEZEIGT WERDEN SOLLEN
            }),
            frameRate: 9,
            repeat: -1 // SAGT DASS ES EIN LOOP SEIN SOLL
        });
        portalAusgang.body.allowGravity = false;
        //        this.physics.add.collider(player, portalAusgang, levelGeschafft, null, this);
        this.physics.add.collider(player, portalAusgang);
        //Collision


//        portalAusgang.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, portalAusgang, levelGeschafft, null, this);

        //        this.physics.add.collider(player, auto, death(this) , null, this);
        boden.setCollisionByExclusion([-1]);
                auto.setCollisionByExclusion([-1]);
                this.physics.add.collider(player, auto, death, null, this);
        //              this.physics.world.collide(player,boden);

        this.physics.add.collider(player, boden);
        map.setCollisionByProperty({
            collision: true
        });

        //camera
        this.cameras.main.setBounds(-11160, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);
//        this.cameras.main.startFollow(portalAusgang);

        //Leben
        //        lebenText = this.add.text(30, 30, 'Leben: ' + leben, {
        //            fontSize: '32px',
        //            fill: '#ffffff'
        //        })
        //        lebenText.setScrollFactor(0);
        herz1 = this.add.image(20, 25, 'herz');
        herz1.setScrollFactor(0);
        herz2 = this.add.image(60, 25, 'herz');
        herz2.setScrollFactor(0);
        herz3 = this.add.image(100, 25, 'herz');
        herz3.setScrollFactor(0);

        //
        //        //Pause
        //        pause = this.add.text(778, 30, 'pause', {
        //            fontSize: '32px',
        //            fill: '#ffffff'
        //        })
        //        pause.setScrollFactor(0);
        //        
        //TASTATUR
        var jump = 2;
        cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
        //  player.anims.play('stands', true);

        portalAusgang.anims.play('startAusgang', true);

        if (cursors.space.isDown || cursors.up.isDown) {
            this.gameStarts = true;

        }

        if (this.gameStarts == true) {
            player.setVelocityX(-150);
            player.anims.play('left', true);
        }
        //        else if (player.y == 464) {
        //            player.anims.play('stands', true);
        //        }

        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor() && jump > 1) {
            //            player.setVelocityY(-250);
            player.setVelocityY(-220);
            console.log("jump1");
            jump--;
            console.log(jump);
            let jumpSound = new Audio();
            jumpSound.src = 'assets/sound/jump.mp3';
            jumpSound.volume = 0.5;
            jumpSound.play();
        } else if ((cursors.space.isDown || cursors.up.isDown) && jump == 1) {
            player.setVelocityY(-250);
            //            player.setVelocityY(-300);
            console.log("jump2");
            jump--;
        } else if (player.body.onFloor()) {
            jump = 2;
        }

//        if (cursors.right.isDown) {
//            pauseGame();
//        }
//        if (cursors.up.isDown) {
//            resumeGame();
//        }
        if (player.y > 680) {
            deathFall(this);
        }
        if (leben < 3) {
            herz3.visible = false;
            if (leben < 2) {
                herz2.visible = false;
                if (leben == 0) {
                    herz1.visible = false;
                }
            }
        }

        //zeige andere Animation, wenn player steht
        if (player.x == 70) {
            player.anims.play('stands', true);
        }

        if (cameraX < -700 && cameraX == this.cameras.main.scrollX) { //&& player.x < 70
                player.anims.play('stands', true);
            }

            cameraX = this.cameras.main.scrollX;

        }

        function death() {
            //      this.scene.restart
            console.log("death!");
            leben--;

            if (leben <= 0) {
                let gameOverSound = new Audio();
                gameOverSound.src = 'assets/sound/gameOver.mp3';
                gameOverSound.volume = 0.5;
                gameOverSound.play();

                openGameOverScreen();
            } else {
                let errorSound = new Audio();
                errorSound.src = 'assets/sound/error.mp3';
                errorSound.volume = 0.5;
                errorSound.play();

                this.scene.restart();
            }
        }

        function deathFall(game) {
            //        game.scene.restart();
            leben--;
            console.log("this death!");
            if (leben <= 0) {
                let gameOverSound = new Audio();
                gameOverSound.src = 'assets/sound/gameOver.mp3';
                gameOverSound.volume = 0.5;
                gameOverSound.play();

                openGameOverScreen();
            } else {
                let errorSound = new Audio();
                errorSound.src = 'assets/sound/error.mp3';
                errorSound.volume = 0.5;
                errorSound.play();

                game.scene.restart();
            }
        }

        function openGameOverScreen() {
            document.getElementById("gameOver").style.display = "block";
//            document.getElementById("pauseButton").style.display = "none";
            let canvas = document.querySelector("canvas");
            canvas.parentNode.removeChild(canvas);
        }

        function levelGeschafft() {
            document.getElementById("levelGeschafft").style.display = "block";
//            document.getElementById("pauseButton").style.display = "none";
            let canvas = document.querySelector("canvas");
            canvas.parentNode.removeChild(canvas);
            console.log("Level complete");
        }

        function storyGeschafft() {
            document.getElementById("storyGeschafft").style.display = "block";
//            document.getElementById("pauseButton").style.display = "none";
            let canvas = document.querySelector("canvas");
            canvas.parentNode.removeChild(canvas);
            console.log("story complete");
        }

    }



    function nextLevel() {

        this.scene.stop(storyLevel1);
        this.scene.start(storyLevel2);
        console.log("next Level");
        //        game.scene.restart();
    }

    function pauseGame() {
        this.scene.pause("default");
        //    this.gameStarts = false;
        console.log("pause");
        document.getElementById("pause").style.display = "block";
    }

    function resumeGame() {
        this.scene.resume("game");
        console.log("resume");
    }
