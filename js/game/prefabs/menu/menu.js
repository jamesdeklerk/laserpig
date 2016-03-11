/*global Phaser, Laserpig, Customize, Level, gameSize */

//var Menu = {
//    show: function (game) {
//        'use strict';
//        
//        var gameCentreX = game.width / 2;
//        
//        this.game = game;
//
//        this.menuTitle = game.add.sprite(gameCentreX, 50, 'menu_title');
//        this.menuTitle.anchor.setTo(0.5, 0);
//        this.menuTitle.scale.setTo(1);
//
//        this.playButton = game.add.button(gameCentreX, 220, 'menu_play_button', this.playClicked, null, 0, 0, 0);
//        this.playButton.anchor.setTo(0.5, 0);
//        this.playButton.scale.setTo(1.4);
//        
//        this.selectLevelButton = game.add.button(gameCentreX, 220 + 65, 'menu_select_level_button', this.selectLevelClicked, null, 0, 0, 0);
//        this.selectLevelButton.anchor.setTo(0.5, 0);
//        this.selectLevelButton.scale.setTo(1.4);
//        
//        this.myScoresButton = game.add.button(gameCentreX, 220 + 65 * 2, 'menu_my_scores_button', this.myScoresClicked, null, 0, 0, 0);
//        this.myScoresButton.anchor.setTo(0.5, 0);
//        this.myScoresButton.scale.setTo(1.4);
//        
//        this.controlsButton = game.add.button(gameCentreX, 220 + 65 * 3, 'menu_controls_button', this.myScoresClicked, null, 0, 0, 0);
//        this.controlsButton.anchor.setTo(0.5, 0);
//        this.controlsButton.scale.setTo(1.4);
//        
//        this.aboutButton = game.add.button(gameCentreX, 220 + 65 * 4, 'menu_about_button', this.myScoresClicked, null, 0, 0, 0);
//        this.aboutButton.anchor.setTo(0.5, 0);
//        this.aboutButton.scale.setTo(1.4);
//        
//        this.removeAdsButton = game.add.button(gameCentreX, 220 + 65 * 5, 'menu_remove_ads_button', this.customizeClicked, null, 0, 0, 0);
//        this.removeAdsButton.anchor.setTo(0.5, 0);
//        this.removeAdsButton.scale.setTo(1.4);
//        
//    },
//    playClicked: function () {
//        'use strict';
//        
//        Laserpig.MainMenu.playClicked = true;
//        Menu.destroy();
//    },
//    myScoresClicked: function () {
//        'use strict';
//        
//        
//    },
//    customizeClicked: function () {
//        'use strict';
//        
//        Menu.destroy();
//        Customize.show(Menu.game);
//    },
//    selectLevelClicked: function () {
//        'use strict';
//        
//        Menu.destroy();
//        Level.show(Menu.game);
//    },
//    destroy: function () {
//        'use strict';
//        
//        Menu.menuTitle.destroy();
//        Menu.playButton.destroy();
//        Menu.selectLevelButton.destroy();
//        Menu.myScoresButton.destroy();
//        Menu.controlsButton.destroy();
//        Menu.aboutButton.destroy();
//        Menu.removeAdsButton.destroy();
//        
//    }
//};







