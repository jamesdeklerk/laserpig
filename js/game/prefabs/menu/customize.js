/*global Phaser, Laserpig, Menu, game */

//var Customize = {
//    show: function (game) {
//        'use strict';
//
//        var gameCenterX = game.width / 2;
//
//        this.game = game;
//        this.lockedOptions = Laserpig.MainMenu.lockedOptions.Customize;
//
//        this.customizeTitle = game.add.sprite(gameCenterX, 90, 'menu_customize_title');
//        this.customizeTitle.anchor.setTo(0.5, 0);
//        this.customizeTitle.scale.setTo(0.7);
//
//        this.defaultButton = game.add.button(gameCenterX, 220, 'menu_default_button', this.defaultClicked, null, 0, 0, 0);
//        this.defaultButton.anchor.setTo(0.5, 0);
//        this.defaultButton.scale.setTo(1.4);
//        if (!this.lockedOptions.defaultButton) {
//            this.defaultButtonLock = game.add.button(this.defaultButton.x, this.defaultButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.defaultButtonLock.anchor.setTo(0.5, 0);
//            this.defaultButtonLock.scale.setTo(1.4);
//        }
//
//        this.laserpigButton = game.add.button(gameCenterX, 220 + 65, 'menu_laserpig_button', this.laserpigClicked, null, 0, 0, 0);
//        this.laserpigButton.anchor.setTo(0.5, 0);
//        this.laserpigButton.scale.setTo(1.4);
//        if (!this.lockedOptions.laserpigButton) {
//            this.laserpigButtonLock = game.add.button(this.laserpigButton.x, this.laserpigButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.laserpigButtonLock.anchor.setTo(0.5, 0);
//            this.laserpigButtonLock.scale.setTo(1.4);
//        }
//
//        this.timmyButton = game.add.button(gameCenterX, 220 + 65 * 2, 'menu_timmy_button', this.timmyClicked, null, 0, 0, 0);
//        this.timmyButton.anchor.setTo(0.5, 0);
//        this.timmyButton.scale.setTo(1.4);
//        if (!this.lockedOptions.timmyButton) {
//            this.timmyButtonLock = game.add.button(this.timmyButton.x, this.timmyButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.timmyButtonLock.anchor.setTo(0.5, 0);
//            this.timmyButtonLock.scale.setTo(1.4);
//        }
//
//        this.hashtagPigButton = game.add.button(gameCenterX, 220 + 65 * 3, 'menu_hashtagpig_button', this.hashtagPigClicked, null, 0, 0, 0);
//        this.hashtagPigButton.anchor.setTo(0.5, 0);
//        this.hashtagPigButton.scale.setTo(1.4);
//        if (!this.lockedOptions.hashtagPigButton) {
//            this.hashtagPigButtonLock = game.add.button(this.hashtagPigButton.x, this.hashtagPigButton.y, 'menu_lock_button', null, null, 0, 0, 0);
//            this.hashtagPigButtonLock.anchor.setTo(0.5, 0);
//            this.hashtagPigButtonLock.scale.setTo(1.4);
//        }
//
//        this.goBackButton = game.add.button(gameCenterX, 220 + 65 * 5, 'menu_go_back_button', this.goBackClicked, null, 0, 0, 0);
//        this.goBackButton.anchor.setTo(0.5, 0);
//        this.goBackButton.scale.setTo(1.4);
//
//        this.tick = game.add.sprite(gameCenterX + 140, this.defaultButton.y + 20, 'menu_tick');
//        this.tick.anchor.setTo(0.5, 0);
//        this.tick.scale.setTo(0.8);
//
//        // put tick in the correct place
//        if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_default_pig') {
//            Customize.tick.y = Customize.defaultButton.y + 20;
//        } else if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_laserpig_pig') {
//            Customize.tick.y = Customize.laserpigButton.y + 20;
//        } else if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_timmy_pig') {
//            Customize.tick.y = Customize.timmyButton.y + 20;
//        } else if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_hashtagpig_pig') {
//            Customize.tick.y = Customize.hashtagPigButton.y + 20;
//        }
//
//    },
//    defaultClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeJetPack('DEFAULT');
//        Customize.tick.y = Customize.defaultButton.y + 20;
//    },
//    laserpigClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeJetPack('LASERPIG');
//        Customize.tick.y = Customize.laserpigButton.y + 20;
//    },
//    timmyClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeJetPack('TIMMY');
//        Customize.tick.y = Customize.timmyButton.y + 20;
//    },
//    hashtagPigClicked: function () {
//        'use strict';
//
//        Laserpig.MainMenu.changeJetPack('HASHTAGPIG');
//        Customize.tick.y = Customize.hashtagPigButton.y + 20;
//    },
//    goBackClicked: function () {
//        'use strict';
//
//        Customize.destroy();
//        Menu.show(Customize.game);
//    },
//    destroy: function () {
//        'use strict';
//
//        Customize.customizeTitle.destroy();
//
//        Customize.defaultButton.destroy();
//        Customize.laserpigButton.destroy();
//        Customize.timmyButton.destroy();
//        Customize.hashtagPigButton.destroy();
//
//        if (Customize.defaultButtonLock !== undefined) {
//            Customize.defaultButtonLock.destroy();
//        }
//        if (Customize.laserpigButtonLock !== undefined) {
//            Customize.laserpigButtonLock.destroy();
//        }
//        if (Customize.timmyButtonLock !== undefined) {
//            Customize.timmyButtonLock.destroy();
//        }
//        if (Customize.hashtagPigButtonLock !== undefined) {
//            Customize.hashtagPigButtonLock.destroy();
//        }
//
//        Customize.goBackButton.destroy();
//
//        Customize.tick.destroy();
//
//    }
//};





