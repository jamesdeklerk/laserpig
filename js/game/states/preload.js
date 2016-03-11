// Laserpig is defined in boot.js
/*global Laserpig, game */

Laserpig.Preload = {
    ready: false,
    gamenamixLogoReady: false,
    gamenamixAnimationComplete: function (sprite, animation) {
        'use strict';

        var preload = this;

        setTimeout(function () {
            preload.gamenamixLogoReady = true;
            preload.splashGamenamix.animations.add('fixGamenamix', [30]);
            preload.splashGamenamix.animations.play('fixGamenamix', 1, true);
        }, 500);
    },
    preload: function () {
        'use strict';
        
        console.log('preload started');

        //this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        //this.splash.anchor.setTo(0.5); // centers the anchor
        //splash test
        this.splashGamenamix = this.add.sprite(game.width / 2, game.height / 2, 'splash');
        this.splashGamenamix.scale.setTo(1);
        this.splashGamenamix.anchor.setTo(0.5);
        this.splashGamenamixAnimation = this.splashGamenamix.animations.add('splashAnime');
        this.splashGamenamixAnimation.play(31, false);
        this.splashGamenamixAnimation.onComplete.add(this.gamenamixAnimationComplete, this);

        this.spinner = this.add.sprite(game.width / 2, (game.height / 2) + 150, 'spinner');
        this.spinner.anchor.setTo(0.5, 0.5);
        this.spinnerAnime = this.spinner.animations.add('spinAnime');
        this.spinnerAnime.play(48, true);

        // load game assets
        // general menu images
        this.load.image('menu_house', 'assets/images/menu_images/house.png');
        this.load.image('menu_tree', 'assets/images/menu_images/tree.png');
        this.load.image('menu_beat_box', 'assets/images/menu_images/beat_box.png');
        this.load.image('blank_panel_top', 'assets/images/menu_images/blank_panel_top.png');
        this.load.image('blank_panel_middle', 'assets/images/menu_images/blank_panel_middle.png');
        this.load.image('blank_panel_bottom', 'assets/images/menu_images/blank_panel_bottom.png');
        this.load.image('hook', 'assets/images/menu_images/hook.png');
        this.load.spritesheet('menu_mute_button', 'assets/images/menu_images/mute.png', 62, 62);
        this.load.spritesheet('menu_unmute_button', 'assets/images/menu_images/unmute.png', 62, 62);
        this.load.spritesheet('menu_go_back_button', 'assets/images/menu_images/go_back_button.png', 275, 45);
        this.load.spritesheet('menu_lock_button', 'assets/images/menu_images/lock_button.png', 275, 45);

        // home menu images
        this.load.image('menu_title', 'assets/images/menu_images/menu_title.png');
        this.load.image('menu_tick', 'assets/images/menu_images/tick.png');
        this.load.spritesheet('menu_play_button', 'assets/images/menu_images/play_button.png', 275, 45);
        this.load.spritesheet('menu_select_level_button', 'assets/images/menu_images/select_level_button.png', 275, 45);
        this.load.spritesheet('menu_my_scores_button', 'assets/images/menu_images/my_scores_button.png', 275, 45);
        this.load.spritesheet('menu_controls_button', 'assets/images/menu_images/controls_button.png', 275, 45);
        this.load.spritesheet('menu_about_button', 'assets/images/menu_images/about_button.png', 275, 45);
        this.load.spritesheet('menu_customize_button', 'assets/images/menu_images/customize_button.png', 275, 45);
        this.load.spritesheet('menu_remove_ads_button', 'assets/images/menu_images/remove_ads_button.png', 275, 45);
        this.load.spritesheet('buy_button', 'assets/images/menu_images/buy.png', 178, 41);
        this.load.spritesheet('cart_button', 'assets/images/menu_images/cart.png', 84, 52);
        this.load.spritesheet('unlock_button', 'assets/images/menu_images/unlock.png', 170.5, 40);

        // customize menu images
        this.load.image('menu_customize_title', 'assets/images/menu_images/customize_title.png');
        this.load.spritesheet('menu_default_button', 'assets/images/menu_images/default_button.png', 275, 45);
        this.load.spritesheet('menu_laserpig_button', 'assets/images/menu_images/laserpig_button.png', 275, 45);
        this.load.spritesheet('menu_timmy_button', 'assets/images/menu_images/timmy_button.png', 275, 45);
        this.load.spritesheet('menu_hashtagpig_button', 'assets/images/menu_images/hashtagpig_button.png', 275, 45);

        // level menu images
        this.load.image('menu_level_title', 'assets/images/menu_images/level_title.png');
        this.load.spritesheet('menu_easy_button', 'assets/images/menu_images/easy_button.png', 275, 45);
        this.load.spritesheet('menu_medium_button', 'assets/images/menu_images/medium_button.png', 275, 45);
        this.load.spritesheet('menu_hard_button', 'assets/images/menu_images/hard_button.png', 275, 45);
        this.load.spritesheet('menu_free_fly_button', 'assets/images/menu_images/free_fly_button.png', 275, 45);

        // scores menu images
        this.load.image('menu_scores_title', 'assets/images/menu_images/scores_title.png');
        this.load.image('menu_selector', 'assets/images/menu_images/selection_indicator_2.png');
        this.load.image('menu_selector_medium', 'assets/images/menu_images/selection_indicator_1.png');
        this.load.spritesheet('menu_easy_title', 'assets/images/menu_images/easy_title.png', 84, 34);
        this.load.spritesheet('menu_medium_title', 'assets/images/menu_images/medium_title.png', 130, 34);
        this.load.spritesheet('menu_hard_title', 'assets/images/menu_images/hard_title.png', 82, 34);

        //about menu images
        this.load.image('menu_about_title', 'assets/images/menu_images/about_title.png');
        this.load.image('gamenamix', 'assets/images/menu_images/Gamenamix.png');
        this.load.spritesheet('menu_music_button', 'assets/images/menu_images/music_button.png', 275, 45);
        this.load.spritesheet('menu_story_button', 'assets/images/menu_images/story_button.png', 275, 45);

        //story menu images
        this.load.image('menu_story_title', 'assets/images/menu_images/story_title.png');

        //music menu images
        this.load.image('menu_music_title', 'assets/images/menu_images/music_title.png');
        this.load.spritesheet('menu_next_arrow', 'assets/images/menu_images/next_arrow.png');

        //controls menu images
        this.load.image('menu_controls_title', 'assets/images/menu_images/controls_title.png');
        this.load.image('touch_controls', 'assets/images/menu_images/touch_controls.png');
        this.load.image('keyboard_controls', 'assets/images/menu_images/keyboard_controls.png');
        this.load.spritesheet('menu_keyboard_button', 'assets/images/menu_images/keyboard_title.png', 158, 34);
        this.load.spritesheet('menu_touch_button', 'assets/images/menu_images/touch_title.png', 96, 34);

        //shop menu images
        this.load.image('menu_shop_title', 'assets/images/menu_images/shop_title.png');

        // pause menu images
        this.load.spritesheet('menu_resume_button', 'assets/images/menu_images/resume_button.png', 275, 45);
        this.load.spritesheet('menu_quit_button', 'assets/images/menu_images/quit_button.png', 275, 45);
        this.load.spritesheet('menu_restart_button', 'assets/images/menu_images/restart_button.png', 275, 45);

        //Scoreboard
        this.load.image('new_high_score', 'assets/images/new_high_score.png');

        // Tutorial
        this.load.image('tutorial_arrow', 'assets/images/tutorial_arrow.png');
        this.load.image('tutorial_hand', 'assets/images/tutorial_hand.png');
        this.load.image('white_line_short', 'assets/images/white_line_short.png');
        this.load.image('white_line_long', 'assets/images/white_line_long.png');
        this.load.image('white_keyboard_controls', 'assets/images/white_keyboard_controls.png');
        this.load.spritesheet('tutorial_keyboard_button', 'assets/images/white_keyboard_title.png', 159, 35);
        this.load.spritesheet('tutorial_touch_button', 'assets/images/white_touch_title.png', 97, 35);
        this.load.spritesheet('close_controls_button', 'assets/images/close_controls.png', 231, 51);


        // images
        this.load.image('road', 'assets/images/road.png');
        this.load.image('mountain_1', 'assets/images/mountain_1.png');
        this.load.image('house_1', 'assets/images/house_1.png');
        this.load.image('house_2', 'assets/images/house_2.png');
        this.load.image('house_3', 'assets/images/house_3.png');
        this.load.image('house_4', 'assets/images/house_4.png');
        this.load.image('house_5', 'assets/images/house_5.png');
        this.load.image('house_6', 'assets/images/house_6.png');
        this.load.image('house_7', 'assets/images/house_7.png');
        this.load.image('house_8', 'assets/images/house_8.png');
        this.load.image('tree_1', 'assets/images/tree_1.png');
        this.load.image('tree_2', 'assets/images/tree_2.png');
        this.load.image('cloud_1', 'assets/images/cloud_1.png');
        this.load.image('cloud_2', 'assets/images/cloud_2.png');
        this.load.image('water-drop', 'assets/images/water-drop.png');
        this.load.image('pizza-crumb', 'assets/images/pizza-crumb.png');
        this.load.image('chocolate-crumb', 'assets/images/chocolate-crumb.png');
        this.load.image('lollipop-crumb', 'assets/images/lollipop-crumb.png');
        this.load.image('bacon', 'assets/images/bacon.png');
        this.load.image('pizza', 'assets/images/pizza.png');
        this.load.image('lollipop_1', 'assets/images/lollipop_1.png');
        this.load.image('burger', 'assets/images/burger.png');
        this.load.image('chocolate_1', 'assets/images/chocolate_1.png');
        this.load.image('road_line', 'assets/images/road-line.png');
        this.load.image('boost_button', 'assets/images/boost_button.png');
        this.load.image('pause_button', 'assets/images/pause_button.png');
        this.load.image('boost_tutorial', 'assets/images/boost_tutorial.png');
        this.load.image('boost_tutorial_desktop', 'assets/images/boost_tutorial_desktop.png');
        // spritesheets
        this.load.spritesheet('DEFAULT-JETPACK', 'assets/images/DEFAULT-JETPACK.png', 224, 98, 24);
        this.load.spritesheet('LASERPIG-JETPACK', 'assets/images/LASERPIG-JETPACK.png', 225, 98, 24);
        this.load.spritesheet('TIMMY-JETPACK', 'assets/images/TIMMY-JETPACK.png', 225, 98, 24);
        this.load.spritesheet('HASHTAGPIG-JETPACK', 'assets/images/HASHTAGPIG-JETPACK.png', 225, 98, 24);
        this.load.spritesheet('menu_pigs', 'assets/images/menu_images/pigs.png', 478, 309, 8);
        //game animations
        this.load.spritesheet('dust_cloud', 'assets/images/dust_cloud.png', 150, 150, 12);
        this.load.spritesheet('explosion', 'assets/images/explosion2.png', 150, 150); //128, 128);



        // loading audio
        this.load.audio('main_menu_audio', 'assets/audio/main_menu_audio.mp3');
        this.load.audio('button_click_audio', 'assets/audio/button_click_audio.mp3');
        this.load.audio('boost_audio', 'assets/audio/boost_audio.mp3');
        this.load.audio('laser_hit_audio', 'assets/audio/laser_hit_audio.mp3');
        this.load.audio('game_play_wind_audio', 'assets/audio/game_play_wind_audio.mp3');
        this.load.audio('game_play_audio', 'assets/audio/EDM.mp3');
        this.load.audio('bomb_audio', 'assets/audio/bomb.mp3');
        this.load.audio('lock_audio', 'assets/audio/lock.mp3');
        this.load.audio('unlock_audio', 'assets/audio/unlock.mp3');
        this.load.audio('scoreboard_audio', 'assets/audio/scoreboard_audio.mp3');
        this.load.audio('newHighscore_audio', 'assets/audio/newHighscore_audio.mp3');

        this.load.audio('pig_snort_audio', 'assets/audio/pig_snort.mp3');

        window.gameAudio = {
            game: {
                volume: 1,
                loopDefault: false,
                forceRestartDefault: true,
                gameMusic: {
                    volume: 1
                },
                scoreBoardMusic: {
                    volume: 0.25
                },
                newHighsoreMusic: {
                    volume: 0.15
                },
                laserHitSound: {
                    volume: 0.5
                }
            },
            pig: {
                snort: {
                    volume: 0.25
                },
                boost: {
                    volume: 0.25
                },
                explosion: {
                    volume: 0.25
                },
                wind: {
                    volume: 0.5
                }
            }
        };

        //        this.audio = {
        //            loadingMusic: game.add.audio('loading')
        //        };
        //
        //        this.audio.loadingMusic.play('', 0, gameAudio.game.volume, true);

        //        sounds: {
        //                mainMenuMusic: game.add.audio('main_menu_audio'),
        //                buttonClicked: game.add.audio('button_click_audio'),
        //                snort: game.add.audio('pig_snort_audio'),
        //                laser_hit: game.add.audio('laser_hit_audio'),
        //                boostSound: game.add.audio('boost_audio'),
        //                gameplayMusic: game.add.audio('game_play_audio')
        //            }
        var sounds = [
                game.add.audio('main_menu_audio'),
                game.add.audio('button_click_audio'),
                game.add.audio('pig_snort_audio'),
                game.add.audio('laser_hit_audio'),
                game.add.audio('boost_audio'),
                game.add.audio('bomb_audio'),
                game.add.audio('lock_audio'),
                game.add.audio('unlock_audio'),
                game.add.audio('game_play_wind_audio'),
                game.add.audio('game_play_audio')
            ],
            soundName;

        this.audioIsDecoded = false; // NB: should start off false
        this.game.sound.setDecodedCallback(sounds, this.audioDecoded, this);



        this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    audioDecoded: function () {
        'use strict';

        this.audioIsDecoded = true;
    },
    create: function () {
        'use strict';

        //        this.spinner = this.add.sprite(game.width / 2, (game.height / 2) + 150, 'spinner');
        //        this.spinner.anchor.setTo(0.5, 0.5);
        //        this.spinnerAngle = 0;
        //        this.spinner.angle = this.spinnerAngle;
    },
    update: function () {
        'use strict';

        //        this.spinnerAngle = this.spinnerAngle + 15;
        //        this.spinner.angle = this.spinnerAngle;

        /*this.cache.isSoundDecoded('menuMusic') && */
        if (this.ready && this.gamenamixLogoReady && this.audioIsDecoded && window.fontsAreLoaded) {
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function () {
        'use strict';

        if (this.ready !== undefined) {
            this.ready = true;
        }
    }
};