// Create our menu panel extending Phaser.Group
var MenuPanel = function (game) {
    'use strict';

    var gameCentreX = game.width / 2;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.menuTitle = game.add.sprite(gameCentreX, 190, 'menu_title');
    this.menuTitle.anchor.setTo(0.5, 1);
    this.menuTitle.scale.setTo(0.6);
    this.add(this.menuTitle);

    this.playButton = game.add.button(gameCentreX, this.menuTitle.y + 30, 'menu_play_button', this.playClicked, this, 0, 0, 1);
    this.playButton.anchor.setTo(0.5, 0);
    this.playButton.scale.setTo(1.4);
    this.add(this.playButton);

    this.selectLevelButton = game.add.button(gameCentreX, this.playButton.y + this.playButton.height + 2, 'menu_select_level_button', this.selectLevelClicked, this, 0, 0, 1);
    this.selectLevelButton.anchor.setTo(0.5, 0);
    this.selectLevelButton.scale.setTo(1.4);
    this.add(this.selectLevelButton);

    this.customizeButton = game.add.button(gameCentreX, this.selectLevelButton.y + this.selectLevelButton.height + 2, 'menu_customize_button', this.customizeClicked, this, 0, 0, 1);
    this.customizeButton.anchor.setTo(0.5, 0);
    this.customizeButton.scale.setTo(1.4);
    this.add(this.customizeButton);

    this.myScoresButton = game.add.button(gameCentreX, this.customizeButton.y + this.customizeButton.height + 2, 'menu_my_scores_button', this.myScoresClicked, this, 0, 0, 1);
    this.myScoresButton.anchor.setTo(0.5, 0);
    this.myScoresButton.scale.setTo(1.4);
    this.add(this.myScoresButton);

    this.controlsButton = game.add.button(gameCentreX, this.myScoresButton.y + this.myScoresButton.height + 2, 'menu_controls_button', this.controlsClicked, this, 0, 0, 1);
    this.controlsButton.anchor.setTo(0.5, 0);
    this.controlsButton.scale.setTo(1.4);
    this.add(this.controlsButton);

    this.aboutButton = game.add.button(gameCentreX, this.controlsButton.y + this.controlsButton.height + 2, 'menu_about_button', this.aboutClicked, this, 0, 0, 1);
    this.aboutButton.anchor.setTo(0.5, 0);
    this.aboutButton.scale.setTo(1.4);
    this.add(this.aboutButton);

    //    this.removeAdsButton = game.add.button(gameCentreX, 220 + 65 * 6, 'menu_remove_ads_button', this.removeAdsClicked, null, 0, 0, 1);
    //    this.removeAdsButton.anchor.setTo(0.5, 0);
    //    this.removeAdsButton.scale.setTo(1.4);
    //    this.add(this.removeAdsButton);
    //    this.cartButton = game.add.button(document.getElementById('piggybank').offsetWidth * (gameSize.width / window.innerWidth), 40, 'cart_button', this.cartClicked, null, 0, 0, 0);
    //    this.cartButton.anchor.setTo(0, 0.5);
    //    this.cartButton.scale.setTo(1);
    //    this.add(this.cartButton);


    // Place it out of bounds
    this.x = -game.width;
    //    this.y = -game.height;

    this.audio = {
        buttonClicked: game.add.audio('button_click_audio')
    };
};

MenuPanel.prototype = Object.create(Phaser.Group.prototype);
MenuPanel.constructor = MenuPanel;

MenuPanel.prototype.playClicked = function () {
    'use strict';

    Laserpig.MainMenu.playClicked = true;
};

MenuPanel.prototype.myScoresClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
    
    Laserpig.MainMenu.menuPanel.hide();
    Laserpig.MainMenu.scoresPanel.show();
};

MenuPanel.prototype.customizeClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.menuPanel.hide();
    Laserpig.MainMenu.customizePanel.show();
};

MenuPanel.prototype.selectLevelClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.menuPanel.hide();
    Laserpig.MainMenu.levelPanel.show();
};

MenuPanel.prototype.controlsClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.menuPanel.hide();
    Laserpig.MainMenu.controlsPanel.show();
};

MenuPanel.prototype.aboutClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.menuPanel.hide();
    Laserpig.MainMenu.aboutPanel.show();
};

MenuPanel.prototype.cartClicked = function () {
    'use strict';

    Laserpig.MainMenu.menuPanel.hide();
    Laserpig.MainMenu.shopPanel.show();
};

MenuPanel.prototype.show = function () {
    'use strict';
    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

MenuPanel.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: -this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};