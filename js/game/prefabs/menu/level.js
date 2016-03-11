/*global Phaser, Laserpig, Menu, gameAudio */

//var Level = {
//    show: function (game) {
//        'use strict';
//
//        var gameCentreX = game.width / 2;
//
//        this.game = game;
//        this.lockedOptions = Laserpig.MainMenu.lockedOptions.Level;
//
//        this.levelTitle = game.add.sprite(gameCentreX, 50, 'menu_level_title');
//        this.levelTitle.anchor.setTo(0.5, 0);
//        this.levelTitle.scale.setTo(1);
//
//        this.easyButton = game.add.button(gameCentreX, 220, 'menu_easy_button', this.easyClicked, null, 0, 0, 0);
//        this.easyButton.anchor.setTo(0.5, 0);
//        this.easyButton.scale.setTo(1.4);
//        if (!this.lockedOptions.easyButton) {
//            this.easyButtonLock = game.add.button(this.easyButton.x, this.easyButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.easyButtonLock.anchor.setTo(0.5, 0);
//            this.easyButtonLock.scale.setTo(1.4);
//        }
//
//        this.mediumButton = game.add.button(gameCentreX, 220 + 65, 'menu_medium_button', this.mediumClicked, null, 0, 0, 0);
//        this.mediumButton.anchor.setTo(0.5, 0);
//        this.mediumButton.scale.setTo(1.4);
//        if (!this.lockedOptions.mediumButton) {
//            this.mediumButtonLock = game.add.button(this.mediumButton.x, this.mediumButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.mediumButtonLock.anchor.setTo(0.5, 0);
//            this.mediumButtonLock.scale.setTo(1.4);
//        }
//
//        this.hardButton = game.add.button(gameCentreX, 220 + 65 * 2, 'menu_hard_button', this.hardClicked, null, 0, 0, 0);
//        this.hardButton.anchor.setTo(0.5, 0);
//        this.hardButton.scale.setTo(1.4);
//        if (!this.lockedOptions.hardButton) {
//            this.hardButtonLock = game.add.button(this.hardButton.x, this.hardButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.hardButtonLock.anchor.setTo(0.5, 0);
//            this.hardButtonLock.scale.setTo(1.4);
//        }
//
//        this.freeFlyButton = game.add.button(gameCentreX, 220 + 65 * 3, 'menu_free_fly_button', this.freeFlyClicked, null, 0, 0, 0);
//        this.freeFlyButton.anchor.setTo(0.5, 0);
//        this.freeFlyButton.scale.setTo(1.4);
//        if (!this.lockedOptions.freeFlyButton) {
//            this.freeFlyButtonLock = game.add.button(this.freeFlyButton.x, this.freeFlyButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.freeFlyButtonLock.anchor.setTo(0.5, 0);
//            this.freeFlyButtonLock.scale.setTo(1.4);
//        }
//
//        this.goBackButton = game.add.button(gameCentreX, 220 + 65 * 5, 'menu_go_back_button', this.goBackClicked, null, 0, 0, 0);
//        this.goBackButton.anchor.setTo(0.5, 0);
//        this.goBackButton.scale.setTo(1.4);
//
//        this.tick = game.add.sprite(gameCentreX + 140, this.easyButton.y + 20, 'menu_tick');
//        this.tick.anchor.setTo(0.5, 0);
//        this.tick.scale.setTo(0.8);
//
//        // put tick in the correct place
//        if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === 'EASY') {
//            Level.tick.y = Level.easyButton.y + 20;
//        } else if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === 'MEDIUM') {
//            Level.tick.y = Level.mediumButton.y + 20;
//        } else if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === 'HARD') {
//            Level.tick.y = Level.hardButton.y + 20;
//        } else if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === 'FREE_FLY') {
//            Level.tick.y = Level.freeFlyButton.y + 20;
//        }
//
//    },
//    easyClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeLevel('EASY');
//        Level.tick.y = Level.easyButton.y + 20;
//    },
//    mediumClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeLevel('MEDIUM');
//        Level.tick.y = Level.mediumButton.y + 20;
//    },
//    hardClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeLevel('HARD');
//        Level.tick.y = Level.hardButton.y + 20;
//    },
//    freeFlyClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeLevel('FREE_FLY');
//        Level.tick.y = Level.freeFlyButton.y + 20;
//    },
//    goBackClicked: function () {
//        'use strict';
//
//        Level.destroy();
//        Menu.show(Level.game);
//    },
//    destroy: function () {
//        'use strict';
//
//        Level.levelTitle.destroy();
//
//        Level.easyButton.destroy();
//        Level.mediumButton.destroy();
//        Level.hardButton.destroy();
//        Level.freeFlyButton.destroy();
//
//        if (Level.easyButtonLock !== undefined) {
//            Level.easyButtonLock.destroy();
//        }
//        if (Level.mediumButtonLock !== undefined) {
//            Level.mediumButtonLock.destroy();
//        }
//        if (Level.hardButtonLock !== undefined) {
//            Level.hardButtonLock.destroy();
//        }
//        if (Level.freeFlyButtonLock !== undefined) {
//            Level.freeFlyButtonLock.destroy();
//        }
//
//        Level.goBackButton.destroy();
//
//
//        Level.tick.destroy();
//
//    }
//};