// Create our customize panel extending Phaser.Group
var CustomizePanel = function (game) {
    'use strict';

    var gameCenterX = game.width / 2,
        creditSuffix = 'cr',
        currencyPrefix = 'R',
        dy = 2;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.lockedOptions = Laserpig.MainMenu.lockedOptions.Customize;

    this.TEXT_STYLES = {
        font: '27px Orbitron',
        fill: '#f8f8f8',
        align: 'center'
    };

    this.customizeTitle = game.add.sprite(gameCenterX, 185, 'menu_customize_title');
    this.customizeTitle.anchor.setTo(0.5, 1);
    this.customizeTitle.scale.setTo(0.45);
    this.add(this.customizeTitle);

    this.defaultButton = game.add.button(gameCenterX, this.customizeTitle.y + 35, 'menu_default_button', this.defaultClicked, this, 0, 0, 1);
    this.defaultButton.anchor.setTo(0.5, 0);
    this.defaultButton.scale.setTo(1.4);
    this.add(this.defaultButton);
    //lock overlay
    this.defaultButtonLock = game.add.button(this.defaultButton.x, this.defaultButton.y, 'menu_lock_button', null, null, 0, 0, 1);
    this.defaultButtonLock.anchor.setTo(0.5, 0);
    this.defaultButtonLock.scale.setTo(1.4);
    this.add(this.defaultButtonLock);

    this.laserpigButton = game.add.button(gameCenterX, this.defaultButton.y + this.defaultButton.height + dy, 'menu_laserpig_button', this.laserpigClicked, this, 0, 0, 1);
    this.laserpigButton.anchor.setTo(0.5, 0);
    this.laserpigButton.scale.setTo(1.4);
    this.add(this.laserpigButton);
    //lock overlay
    this.laserpigButtonLock = game.add.button(this.laserpigButton.x, this.laserpigButton.y, 'menu_lock_button', null, null, 0, 0, 1);
    this.laserpigButtonLock.anchor.setTo(0.5, 0);
    this.laserpigButtonLock.scale.setTo(1.4);
    this.add(this.laserpigButtonLock);
    this.laserpigButtonLock.onInputDown.add(function () {
        Laserpig.MainMenu.pigLocked = Laserpig.MainMenu.JETPACKS.LASERPIG.LOCKED_PREVIEW_KEY;
    }, this);
    this.laserpigButtonLock.onInputUp.add(function () {
        Laserpig.MainMenu.pigLocked = undefined;
    }, this);

    this.timmyButton = game.add.button(gameCenterX, this.laserpigButton.y + this.laserpigButton.height + dy, 'menu_timmy_button', this.timmyClicked, this, 0, 0, 1);
    this.timmyButton.anchor.setTo(0.5, 0);
    this.timmyButton.scale.setTo(1.4);
    this.add(this.timmyButton);
    //lock overlay
    this.timmyButtonLock = game.add.button(this.timmyButton.x, this.timmyButton.y, 'menu_lock_button', null, null, 0, 0, 1);
    this.timmyButtonLock.anchor.setTo(0.5, 0);
    this.timmyButtonLock.scale.setTo(1.4);
    this.add(this.timmyButtonLock);
    this.timmyButtonLock.onInputDown.add(function () {
        Laserpig.MainMenu.pigLocked = Laserpig.MainMenu.JETPACKS.TIMMY.LOCKED_PREVIEW_KEY;
    }, this);
    this.timmyButtonLock.onInputUp.add(function () {
        Laserpig.MainMenu.pigLocked = undefined;
    }, this);

    this.hashtagPigButton = game.add.button(gameCenterX, this.timmyButton.y + this.timmyButton.height + dy, 'menu_hashtagpig_button', this.hashtagPigClicked, this, 0, 0, 1);
    this.hashtagPigButton.anchor.setTo(0.5, 0);
    this.hashtagPigButton.scale.setTo(1.4);
    this.add(this.hashtagPigButton);
    // lock overlay
    this.hashtagPigButtonLock = game.add.button(this.hashtagPigButton.x, this.hashtagPigButton.y, 'menu_lock_button', null, null, 0, 0, 1);
    this.hashtagPigButtonLock.anchor.setTo(0.5, 0);
    this.hashtagPigButtonLock.scale.setTo(1.4);
    this.add(this.hashtagPigButtonLock);
    this.hashtagPigButtonLock.onInputDown.add(function () {
        Laserpig.MainMenu.pigLocked = Laserpig.MainMenu.JETPACKS.HASHTAGPIG.LOCKED_PREVIEW_KEY;
    }, this);
    this.hashtagPigButtonLock.onInputUp.add(function () {
        Laserpig.MainMenu.pigLocked = undefined;
    }, this);

    this.unlockLaserpigButton = game.add.button(this.laserpigButton.x + 310, this.laserpigButton.y + (this.laserpigButton.height / 2), 'unlock_button', this.unlockLaserpigButtonClicked, this, 1, 1, 0);
    this.unlockLaserpigButton.anchor.setTo(0.5, 0.5);
    this.unlockLaserpigButton.scale.setTo(1.2);
    this.add(this.unlockLaserpigButton);

    this.laserpigCreditValue = game.add.text(this.unlockLaserpigButton.x + 25, this.unlockLaserpigButton.y + 4, Laserpig.MainMenu.JETPACKS.LASERPIG.CREDITS + creditSuffix, this.TEXT_STYLES);
    this.laserpigCreditValue.anchor.setTo(0.5, 0.5);
    this.add(this.laserpigCreditValue);

    this.unlockTimmyButton = game.add.button(this.timmyButton.x + 310, this.timmyButton.y + (this.timmyButton.height / 2), 'unlock_button', this.unlockTimmyButtonClicked, this, 1, 1, 0);
    this.unlockTimmyButton.anchor.setTo(0.5, 0.5);
    this.unlockTimmyButton.scale.setTo(1.2);
    this.add(this.unlockTimmyButton);

    this.timmyCreditValue = game.add.text(this.unlockTimmyButton.x + 25, this.unlockTimmyButton.y + 4, Laserpig.MainMenu.JETPACKS.TIMMY.CREDITS + creditSuffix, this.TEXT_STYLES);
    this.timmyCreditValue.anchor.setTo(0.5, 0.5);
    this.add(this.timmyCreditValue);

    this.unlockHashtagPigButton = game.add.button(this.hashtagPigButton.x + 310, this.hashtagPigButton.y + (this.hashtagPigButton.height / 2), 'unlock_button', this.unlockHashtagPigButtonClicked, this, 1, 1, 0);
    this.unlockHashtagPigButton.anchor.setTo(0.5, 0.5);
    this.unlockHashtagPigButton.scale.setTo(1.2);
    this.add(this.unlockHashtagPigButton);

    this.hashtagPigCreditValue = game.add.text(this.unlockHashtagPigButton.x + 25, this.unlockHashtagPigButton.y + 4, Laserpig.MainMenu.JETPACKS.HASHTAGPIG.CREDITS + creditSuffix, this.TEXT_STYLES);
    this.hashtagPigCreditValue.anchor.setTo(0.5, 0.5);
    this.add(this.hashtagPigCreditValue);

    this.tick = game.add.sprite(gameCenterX + 140, this.defaultButton.y + 20, 'menu_tick');
    this.tick.anchor.setTo(0.5, 0);
    this.tick.scale.setTo(0.8);
    this.add(this.tick);

    this.goBackButton = game.add.button(gameCenterX, this.hashtagPigButton.y + this.hashtagPigButton.height + 35, 'menu_go_back_button', this.goBackClicked, this, 0, 0, 1);
    this.goBackButton.anchor.setTo(0.5, 0);
    this.goBackButton.scale.setTo(1.4);
    this.add(this.goBackButton);

    // put tick in the correct place
    if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_default_pig') {
        this.tick.y = this.defaultButton.y + 20;
    } else if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_laserpig_pig') {
        this.tick.y = this.laserpigButton.y + 20;
    } else if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_timmy_pig') {
        this.tick.y = this.timmyButton.y + 20;
    } else if (Laserpig.MainMenu.gameOptions.JETPACK.PREVIEW_KEY === 'menu_hashtagpig_pig') {
        this.tick.y = this.hashtagPigButton.y + 20;
    }

    // set the defaults for customize
    this.refreshLocks();
    // Place it out of bounds
    this.x = this.game.width;
    this.y = 0;

    this.audio = {
        buttonClicked: game.add.audio('button_click_audio'),
        unlockButtonClicked: game.add.audio('unlock_audio'),
        lockButtonClicked: game.add.audio('lock_audio')
    };
};

