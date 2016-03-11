/*global Laserpig, Menu, MenuPanel, LevelPanel, CustomizePanel, ScoresPanel, AboutPanel, StoryPanel, ControlsPanel, game, gameSize, Phaser */

Laserpig.MainMenu = {
    create: function () {
        'use strict';

        console.log('main menu started');

        var gameCenterX = this.game.width / 2,
            ground = {
                x: 0,
                y: game.height - (game.height / 3), // game.height - ground.height
                height: (game.height / 3), // height of the groud - height of the road
                width: game.width,
                BACKGROUND_COLOR: '#8dc63f'
            };

        // Setting up constants
        this.GAME_OPTIONS_KEY = 'gameOptions';
        this.STATS_OBJECT_KEY = 'statsObject';
        this.LOCKED_OPTIONS_KEY = 'lockedOptions';
        this.MUTED_OPTIONS_KEY = 'mutedOptions';
        this.LEVEL_COLORS = {
            EASY: '#000000',
            MEDIUM: '#000000',
            HARD: '#000000',
            FREE_FLY: '#000000'
        };

        // Definition of the levels
        this.LEVELS = {
            FREE_FLY: {
                KEY: 'FREE_FLY',
                NAME: 'Free Fly',
                BOOST: {
                    SPEED: 7
                },
                GAME: {
                    GRAVITY: 200,
                    DEFAULT_SPEED: 3
                },
                LEVEL_MULTIPLIER: 0.05,
                LASER_SPEED: 60
            },
            EASY: {
                KEY: 'EASY',
                NAME: 'Easy',
                BOOST: {
                    SPEED: 5
                },
                GAME: {
                    GRAVITY: 200,
                    DEFAULT_SPEED: 3
                },
                LEVEL_MULTIPLIER: 0.7,
                LASER_SPEED: 60
            },
            MEDIUM: {
                KEY: 'MEDIUM',
                NAME: 'Medium',
                BOOST: {
                    SPEED: 6
                },
                GAME: {
                    GRAVITY: 400,
                    DEFAULT_SPEED: 5
                },
                LEVEL_MULTIPLIER: 7,
                CREDITS: 14000,
                LASER_SPEED: 45
            },
            HARD: {
                KEY: 'HARD',
                NAME: 'Hard',
                BOOST: {
                    SPEED: 7
                },
                GAME: {
                    GRAVITY: 600,
                    DEFAULT_SPEED: 6
                },
                LEVEL_MULTIPLIER: 70,
                CREDITS: 280000,
                LASER_SPEED: 30
            }
        };

        this.JETPACKS = {
            DEFAULT: {
                KEY: 'DEFAULT-JETPACK',
                PREVIEW_KEY: 'menu_default_pig',
                LOCKED_PREVIEW_KEY: 'menu_default_pig_locked',
                MAX_VELOCITY: 800,
                MIN_VELOCITY: -800,
                SPEED: 25
            },
            LASERPIG: {
                KEY: 'LASERPIG-JETPACK',
                PREVIEW_KEY: 'menu_laserpig_pig',
                LOCKED_PREVIEW_KEY: 'menu_laserpig_pig_locked',
                MAX_VELOCITY: 800,
                MIN_VELOCITY: -800,
                SPEED: 30,
                CREDITS: 8500
            },
            TIMMY: {
                KEY: 'TIMMY-JETPACK',
                PREVIEW_KEY: 'menu_timmy_pig',
                LOCKED_PREVIEW_KEY: 'menu_timmy_pig_locked',
                MAX_VELOCITY: 1000,
                MIN_VELOCITY: -1000,
                SPEED: 35,
                CREDITS: 180000
            },
            HASHTAGPIG: {
                KEY: 'HASHTAGPIG-JETPACK',
                PREVIEW_KEY: 'menu_hashtagpig_pig',
                LOCKED_PREVIEW_KEY: 'menu_hashtagpig_pig_locked',
                MAX_VELOCITY: 1000,
                MIN_VELOCITY: -1000,
                SPEED: 45,
                CREDITS: 3000000
            }
        };

        this.STATS_OBJECT = {
            EASY: {
                totalPizzasCollected: 0,
                totalLollipopsCollected: 0,
                totalBurgersCollected: 0,
                totalDrinksCollected: 0,
                totalChocolatesCollected: 0,
                totalDistance: 0,
                furthestDistance: 0,
                highScore: 0
            },
            MEDIUM: {
                totalPizzasCollected: 0,
                totalLollipopsCollected: 0,
                totalBurgersCollected: 0,
                totalDrinksCollected: 0,
                totalChocolatesCollected: 0,
                totalDistance: 0,
                furthestDistance: 0,
                highScore: 0
            },
            HARD: {
                totalPizzasCollected: 0,
                totalLollipopsCollected: 0,
                totalBurgersCollected: 0,
                totalDrinksCollected: 0,
                totalChocolatesCollected: 0,
                totalDistance: 0,
                furthestDistance: 0,
                highScore: 0
            },
            FREE_FLY: {
                totalPizzasCollected: 0,
                totalLollipopsCollected: 0,
                totalBurgersCollected: 0,
                totalDrinksCollected: 0,
                totalChocolatesCollected: 0,
                totalDistance: 0,
                furthestDistance: 0,
                highScore: 0
            },
            credits: Math.abs(0), // Happy Easter
            overallTotalPizzasCollected: 0,
            overallTotalLollipopsCollected: 0,
            overallTotalBurgersCollected: 0,
            overallTotalDrinksCollected: 0,
            overallTotalChocolatesCollected: 0,
            overallTotalDistance: 0
        };

        // this is to set which options are locked for the various screens
        this.LOCKED_OPTIONS = {
            Level: {
                easyButton: false,
                mediumButton: true,
                hardButton: true,
                freeFlyButton: false, // true means it is locked/not available
                unlockMediumButton: true,
                mediumCreditValue: true,
                unlockHardButton: true,
                hardCreditValue: true
            },
            Customize: {
                defaultButton: false,
                laserpigButton: true,
                timmyButton: true,
                hashtagPigButton: true, // true means it is locked/not available
                unlockLaserpigButton: true,
                laserpigCreditValue: true,
                unlockTimmyButton: true,
                timmyCreditValue: true,
                unlockHashtagPigButton: true,
                hashtagPigCreditValue: true
            }
        };

        // load game options
        this.gameOptions = JSON.parse(localStorage.getItem(this.GAME_OPTIONS_KEY));
        // if there was nothing found in localStorage, use the default starting options
        if (!this.gameOptions) {
            this.gameOptions = {
                LEVEL: Laserpig.MainMenu.LEVELS.EASY,
                JETPACK: Laserpig.MainMenu.JETPACKS.DEFAULT
            };
        }
        // update with the latest settings
        this.gameOptions.LEVEL = this.LEVELS[this.gameOptions.LEVEL.KEY];

        // load stored stats
        this.statsObject = JSON.parse(localStorage.getItem(this.STATS_OBJECT_KEY));
        // if there were no games stats found in localStorage, use the defaults (this.STATS_OBJECT)
        if (!this.statsObject) {
            this.statsObject = this.STATS_OBJECT;
        }

        // load stored visibile options
        this.lockedOptions = JSON.parse(localStorage.getItem(this.LOCKED_OPTIONS_KEY));
        // if there were no visibile options found in localStorage, use the defaults (this.VISIBILE_OPTIONS)
        if (!this.lockedOptions) {
            this.lockedOptions = this.LOCKED_OPTIONS;
        }

        this.gameInfo = {
            gameOptions: Laserpig.MainMenu.gameOptions,
            statsObject: Laserpig.MainMenu.statsObject
        };

        // Menu stats NB
        this.creditSuffix = 'cr';

        var gameContainer = document.getElementById('game-container'),
            gameContainerRect = gameContainer.getBoundingClientRect();

        document.getElementById('stats-wrapper').style.left = (((gameContainer.clientWidth / gameSize.width) * 60) + gameContainerRect.left) + 'px';
        document.getElementById('stats-wrapper').style.right = '';
        document.getElementById('stats-wrapper').style.top = (((gameContainer.clientHeight / gameSize.height) * 55) + gameContainerRect.top) + 'px';
        this.level = document.getElementById("level");
        this.highscore = document.getElementById("highscore");
        this.piggybank = document.getElementById("piggybank");
        this.level.innerHTML = "Current Level - " + this.LEVELS[this.gameOptions.LEVEL.KEY].NAME;
        this.highscore.innerHTML = "High Score - " + this.statsObject[this.gameOptions.LEVEL.KEY].highScore;
        this.piggybank.innerHTML = "Piggy Bank - " + this.statsObject.credits + this.creditSuffix;

        //Sizing the elements' font according to the gameContainer's height using this.height
        this.level.style.display = "block";
        this.highscore.style.display = "block";
        this.piggybank.style.display = "block";
        this.fontHeight = 30 * (gameContainer.clientHeight / gameSize.height);
        this.piggybank.style.fontSize = this.fontHeight + "px";
        this.level.style.fontSize = this.fontHeight + "px";
        this.highscore.style.fontSize = this.fontHeight + "px";

        window.onscroll = window.onresize = function (event) {
            
            gameContainerRect = gameContainer.getBoundingClientRect();

            document.getElementById('stats-wrapper').style.left = (((gameContainer.clientWidth / gameSize.width) * 60) + gameContainerRect.left) + 'px';
            document.getElementById('stats-wrapper').style.right = '';
            document.getElementById('stats-wrapper').style.top = (((gameContainer.clientHeight / gameSize.height) * 55) + gameContainerRect.top) + 'px';

            this.fontHeight = 30 * (gameContainer.clientHeight / gameSize.height);
            this.piggybank.style.fontSize = this.fontHeight + "px";
            this.level.style.fontSize = this.fontHeight + "px";
            this.highscore.style.fontSize = this.fontHeight + "px";
        };

        //this.menuMusic = this.game.add.audio('menuMusic');
        //this.menuMusic.play('', 0, true);

        this.playClicked = false;

        // background/sky color
        this.game.stage.backgroundColor = '#239AE4';

        this.backgroundGraphics = game.add.graphics(0, 0);
        this.backgroundGraphics.clear();

        // ground
        this.backgroundGraphics.beginFill(0x8dc63f, 1);
        this.backgroundGraphics.drawRect(ground.x, ground.y, ground.width, ground.height);
        //        this.ground = this.game.add.tileSprite(0, 500, this.game.width, 250, 'menu_ground');

        this.tree3 = this.game.add.sprite(20, this.game.height - 180, 'menu_tree');
        this.tree3.anchor.setTo(0, 1);
        this.tree3.scale.setTo(0.7);
        this.tree = this.game.add.sprite(gameCenterX + 400, this.game.height - 90, 'menu_tree');
        this.tree.anchor.setTo(0, 1);
        this.tree.scale.setTo(0.9);
        this.house = this.game.add.sprite(gameCenterX, this.game.height - 50, 'menu_house');
        this.house.scale.setTo(1);
        this.house.anchor.setTo(0.5, 1);

        // pig
        this.pigLocked = undefined; // to decide whether or not to display the locked preview
        this.pig = this.add.sprite(gameCenterX - 230, this.game.height - 10, 'menu_pigs');
        this.pig.anchor.setTo(1, 1);
        this.pig.scale.setTo(0.67);
        this.pig.animations.add(this.JETPACKS.DEFAULT.PREVIEW_KEY, [0]);
        this.pig.animations.add(this.JETPACKS.LASERPIG.PREVIEW_KEY, [1]);
        this.pig.animations.add(this.JETPACKS.TIMMY.PREVIEW_KEY, [2]);
        this.pig.animations.add(this.JETPACKS.HASHTAGPIG.PREVIEW_KEY, [3]);
        this.pig.animations.add(this.JETPACKS.DEFAULT.LOCKED_PREVIEW_KEY, [4]);
        this.pig.animations.add(this.JETPACKS.LASERPIG.LOCKED_PREVIEW_KEY, [5]);
        this.pig.animations.add(this.JETPACKS.TIMMY.LOCKED_PREVIEW_KEY, [6]);
        this.pig.animations.add(this.JETPACKS.HASHTAGPIG.LOCKED_PREVIEW_KEY, [7]);
        this.pig.animations.play(this.JETPACKS.DEFAULT.PREVIEW_KEY, 1, true);
        // -----------------------
        this.bbox = this.game.add.sprite(gameCenterX + 220, this.game.height - 25, 'menu_beat_box');
        this.bbox.anchor.setTo(0, 1);
        this.bbox.scale.setTo(0.7);
        this.tree2 = this.game.add.sprite(this.game.width + 100, this.game.height + 10, 'menu_tree');
        this.tree2.anchor.setTo(1, 1);
        this.tree2.scale.setTo(1.2, 1.7);

        //        Menu.show(this.game, this.gameOptions);
        this.menuPanel = new MenuPanel(this.game);
        this.game.add.existing(this.menuPanel);
        this.levelPanel = new LevelPanel(this.game);
        this.game.add.existing(this.levelPanel);
        this.customizePanel = new CustomizePanel(this.game);
        this.game.add.existing(this.customizePanel);
        this.scoresPanel = new ScoresPanel(this.game);
        this.game.add.existing(this.scoresPanel);
        this.aboutPanel = new AboutPanel(this.game);
        this.game.add.existing(this.aboutPanel);
        this.storyPanel = new StoryPanel(this.game);
        this.game.add.existing(this.storyPanel);
        this.controlsPanel = new ControlsPanel(this.game);
        this.game.add.existing(this.controlsPanel);
        this.shopPanel = new ShopPanel(this.game);
        this.game.add.existing(this.shopPanel);
        this.musicPanel = new MusicPanel(this.game);
        this.game.add.existing(this.musicPanel);



        this.menuPanel.show();



        // mute button
        this.muteButton = this.game.add.button(this.game.width - 20, 20, 'menu_mute_button', this.mute, this, 0, 0, 0);
        this.muteButton.anchor.setTo(1, 0);
        this.muteButton.scale.setTo(1);
        this.muteButton.kill();
        // unmute button
        this.unmuteButton = this.game.add.button(this.game.width - 20, 20, 'menu_unmute_button', this.unmute, this, 0, 0, 0);
        this.unmuteButton.anchor.setTo(1, 0);
        this.unmuteButton.scale.setTo(1);

        this.keyboardButtonP = game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.keyboardButtonR = game.input.keyboard.addKey(Phaser.Keyboard.R);


        // add panels
        this.hookPanel = game.add.sprite(15, 15, 'blank_panel_top');
        this.hookPanel.anchor.setTo(0, 0);
        this.hookPanel.scale.setTo(0.75);

        this.blankPanel = game.add.sprite(this.hookPanel.x, this.hookPanel.y + this.hookPanel.height - 5, 'blank_panel_middle');
        this.blankPanel.anchor.setTo(0, 0);
        this.blankPanel.scale.setTo(0.75);

        this.hook1 = game.add.sprite(this.hookPanel.x + 50, this.hookPanel.y + 5, 'hook');
        this.hook1.anchor.setTo(0.5, 0.5);
        this.hook1.scale.setTo(0.8);

        this.hook2 = game.add.sprite(this.hookPanel.x + this.hookPanel.width - 50, this.hookPanel.y + 5, 'hook');
        this.hook2.anchor.setTo(0.5, 0.5);
        this.hook2.scale.setTo(0.8);

        this.blankPanel2 = game.add.sprite(this.hookPanel.x, this.blankPanel.y + this.blankPanel.height - 25, 'blank_panel_bottom');
        this.blankPanel2.anchor.setTo(0, 0);
        this.blankPanel2.scale.setTo(0.75);

        this.audio = {
            mainMenuMusic: game.add.audio('main_menu_audio'),
            buttonClicked: game.add.audio('button_click_audio')
        };
        this.audio.mainMenuMusic.play('', 0, gameAudio.game.volume, true);

        // load muted state
        this.muted = JSON.parse(localStorage.getItem(this.MUTED_OPTIONS_KEY));
        // if there was no muted state found in localStorage, turn music on
        if (this.muted === true) {
            this.mute();
        } else {
            this.unmute();
        }

    },
    update: function () {
        'use strict';
        // Menu stats
        Laserpig.MainMenu.level.innerHTML = "Current Level - " + this.LEVELS[this.gameOptions.LEVEL.KEY].NAME;
        Laserpig.MainMenu.highscore.innerHTML = "High Score - " + this.statsObject[this.gameOptions.LEVEL.KEY].highScore;
        Laserpig.MainMenu.piggybank.innerHTML = "Piggy Bank - " + this.statsObject.credits + this.creditSuffix;

        // Color styling the menu stats
        Laserpig.MainMenu.highscore.style.color = this.LEVEL_COLORS[this.gameOptions.LEVEL.KEY];
        Laserpig.MainMenu.level.style.color = this.LEVEL_COLORS[this.gameOptions.LEVEL.KEY];

        // Starting the Game state on tap/click
        if (this.playClicked || this.keyboardButtonP.isDown || this.keyboardButtonR.isDown) {
            this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
            this.state.start('Game', true, false, this.gameInfo);
        }

        // Cheapskate way of doing it (should use a sprite map)
        if (this.pigLocked) {
            this.pig.animations.play(this.pigLocked, 1, true);
        } else {
            this.pig.animations.play(this.gameOptions.JETPACK.PREVIEW_KEY, 1, true);
        }
    },
    changeJetPack: function (jetpack) {
        'use strict';

        Laserpig.MainMenu.gameOptions.JETPACK = Laserpig.MainMenu.JETPACKS[jetpack];

        // save gameObject
        Laserpig.MainMenu.save();
    },
    changeLevel: function (level) {
        'use strict';

        Laserpig.MainMenu.gameOptions.LEVEL = Laserpig.MainMenu.LEVELS[level];

        // save gameObject
        Laserpig.MainMenu.save();
    },
    mute: function () {
        'use strict';

        game.sound.mute = true;
        this.muteButton.kill();
        this.unmuteButton.revive();

        localStorage.setItem(this.MUTED_OPTIONS_KEY, JSON.stringify(game.sound.mute));
    },
    unmute: function () {
        'use strict';

        game.sound.mute = false;
        this.unmuteButton.kill();
        this.muteButton.revive();

        localStorage.setItem(this.MUTED_OPTIONS_KEY, JSON.stringify(game.sound.mute));
    },
    changedLockOption: function (currentMenu, buttonName, value) {
        'use strict';

        Laserpig.MainMenu.lockedOptions[currentMenu][buttonName] = value;

        // update the locks visibility
        Laserpig.MainMenu.customizePanel.refreshLocks();
        Laserpig.MainMenu.levelPanel.refreshLocks();

        Laserpig.MainMenu.save();
    },
    save: function () {
        'use strict';

        localStorage.setItem(this.GAME_OPTIONS_KEY, JSON.stringify(Laserpig.MainMenu.gameOptions));
        localStorage.setItem(this.STATS_OBJECT_KEY, JSON.stringify(Laserpig.MainMenu.statsObject));
        localStorage.setItem(this.LOCKED_OPTIONS_KEY, JSON.stringify(Laserpig.MainMenu.lockedOptions));
    },
    shutdown: function () {
        'use strict';

        this.audio.mainMenuMusic.stop();

        Laserpig.MainMenu.level.style.display = "none";
        Laserpig.MainMenu.highscore.style.display = "none";
        Laserpig.MainMenu.piggybank.style.display = "none";

    }
};