// Create our level panel extending Phaser.Group
var LevelPanel = function (game) {
    'use strict';

    var gameCentreX = game.width / 2,
        creditSuffix = 'cr',
        currencyPrefix = 'R',
        dy = 2;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.lockedOptions = Laserpig.MainMenu.lockedOptions.Level;
    
    this.TUTORIAL_COMPLETE_KEY = 'tutorialComplete'; // also in game.js and level.js

    this.TEXT_STYLES = {
        font: '27px Orbitron',
        fill: '#f8f8f8',
        align: 'center'
    };

    this.levelTitle = game.add.sprite(gameCentreX, 195, 'menu_level_title');
    this.levelTitle.anchor.setTo(0.5, 1);
    this.levelTitle.scale.setTo(0.6);
    this.add(this.levelTitle);

    this.easyButton = game.add.button(gameCentreX, this.levelTitle.y + 25, 'menu_easy_button', this.easyClicked, this, 0, 0, 1);
    this.easyButton.anchor.setTo(0.5, 0);
    this.easyButton.scale.setTo(1.4);
    this.add(this.easyButton);

    this.easyButtonLock = game.add.button(this.easyButton.x, this.easyButton.y, 'menu_lock_button', null, null, 1, 1, 1);
    this.easyButtonLock.anchor.setTo(0.5, 0);
    this.easyButtonLock.scale.setTo(1.4);
    this.add(this.easyButtonLock);

    this.mediumButton = game.add.button(gameCentreX, this.easyButton.y + this.easyButton.height + dy, 'menu_medium_button', this.mediumClicked, this, 0, 0, 1);
    this.mediumButton.anchor.setTo(0.5, 0);
    this.mediumButton.scale.setTo(1.4);
    this.add(this.mediumButton);

    this.mediumButtonLock = game.add.button(this.mediumButton.x, this.mediumButton.y, 'menu_lock_button', null, null, 1, 1, 1);
    this.mediumButtonLock.anchor.setTo(0.5, 0);
    this.mediumButtonLock.scale.setTo(1.4);
    this.add(this.mediumButtonLock);

    this.hardButton = game.add.button(gameCentreX, this.mediumButton.y + this.mediumButton.height + dy, 'menu_hard_button', this.hardClicked, this, 0, 0, 1);
    this.hardButton.anchor.setTo(0.5, 0);
    this.hardButton.scale.setTo(1.4);
    this.add(this.hardButton);

    this.hardButtonLock = game.add.button(this.hardButton.x, this.hardButton.y, 'menu_lock_button', null, null, 1, 1, 1);
    this.hardButtonLock.anchor.setTo(0.5, 0);
    this.hardButtonLock.scale.setTo(1.4);
    this.add(this.hardButtonLock);

    this.freeFlyButton = game.add.button(gameCentreX, this.hardButton.y + this.hardButton.height + dy, 'menu_free_fly_button', this.freeFlyClicked, this, 0, 0, 1);
    this.freeFlyButton.anchor.setTo(0.5, 0);
    this.freeFlyButton.scale.setTo(1.4);
    this.add(this.freeFlyButton);

    this.freeFlyButtonLock = game.add.button(this.freeFlyButton.x, this.freeFlyButton.y, 'menu_lock_button', null, null, 1, 1, 1);
    this.freeFlyButtonLock.anchor.setTo(0.5, 0);
    this.freeFlyButtonLock.scale.setTo(1.4);
    this.add(this.freeFlyButtonLock);

    this.unlockMediumButton = game.add.button(this.mediumButton.x + 310, this.mediumButton.y + (this.mediumButton.height / 2), 'unlock_button', this.unlockMediumButtonClicked, this, 1, 1, 0);
    this.unlockMediumButton.anchor.setTo(0.5, 0.5);
    this.unlockMediumButton.scale.setTo(1.2);
    this.add(this.unlockMediumButton);

    this.mediumCreditValue = game.add.text(this.unlockMediumButton.x + 25, this.unlockMediumButton.y + 4, Laserpig.MainMenu.LEVELS.MEDIUM.CREDITS + creditSuffix, this.TEXT_STYLES);
    this.mediumCreditValue.anchor.setTo(0.5, 0.5);
    this.add(this.mediumCreditValue);

    this.unlockHardButton = game.add.button(this.hardButton.x + 310, this.hardButton.y + (this.hardButton.height / 2), 'unlock_button', this.unlockHardButtonClicked, this, 1, 1, 0);
    this.unlockHardButton.anchor.setTo(0.5, 0.5);
    this.unlockHardButton.scale.setTo(1.2);
    this.add(this.unlockHardButton);

    this.hardCreditValue = game.add.text(this.unlockHardButton.x + 25, this.unlockHardButton.y + 4, Laserpig.MainMenu.LEVELS.HARD.CREDITS + creditSuffix, this.TEXT_STYLES);
    this.hardCreditValue.anchor.setTo(0.5, 0.5);
    this.add(this.hardCreditValue);

    this.goBackButton = game.add.button(gameCentreX, this.freeFlyButton.y + this.freeFlyButton.height + 35, 'menu_go_back_button', this.goBackClicked, this, 0, 0, 1);
    this.goBackButton.anchor.setTo(0.5, 0);
    this.goBackButton.scale.setTo(1.4);
    this.add(this.goBackButton);

    this.tick = game.add.sprite(gameCentreX + 140, this.easyButton.y + 20, 'menu_tick');
    this.tick.anchor.setTo(0.5, 0);
    this.tick.scale.setTo(0.8);
    this.add(this.tick);

    // put tick in the correct place
    if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === Laserpig.MainMenu.LEVELS.EASY.KEY) {
        this.tick.y = this.easyButton.y + 20;
    } else if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === Laserpig.MainMenu.LEVELS.MEDIUM.KEY) {
        this.tick.y = this.mediumButton.y + 20;
    } else if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === Laserpig.MainMenu.LEVELS.HARD.KEY) {
        this.tick.y = this.hardButton.y + 20;
    } else if (Laserpig.MainMenu.gameOptions.LEVEL.KEY === Laserpig.MainMenu.LEVELS.FREE_FLY.KEY) {
        this.tick.y = this.freeFlyButton.y + 20;
    }

    // set the defaults for level
    this.refreshLocks();

    // Place it out of bounds
    this.x = game.width;
    this.y = 0;

    this.audio = {
        buttonClicked: game.add.audio('button_click_audio'),
        unlockButtonClicked: game.add.audio('unlock_audio'),
        lockButtonClicked: game.add.audio('lock_audio')
    };
};