CustomizePanel.prototype = Object.create(Phaser.Group.prototype);
CustomizePanel.constructor = CustomizePanel;

CustomizePanel.prototype.refreshLocks = function () {
    'use strict';

    this.defaultButtonLock.visible = Laserpig.MainMenu.lockedOptions.Customize.defaultButton;
    this.laserpigButtonLock.visible = Laserpig.MainMenu.lockedOptions.Customize.laserpigButton;
    this.timmyButtonLock.visible = Laserpig.MainMenu.lockedOptions.Customize.timmyButton;
    this.hashtagPigButtonLock.visible = Laserpig.MainMenu.lockedOptions.Customize.hashtagPigButton;
    this.unlockLaserpigButton.visible = Laserpig.MainMenu.lockedOptions.Customize.unlockLaserpigButton;
    this.laserpigCreditValue.visible = Laserpig.MainMenu.lockedOptions.Customize.laserpigCreditValue;
    this.unlockTimmyButton.visible = Laserpig.MainMenu.lockedOptions.Customize.unlockTimmyButton;
    this.timmyCreditValue.visible = Laserpig.MainMenu.lockedOptions.Customize.timmyCreditValue;
    this.unlockHashtagPigButton.visible = Laserpig.MainMenu.lockedOptions.Customize.unlockHashtagPigButton;
    this.hashtagPigCreditValue.visible = Laserpig.MainMenu.lockedOptions.Customize.hashtagPigCreditValue;
};

