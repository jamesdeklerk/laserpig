/*global Phaser, Menu, objectProperties, Laserpig, gameAudio */

// Create our pause panel extending Phaser.Group
var Tutorial = function (game) {
    'use strict';

    var gameCenterX = game.width / 2,
        gameCenterY = game.height / 2;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.TUTORIAL_COMPLETE_KEY = 'tutorialComplete'; // also in game.js
    this.TOUCH_OR_KEYBOARD_KEY = 'touchOrKeyboard';

    this.fullScreenPanel = {
        x: 0,
        y: 0,
        width: game.width,
        height: game.height,
        color: 0x000000, // #ffffff
        opacity: 0.6
    };
    
    this.TEXT_STYLES = {
        font: '58px Orbitron',
        fill: '#f3f3f3',
        align: 'center'
    };

    this.tutorialGraphics = game.add.graphics(0, 0);
    // Fullscreen Panel
    this.tutorialGraphics.beginFill(this.fullScreenPanel.color, this.fullScreenPanel.opacity);
    this.tutorialGraphics.drawRect(this.fullScreenPanel.x, this.fullScreenPanel.y, this.fullScreenPanel.width, this.fullScreenPanel.height);
    this.add(this.tutorialGraphics);

    this.touchButton = game.add.button(gameCenterX, gameCenterY - 200, 'tutorial_touch_button', this.touchClicked, this, 0, 0, 0);
    this.touchButton.anchor.setTo(0.5, 0);
    this.touchButton.scale.setTo(1);
    this.add(this.touchButton);

    this.keyboardButton = game.add.button(this.touchButton.x, this.touchButton.y + this.touchButton.height + 10, 'tutorial_keyboard_button', this.keyboardClicked, this, 0, 0, 0);
    this.keyboardButton.anchor.setTo(0.5, 0);
    this.keyboardButton.scale.setTo(1);
    this.add(this.keyboardButton);

    this.keyboardSelector = game.add.sprite(this.keyboardButton.x, this.keyboardButton.y + this.keyboardButton.height, 'white_line_long');
    this.keyboardSelector.anchor.setTo(0.5, 0);
    this.keyboardSelector.scale.setTo(1);
    this.add(this.keyboardSelector);
    this.keyboardSelector.visible = false;

    this.touchSelector = game.add.sprite(this.touchButton.x, this.touchButton.y + this.touchButton.height, 'white_line_short');
    this.touchSelector.anchor.setTo(0.5, 0);
    this.touchSelector.scale.setTo(0.8);
    this.add(this.touchSelector);

    this.keyboardControls = game.add.sprite(this.keyboardButton.x, this.keyboardButton.y + this.keyboardButton.height + 20, 'white_keyboard_controls');
    this.keyboardControls.anchor.setTo(0.5, 0);
    this.keyboardControls.scale.setTo(0.65);
    this.keyboardControls.visible = false;
    this.add(this.keyboardControls);
    
    this.upText = this.game.add.text(gameCenterX / 2, gameCenterY, 'Left Up', this.TEXT_STYLES);
    this.upText.anchor.setTo(0.5, 0.5);
    this.add(this.upText);

    this.upArrow = game.add.sprite(this.upText.x + 140, this.upText.y, 'tutorial_arrow');
    this.upArrow.anchor.setTo(0.5, 0.5);
    this.upArrow.scale.setTo(0.6);
    this.upArrow.angle = 180;
    this.add(this.upArrow);

    this.leftHand = game.add.sprite(this.upText.x - 20, this.upText.y + 60, 'tutorial_hand');
    this.leftHand.anchor.setTo(0.5, 0.5);
    this.leftHand.scale.setTo(0.7);
    this.leftHand.scale.x *= -1;
    this.add(this.leftHand);
    this.game.add.tween(this.leftHand.scale).to({
        x: -0.5,
        y: 0.5
    }, 600, Phaser.Easing.Cubic.InOut, true, 0, -1, true);
    
    this.downText = this.game.add.text(gameCenterX + (gameCenterX / 2), gameCenterY, 'Right Down', this.TEXT_STYLES);
    this.downText.anchor.setTo(0.5, 0.5);
    this.add(this.downText);
    
    this.downArrow = game.add.sprite(this.downText.x - 185, this.downText.y, 'tutorial_arrow');
    this.downArrow.anchor.setTo(0.5, 0.5);
    this.downArrow.scale.setTo(0.6);
    this.add(this.downArrow);

    this.rightHand = game.add.sprite(this.downText.x + 20, this.downText.y + 60, 'tutorial_hand');
    this.rightHand.anchor.setTo(0.5, 0.5);
    this.rightHand.scale.setTo(0.5);
    this.add(this.rightHand);
    this.game.add.tween(this.rightHand.scale).to({
        x: 0.7,
        y: 0.7
    }, 600, Phaser.Easing.Cubic.InOut, true, 0, -1, true);

    this.exitButton = game.add.button(this.keyboardButton.x, this.keyboardControls.y + this.keyboardControls.height + 20, 'close_controls_button', this.exitClicked, this, 0, 0, 0);
    this.exitButton.anchor.setTo(0.5, 0);
    this.exitButton.scale.setTo(1);
    this.add(this.exitButton);

    this.audio = {
        buttonClicked: game.add.audio('button_click_audio')
    };

    // if the user selected to see a specific control type
    // load stored tutorial complete
    this.touchOrKeyboard = JSON.parse(localStorage.getItem(this.TOUCH_OR_KEYBOARD_KEY));
    if (this.touchOrKeyboard === 'touch') {
        this.touchClicked(true);
    } else if (this.touchOrKeyboard === 'keyboard') {
        this.keyboardClicked(true);
    } else {
        // if there wasn't a specific choice, use the detected type
        if (this.game.device.desktop) {
            this.keyboardClicked(true);
        } else {
            this.touchClicked(true);
        }
    }

    this.x = 0;
    this.y = -game.height;
};