LevelPanel.prototype = Object.create(Phaser.Group.prototype);
LevelPanel.constructor = LevelPanel;

LevelPanel.prototype.refreshLocks = function () {
    'use strict';
    
    this.easyButtonLock.visible = Laserpig.MainMenu.lockedOptions.Level.easyButton;
    this.mediumButtonLock.visible = Laserpig.MainMenu.lockedOptions.Level.mediumButton;
    this.hardButtonLock.visible = Laserpig.MainMenu.lockedOptions.Level.hardButton;
    this.freeFlyButtonLock.visible = Laserpig.MainMenu.lockedOptions.Level.freeFlyButton;

    // Tutorial
    // load stored tutorial complete
    this.tutorialComplete = JSON.parse(localStorage.getItem(this.TUTORIAL_COMPLETE_KEY));
    // if tutorial complete was not found in localStorage, assume they have not been through the tutorial
    if (this.tutorialComplete !== true) {
        // they have not completed the tutorial
        this.freeFlyButtonLock.visible = true;
    }

    this.unlockMediumButton.visible = Laserpig.MainMenu.lockedOptions.Level.unlockMediumButton;
    this.mediumCreditValue.visible = Laserpig.MainMenu.lockedOptions.Level.mediumCreditValue;
    this.unlockHardButton.visible = Laserpig.MainMenu.lockedOptions.Level.unlockHardButton;
    this.hardCreditValue.visible = Laserpig.MainMenu.lockedOptions.Level.hardCreditValue;
};

