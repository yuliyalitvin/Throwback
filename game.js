<script type="text/javascript">
                var config = {
                    type: Phaser.AUTO,
                    width: 1000,
                    height: 600,
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

                function preload() {
                    this.load.image('sky', 'assets/sky.png');
                    this.load.image('ground', 'assets/platform.png');
                    this.load.image('star', 'assets/star.png');
                    this.load.image('bomb', 'assets/bomb.png');
                    this.load.spritesheet('dude',
                        'assets/dude.png', {
                            frameWidth: 32,
                            frameHeight: 48
                        }
                    );
                }

                function create() {

                    //HINTERGRUND

                    this.add.image(400, 200, 'sky');

                    //                        this.add.image(0, 0, 'sky').setOrigin(0, 0); //SETZT DAS BILD AUTOMATISCH IN DIE MITTE
                    //            this.add.image(400, 300, 'star'); //MUSS AUF EINE EBENE VOR DAS ERSTE BILD; DESWEGEN "ZWEITES" BILD

                    //PLATTFORM

                    platforms = this.physics.add.staticGroup();

                    platforms.create(400, 568, 'ground').setScale(3).refreshBody(); //DAMIT MAN AN DEN SEITEN NICHT RUNTERFÄLLT AM BODEN

                    platforms.create(500, 400, 'ground'); //POSITION VON DEN PLATFORMEN
                    platforms.create(50, 250, 'ground');
                    platforms.create(750, 150, 'ground');

                    //PLAYER

                    player = this.physics.add.sprite(300, 200, 'dude'); //POSTITION VON DER ER RUNTER FÄLLT

                    player.setBounce(0.3) //LEICHTER SPRUNG WIEDR HOCH
                    player.setCollideWorldBounds(true);
                    //            player.body.setGravityY(300)

                    this.physics.add.collider(player, platforms); // WENN ZWEI ELEMENTE SICH BERÜHREN DANN KOLLISTION; GEHT NICHT DURCH

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
                        key: 'turn',
                        frames: [{
                            key: 'dude',
                            frame: 4
                        }],
                        frameRate: 20
                    });

                    this.anims.create({
                        key: 'right',
                        frames: this.anims.generateFrameNumbers('dude', {
                            start: 5,
                            end: 8
                        }),
                        frameRate: 10,
                        repeat: -1
                    });



                    //STERNE

                    stars = this.physics.add.group({
                        key: 'star',
                        repeat: 11,
                        setXY: {
                            x: 12,
                            y: 0,
                            stepX: 70
                        }
                    });

                    stars.children.iterate(function(child) {

                        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

                    });

                    this.physics.add.collider(stars, platforms);

                    this.physics.add.overlap(player, stars, collectStar, null, this);

                    function collectStar(player, star) {
                        star.disableBody(true, true);

                        score += 10;
                        scoreText.setText('Score: ' + score);

                        if (stars.countActive(true) === 0) {
                            stars.children.iterate(function(child) {

                                child.enableBody(true, child.x, 0, true, true);

                            });

                            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                            var bomb = bombs.create(x, 16, 'bomb');
                            bomb.setBounce(1);
                            bomb.setCollideWorldBounds(true);
                            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

                        }
                    }

                    //BOMBEN

                    bombs = this.physics.add.group();

                    this.physics.add.collider(bombs, platforms);

                    this.physics.add.collider(player, bombs, hitBomb, null, this);

                    function hitBomb(player, bomb) {
                        this.physics.pause();

                        player.setTint(0xff0000);

                        player.anims.play('turn');

                        gameOver = true;
                    }

                    //SCORE

                    var score = 0;
                    var scoreText;

                    scoreText = this.add.text(16, 16, 'score: 0', {
                        fontSize: '32px',
                        fill: '#000'
                    });

                    //TASTATUR

                    cursors = this.input.keyboard.createCursorKeys();
                }

                function update() {



                    if (cursors.left.isDown) {
                        player.setVelocityX(-160);

                        player.anims.play('left', true);
                    } else if (cursors.right.isDown) {
                        player.setVelocityX(160);

                        player.anims.play('right', true);
                    } else {
                        player.setVelocityX(0);

                        player.anims.play('turn');
                    }

                    if (cursors.up.isDown && player.body.touching.down) {
                        player.setVelocityY(-330); //ZAHL IST DIE HÖHE DIE ER SPRINGT
                    }
                }

            </script>