CustomizePanel.prototype.unlockLaserpigButtonClicked = function () {
    'use strict';

    if (Laserpig.MainMenu.statsObject.credits >= Laserpig.MainMenu.JETPACKS.LASERPIG.CREDITS) {

        this.audio.unlockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT

        Laserpig.MainMenu.changedLockOption('Customize', 'laserpigButton', false);
        Laserpig.MainMenu.changedLockOption('Customize', 'unlockLaserpigButton', false);
        Laserpig.MainMenu.changedLockOption('Customize', 'laserpigCreditValue', false);
        Laserpig.MainMenu.statsObject.credits = Laserpig.MainMenu.statsObject.credits - Laserpig.MainMenu.JETPACKS.LASERPIG.CREDITS;
        Laserpig.MainMenu.changeJetPack('LASERPIG');
        Laserpig.MainMenu.customizePanel.tick.y = Laserpig.MainMenu.customizePanel.laserpigButton.y + 20;
        Laserpig.MainMenu.save();
    } else {
        this.audio.lockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT
    }
};

CustomizePanel.prototype.unlockTimmyButtonClicked = function () {
    'use strict';

    if (Laserpig.MainMenu.statsObject.credits >= Laserpig.MainMenu.JETPACKS.TIMMY.CREDITS) {

        this.audio.unlockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT

        Laserpig.MainMenu.changedLockOption('Customize', 'timmyButton', false);
        Laserpig.MainMenu.changedLockOption('Customize', 'unlockTimmyButton', false);
        Laserpig.MainMenu.changedLockOption('Customize', 'timmyCreditValue', false);
        Laserpig.MainMenu.statsObject.credits = Laserpig.MainMenu.statsObject.credits - Laserpig.MainMenu.JETPACKS.TIMMY.CREDITS;
        Laserpig.MainMenu.changeJetPack('TIMMY');
        Laserpig.MainMenu.customizePanel.tick.y = Laserpig.MainMenu.customizePanel.timmyButton.y + 20;
        Laserpig.MainMenu.save();
    } else {
        this.audio.lockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT
    }
};