LevelPanel.prototype.unlockMediumButtonClicked = function () {
    'use strict';

    if (Laserpig.MainMenu.statsObject.credits >= Laserpig.MainMenu.LEVELS.MEDIUM.CREDITS) {

        this.audio.unlockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT

        Laserpig.MainMenu.changedLockOption('Level', 'mediumButton', false);
        Laserpig.MainMenu.changedLockOption('Level', 'unlockMediumButton', false);
        Laserpig.MainMenu.changedLockOption('Level', 'mediumCreditValue', false);
        Laserpig.MainMenu.statsObject.credits = Laserpig.MainMenu.statsObject.credits - Laserpig.MainMenu.LEVELS.MEDIUM.CREDITS;
        Laserpig.MainMenu.changeLevel('MEDIUM');
        Laserpig.MainMenu.levelPanel.tick.y = Laserpig.MainMenu.levelPanel.mediumButton.y + 20;
        Laserpig.MainMenu.save();

    } else {
        this.audio.lockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT
    }
};

LevelPanel.prototype.unlockHardButtonClicked = function () {
    'use strict';

    if (Laserpig.MainMenu.statsObject.credits >= Laserpig.MainMenu.LEVELS.HARD.CREDITS) {

        this.audio.unlockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT

        Laserpig.MainMenu.changedLockOption('Level', 'hardButton', false);
        Laserpig.MainMenu.changedLockOption('Level', 'unlockHardButton', false);
        Laserpig.MainMenu.changedLockOption('Level', 'hardCreditValue', false);
        Laserpig.MainMenu.statsObject.credits = Laserpig.MainMenu.statsObject.credits - Laserpig.MainMenu.LEVELS.HARD.CREDITS;
        Laserpig.MainMenu.changeLevel('HARD');
        Laserpig.MainMenu.levelPanel.tick.y = Laserpig.MainMenu.levelPanel.hardButton.y + 20;
        Laserpig.MainMenu.save();
    } else {
        this.audio.lockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT
    }
};

LevelPanel.prototype.easyClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeLevel('EASY');
    Laserpig.MainMenu.levelPanel.tick.y = Laserpig.MainMenu.levelPanel.easyButton.y + 20;
};

LevelPanel.prototype.mediumClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeLevel('MEDIUM');
    Laserpig.MainMenu.levelPanel.tick.y = Laserpig.MainMenu.levelPanel.mediumButton.y + 20;
};

LevelPanel.prototype.hardClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeLevel('HARD');
    Laserpig.MainMenu.levelPanel.tick.y = Laserpig.MainMenu.levelPanel.hardButton.y + 20;
};

LevelPanel.prototype.freeFlyClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeLevel('FREE_FLY');
    Laserpig.MainMenu.levelPanel.tick.y = Laserpig.MainMenu.levelPanel.freeFlyButton.y + 20;
};

LevelPanel.prototype.goBackClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.levelPanel.hide();
    Laserpig.MainMenu.menuPanel.show();
};

LevelPanel.prototype.show = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

LevelPanel.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};