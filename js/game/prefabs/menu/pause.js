/*global Phaser, Laserpig, Menu, objectProperties, gameAudio */

//var Pause = {
//    show: function (game) {
//        'use strict';
//
//        var gameCenterX = game.width / 2,
//            gameCenterY = game.height / 2;
//
//        this.game = game;
//
//        this.resumeButton = game.add.button(gameCenterX, gameCenterY - 55, 'menu_resume_button', this.resumeClicked, null, 0, 0, 0);
//        this.resumeButton.anchor.setTo(0.5, 0.5);
//        this.resumeButton.scale.setTo(1.2);
//
//        this.quitButton = game.add.button(gameCenterX, gameCenterY + 55, 'menu_quit_button', this.quitClicked, null, 0, 0, 0);
//        this.quitButton.anchor.setTo(0.5, 0.5);
//        this.quitButton.scale.setTo(1.2);
//
//    },
//    resumeClicked: function () {
//        'use strict';
//
//        Laserpig.Game.resumeGame();
//        Pause.destroy();
//    },
//    quitClicked: function () {
//        'use strict';
//
//        Pause.destroy();
//        Laserpig.Game.state.start('MainMenu');
//    },
//    destroy: function () {
//        'use strict';
//
//        Pause.resumeButton.destroy();
//        Pause.quitButton.destroy();
//
//    }
//};





// Create our pause panel extending Phaser.Group
var PausePanel = function (game) {
    'use strict';

    var gameCenterX = game.width / 2,
        gameCenterY = game.height / 2;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);
    
    this.clearSprite = game.add.sprite(0, 0);
    this.clearSprite.width = game.width;
    this.clearSprite.height = game.height;
    this.clearSprite.inputEnabled = true;
    this.clearSprite.events.onInputUp.add(function () {
        this.resumeClicked();
    }, this);
    this.add(this.clearSprite);

    this.resumeButton = game.add.button(gameCenterX, gameCenterY - 55, 'menu_play_button', this.resumeClicked, this, 0, 0, 1);
    this.resumeButton.anchor.setTo(0.5, 0.5);
    this.resumeButton.scale.setTo(1.4);
    this.add(this.resumeButton);

    this.quitButton = game.add.button(gameCenterX, gameCenterY + 55, 'menu_quit_button', this.quitClicked, this, 0, 0, 1);
    this.quitButton.anchor.setTo(0.5, 0.5);
    this.quitButton.scale.setTo(1.4);
    this.add(this.quitButton);

    // Place it out of bounds
    this.x = 0;
    this.y = -game.height;
    
    this.audio = {
        buttonClicked: game.add.audio('button_click_audio')
    };
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.constructor = PausePanel;

PausePanel.prototype.resumeClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.Game.resumeGame();
    // the hiding of the panel is done in resumeGame();
    //    Laserpig.Game.pausePanel.hide();
};

PausePanel.prototype.quitClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    objectProperties.game.lastTimeEsc = objectProperties.time();
    objectProperties.pig.alive = false;
    Laserpig.Game.pig.alive = false;
    
    Laserpig.Game.pausePanel.hide();
    
    Laserpig.Game.scoreBoard.show(objectProperties.game.tempStats.score,
        Math.floor(objectProperties.game.tempStats.distance),
        objectProperties.game.tempStats.totalPizzasCollected,
        objectProperties.game.tempStats.totalBurgersCollected,
        objectProperties.game.tempStats.totalChocolatesCollected,
        objectProperties.game.tempStats.totalLollipopsCollected,
        Laserpig.Game.currentCredits);

};

PausePanel.prototype.show = function () {
    'use strict';

    this.game.add.tween(this).to({
        y: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

PausePanel.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        y: -this.game.height
    }, 300, Phaser.Easing.Cubic.InOut, true);
};