/*global currentGameSpeed:true, window, document, gameSize, objectProperties, thisHack, Laserpig, Phaser, Cloud, Mountain, House, Tree, Pizza, Chocolate, Lollipop, Burger, LaserSet, RoadLine, PausePanel, ScoreBoard, game, console, Tutorial, gameAudio */
/*jslint bitwise: true */

window.getRandomArbitrary = function (min, max) {
    'use strict';

    return Math.random() * (max - min) + min;
};

window.getRandomInt = function (min, max) {
    'use strict';

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Laserpig.Game = {
    init: function (gameInfo) {
        'use strict';

        //        gameInfo = {
        //            gameOptions: ...,
        //            statsObject: ...
        //        }

        // set gameLevel to the appropriate object
        this.GAME_OPTIONS = gameInfo.gameOptions;
        this.STATS_OBJECT = gameInfo.statsObject;

        // setting up the starting speed
        window.currentGameSpeed = this.GAME_OPTIONS.LEVEL.GAME.DEFAULT_SPEED; // this variable will change during the game (when boosting etc.)
    },
    'create': function () {
        'use strict';

        console.log('game started');

        // for testing purposes
        window.thisHack = this;

        this.STATS_OBJECT_KEY = 'statsObject';
        this.TUTORIAL_COMPLETE_KEY = 'tutorialComplete'; // also in Tutorial.js
        this.BOOST_TUTORIAL_COMPLETE_KEY = 'boostTutorialComplete';
        this.BOOST_UNLOCKED = 'boostUnlocked';

        var groupName,
            currentRoadLine,
            currentCloud,
            currentHouse,
            currentTree,
            currentMountain,
            x,
            y,
            i,
            GAME_OPTIONS = this.GAME_OPTIONS,
            STATS_OBJECT = this.STATS_OBJECT,
            gameInfo;

        // object positioning NB: SHOULD MAKE CONSTANTS BOLD
        window.objectProperties = {
            time: function () {
                return Date.now();
            },
            game: {
                time: {
                    elapsed: 0,
                    pauseStarted: Date.now(),
                    started: Date.now(),
                    totalPauseDuration: 0,
                    lastUpdated: Date.now()
                },
                LEVEL: GAME_OPTIONS.LEVEL,
                paused: false,
                lastTimePaused: 0,
                lastTimeOfRestartScreen: 0,
                lastTimeEsc: 0,
                lastTimeKeyQ: 0,
                gravity: GAME_OPTIONS.LEVEL.GAME.GRAVITY,
                DEFAULT_SPEED: GAME_OPTIONS.LEVEL.GAME.DEFAULT_SPEED,
                BACKGROUND_COLOR: '#27aae1',
                WORLD_BOUNDS: {
                    X: 0,
                    Y: 0,
                    WIDTH: game.width,
                    HEIGHT: game.height - 86 // - road.height NB: This is a hack, road collision was giving problems
                },
                stats: STATS_OBJECT,
                tempStats: {
                    score: 0,
                    totalPizzasCollected: 0,
                    totalLollipopsCollected: 0,
                    totalBurgersCollected: 0,
                    totalDrinksCollected: 0,
                    totalChocolatesCollected: 0,
                    totalPizzasCollectedScore: 0,
                    totalLollipopsCollectedScore: 0,
                    totalBurgersCollectedScore: 0,
                    totalDrinksCollectedScore: 0,
                    totalChocolatesCollectedScore: 0,
                    distance: 0,
                    totalScore: 0,
                    isNewhigscore: false
                }
            },
            buttons: {
                defaultDelay: 300, // in milliseconds
                restartDelay: 1300, // in milliseconds
                quitDelay: 1300, // in milliseconds
                upTouchPanel: {
                    x: 0,
                    y: 0,
                    width: game.width / 2,
                    height: game.height,
                    pressed: false
                },
                downTouchPanel: {
                    x: game.width / 2,
                    y: 0,
                    width: game.width / 2,
                    height: game.height,
                    pressed: false
                },
                pauseTouchPanel: {
                    x: 0,
                    y: 0,
                    width: 150,
                    height: 150,
                    pressed: false
                },
                boostTouchPanel: {
                    x: game.width - 160,
                    y: 150,
                    width: 160,
                    height: 140,
                    pressed: false
                },
                boostButton: {
                    x: game.width - 20,
                    y: 150,
                    scale: 0.8,
                    anchor: {
                        x: 1,
                        y: 0
                    },
                    key: 'boost_button'
                },
                pauseButton: {
                    x: 20,
                    y: 20,
                    scale: 1,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    key: 'pause_button'
                },
                playButton: {
                    x: 20,
                    y: 20,
                    scale: 1,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    key: 'play_button'
                }
            },
            boost: {
                speed: GAME_OPTIONS.LEVEL.BOOST.SPEED,
                multiplier: 10, // points multiplier
                length: 10000, // how long the boost will last (in ms)
                on: false, // is the boost currently on
                unlocked: false,
                endTime: Number.MAX_SAFE_INTEGER || Number.MAX_VALUE
            },
            boostGraphic: {
                x: game.width - 90,
                y: 221.5,
                radius: 64,
                backgroundColor: 0xea3f3f, //0x378490,
                backgroundOpacity: 0.75,
                foregroundColor: 0xffffff, // must be a number
                foregroundOpacity: 0.5
            },
            boostHint: {
                x: game.width - 160,
                y: 150,
                minCount: 5, // if they've boosted this many times, ignore the boost hint
                clicked: false,
                hintTime: Number.MAX_SAFE_INTEGER || Number.MAX_VALUE,
                hintDelay: 10000,
                key: this.game.device.desktop ? 'boost_tutorial_desktop' : 'boost_tutorial'
            },
            groups: {
                mountainsGroup: {
                    timeOfNext: Date.now() + game.rnd.integerInRange(45000, 80000) / currentGameSpeed,
                    velocity: {
                        x: -30
                    }
                },
                cloudsGroup: {
                    timeOfNext: 0,
                    velocity: {
                        x: -40
                    }
                },
                housesGroup: {
                    timeOfNext: 0,
                    velocity: {
                        x: -50
                    }
                },
                treesGroup: {
                    timeOfNext: 0,
                    velocity: {
                        x: -50
                    }
                },
                burgerGroup: {
                    timeOfNext: Date.now() + game.rnd.integerInRange(7000, 9000) / currentGameSpeed,
                    velocity: {
                        x: -150
                    }
                },
                pizzaGroup: {
                    timeOfNext: Date.now() + game.rnd.integerInRange(3000, 8000) / currentGameSpeed,
                    velocity: {
                        x: -150
                    }
                },
                chocolateGroup: {
                    timeOfNext: Date.now() + game.rnd.integerInRange(10000, 14000) / currentGameSpeed,
                    velocity: {
                        x: -150
                    }
                },
                lollipopGroup: {
                    timeOfNext: Date.now() + game.rnd.integerInRange(20000, 25000) / currentGameSpeed,
                    velocity: {
                        x: -150
                    }
                },
                lasersGroup: {
                    timeOfNext: 0,
                    distanceTillNext: 0,
                    velocity: {
                        x: -150
                    }
                },
                roadLineGroup: {
                    timeOfNext: 0,
                    distanceTillNext: 0,
                    velocity: {
                        x: -150
                    }
                }
            },
            sky: {
                x: 0,
                y: 0,
                width: game.width,
                height: game.height,
                BACKGROUND_COLOR: '#27aae1'
            },
            ground: {
                x: 0,
                y: game.height - (game.height / 3), // game.height - ground.height
                height: (game.height / 3) - (game.height / 8), // height of the groud - height of the road
                width: game.width,
                BACKGROUND_COLOR: '#8dc63f'
            },
            road: {
                x: 0,
                y: game.height - (game.height / 8),
                height: game.height / 8,
                width: game.width,
                dust: false,
                speed: function () {
                    return -150 * currentGameSpeed;
                },
                BACKGROUND_COLOR: '#a97c50'
            },
            roadLine: {
                x: game.width,
                y: game.height - 60,
                rate: function () {
                    return 1500 / currentGameSpeed;
                }
            },
            pig: {
                x: game.width / 8,
                y: game.height / 2,
                anchor: 0.5,
                scale: 1,
                maxAngle: 40,
                minAngle: -40,
                velocity: {
                    y: 0
                },
                alive: true,
                jetpack: GAME_OPTIONS.JETPACK
            },
            cloud: {
                x: game.width,
                y: function () {
                    return game.rnd.integerInRange(0, (game.world.height / 3));
                },
                rate: function () {
                    return game.rnd.integerInRange(2000, 8000) / currentGameSpeed;
                }
            },
            mountain: {
                x: game.width,
                y: game.height - (game.height / 3), // game.height - ground.height
                rate: function () {
                    return game.rnd.integerInRange(45000, 80000) / currentGameSpeed;
                }
            },
            house: {
                x: game.width,
                y: function () {
                    return game.height - (game.height / 3) + game.rnd.integerInRange(42, 100); // game.height - ground.height + a random y value
                },
                rate: function () {
                    return game.rnd.integerInRange(5000, 25000) / currentGameSpeed;
                }
            },
            tree: {
                x: game.width,
                y: function () {
                    return game.height - (game.height / 3) + game.rnd.integerInRange(5, 100); // game.height - ground.height + a random y value
                },
                rate: function () {
                    return game.rnd.integerInRange(2000, 8000) / currentGameSpeed;
                }
            },
            pizza: {
                x: game.width,
                y: function (rowCount) { // rowCount is the number of items vertically stacked
                    return game.rnd.integerInRange(15, ((7 * game.height) / 8) - (rowCount * 26) - 50); // random value between 0 and the top of the road (3/4 game height)
                },
                rate: function () {
                    return game.rnd.integerInRange(3000, 8000) / currentGameSpeed;
                },
                width: 48,
                height: 25.2,
                weighting: 1,
                currentScoreWeighting: undefined // weighting * distance.currentMultiplier
            },
            burger: {
                x: game.width,
                y: function (rowCount) { // rowCount is the number of items vertically stacked
                    return game.rnd.integerInRange(15, ((7 * game.height) / 8) - (rowCount * 32) - 50); // random value between 0 and the top of the road (3/4 game height)
                },
                rate: function () {
                    return game.rnd.integerInRange(7000, 9000) / currentGameSpeed;
                },
                width: 48,
                height: 31.2,
                weighting: 3,
                currentScoreWeighting: undefined // weighting * distance.currentMultiplier
            },
            chocolate: {
                x: game.width,
                y: function (rowCount) { // rowCount is the number of items vertically stacked
                    return game.rnd.integerInRange(15, ((7 * game.height) / 8) - (rowCount * 26) - 50); // random value between 0 and the top of the road (3/4 game height)
                },
                rate: function () {
                    return game.rnd.integerInRange(10000, 14000) / currentGameSpeed;
                },
                width: 48,
                height: 25.2,
                weighting: 5,
                currentScoreWeighting: undefined // weighting * distance.currentMultiplier
            },
            lollipop: {
                x: game.width,
                y: function (rowCount) { // rowCount is the number of items vertically stacked
                    return game.rnd.integerInRange(15, ((7 * game.height) / 8) - (rowCount * 60) - 50); // random value between 0 and the top of the road (3/4 game height)
                },
                rate: function () {
                    return game.rnd.integerInRange(20000, 25000) / currentGameSpeed;
                },
                width: 48,
                height: 60,
                weighting: 12,
                currentScoreWeighting: undefined // weighting * distance.currentMultiplier
            },
            laser: {
                x: game.width,
                y: 0,
                rate: function () {
                    return game.rnd.integerInRange(5000, 8000) / currentGameSpeed;
                }
            },
            dustCloud: {
                x: (game.width / 8) - 45,
                y: (game.height - (game.height / 3)) + 60,
                key: 'dust_cloud'
            },
            distance: {
                currentMultiplier: 1,
                multiplierIncrease: 1,
                maxMultiplier: 5,
                multiplierUpdateDistance: 1000, // value at which the currentMultiplier increases by multiplierIncrease
                currentMultiplierPrefix: 'x',
                totalMultiplierSum: 0,
                multiplierChangeCount: 0,
                weighting: 0.1,
                constant: 0.2 // the constant to multiply by in order to get a normal looking distance, constant of 0.2 gives +-35.5ms on EASY (no boost)
            }
        };

        var gameContainer = document.getElementById('game-container'),
            gameContainerRect = gameContainer.getBoundingClientRect();

        document.getElementById('stats-wrapper').style.top = (((gameContainer.clientHeight / gameSize.height) * 15) + gameContainerRect.top) + 'px';
        document.getElementById('stats-wrapper').style.right = (((gameContainer.clientHeight / gameSize.height) * 20) + (window.innerWidth - gameContainerRect.right)) + 'px';
        document.getElementById('stats-wrapper').style.left = '';

        Laserpig.Game.scoreElement = document.getElementById('score');
        Laserpig.Game.distanceElement = document.getElementById('distance');
        Laserpig.Game.multiplierElement = document.getElementById("multiplier");

        Laserpig.Game.fontHeight = 40 * (gameContainer.clientHeight / gameSize.height);


        Laserpig.Game.scoreElement.style.display = 'block';
        Laserpig.Game.distanceElement.style.display = 'block';
        Laserpig.Game.scoreElement.innerHTML = "Item Score: " + objectProperties.game.tempStats.score;
        Laserpig.Game.distanceElement.innerHTML = "Distance: " + objectProperties.game.tempStats.distance;


        Laserpig.Game.multiplierElement.style.top = (((gameContainer.clientHeight / gameSize.height) * 40) + gameContainerRect.top) + 'px';
        Laserpig.Game.multiplierElement.style.left = ((gameContainerRect.left) + (gameContainer.clientWidth / 2) - (Laserpig.Game.multiplierElement.offsetWidth / 2)) + 'px';
        Laserpig.Game.scoreElement.style.fontSize = Laserpig.Game.fontHeight + "px";
        Laserpig.Game.distanceElement.style.fontSize = Laserpig.Game.fontHeight + "px";
        Laserpig.Game.multiplierElement.style.fontSize = (60 * (gameContainer.clientHeight / gameSize.height)) + "px";

        window.onscroll = window.onresize = function (event) {

            gameContainerRect = gameContainer.getBoundingClientRect();

            document.getElementById('stats-wrapper').style.top = (((gameContainer.clientHeight / gameSize.height) * 15) + gameContainerRect.top) + 'px';
            document.getElementById('stats-wrapper').style.right = (((gameContainer.clientHeight / gameSize.height) * 20) + (window.innerWidth - gameContainerRect.right)) + 'px';
            document.getElementById('stats-wrapper').style.left = '';

            Laserpig.Game.multiplierElement.style.left = ((gameContainerRect.left) + (gameContainer.clientWidth / 2) - (Laserpig.Game.multiplierElement.offsetWidth / 2)) + 'px';
            Laserpig.Game.multiplierElement.style.fontSize = (60 * (gameContainer.clientHeight / gameSize.height)) + "px";

            Laserpig.Game.fontHeight = 40 * (gameContainer.clientHeight / gameSize.height);
            Laserpig.Game.scoreElement.style.fontSize = Laserpig.Game.fontHeight + "px";
            Laserpig.Game.distanceElement.style.fontSize = Laserpig.Game.fontHeight + "px";

        };



        // setting the world bounds (x,y,width,height)
        this.game.world.setBounds(objectProperties.game.WORLD_BOUNDS.X, objectProperties.game.WORLD_BOUNDS.Y, objectProperties.game.WORLD_BOUNDS.WIDTH, objectProperties.game.WORLD_BOUNDS.HEIGHT);
        this.game.stage.backgroundColor = objectProperties.game.BACKGROUND_COLOR;



        // ------------------------- SETTING UP IMAGES ---------------------------------
        // order of images matters

        this.backgroundGraphics = game.add.graphics(0, 0);
        this.backgroundGraphics.clear();
        // ground
        this.backgroundGraphics.beginFill(0x8dc63f, 1);
        this.backgroundGraphics.drawRect(objectProperties.ground.x, objectProperties.ground.y, objectProperties.ground.width, objectProperties.ground.height);
        // road
        this.backgroundGraphics.beginFill(0xa97c50, 1);
        this.backgroundGraphics.drawRect(objectProperties.road.x, objectProperties.road.y, objectProperties.road.width, objectProperties.road.height);
        //        this.ground = this.game.add.tileSprite(objectProperties.ground.x, objectProperties.ground.y, objectProperties.ground.width, objectProperties.ground.height, 'ground');
        //
        this.road = this.add.sprite(objectProperties.road.x, objectProperties.road.y);
        this.road.width = objectProperties.road.width;
        this.road.height = objectProperties.road.height;
        this.game.physics.arcade.enableBody(this.road); // the road must be a body for us to detect a collision with it
        this.road.body.allowGravity = false;
        this.road.body.immovable = true;

        // creating the groups, using the groups defined in objectProperties.groups
        for (groupName in objectProperties.groups) {
            if (objectProperties.groups.hasOwnProperty(groupName)) {
                this[groupName] = this.game.add.group();
            }
        }

        // add group elements to fill blank space in the beginning
        // the groups must exist

        // road lines
        x = game.width - 232;
        while (x > -100) {
            y = objectProperties.roadLine.y;

            currentRoadLine = new RoadLine(this.game, x, y);
            this.roadLineGroup.add(currentRoadLine);

            currentRoadLine.reset(x, y);
            currentRoadLine.revive();

            // set to next road line position
            x = x - 232;
        }

        // clouds
        x = game.width - game.rnd.integerInRange(150, 300);
        while (x > -100) {
            y = objectProperties.cloud.y();

            currentCloud = new Cloud(this.game, x, y);
            this.cloudsGroup.add(currentCloud);

            currentCloud.reset(x, y);
            currentCloud.revive();

            // set to next cloud position
            x = x - game.rnd.integerInRange(150, 300);
        }

        // houses
        x = game.width - game.rnd.integerInRange(500, 1200);
        while (x > -200) {
            y = objectProperties.house.y();

            currentHouse = new House(this.game, x, y);
            this.housesGroup.add(currentHouse);

            currentHouse.reset(x, y);
            currentHouse.revive();

            // set to next house position
            x = x - game.rnd.integerInRange(500, 1500);
        }

        // trees
        x = game.width - game.rnd.integerInRange(250, 400);
        while (x > -50) {
            y = objectProperties.tree.y();
            currentTree = new Tree(this.game, x, y);
            this.treesGroup.add(currentTree);
            currentTree.reset(x, y);
            currentTree.revive();

            // if the tree is placed on a house, kill the tree
            // NB the house png must have a little empty space on the left to avoid overlapping when the tree is placed before the house
            if (this.game.physics.arcade.overlap(this.housesGroup, currentTree, null, null, this)) {
                currentTree.kill();
            }

            // set to next tree position
            x = x - game.rnd.integerInRange(250, 400);
        }

        // mountain
        currentMountain = new Mountain(this.game, objectProperties.mountain.x, objectProperties.mountain.y);
        this.mountainsGroup.add(currentMountain);
        currentMountain.reset(game.rnd.integerInRange(-(currentMountain.width / 2), game.width - currentMountain.width), objectProperties.mountain.y);
        currentMountain.revive();

        this.pig = this.add.sprite(objectProperties.pig.x, objectProperties.pig.y, objectProperties.pig.jetpack.KEY);
        this.pig.anchor.setTo(objectProperties.pig.anchor);
        this.pig.scale.setTo(objectProperties.pig.scale);
        this.pig.animations.add('flames', [6, 7, 8, 9, 10, 11, 10, 9, 8, 7]); // define flames animation
        this.pig.animations.play('flames', 24, true); // play flames animation
        this.pig.animations.add('flames-down', [18, 19, 20, 21, 22, 23, 22, 21, 20, 19]); // define flames-up animation
        this.pig.animations.add('flames-up', [12, 13, 14, 15, 16, 17, 16, 15, 14, 13]); // define flames animation
        this.pig.animations.add('flames-boost', [0, 1, 2, 3, 4, 5, 4, 3, 2, 1]); // define flames animation
        this.game.physics.arcade.enableBody(this.pig);
        this.pig.body.collideWorldBounds = true; // make sure the pig doesn't go out of bounds

        // water droplets
        //        this.splash = this.game.add.emitter(objectProperties.pig.x + (this.pig.width / 4), objectProperties.road.y, 50);
        //        this.splash.makeParticles('water-drop');
        //        this.splash.minParticleSpeed.setTo(-20, -150);
        //        this.splash.maxParticleSpeed.setTo(200, -50);
        //        this.splash.gravity = 0;
        //        this.splash.minParticleScale = 0.1;
        //        this.splash.maxParticleScale = 0.8;

        // pizza crumbs
        this.pizzaCrumbs = this.game.add.emitter(300, 300, 50);
        this.pizzaCrumbs.makeParticles('pizza-crumb');
        this.pizzaCrumbs.minParticleSpeed.setTo(-20, -150);
        this.pizzaCrumbs.maxParticleSpeed.setTo(-200, -50);
        this.pizzaCrumbs.gravity = objectProperties.game.gravity * 2;
        this.pizzaCrumbs.minParticleScale = 0.1;
        this.pizzaCrumbs.maxParticleScale = 0.8;

        // chocolate crumbs
        this.chocolateCrumbs = this.game.add.emitter(300, 300, 50);
        this.chocolateCrumbs.makeParticles('chocolate-crumb');
        this.chocolateCrumbs.minParticleSpeed.setTo(-20, -150);
        this.chocolateCrumbs.maxParticleSpeed.setTo(-200, -50);
        this.chocolateCrumbs.gravity = objectProperties.game.gravity * 2;
        this.chocolateCrumbs.minParticleScale = 0.1;
        this.chocolateCrumbs.maxParticleScale = 0.8;

        // lollipop crumbs
        this.lollipopCrumbs = this.game.add.emitter(300, 300, 50);
        this.lollipopCrumbs.makeParticles('lollipop-crumb');
        this.lollipopCrumbs.minParticleSpeed.setTo(-20, -150);
        this.lollipopCrumbs.maxParticleSpeed.setTo(-200, -50);
        this.lollipopCrumbs.gravity = objectProperties.game.gravity * 2;
        this.lollipopCrumbs.minParticleScale = 0.1;
        this.lollipopCrumbs.maxParticleScale = 0.8;

        //bacon crumbs
        this.baconCrumbs = this.game.add.emitter(300, 300, 50);
        this.baconCrumbs.makeParticles('bacon');
        this.baconCrumbs.minParticleScale = 0.3;
        this.baconCrumbs.maxParticleScale = 0.6;
        this.baconCrumbs.minParticleSpeed.setTo(50 * window.currentGameSpeed, -150);
        this.baconCrumbs.maxParticleSpeed.setTo(100 * window.currentGameSpeed, -50);
        this.baconCrumbs.gravity = objectProperties.game.gravity / window.currentGameSpeed;



        // -----------------------------------------------------------------------------



        // ------------------------- SETTING UP GRAPHICS -------------------------------
        this.boostGraphic = game.add.graphics(0, 0);
        //        this.boostGraphic.alpha = 0.5;
        //        this.game.add.tween(this.boostGraphic).to({
        //            alpha: 0.9
        //        }, 600, Phaser.Easing.Cubic.InOut, true, 0, -1, true);

        this.boostProgress = function (progress) {
            var angle = 360 * progress;
            this.boostGraphic.clear();
            // background circle
            this.boostGraphic.beginFill(objectProperties.boostGraphic.backgroundColor, objectProperties.boostGraphic.backgroundOpacity);
            this.boostGraphic.drawCircle(objectProperties.boostGraphic.x, objectProperties.boostGraphic.y, objectProperties.boostGraphic.radius * 2);
            // foreground circle
            this.boostGraphic.beginFill(objectProperties.boostGraphic.foregroundColor, objectProperties.boostGraphic.foregroundOpacity);
            this.boostGraphic.moveTo(objectProperties.boostGraphic.x, objectProperties.boostGraphic.y);
            this.boostGraphic.arc(objectProperties.boostGraphic.x, objectProperties.boostGraphic.y, objectProperties.boostGraphic.radius, (-90 * (Math.PI / 180)), (-90 * (Math.PI / 180)) + ((angle * Math.PI) / 180));
            this.boostGraphic.lineTo(objectProperties.boostGraphic.x, objectProperties.boostGraphic.y);
        };

        this.pigsFace = game.add.graphics(0, 0);
        this.drawFaceRect = function (x, y, width, height) {
            this.pigsFace.clear();
            this.pigsFace.beginFill(0x000000, 0.5);
            this.pigsFace.drawRect(x, y, width, height);
        };

        this.pizzaBlock = game.add.graphics(0, 0);
        this.drawPizzaRect = function (x, y, width, height) {
            this.pizzaBlock.beginFill(0x000000, 0.5);
            this.pizzaBlock.drawRect(x, y, width, height);
        };

        //        this.laserStuffDrawn = game.add.graphics(0, 0);
        //        this.DRAWcircleLineIntersectionGraphics = game.add.graphics(0, 0);
        //        this.drawLine = function (x1, y1, x2, y2, color) {
        //            this.laserStuffDrawn.lineStyle(1, color);
        //            this.laserStuffDrawn.moveTo(x1, y1);
        //            this.laserStuffDrawn.lineTo(x2, y2);
        //            this.laserStuffDrawn.endFill();
        //        };
        //        this.drawCircle = function (x, y, r, color) {
        //            this.laserStuffDrawn.beginFill(color);
        //            this.laserStuffDrawn.drawCircle(x, y, r * 2);
        //            this.laserStuffDrawn.endFill();
        //        };
        // -----------------------------------------------------------------------------



        // ------------------------- SETTING UP AUDIO ---------------------------------
        //this.pigSnort = this.game.add.audio('pig-snort');
        // ----------------------------------------------------------------------------



        // ------------------------- SETTING UP PIG CONTROLS ---------------------------
        this.arrowKeys = this.game.input.keyboard.createCursorKeys();

        // keep the spacebar from propogating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keyboardButtonEsc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.keyboardButtonA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keyboardButtonW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keyboardButtonD = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.keyboardButtonS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keyboardButtonR = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.keyboardButtonP = game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.keyboardButtonQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);

        // Adding on-screen Touch Panels
        this.upTouchPanel = this.game.add.sprite(objectProperties.buttons.upTouchPanel.x, objectProperties.buttons.upTouchPanel.y);
        this.upTouchPanel.width = objectProperties.buttons.upTouchPanel.width;
        this.upTouchPanel.height = objectProperties.buttons.upTouchPanel.height;
        this.upTouchPanel.inputEnabled = true;
        this.upTouchPanel.events.onInputDown.add(function () {
            objectProperties.buttons.upTouchPanel.pressed = true;
        }, this);
        this.upTouchPanel.events.onInputUp.add(function () {
            objectProperties.buttons.upTouchPanel.pressed = false;
        }, this);

        this.downTouchPanel = this.game.add.sprite(objectProperties.buttons.downTouchPanel.x, objectProperties.buttons.downTouchPanel.y);
        this.downTouchPanel.width = objectProperties.buttons.downTouchPanel.width;
        this.downTouchPanel.height = objectProperties.buttons.downTouchPanel.height;
        this.downTouchPanel.inputEnabled = true;
        this.downTouchPanel.events.onInputDown.add(function () {
            objectProperties.buttons.downTouchPanel.pressed = true;
        }, this);
        this.downTouchPanel.events.onInputUp.add(function () {
            objectProperties.buttons.downTouchPanel.pressed = false;
        }, this);

        this.boostTouchPanel = this.game.add.sprite(objectProperties.buttons.boostTouchPanel.x, objectProperties.buttons.boostTouchPanel.y);
        this.boostTouchPanel.width = objectProperties.buttons.boostTouchPanel.width;
        this.boostTouchPanel.height = objectProperties.buttons.boostTouchPanel.height;
        this.boostTouchPanel.inputEnabled = true;
        this.boostTouchPanel.events.onInputDown.add(function () {
            objectProperties.buttons.boostTouchPanel.pressed = true;
        }, this);
        this.boostTouchPanel.events.onInputUp.add(function () {
            objectProperties.buttons.boostTouchPanel.pressed = false;
        }, this);

        this.pauseTouchPanel = this.game.add.sprite(objectProperties.buttons.pauseTouchPanel.x, objectProperties.buttons.pauseTouchPanel.y);
        this.pauseTouchPanel.width = objectProperties.buttons.pauseTouchPanel.width;
        this.pauseTouchPanel.height = objectProperties.buttons.pauseTouchPanel.height;
        this.pauseTouchPanel.inputEnabled = true;
        this.pauseTouchPanel.events.onInputUp.add(function () {
            this.pauseGame();
        }, this);

        // graphics to see if the touch panels are in the right place
        //        this.touchPanelGraphics = game.add.graphics(0, 0);
        //        // boostTouchPanel
        //        this.touchPanelGraphics.beginFill(0x893247, 0.5); // #000000
        //        this.touchPanelGraphics.drawRect(objectProperties.buttons.boostTouchPanel.x, objectProperties.buttons.boostTouchPanel.y, objectProperties.buttons.boostTouchPanel.width, objectProperties.buttons.boostTouchPanel.height);
        //        // pauseTouchPanel
        //        this.touchPanelGraphics.beginFill(0x000000, 0.5);
        //        this.touchPanelGraphics.drawRect(objectProperties.buttons.pauseTouchPanel.x, objectProperties.buttons.pauseTouchPanel.y, objectProperties.buttons.pauseTouchPanel.width, objectProperties.buttons.pauseTouchPanel.height);
        //        // upTouchPanel
        //        this.touchPanelGraphics.beginFill(0x8dc63f, 0.5);
        //        this.touchPanelGraphics.drawRect(objectProperties.buttons.upTouchPanel.x, objectProperties.buttons.upTouchPanel.y, objectProperties.buttons.upTouchPanel.width, objectProperties.buttons.upTouchPanel.height);
        //        // downTouchPanel
        //        this.touchPanelGraphics.beginFill(0xd2691e, 0.5);
        //        this.touchPanelGraphics.drawRect(objectProperties.buttons.downTouchPanel.x, objectProperties.buttons.downTouchPanel.y, objectProperties.buttons.downTouchPanel.width, objectProperties.buttons.downTouchPanel.height);

        //        this.playButton = this.game.add.sprite(objectProperties.buttons.playButton.x, objectProperties.buttons.playButton.y, objectProperties.buttons.playButton.key);
        //        this.playButton.anchor.setTo(objectProperties.buttons.playButton.anchor.x, objectProperties.buttons.playButton.anchor.y);
        //        this.playButton.scale.setTo(objectProperties.buttons.playButton.scale);

        this.pauseButton = this.game.add.sprite(objectProperties.buttons.pauseButton.x, objectProperties.buttons.pauseButton.y, objectProperties.buttons.pauseButton.key);
        this.pauseButton.anchor.setTo(objectProperties.buttons.pauseButton.anchor.x, objectProperties.buttons.pauseButton.anchor.y);
        this.pauseButton.scale.setTo(objectProperties.buttons.pauseButton.scale);

        this.boostButton = this.game.add.sprite(objectProperties.buttons.boostButton.x, objectProperties.buttons.boostButton.y, objectProperties.buttons.boostButton.key);
        this.boostButton.anchor.setTo(objectProperties.buttons.boostButton.anchor.x, objectProperties.buttons.boostButton.anchor.y);
        this.boostButton.scale.setTo(objectProperties.buttons.boostButton.scale);
        // -----------------------------------------------------------------------------



        // ------------------------- START PHYSICS ENGINE ---------------------------------
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // using the Arcade engine
        this.game.physics.arcade.gravity.y = objectProperties.game.gravity;
        // --------------------------------------------------------------------------------



        // ------------------------- SETTING UP EVENTS ---------------------------
        this.game.onPause.add(this.pauseGame, this);
        //this.game.onResume.add(this.resumeTimeOfNext, this);
        // -----------------------------------------------------------------------

        // Let's build a pause panel
        this.pausePanel = new PausePanel(this.game);
        this.game.add.existing(this.pausePanel);

        // Scoreboard details
        this.scoreBoard = new ScoreBoard(this.game);


        // Tutorial
        // load stored tutorial complete
        this.tutorialComplete = JSON.parse(localStorage.getItem(this.TUTORIAL_COMPLETE_KEY));
        // if tutorial complete was not found in localStorage, assume they have not been through the tutorial
        if (this.tutorialComplete !== true) {
            this.tutorialComplete = false;
        }

        // if the tutorial has not been completed, then show it
        if (!this.tutorialComplete) {
            this.tutorial = new Tutorial(this.game);
            this.tutorial.show();

            // if not on easy, boot on easy
            if (objectProperties.game.LEVEL.KEY !== Laserpig.MainMenu.LEVELS.EASY.KEY) {
                gameInfo = {
                    gameOptions: {
                        LEVEL: Laserpig.MainMenu.LEVELS.EASY,
                        JETPACK: objectProperties.pig.jetpack
                    },
                    statsObject: objectProperties.game.stats
                };

                //objectProperties.game.lastTimeOfRestartScreen = objectProperties.time();
                this.game.state.start('Game', true, false, gameInfo);
            }
        }

        this.audio = {
            buttonClicked: game.add.audio('button_click_audio'),
            snort: game.add.audio('pig_snort_audio'),
            laser_hit: game.add.audio('laser_hit_audio'),
            boostSound: game.add.audio('boost_audio'),
            bombSound: game.add.audio('bomb_audio'),
            windSound: game.add.audio('game_play_wind_audio'),
            gameplayMusic: game.add.audio('game_play_audio')
        };

        this.audio.gameplayMusic.play('', 0, gameAudio.game.gameMusic.volume, true);
        this.audio.windSound.play('', 0, gameAudio.pig.wind.volume, true);


        this.boostTutorial = this.game.add.sprite(this.boostButton.x, this.boostButton.y + this.boostButton.height, objectProperties.boostHint.key);
        this.boostTutorial.anchor.setTo(1, 0);
        this.rightHand = game.add.sprite(objectProperties.buttons.boostButton.x - objectProperties.boostGraphic.radius - 25, objectProperties.buttons.boostButton.y + objectProperties.boostGraphic.radius + 20, 'tutorial_hand');
        this.rightHand.anchor.setTo(0, 0);
        this.rightHand.scale.setTo(0.5);
        this.game.add.tween(this.rightHand.scale).to({
            x: 0.7,
            y: 0.7
        }, 600, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
        this.boostTutorial.visible = false;
        this.rightHand.visible = false;

        // load stored boost unlocked
        objectProperties.boost.unlocked = JSON.parse(localStorage.getItem(this.BOOST_UNLOCKED));
        // if boost unlocked was not found in localStorage, assume they have not been through the tutorial
        if (objectProperties.boost.unlocked !== true) {
            objectProperties.boost.unlocked = false;
        }

        // load stored boost tutorial complete
        objectProperties.boostHint.clicked = JSON.parse(localStorage.getItem(this.BOOST_TUTORIAL_COMPLETE_KEY));
        // if tutorial complete was not found in localStorage, assume they have not clicked the hint
        if (objectProperties.boostHint.clicked !== true) {
            objectProperties.boostHint.clicked = false;
        }

    },
    update: function () {
        'use strict';

        this.manageTime();

        // make sure the game isn't paused
        if (!objectProperties.game.paused) {

            // this handles all the key and button presses
            this.handleControlsEvents();

            // setting the pigs angle based on the velocity (and max angle allowed)
            this.pig.angle = this.pig.body.velocity.y * (objectProperties.pig.maxAngle / objectProperties.pig.jetpack.MAX_VELOCITY);

            // managing groups
            this.manageMountains();
            this.manageClouds();
            this.manageHouses();
            this.manageTrees();
            this.manageLasers();
            this.manageLaserRate();
            this.manageRoadLine();
            // managing groups - items (order matters)
            this.managePizza();
            this.manageBurger();
            this.manageChocolate();
            this.manageLollipop();

            // manage overlapping
            this.manageOverlapping();

            // 
            this.manageScore();
            this.isNewHighScore();

            // this handles all the collision detection
            this.handleCollisionEvents();

        }

        if (!objectProperties.pig.alive) {

            this.audio.boostSound.stop();
            this.audio.gameplayMusic.stop();
            this.audio.windSound.stop();

        }

        // this must be outside of the !objectProperties.game.paused loop, because otherwise you will 
        // have problems with body.velocity etc. since this.pig.body = null when paused
        this.handleKeyboardEvents();

        // show/unlock boost button if
        if (objectProperties.game.time.elapsed > objectProperties.boostHint.hintDelay) {
            objectProperties.boost.unlocked = true;
        }

        // manage boost hint
        if (!objectProperties.boostHint.clicked && objectProperties.pig.alive && this.tutorialComplete && objectProperties.boost.unlocked) {
            this.boostTutorial.visible = true;
            this.rightHand.visible = true;
        } else {
            this.boostTutorial.visible = false;
            this.rightHand.visible = false;
        }
    },
    manageTime: function () {
        'use strict';

        if (!objectProperties.game.paused) {
            objectProperties.game.time.elapsed = objectProperties.game.time.elapsed + (objectProperties.time() - objectProperties.game.time.lastUpdated);
        }

        objectProperties.game.time.lastUpdated = objectProperties.time();
    },
    handleKeyboardEvents: function () {
        'use strict';

        // keyboard restart
        if (this.keyboardButtonR.isDown && ((objectProperties.time() - objectProperties.game.lastTimeOfRestartScreen) >= objectProperties.buttons.restartDelay)) {
            this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
            this.scoreBoard.audio.scoreboardMusic.stop();
            this.scoreBoard.audio.newHighscoreMusic.stop();
            this.restart();
        }

        if (objectProperties.game.paused) {

            // keyboard play
            if (this.keyboardButtonP.isDown && objectProperties.pig.alive && ((objectProperties.time() - objectProperties.game.lastTimePaused) >= objectProperties.buttons.defaultDelay)) {
                this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

                objectProperties.game.lastTimePaused = objectProperties.time();
                this.resumeGame();
            }

            // keyboard quit from pausePanel to scoreBoard
            if (this.keyboardButtonQ.isDown && objectProperties.pig.alive && ((objectProperties.time() - objectProperties.game.lastTimeKeyQ) >= objectProperties.buttons.defaultDelay)) {
                this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

                objectProperties.game.lastTimeKeyQ = objectProperties.time();
                objectProperties.pig.alive = false;

                this.pausePanel.hide();

                this.scoreBoard.show(objectProperties.game.tempStats.score,
                    Math.floor(objectProperties.game.tempStats.distance),
                    objectProperties.game.tempStats.totalPizzasCollected,
                    objectProperties.game.tempStats.totalBurgersCollected,
                    objectProperties.game.tempStats.totalChocolatesCollected,
                    objectProperties.game.tempStats.totalLollipopsCollected,
                    Laserpig.Game.currentCredits);

            } else if (this.keyboardButtonQ.isDown && !objectProperties.pig.alive && ((objectProperties.time() - objectProperties.game.lastTimeKeyQ) >= objectProperties.buttons.defaultDelay) && ((objectProperties.time() - objectProperties.game.lastTimeOfRestartScreen) >= objectProperties.buttons.quitDelay)) {
                this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
                this.scoreBoard.audio.scoreboardMusic.stop();
                this.scoreBoard.audio.newHighscoreMusic.stop();

                this.quit();
            }

            // keyboard esc-quit
            if (this.keyboardButtonEsc.isDown && ((objectProperties.time() - objectProperties.game.lastTimeEsc) >= objectProperties.buttons.defaultDelay)) {
                // keyboard quit from pausePanel to scoreBoard
                if (objectProperties.pig.alive) {
                    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

                    objectProperties.game.lastTimeEsc = objectProperties.time();
                    objectProperties.pig.alive = false;

                    this.pausePanel.hide();

                    this.scoreBoard.show(objectProperties.game.tempStats.score,
                        Math.floor(objectProperties.game.tempStats.distance),
                        objectProperties.game.tempStats.totalPizzasCollected,
                        objectProperties.game.tempStats.totalBurgersCollected,
                        objectProperties.game.tempStats.totalChocolatesCollected,
                        objectProperties.game.tempStats.totalLollipopsCollected,
                        Laserpig.Game.currentCredits);

                } else if ((objectProperties.time() - objectProperties.game.lastTimeOfRestartScreen) >= objectProperties.buttons.quitDelay) {
                    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
                    this.scoreBoard.audio.scoreboardMusic.stop();
                    this.scoreBoard.audio.newHighscoreMusic.stop();

                    // the pig is not alive so we can just quit
                    this.quit();
                }
            }

        } else {

            // keyboard esc-pause
            if (this.keyboardButtonEsc.isDown && objectProperties.pig.alive && ((objectProperties.time() - objectProperties.game.lastTimeEsc) >= objectProperties.buttons.defaultDelay)) {
                this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

                objectProperties.game.lastTimeEsc = objectProperties.time();
                this.pauseGame();
            }

            // keyboard pause
            if (this.keyboardButtonP.isDown && objectProperties.pig.alive && ((objectProperties.time() - objectProperties.game.lastTimePaused) >= objectProperties.buttons.defaultDelay)) {
                this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

                objectProperties.game.lastTimePaused = objectProperties.time();
                this.pauseGame();
            }

        }
    },
    handleControlsEvents: function () {
        'use strict';

        if (this.arrowKeys.left.isDown || this.arrowKeys.up.isDown || objectProperties.buttons.upTouchPanel.pressed || this.keyboardButtonA.isDown || this.keyboardButtonW.isDown) {
            if (this.pig.body.velocity.y > objectProperties.pig.jetpack.MIN_VELOCITY) {
                this.pig.body.velocity.y -= objectProperties.pig.jetpack.SPEED;
            }
            // change flame
            if (objectProperties.boost.on) {
                this.pig.animations.play('flames-boost', 24, true);
            } else {
                this.pig.animations.play('flames-up', 24, true);
            }
        } else if (this.arrowKeys.right.isDown || this.arrowKeys.down.isDown || objectProperties.buttons.downTouchPanel.pressed || this.keyboardButtonD.isDown || this.keyboardButtonS.isDown) {
            if (this.pig.body.velocity.y < objectProperties.pig.jetpack.MAX_VELOCITY) {
                this.pig.body.velocity.y += objectProperties.pig.jetpack.SPEED;
            }
            // change flame
            if (objectProperties.boost.on) {
                this.pig.animations.play('flames-boost', 24, true);
            } else {
                this.pig.animations.play('flames-down', 24, true);
            }
        } else {
            // set flame to default (since the player isn't pressing any controls)
            if (objectProperties.boost.on) {
                this.pig.animations.play('flames-boost', 24, true);
            } else {
                this.pig.animations.play('flames', 24, true);
            }
        }

        if (objectProperties.boost.unlocked) {
            this.boostGraphic.visible = true;
            this.boostTouchPanel.visible = true;
            if (this.spacebar.isDown || objectProperties.buttons.boostTouchPanel.pressed || objectProperties.boost.on) {
                this.boost();
                this.boostProgress(1 - ((objectProperties.boost.endTime - objectProperties.time()) / objectProperties.boost.length));
                // since the boost is on, check if it is over
                if (objectProperties.time() > objectProperties.boost.endTime) {
                    this.boostGraphic.clear();
                    // then we must stop the boost
                    this.boostOver();
                }
            } else {
                // put here so that it isn't shown when boost is on (i.e. objectProperties.boost.on === true)
                this.boostButton.visible = true;
            }
        } else {
            this.boostGraphic.visible = false;
            this.boostTouchPanel.visible = false;
            this.boostButton.visible = false;
        }
    },
    handleCollisionEvents: function () {
        'use strict';

        var groupName,
            groupsChildren,
            i,
            j,
            current,
            r = this.pig.width / 2,
            pigMouthX = this.pig.x - 25 + (r * Math.cos(this.pig.rotation)),
            pigMouthY = this.pig.y - 15 + (r * Math.sin(this.pig.rotation)),
            pigMouthWidth = 20,
            pigMouthHeight = 20,
            // defining the pigs body with two circles
            rPigBody = this.pig.height / 3,
            rPigHead = this.pig.height / 4,
            PigBody = { // doesn't follow the pigs rotation perfectly, but good enough
                x: this.pig.x - 10 + (50 * Math.cos(this.pig.rotation)),
                y: this.pig.y + 10 + (50 * Math.sin(this.pig.rotation))
            },
            PigHead = { // doesn't follow the pigs rotation perfectly, but good enough
                x: this.pig.x - 30 + (r * Math.cos(this.pig.rotation)),
                y: this.pig.y - 15 + (r * Math.sin(this.pig.rotation))
            },
            currentLaserStart,
            currentLaserEnd;


        // ---------------- Collisions with lasers ------------------
        //        this.laserStuffDrawn.clear();
        //        this.DRAWcircleLineIntersectionGraphics.clear();
        //        this.drawCircle(PigHead.x, PigHead.y, rPigHead, 0xFF0000);
        //        this.drawCircle(PigBody.x, PigBody.y, rPigBody, 0xFF0000);
        for (i = 0; i < this.lasersGroup.children.length; i = i + 1) {
            current = this.lasersGroup.children[i];
            for (j = 0; j < current.set.length; j = j + 1) {
                currentLaserStart = {
                    x: current.x + current.set[j].start.x,
                    y: current.y + current.set[j].start.y
                };
                currentLaserEnd = {
                    x: current.x + current.set[j].end.x,
                    y: current.y + current.set[j].end.y
                };
                // must chack that the current laser set is alive
                if (current.alive && (this.circleLineIntersection(currentLaserStart, currentLaserEnd, PigHead, rPigHead) || this.circleLineIntersection(currentLaserStart, currentLaserEnd, PigBody, rPigBody))) {
                    if (objectProperties.game.LEVEL.KEY !== 'FREE_FLY') {
                        //                        this.drawCircle(PigHead.x, PigHead.y, rPigHead, 0x00FF00);
                        //                        this.drawCircle(PigBody.x, PigBody.y, rPigBody, 0x00FF00);
                        //
                        //                        this.DRAWcircleLineIntersection(currentLaserStart, currentLaserEnd, PigHead, rPigHead);
                        //                        this.DRAWcircleLineIntersection(currentLaserStart, currentLaserEnd, PigBody, rPigBody);

                        // for debugging purposes (possibly finding invisible lasers)
                        window.invisibleLaserSet = current;

                        this.laserHit();
                    }
                }
            }
        }
        // ==========================================================

        // checking pig face block for eating
        //        this.pizzaBlock.clear();
        //        this.drawFaceRect(pigMouthX, pigMouthY, pigMouthWidth, pigMouthHeight);

        // --------------- Collisions with boundary -----------------
        for (groupName in objectProperties.groups) {
            if (objectProperties.groups.hasOwnProperty(groupName)) {
                groupsChildren = this[groupName].children;
                for (i = 0; i < groupsChildren.length; i = i + 1) {
                    current = groupsChildren[i];
                    if (current instanceof LaserSet) {
                        if (current.alive && (current.x < -current.maxLaserSetWidth)) { // if alive and out of bounds
                            current.kill();
                        }
                        // use else to make sure it doesn't kill LaserSet by mistake (since width = 0)
                    } else if (current.alive && current.x < -Math.max(current.width, current.height)) { // if alive and out of bounds
                        current.kill();
                    }
                }
            }
        }
        // ==========================================================

        // ---------------- Collisions with the pig -----------------
        // check for pizza out of bounds and pizza collisions with pig
        for (i = 0; i < this.pizzaGroup.children.length; i = i + 1) {
            current = this.pizzaGroup.children[i];
            // check if the pizza is alive
            if (current.alive && (current.x < pigMouthX + pigMouthWidth)) {
                // check if the pizza is out of bounds (since we know it's alive, and if it is out of bounds we must kill it)
                if (current.x < -current.width) {
                    current.kill();
                } else if ((current.x + current.width > pigMouthX) && (current.y + current.height > pigMouthY) && (current.y < pigMouthY + pigMouthHeight)) { // check for collisions with pizza
                    this.pizzaHit(current, pigMouthX + pigMouthWidth, pigMouthY + (pigMouthHeight / 2));
                }
            }
            // draw collision boxes around all the pizzas
            //            if (current.alive) {
            //                this.drawPizzaRect(current.x, current.y, current.width, current.height);
            //            }
        }
        for (i = 0; i < this.burgerGroup.children.length; i = i + 1) {
            current = this.burgerGroup.children[i];
            // check if the burger is alive
            if (current.alive && (current.x < pigMouthX + pigMouthWidth)) {
                // check if the burger is out of bounds (since we know it's alive, and if it is out of bounds we must kill it)
                if (current.x < -current.width) {
                    current.kill();
                } else if ((current.x + current.width > pigMouthX) && (current.y + current.height > pigMouthY) && (current.y < pigMouthY + pigMouthHeight)) { // check for collisions with burger
                    this.burgerHit(current, pigMouthX + pigMouthWidth, pigMouthY + (pigMouthHeight / 2));
                }
            }
            // draw collision boxes around all the burgers
            //            if (current.alive) {
            //                this.drawBurgerRect(current.x, current.y, current.width, current.height);
            //            }
        }

        for (i = 0; i < this.chocolateGroup.children.length; i = i + 1) {
            current = this.chocolateGroup.children[i];
            // check if the chocolate is alive
            if (current.alive && (current.x < pigMouthX + pigMouthWidth)) {
                // check if the chocolate is out of bounds (since we know it's alive, and if it is out of bounds we must kill it)
                if (current.x < -current.width) {
                    current.kill();
                } else if ((current.x + current.width > pigMouthX) && (current.y + current.height > pigMouthY) && (current.y < pigMouthY + pigMouthHeight)) { // check for collisions with chocolate
                    this.chocolateHit(current, pigMouthX + pigMouthWidth, pigMouthY + (pigMouthHeight / 2));
                }
            }
            // draw collision boxes around all the chocolates
            //            if (current.alive) {
            //                this.drawchocolateRect(current.x, current.y, current.width, current.height);
            //            }
        }

        for (i = 0; i < this.lollipopGroup.children.length; i = i + 1) {
            current = this.lollipopGroup.children[i];
            // check if the lollipop is alive
            if (current.alive && (current.x < pigMouthX + pigMouthWidth)) {
                // check if the lollipop is out of bounds (since we know it's alive, and if it is out of bounds we must kill it)
                if (current.x < -current.width) {
                    current.kill();
                } else if ((current.x + current.width > pigMouthX) && (current.y + current.height > pigMouthY) && (current.y < pigMouthY + pigMouthHeight)) { // check for collisions with lollipop
                    this.lollipopHit(current, pigMouthX + pigMouthWidth, pigMouthY + (pigMouthHeight / 2));
                }
            }
            // draw collision boxes around all the lollipops
            //            if (current.alive) {
            //                this.drawlollipopRect(current.x, current.y, current.width, current.height);
            //            }
        }

        this.game.physics.arcade.collide(this.pig, this.road, this.roadHit, null, this);

        //this.game.physics.arcade.overlap(this.pig, this.lasersGroup, this.laserHit, null, this);
        // ==========================================================
    },
    getLengthBetweenPoints: function (A, B) {
        'use strict';

        return Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
    },
    circleLineIntersection: function (A, B, C, r) {
        'use strict';
        // A = { x: 0, y:0 }
        // AB is a line
        // C is the center of a circle with radius r

        // old inaccurate circle collision detection
        //        // check if the circle is in the block surrounding the line
        //        if ((Math.min(A.x, B.x) < C.x + r) && (Math.min(A.y, B.y) < C.y + r) && (Math.max(A.y, B.y) > C.y - r) && (Math.max(A.x, B.x) > C.x - r)) { // not perfect but good enough
        //            // check if the circle intersects the line
        //            if ((Math.sqrt(Math.pow(this.getLengthBetweenPoints(A, C), 2) - Math.pow(((A.x - C.x) * (A.x - B.x) + (A.y - C.y) * (A.y - B.y)) / this.getLengthBetweenPoints(A, B), 2))) < r) {
        //                return true;
        //            } else {
        //                return false;
        //            }
        //        } else {
        //            return false;
        //        }

        // if the laser is vertical, make is slightly off vertical in order for equation to work
        if (Math.abs(B.x - A.x) < 0.1) {
            A.x = B.x + 0.1;
        }

        // http://math.stackexchange.com/questions/228841/how-do-i-calculate-the-intersections-of-a-straight-line-and-a-circle
        // line: y = mx + c
        // circle: (x - p)^2 + (y - q)^2 = r^2
        var dx = B.x - A.x,
            dy = B.y - A.y,
            m = dy / dx,
            c = A.y - (m * A.x),
            p = C.x,
            q = C.y,
            qA = Math.pow(m, 2) + 1, // A of the quadratic
            qB = 2 * ((m * c) - (m * q) - p), // B of the quadratic
            qC = Math.pow(q, 2) - Math.pow(r, 2) + Math.pow(p, 2) - (2 * c * q) + Math.pow(c, 2), // C of the quadratic
            discriminant = Math.pow(qB, 2) - (4 * qA * qC),
            x1 = ((-qB) + Math.sqrt(discriminant)) / (2 * qA),
            x2 = ((-qB) - Math.sqrt(discriminant)) / (2 * qA),
            y1 = (m * x1) + c,
            y2 = (m * x2) + c,
            maxX = Math.max(A.x, B.x),
            minX = Math.min(A.x, B.x),
            maxY = Math.max(A.y, B.y),
            minY = Math.min(A.y, B.y);

        if (maxX < x1 && maxX < x2) {
            return false;
        }
        if (minX > x1 && minX > x2) {
            return false;
        }
        if (maxY < y1 && maxY < y2) {
            return false;
        }
        if (minY > y1 && minY > y2) {
            return false;
        }

        return discriminant > 0;

    },
    //    DRAWcircleLineIntersection: function (A, B, C, r) {
    //        'use strict';
    //        
    //        // if the laser is vertical, make is slightly off vertical in order for equation to work
    //        if (Math.abs(B.x - A.x) < 0.1) {
    //            A.x = B.x + 0.1;
    //        }
    //
    //        // http://math.stackexchange.com/questions/228841/how-do-i-calculate-the-intersections-of-a-straight-line-and-a-circle
    //        // line: y = mx + c
    //        // circle: (x - p)^2 + (y - q)^2 = r^2
    //        var dx = B.x - A.x,
    //            dy = B.y - A.y,
    //            m = dy / dx,
    //            c = A.y - (m * A.x),
    //            p = C.x,
    //            q = C.y,
    //            qA = Math.pow(m, 2) + 1, // A of the quadratic
    //            qB = 2 * ((m * c) - (m * q) - p), // B of the quadratic
    //            qC = Math.pow(q, 2) - Math.pow(r, 2) + Math.pow(p, 2) - (2 * c * q) + Math.pow(c, 2), // C of the quadratic
    //            discriminant = Math.pow(qB, 2) - (4 * qA * qC),
    //            x1 = ((-qB) + Math.sqrt(discriminant)) / (2 * qA),
    //            x2 = ((-qB) - Math.sqrt(discriminant)) / (2 * qA),
    //            y1 = (m * x1) + c,
    //            y2 = (m * x2) + c;
    //
    //        if (discriminant > 0) {
    //            this.DRAWcircleLineIntersectionGraphics.lineStyle(0);
    //            this.DRAWcircleLineIntersectionGraphics.beginFill(0x000000);
    //            this.DRAWcircleLineIntersectionGraphics.drawCircle(x1, y1, 10);
    //            this.DRAWcircleLineIntersectionGraphics.drawCircle(x2, y2, 10);
    //            this.DRAWcircleLineIntersectionGraphics.endFill();
    //        }
    //
    //    },
    pauseGame: function () {
        'use strict';

        // if it is already paused, don't pause the game again
        if (!objectProperties.game.paused) {
            var groupName,
                groupsChildren,
                i,
                currentGame;

            if (objectProperties.pig.alive) {
                this.pausePanel.show();

                if (this.tutorial && !this.tutorialComplete) {
                    this.tutorial.hide();
                }
            } else {
                currentGame = this;
                setTimeout(function () {
                    Laserpig.Game.scoreBoard.show(objectProperties.game.tempStats.score, Math.floor(objectProperties.game.tempStats.distance), objectProperties.game.tempStats.totalPizzasCollected, objectProperties.game.tempStats.totalBurgersCollected, objectProperties.game.tempStats.totalChocolatesCollected, objectProperties.game.tempStats.totalLollipopsCollected, Laserpig.Game.currentCredits);
                }, 1000);
            }

            // save and pause all the things on screen
            if (this.pig.body !== null) {
                objectProperties.pig.velocity.y = this.pig.body.velocity.y;
                this.pig.body = null;
            }
            this.pig.animations.currentAnim.paused = true;
            //            this.road.autoScroll(0, 0);

            // pausing all of the onscreen elements
            for (groupName in objectProperties.groups) {
                if (objectProperties.groups.hasOwnProperty(groupName)) {
                    groupsChildren = this[groupName].children;
                    for (i = 0; i < groupsChildren.length; i = i + 1) {
                        if (groupsChildren[i].alive) {
                            groupsChildren[i].body.velocity.x = 0;
                            // if they have animations, turn them off
                            if (groupsChildren[i].animations.currentAnim !== null) {
                                groupsChildren[i].animations.currentAnim.paused = true;
                            }
                        }
                    }
                }
            }
            this.audio.boostSound.pause();
            this.audio.gameplayMusic.pause();
            this.audio.windSound.pause();

            this.pauseButton.visible = false;

            this.pauseTimeOfNext();
            objectProperties.game.paused = true; // must be below pauseTimeOfNext, so pauseTimeOfNext runs, but doesn't run more than once

        }
    },
    pauseTimeOfNext: function () {
        'use strict';

        // if it is already paused, don't pause the game again
        // i.e. if it has been manually paused, don't pause it again when the frame loses focus too
        if (!objectProperties.game.paused) {
            var groupName,
                currentGroupProperties;

            // for pausing the timeOfNext/off-screen elements
            // timeOfNext = timeOfNext + (length paused) = timeOfNext + (time when resumed - time when paused)
            for (groupName in objectProperties.groups) {
                if (objectProperties.groups.hasOwnProperty(groupName)) {
                    currentGroupProperties = objectProperties.groups[groupName];
                    currentGroupProperties.timeOfNext = currentGroupProperties.timeOfNext - objectProperties.time();
                }
            }
            objectProperties.boost.endTime = objectProperties.boost.endTime - objectProperties.time(); // NB: if this line is excluded, there seems to be a memory leak
        }
    },
    pauseUpdate: function () {
        'use strict';

    },
    resumeGame: function () {
        'use strict';

        // if it has already been resumed, don't resume the game again
        if (objectProperties.game.paused) {
            var groupName,
                currentGroupProperties,
                groupsChildren,
                i;

            this.pausePanel.hide();

            if (this.tutorial && !this.tutorialComplete) {
                this.tutorial.show(true);
            }

            // restore all the things on screen
            this.game.physics.arcade.enableBody(this.pig);
            this.pig.body.allowGravity = true;
            this.pig.body.velocity.y = objectProperties.pig.velocity.y;
            this.pig.body.collideWorldBounds = true;
            this.pig.animations.currentAnim.paused = false;
            //            this.road.autoScroll(objectProperties.road.speed(), 0);

            // also restoring all the things on screen
            for (groupName in objectProperties.groups) {
                if (objectProperties.groups.hasOwnProperty(groupName)) {
                    currentGroupProperties = objectProperties.groups[groupName];
                    groupsChildren = this[groupName].children;
                    for (i = 0; i < groupsChildren.length; i = i + 1) {
                        if (groupsChildren[i].alive) {
                            groupsChildren[i].body.velocity.x = currentGroupProperties.velocity.x * currentGameSpeed;
                            // if they have animations, turn them off
                            if (groupsChildren[i].animations.currentAnim !== null) {
                                groupsChildren[i].animations.currentAnim.paused = false;
                            }
                        }
                    }
                }
            }

            this.audio.boostSound.resume();
            this.audio.gameplayMusic.resume();
            this.audio.windSound.resume();

            this.pauseButton.visible = true;

            objectProperties.game.paused = false; // must be above resumeTimeOfNext, so resumeTimeOfNext runs
            this.resumeTimeOfNext();
        }
    },
    resumeTimeOfNext: function () {
        'use strict';

        // resume if not manually paused, else we will run this when we manually resume
        // (i.e. if we don't do this check, it will run twice)
        if (!objectProperties.game.paused) {
            var groupName,
                currentGroupProperties;

            // timeOfNext = timeOfNext + (length paused) = timeOfNext + (time when resumed - time when paused)
            for (groupName in objectProperties.groups) {
                if (objectProperties.groups.hasOwnProperty(groupName)) {
                    // resuming all the timeOfNext/off-screen elements (adding the time the game was paused for)
                    currentGroupProperties = objectProperties.groups[groupName];
                    currentGroupProperties.timeOfNext = currentGroupProperties.timeOfNext + objectProperties.time();
                }
            }
            objectProperties.boost.endTime = objectProperties.boost.endTime + objectProperties.time();
        }
    },
    manageClouds: function () {
        'use strict';

        var cloudsGroupProperties = objectProperties.groups.cloudsGroup,
            cloud,
            x,
            y;

        if (objectProperties.time() > cloudsGroupProperties.timeOfNext) {
            cloudsGroupProperties.timeOfNext = objectProperties.time() + objectProperties.cloud.rate();

            cloud = this.cloudsGroup.getFirstExists(false);
            x = objectProperties.cloud.x;
            y = objectProperties.cloud.y(); // function because cloud height changes

            if (!cloud && this.cloudsGroup.length < 40) {
                cloud = new Cloud(this.game, x, y);
                this.cloudsGroup.add(cloud);
            }

            if (cloud) {
                cloud.reset(x, y);
                cloud.revive();
            }
        }
    },
    manageMountains: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.mountainsGroup.timeOfNext) {
            objectProperties.groups.mountainsGroup.timeOfNext = objectProperties.time() + objectProperties.mountain.rate();

            var mountain = this.mountainsGroup.getFirstExists(false),
                x = objectProperties.mountain.x,
                y = objectProperties.mountain.y;

            if (!mountain && this.mountainsGroup.length < 10) {
                mountain = new Mountain(this.game, x, y);
                this.mountainsGroup.add(mountain);
            }

            if (mountain) {
                mountain.reset(x, y);
                mountain.revive();
            }
        }
    },
    manageHouses: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.housesGroup.timeOfNext) {
            objectProperties.groups.housesGroup.timeOfNext = objectProperties.time() + objectProperties.house.rate();

            var house = this.housesGroup.getFirstExists(false),
                x = objectProperties.house.x,
                y = objectProperties.house.y();

            if (!house && this.housesGroup.length < 10) {
                house = new House(this.game, x, y);
                this.housesGroup.add(house);
            }

            if (house) {
                house.reset(x, y);
                house.revive();
            }
        }
    },
    manageTrees: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.treesGroup.timeOfNext) {
            objectProperties.groups.treesGroup.timeOfNext = objectProperties.time() + objectProperties.tree.rate();

            var tree = this.treesGroup.getFirstExists(false),
                x = objectProperties.tree.x,
                y = objectProperties.tree.y();

            if (!tree) {
                tree = new Tree(this.game, x, y);
                this.treesGroup.add(tree);
            }

            if (tree) {
                tree.reset(x, y);
                tree.revive();

                // if the tree is placed on a house, kill the tree
                // NB the house png must have a little empty space on the left to avoid overlapping when the tree is placed before the house
                if (this.game.physics.arcade.overlap(this.housesGroup, tree, null, null, this)) {
                    tree.kill();
                }
            }
        }
    },
    laserSetOutOfBounds: function (laserSet) {
        'use strict';

        var xMax = -Number.MAX_SAFE_INTEGER,
            i;

        for (i = 0; i < laserSet.length; i = i + 1) {
            xMax = Math.max(xMax, Math.max(laserSet[i].start.x, laserSet[i].end.x));
        }

        return xMax < 0;
    },
    manageLasers: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.lasersGroup.timeOfNext) {
            objectProperties.groups.lasersGroup.timeOfNext = objectProperties.time() + objectProperties.laser.rate();

            var laser = this.lasersGroup.getFirstExists(false),
                x = objectProperties.laser.x,
                y = objectProperties.laser.y;

            if (!laser && this.lasersGroup.length < 10) {
                laser = new LaserSet(this.game, x, y);
                this.lasersGroup.add(laser);
            }

            if (laser) {
                laser.reset(x, y);
                laser.revive();
            }
        }
    },
    manageScore: function () {
        'use strict';

        var gameContainer = document.getElementById('game-container'),
            gameContainerRect = gameContainer.getBoundingClientRect();

        // updating the current distance traveled
        objectProperties.game.tempStats.distance = objectProperties.game.tempStats.distance + (objectProperties.distance.constant * window.currentGameSpeed);

        objectProperties.distance.currentMultiplier = Math.floor((objectProperties.game.tempStats.distance / objectProperties.distance.multiplierUpdateDistance) * objectProperties.distance.multiplierIncrease) + 1;
        // makeing sure the currentMultiplier is never greater than the maxMultiplier
        objectProperties.distance.currentMultiplier = objectProperties.distance.currentMultiplier > objectProperties.distance.maxMultiplier ? objectProperties.distance.maxMultiplier : objectProperties.distance.currentMultiplier;

        // change the multiplier if boost is on
        if (objectProperties.boost.on) {
            objectProperties.distance.currentMultiplier = objectProperties.boost.multiplier;
        }

        // calculating values for when we calculate the avarage later ave=(sum/count)
        objectProperties.distance.totalMultiplierSum = objectProperties.distance.totalMultiplierSum + objectProperties.distance.currentMultiplier;
        objectProperties.distance.multiplierChangeCount = objectProperties.distance.multiplierChangeCount + 1;

        // setting the visibility of the multiplierElement
        if (objectProperties.distance.currentMultiplier > 1 && (this.tutorialComplete === true)) {
            Laserpig.Game.multiplierElement.style.display = 'block';
            Laserpig.Game.multiplierElement.innerHTML = objectProperties.distance.currentMultiplierPrefix + objectProperties.distance.currentMultiplier;
        } else {
            Laserpig.Game.multiplierElement.style.display = 'none';
            Laserpig.Game.multiplierElement.innerHTML = objectProperties.distance.currentMultiplierPrefix + 1;
        }
        Laserpig.Game.multiplierElement.style.left = ((gameContainerRect.left) + (gameContainer.clientWidth / 2) - (Laserpig.Game.multiplierElement.offsetWidth / 2)) + 'px';

        // updating currentScoreWeighting's
        objectProperties.pizza.currentScoreWeighting = objectProperties.pizza.weighting * objectProperties.distance.currentMultiplier;
        objectProperties.burger.currentScoreWeighting = objectProperties.burger.weighting * objectProperties.distance.currentMultiplier;
        objectProperties.chocolate.currentScoreWeighting = objectProperties.chocolate.weighting * objectProperties.distance.currentMultiplier;
        objectProperties.lollipop.currentScoreWeighting = objectProperties.lollipop.weighting * objectProperties.distance.currentMultiplier;

        // this calculates the total score
        // the seporate totals get calculated when they are hit
        objectProperties.game.tempStats.score = objectProperties.game.tempStats.totalPizzasCollectedScore +
            objectProperties.game.tempStats.totalBurgersCollectedScore +
            objectProperties.game.tempStats.totalChocolatesCollectedScore +
            objectProperties.game.tempStats.totalLollipopsCollectedScore;

        Laserpig.Game.scoreElement.innerHTML = objectProperties.game.tempStats.score + ' score';
        Laserpig.Game.distanceElement.innerHTML = Math.floor(objectProperties.game.tempStats.distance) + ' meters';

        // update the currentCredits
        Laserpig.Game.currentCredits = Math.floor(Math.floor(objectProperties.game.tempStats.distance * objectProperties.distance.weighting +
            ((objectProperties.game.tempStats.totalPizzasCollected * objectProperties.pizza.weighting +
                objectProperties.game.tempStats.totalBurgersCollected * objectProperties.burger.weighting +
                objectProperties.game.tempStats.totalChocolatesCollected * objectProperties.chocolate.weighting +
                objectProperties.game.tempStats.totalLollipopsCollected * objectProperties.lollipop.weighting) * (objectProperties.distance.totalMultiplierSum / objectProperties.distance.multiplierChangeCount))) * objectProperties.game.LEVEL.LEVEL_MULTIPLIER);

        //objectProperties.game.stats.htmlEl.style.display = "block";
    },
    laserHit: function () {
        'use strict';

        if (!this.tutorialComplete) {
            this.restart();
        } else {
            this.audio.laser_hit.play('', 0, gameAudio.game.laserHitSound.volume, gameAudio.game.loopDefault);
            this.audio.bombSound.play('', 0, gameAudio.pig.explosion.volume, gameAudio.game.loopDefault);

            // update last time the restart screen was shown
            objectProperties.game.lastTimeOfRestartScreen = objectProperties.time();

            objectProperties.pig.alive = false;
            this.pig.visible = false;

            // bacon animation
            this.baconCrumbs.emitX = this.pig.x + (this.pig.width / 3);
            this.baconCrumbs.emitY = this.pig.y;
            this.baconCrumbs.start(true, 2000, null, 10);

            // explosion
            this.explosion = this.add.sprite(this.pig.x + (this.pig.width / 3), this.pig.y, 'explosion');
            this.explosion.anchor.setTo(0.5, 0.5);
            this.explosion.scale.setTo(0.7);
            this.explosion.animations.add('animate_explosion');
            this.explosion.animations.play('animate_explosion', false);
            this.explosion.animations.play('animate_explosion', 30, false);

            this.pauseGame();
        }
    },
    isNewHighScore: function () {
        'use strict';

        if (objectProperties.game.tempStats.score > objectProperties.game.stats[objectProperties.game.LEVEL.KEY].highScore) {
            objectProperties.game.tempStats.isNewhigscore = true;
        }
    },
    roadHit: function () {
        'use strict';

        if (!this.tutorialComplete) {
            this.restart();
        } else {
            if (objectProperties.game.LEVEL.KEY !== 'FREE_FLY') {
                if (!objectProperties.road.dust) {
                    this.audio.bombSound.play('', 0, gameAudio.pig.explosion.volume, gameAudio.game.loopDefault);

                    // update last time the restart screen was shown
                    objectProperties.game.lastTimeOfRestartScreen = objectProperties.time();

                    objectProperties.pig.alive = false;
                    this.pig.visible = false;

                    //dust smoke animation
                    objectProperties.road.dust = true;
                    this.dustCloud = this.add.sprite(objectProperties.dustCloud.x, objectProperties.dustCloud.y, objectProperties.dustCloud.key);
                    this.dustCloud.animations.add('animate_dust_cloud');
                    this.dustCloud.animations.play('animate_dust_cloud', 20, false);

                    // bacon animation
                    this.baconCrumbs.emitX = this.pig.x + (this.pig.width / 3);
                    this.baconCrumbs.emitY = this.pig.y + 25;
                    this.baconCrumbs.start(true, 2000, null, 10);

                    // explosion
                    this.explosion = this.add.sprite(this.pig.x + (this.pig.width / 3), this.pig.y + 25, 'explosion');
                    this.explosion.anchor.setTo(0.5, 0.5);
                    this.explosion.scale.setTo(0.7);
                    this.explosion.animations.add('animate_explosion');
                    this.explosion.animations.play('animate_explosion', false);
                    this.explosion.animations.play('animate_explosion', 30, false);

                    this.pauseGame();
                }
            } else {
                this.pig.body.velocity.y = -110;
            }
        }
    },
    createBurger: function (x, y) {
        'use strict';

        var burger = this.burgerGroup.getFirstDead();

        if (!burger) {
            burger = new Burger(this.game, x, y);
            this.burgerGroup.add(burger);
        }

        if (burger) {
            burger.reset(x, y);
            burger.revive();
            return burger;
        }
    },
    createPizza: function (x, y) {
        'use strict';

        var pizza = this.pizzaGroup.getFirstDead();

        if (!pizza) {
            pizza = new Pizza(this.game, x, y);
            this.pizzaGroup.add(pizza);
        }

        if (pizza) {
            pizza.reset(x, y);
            pizza.revive();
            return pizza;
        }
    },
    createChocolate: function (x, y) {
        'use strict';

        var chocolate = this.chocolateGroup.getFirstDead();

        if (!chocolate) {
            chocolate = new Chocolate(this.game, x, y);
            this.chocolateGroup.add(chocolate);
        }

        if (chocolate) {
            chocolate.reset(x, y);
            chocolate.revive();
            return chocolate;
        }
    },
    createBurgerGroup: function (columns, rows) {
        'use strict';

        var x = objectProperties.burger.x,
            y = objectProperties.burger.y(rows),
            burgerRowCounter = 0,
            burgerColumnCounter = 0,
            burger,
            i;

        for (i = 0; i < columns * rows; i += 1) {
            burger = this.createBurger(x, y);
            if (burger) {
                burger.x = x + (burgerColumnCounter * burger.width) + (burgerColumnCounter * 5);
                burger.y = y + (burgerRowCounter * burger.height) + (burgerRowCounter * 5);
            }
            burgerColumnCounter += 1;
            if (i + 1 >= columns && (i + 1) % columns === 0) {
                burgerRowCounter += 1;
                burgerColumnCounter = 0;
            }
        }
    },
    createPizzaGroup: function (columns, rows) {
        'use strict';

        var x = objectProperties.pizza.x,
            y = objectProperties.pizza.y(rows),
            pizzaRowCounter = 0,
            pizzaColumnCounter = 0,
            pizza,
            i;

        for (i = 0; i < columns * rows; i += 1) {
            pizza = this.createPizza(x, y);
            if (pizza) {
                pizza.x = x + (pizzaColumnCounter * pizza.width) + (pizzaColumnCounter * 5);
                pizza.y = y + (pizzaRowCounter * pizza.height) + (pizzaRowCounter * 5);
            }
            pizzaColumnCounter += 1;
            if (i + 1 >= columns && (i + 1) % columns === 0) {
                pizzaRowCounter += 1;
                pizzaColumnCounter = 0;
            }
        }
    },
    createChocolateGroup: function (columns, rows) {
        'use strict';

        var x = objectProperties.chocolate.x,
            y = objectProperties.chocolate.y(rows),
            chocolateRowCounter = 0,
            chocolateColumnCounter = 0,
            chocolate,
            i;

        for (i = 0; i < columns * rows; i += 1) {
            chocolate = this.createChocolate(x, y);
            if (chocolate) {
                chocolate.x = x + (chocolateColumnCounter * chocolate.width) + (chocolateColumnCounter * 5);
                chocolate.y = y + (chocolateRowCounter * chocolate.height) + (chocolateRowCounter * 5);
            }
            chocolateColumnCounter += 1;
            if (i + 1 >= columns && (i + 1) % columns === 0) {
                chocolateRowCounter += 1;
                chocolateColumnCounter = 0;
            }
        }
    },
    manageBurger: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.burgerGroup.timeOfNext) {
            objectProperties.groups.burgerGroup.timeOfNext = objectProperties.time() + objectProperties.burger.rate();

            var columns = game.rnd.integerInRange(1, 3),
                rows = 4 - columns;
            this.createBurgerGroup(columns, rows);
        }
    },
    managePizza: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.pizzaGroup.timeOfNext) {
            objectProperties.groups.pizzaGroup.timeOfNext = objectProperties.time() + objectProperties.pizza.rate();

            var columns = game.rnd.integerInRange(1, 5),
                rows = 6 - columns;
            this.createPizzaGroup(columns, rows);
        }
    },
    manageChocolate: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.chocolateGroup.timeOfNext) {
            objectProperties.groups.chocolateGroup.timeOfNext = objectProperties.time() + objectProperties.chocolate.rate();

            var columns = game.rnd.integerInRange(1, 2),
                rows = 3 - columns;
            this.createChocolateGroup(columns, rows);
        }
    },
    manageLollipop: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.lollipopGroup.timeOfNext) {
            objectProperties.groups.lollipopGroup.timeOfNext = objectProperties.time() + objectProperties.lollipop.rate();

            var lollipop = this.lollipopGroup.getFirstExists(false),
                x = objectProperties.lollipop.x,
                y = objectProperties.lollipop.y(1);

            if (!lollipop) {
                lollipop = new Lollipop(this.game, x, y);
                this.lollipopGroup.add(lollipop);
            }

            if (lollipop) {
                lollipop.reset(x, y);
                lollipop.revive();
            }

        }
    },
    manageRoadLine: function () {
        'use strict';

        if (objectProperties.time() > objectProperties.groups.roadLineGroup.timeOfNext) {
            objectProperties.groups.roadLineGroup.timeOfNext = objectProperties.time() + objectProperties.roadLine.rate();

            var roadLine = this.roadLineGroup.getFirstExists(false),
                x = objectProperties.roadLine.x,
                y = objectProperties.roadLine.y;

            if (!roadLine) {
                roadLine = new RoadLine(this.game, x, y);
                this.roadLineGroup.add(roadLine);
            }

            if (roadLine) {
                roadLine.reset(x, y);
                roadLine.revive();
            }

        }
    },
    manageLaserRate: function () {
        'use strict';

        //        if (objectProperties.game.LEVEL.KEY === 'HARD') {
        //            objectProperties.laser.rate = function () {
        //                return game.rnd.integerInRange(15000, 20000) / currentGameSpeed;
        //            };
        //        }

    },
    manageOverlapping: function () {
        'use strict';

        this.lollipopGroup.forEach(function (lollipop) {
            this.chocolateGroup.forEach(function (chocolate) {
                if (lollipop.alive && chocolate.alive) {
                    if (this.game.physics.arcade.overlap(lollipop, chocolate)) {
                        chocolate.kill();
                    }
                }

                this.burgerGroup.forEach(function (burger) {
                    if (lollipop.alive && burger.alive) {
                        if (this.game.physics.arcade.overlap(lollipop, burger)) {
                            burger.kill();
                        }
                    }
                    if (chocolate.alive && burger.alive) {
                        if (this.game.physics.arcade.overlap(chocolate, burger)) {
                            burger.kill();
                        }
                    }

                    this.pizzaGroup.forEach(function (pizza) {
                        if (lollipop.alive && pizza.alive) {
                            if (this.game.physics.arcade.overlap(lollipop, pizza)) {
                                pizza.kill();
                            }
                        }
                        if (chocolate.alive && pizza.alive) {
                            if (this.game.physics.arcade.overlap(chocolate, pizza)) {
                                pizza.kill();
                            }
                        }
                        if (burger.alive && pizza.alive) {
                            if (this.game.physics.arcade.overlap(burger, pizza)) {
                                pizza.kill();
                            }
                        }
                    }, this);
                }, this);
            }, this);
        }, this);
    },
    pizzaHit: function (pizza, x, y) {
        'use strict';

        this.audio.snort.play('', 0, gameAudio.pig.snort.volume, gameAudio.game.loopDefault);

        pizza.kill();
        this.pizzaCrumbs.emitX = x;
        this.pizzaCrumbs.emitY = y;
        this.pizzaCrumbs.start(true, 1000, null, 10);
        //this.pigSnort.play();
        objectProperties.game.tempStats.totalPizzasCollected = objectProperties.game.tempStats.totalPizzasCollected + 1;
        objectProperties.game.tempStats.totalPizzasCollectedScore = objectProperties.game.tempStats.totalPizzasCollectedScore + objectProperties.pizza.currentScoreWeighting;
        //objectProperties.game.stats.score += objectProperties.game.stats.totalPizzasCollected;
        //        objectProperties.game.stats.htmlEl.innerHTML = "Score: " + objectProperties.game.stats.score;
    },
    burgerHit: function (burger, x, y) {
        'use strict';

        this.audio.snort.play('', 0, gameAudio.pig.snort.volume, gameAudio.game.loopDefault);

        burger.kill();
        this.pizzaCrumbs.emitX = x;
        this.pizzaCrumbs.emitY = y;
        this.pizzaCrumbs.start(true, 1000, null, 10);

        objectProperties.game.tempStats.totalBurgersCollected = objectProperties.game.tempStats.totalBurgersCollected + 1;
        objectProperties.game.tempStats.totalBurgersCollectedScore = objectProperties.game.tempStats.totalBurgersCollectedScore + objectProperties.burger.currentScoreWeighting;
        //        console.log(objectProperties.burger.score);
        //        console.log(objectProperties.game.tempStats.totalBurgersCollected);
    },
    chocolateHit: function (chocolate, x, y) {
        'use strict';

        this.audio.snort.play('', 0, gameAudio.pig.snort.volume, gameAudio.game.loopDefault);

        chocolate.kill();
        this.chocolateCrumbs.emitX = x;
        this.chocolateCrumbs.emitY = y;
        this.chocolateCrumbs.start(true, 1000, null, 10);
        //this.pigSnort.play();
        objectProperties.game.tempStats.totalChocolatesCollected = objectProperties.game.tempStats.totalChocolatesCollected + 1;
        objectProperties.game.tempStats.totalChocolatesCollectedScore = objectProperties.game.tempStats.totalChocolatesCollectedScore + objectProperties.chocolate.currentScoreWeighting;
        //objectProperties.game.stats.score += objectProperties.game.stats.totalPizzasCollected;
        //        objectProperties.game.stats.htmlEl.innerHTML = "Score: " + objectProperties.game.stats.score;
    },
    lollipopHit: function (lollipop, x, y) {
        'use strict';

        this.audio.snort.play('', 0, gameAudio.pig.snort.volume, gameAudio.game.loopDefault);

        lollipop.kill();
        this.lollipopCrumbs.emitX = x;
        this.lollipopCrumbs.emitY = y;
        this.lollipopCrumbs.start(true, 1000, null, 10);
        //this.pigSnort.play();
        objectProperties.game.tempStats.totalLollipopsCollected = objectProperties.game.tempStats.totalLollipopsCollected + 1;
        objectProperties.game.tempStats.totalLollipopsCollectedScore = objectProperties.game.tempStats.totalLollipopsCollectedScore + objectProperties.lollipop.currentScoreWeighting;
        //objectProperties.game.stats.score += objectProperties.game.stats.totalPizzasCollected;
        //        objectProperties.game.stats.htmlEl.innerHTML = "Score: " + objectProperties.game.stats.score;
    },
    boost: function () {
        'use strict';

        // only run if game itsn't paused
        if (!objectProperties.game.paused) {

            // only run this if the boost hasn't already been run (in the current boost duration)
            if (!objectProperties.boost.on) {
                var groupName,
                    currentGroupProperties,
                    oldSpeed = currentGameSpeed;

                objectProperties.boost.endTime = objectProperties.time() + objectProperties.boost.length;

                // this will speed up all new/revived things that appear on the screen
                currentGameSpeed = objectProperties.boost.speed;

                // this will speed up all the things currently on  screen
                for (groupName in objectProperties.groups) {
                    if (objectProperties.groups.hasOwnProperty(groupName)) {
                        currentGroupProperties = objectProperties.groups[groupName];
                        // updating the timeOfNext to be correct relative to the currentGameSpeed
                        currentGroupProperties.timeOfNext = (((currentGroupProperties.timeOfNext - objectProperties.time()) * oldSpeed) / currentGameSpeed) + objectProperties.time();
                        // updating the x velocity to be correct relative to the currentGameSpeed
                        this[groupName].setAll('body.velocity.x', currentGroupProperties.velocity.x * currentGameSpeed);
                    }
                }
                //            this.road.autoScroll(objectProperties.road.speed(), 0);

                this.boostButton.visible = false;

                this.audio.boostSound.play('', 0, gameAudio.pig.boost.volume, gameAudio.game.loopDefault);
            }

            objectProperties.boostHint.clicked = true;
            objectProperties.boost.on = true;
        }
    },
    boostOver: function () {
        'use strict';

        // if the boost has already been turned of, don't run the rest to defaults
        if (objectProperties.boost.on) {
            var groupName,
                currentGroupProperties,
                oldSpeed = currentGameSpeed;

            currentGameSpeed = objectProperties.game.DEFAULT_SPEED;

            for (groupName in objectProperties.groups) {
                if (objectProperties.groups.hasOwnProperty(groupName)) {
                    currentGroupProperties = objectProperties.groups[groupName];
                    // updating the timeOfNext to be correct relative to the currentGameSpeed
                    currentGroupProperties.timeOfNext = (((currentGroupProperties.timeOfNext - objectProperties.time()) / oldSpeed) * currentGameSpeed) + objectProperties.time();
                    // updating the x velocity to be correct relative to the currentGameSpeed
                    this[groupName].setAll('body.velocity.x', currentGroupProperties.velocity.x * currentGameSpeed);
                }
            }
            //            this.road.autoScroll(objectProperties.road.speed(), 0);

            this.boostButton.visible = true;

            this.audio.boostSound.stop();
        }

        objectProperties.boost.endTime = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE;
        objectProperties.boost.on = false;
    },
    shutdown: function () {
        'use strict';

        this.audio.boostSound.stop();
        this.audio.gameplayMusic.stop();
        this.audio.windSound.stop();

        // destroy stuff
        Laserpig.Game.multiplierElement.style.display = "none";
        Laserpig.Game.scoreElement.style.display = 'none';
        Laserpig.Game.distanceElement.style.display = 'none';

        // calculating the amount of credits achieved
        objectProperties.game.stats.credits = objectProperties.game.stats.credits + Laserpig.Game.currentCredits;

        if (objectProperties.game.tempStats.score > objectProperties.game.stats[objectProperties.game.LEVEL.KEY].highScore) {
            objectProperties.game.stats[objectProperties.game.LEVEL.KEY].highScore = objectProperties.game.tempStats.score;
        }

        if (Math.floor(objectProperties.game.tempStats.distance) > objectProperties.game.stats[objectProperties.game.LEVEL.KEY].furthestDistance) {
            objectProperties.game.stats[objectProperties.game.LEVEL.KEY].furthestDistance = Math.floor(objectProperties.game.tempStats.distance);
        }

        objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalDistance = objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalDistance + Math.floor(objectProperties.game.tempStats.distance);
        objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalPizzasCollected = objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalPizzasCollected + objectProperties.game.tempStats.totalPizzasCollected;
        objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalBurgersCollected = objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalBurgersCollected + objectProperties.game.tempStats.totalBurgersCollected;
        objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalChocolatesCollected = objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalChocolatesCollected + objectProperties.game.tempStats.totalChocolatesCollected;
        objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalLollipopsCollected = objectProperties.game.stats[objectProperties.game.LEVEL.KEY].totalLollipopsCollected + objectProperties.game.tempStats.totalLollipopsCollected;

        // Save the stats to localStorage
        //console.log(this.STATS_OBJECT_KEY);
        //        console.log(objectProperties.game.tempStats.totalPizzasCollected + ' pizza');
        //        console.log(objectProperties.game.tempStats.totalBurgersCollected + ' burgers');
        //        console.log(objectProperties.game.tempStats.totalChocolatesCollected + ' chocs');
        //        console.log(Laserpig.Game.currentCredits);
        //console.log(objectProperties.game.stats[objectProperties.game.LEVEL.KEY].highScore);

        localStorage.setItem(this.BOOST_TUTORIAL_COMPLETE_KEY, JSON.stringify(objectProperties.boostHint.clicked));
        localStorage.setItem(this.BOOST_UNLOCKED, JSON.stringify(objectProperties.boost.unlocked));

        Laserpig.Game.save();
    },
    quit: function () {
        'use strict';

        this.game.state.start('MainMenu');

    },
    restart: function () {
        'use strict';

        var gameInfo = {
            gameOptions: {
                LEVEL: objectProperties.game.LEVEL,
                JETPACK: objectProperties.pig.jetpack
            },
            statsObject: objectProperties.game.stats
        };

        //objectProperties.game.lastTimeOfRestartScreen = objectProperties.time();
        this.game.state.start('Game', true, false, gameInfo);
    },
    save: function () {
        'use strict';

        localStorage.setItem(this.STATS_OBJECT_KEY, JSON.stringify(objectProperties.game.stats));
    }
};