Tutorial.prototype = Object.create(Phaser.Group.prototype);
Tutorial.constructor = Tutorial;

Tutorial.prototype.keyboardClicked = function (auto) {
    'use strict';

    // auto means it was automatically called
    if (auto !== true) {
        this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
    }

    // show these
    this.keyboardControls.visible = true;
    this.keyboardSelector.visible = true;

    // hide these
    this.touchSelector.visible = false;
    this.upArrow.visible = false;
    this.downArrow.visible = false;
    this.upText.visible = false;
    this.downText.visible = false;
    this.leftHand.visible = false;
    this.rightHand.visible = false;

    localStorage.setItem(this.TOUCH_OR_KEYBOARD_KEY, JSON.stringify('keyboard'));
};

Tutorial.prototype.touchClicked = function (auto) {
    'use strict';

    // auto means it was automatically called
    if (auto !== true) {
        this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
    }

    // show these
    this.touchSelector.visible = true;
    this.upArrow.visible = true;
    this.downArrow.visible = true;
    this.upText.visible = true;
    this.downText.visible = true;
    this.leftHand.visible = true;
    this.rightHand.visible = true;

    // hide these
    this.keyboardControls.visible = false;
    this.keyboardSelector.visible = false;

    localStorage.setItem(this.TOUCH_OR_KEYBOARD_KEY, JSON.stringify('touch'));
};

Tutorial.prototype.exitClicked = function () {
    'use strict';

    // storing this.tutorialComplete === true
    Laserpig.Game.tutorialComplete = true;
    if (!objectProperties.game.paused) {
        Laserpig.Game.pauseButton.visible = true;
    }
    localStorage.setItem(this.TUTORIAL_COMPLETE_KEY, JSON.stringify(true));

    this.hide();

};

Tutorial.prototype.show = function (tween) {
    'use strict';

    this.x = 0;

    if (tween) {
        this.game.add.tween(this).to({
            y: 0
        }, 300, Phaser.Easing.Cubic.InOut, true);
    } else {
        this.y = 0;
    }

    // hide HTML elements, else they appear above everything else
    Laserpig.Game.scoreElement.style.display = 'none';
    Laserpig.Game.distanceElement.style.display = 'none';
    Laserpig.Game.multiplierElement.style.display = 'none';
};

Tutorial.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        y: -this.game.height
    }, 300, Phaser.Easing.Cubic.InOut, true);

    // show HTML elements (which should have been hidden while running the tutorial)
    Laserpig.Game.scoreElement.style.display = 'block';
    Laserpig.Game.distanceElement.style.display = 'block';
    Laserpig.Game.multiplierElement.style.display = 'block';
};