CustomizePanel.prototype.unlockHashtagPigButtonClicked = function () {
    'use strict';

    if (Laserpig.MainMenu.statsObject.credits >= Laserpig.MainMenu.JETPACKS.HASHTAGPIG.CREDITS) {

        this.audio.unlockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT

        Laserpig.MainMenu.changedLockOption('Customize', 'hashtagPigButton', false);
        Laserpig.MainMenu.changedLockOption('Customize', 'unlockHashtagPigButton', false);
        Laserpig.MainMenu.changedLockOption('Customize', 'hashtagPigCreditValue', false);
        Laserpig.MainMenu.statsObject.credits = Laserpig.MainMenu.statsObject.credits - Laserpig.MainMenu.JETPACKS.HASHTAGPIG.CREDITS;
        Laserpig.MainMenu.changeJetPack('HASHTAGPIG');
        Laserpig.MainMenu.customizePanel.tick.y = Laserpig.MainMenu.customizePanel.hashtagPigButton.y + 20;
        Laserpig.MainMenu.save();
    } else {
        this.audio.lockButtonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault); // CODESHIFT
    }
};

CustomizePanel.prototype.defaultClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeJetPack('DEFAULT');
    Laserpig.MainMenu.customizePanel.tick.y = Laserpig.MainMenu.customizePanel.defaultButton.y + 20;
};

CustomizePanel.prototype.laserpigClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeJetPack('LASERPIG');
    Laserpig.MainMenu.customizePanel.tick.y = Laserpig.MainMenu.customizePanel.laserpigButton.y + 20;
};

CustomizePanel.prototype.timmyClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeJetPack('TIMMY');
    Laserpig.MainMenu.customizePanel.tick.y = Laserpig.MainMenu.customizePanel.timmyButton.y + 20;
};

CustomizePanel.prototype.hashtagPigClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.changeJetPack('HASHTAGPIG');
    Laserpig.MainMenu.customizePanel.tick.y = Laserpig.MainMenu.customizePanel.hashtagPigButton.y + 20;
};

CustomizePanel.prototype.goBackClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.customizePanel.hide();
    Laserpig.MainMenu.menuPanel.show();
};

CustomizePanel.prototype.show = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

CustomizePanel.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};