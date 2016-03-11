/*global Phaser, Laserpig */

var ControlsPanel = function (game) {
    'use strict';

    var gameCentreX = game.width / 2,
        dy = 5;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.controlsTitle = game.add.sprite(gameCentreX, 185, 'menu_controls_title');
    this.controlsTitle.anchor.setTo(0.5, 1);
    this.controlsTitle.scale.setTo(0.5);
    this.add(this.controlsTitle);

    this.hookPanel = game.add.sprite(gameCentreX, this.controlsTitle.y + 35, 'blank_panel_top');
    this.hookPanel.anchor.setTo(0.5, 0);
    this.hookPanel.scale.setTo(0.8);
    this.add(this.hookPanel);

    this.blankPanel = game.add.sprite(gameCentreX, this.hookPanel.y + this.hookPanel.height - dy, 'blank_panel_middle');
    this.blankPanel.anchor.setTo(0.5, 0);
    this.blankPanel.scale.setTo(0.8);
    this.add(this.blankPanel);

    this.hook1 = game.add.sprite(this.hookPanel.x + 180, this.hookPanel.y + 5, 'hook');
    this.hook1.anchor.setTo(0.5, 0.5);
    this.hook1.scale.setTo(0.8);
    this.add(this.hook1);

    this.hook2 = game.add.sprite(this.hookPanel.x - 180, this.hookPanel.y + 5, 'hook');
    this.hook2.anchor.setTo(0.5, 0.5);
    this.hook2.scale.setTo(0.8);
    this.add(this.hook2);

    this.blankPanel2 = game.add.sprite(gameCentreX, this.blankPanel.y + this.blankPanel.height - dy, 'blank_panel_middle');
    this.blankPanel2.anchor.setTo(0.5, 0);
    this.blankPanel2.scale.setTo(0.8);
    this.add(this.blankPanel2);

    this.blankPanel3 = game.add.sprite(gameCentreX, this.blankPanel2.y + this.blankPanel2.height - dy, 'blank_panel_middle');
    this.blankPanel3.anchor.setTo(0.5, 0);
    this.blankPanel3.scale.setTo(0.8);
    this.add(this.blankPanel3);

    this.blankPanel4 = game.add.sprite(gameCentreX, this.blankPanel3.y + this.blankPanel3.height - dy, 'blank_panel_middle');
    this.blankPanel4.anchor.setTo(0.5, 0);
    this.blankPanel4.scale.setTo(0.8);
    this.add(this.blankPanel4);

    this.blankPanel5 = game.add.sprite(gameCentreX, this.blankPanel4.y + this.blankPanel4.height - dy - 55, 'blank_panel_bottom');
    this.blankPanel5.anchor.setTo(0.5, 0);
    this.blankPanel5.scale.setTo(0.8);
    this.add(this.blankPanel5);

    this.keyboardButton = game.add.button(gameCentreX + 100, this.hookPanel.y + 40, 'menu_keyboard_button', this.keyboardClicked, this, 0, 0, 0);
    this.keyboardButton.anchor.setTo(0.5, 0);
    this.keyboardButton.scale.setTo(1);
    this.add(this.keyboardButton);

    this.touchButton = game.add.button(gameCentreX - 100, this.hookPanel.y + 40, 'menu_touch_button', this.touchClicked, this, 0, 0, 0);
    this.touchButton.anchor.setTo(0.5, 0);
    this.touchButton.scale.setTo(1);
    this.add(this.touchButton);

    this.keyboardSelector = game.add.sprite(this.keyboardButton.x, this.keyboardButton.y + this.keyboardButton.height, 'menu_selector_medium');
    this.keyboardSelector.anchor.setTo(0.5, 0);
    this.keyboardSelector.scale.setTo(0.8);
    this.add(this.keyboardSelector);
    this.keyboardSelector.visible = false;

    this.touchSelector = game.add.sprite(this.touchButton.x, this.touchButton.y + this.touchButton.height, 'menu_selector');
    this.touchSelector.anchor.setTo(0.5, 0);
    this.touchSelector.scale.setTo(0.8);
    this.add(this.touchSelector);

    this.touchControls = game.add.sprite(gameCentreX, this.touchSelector.y + 15, 'touch_controls');
    this.touchControls.anchor.setTo(0.5, 0);
    this.touchControls.scale.setTo(0.65);
    this.touchControls.visible = true;
    this.add(this.touchControls);

    this.keyboardControls = game.add.sprite(gameCentreX, this.touchSelector.y + 20, 'keyboard_controls');
    this.keyboardControls.anchor.setTo(0.5, 0);
    this.keyboardControls.scale.setTo(0.65);
    this.keyboardControls.visible = false;
    this.add(this.keyboardControls);

    if (this.game.device.desktop) {
        // If desktop then show keyboard controls by default
        this.touchControls.visible = false;
        this.keyboardControls.visible = true;
        this.keyboardSelector.visible = true;
        this.touchSelector.visible = false;
    } else {
        // If mobile show touch controls by default
        this.touchControls.visible = true;
        this.keyboardControls.visible = false;
        this.keyboardSelector.visible = false;
        this.touchSelector.visible = true;
    }

    
    this.goBackButton = game.add.button(gameCentreX, this.blankPanel5.y + this.blankPanel5.height + 35, 'menu_go_back_button', this.goBackClicked, this, 0, 0, 1);
    this.goBackButton.anchor.setTo(0.5, 0);
    this.goBackButton.scale.setTo(1.4);
    this.add(this.goBackButton);

    // Place it out of bounds
    this.x = this.game.width;
    this.y = 0;
    
    this.audio = {
        buttonClicked: game.add.audio('button_click_audio')
    };
};

ControlsPanel.prototype = Object.create(Phaser.Group.prototype);
ControlsPanel.constructor = ControlsPanel;


ControlsPanel.prototype.keyboardClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.controlsPanel.touchControls.visible = false;
    Laserpig.MainMenu.controlsPanel.keyboardControls.visible = true;
    Laserpig.MainMenu.controlsPanel.keyboardSelector.visible = true;
    Laserpig.MainMenu.controlsPanel.touchSelector.visible = false;
};

ControlsPanel.prototype.touchClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.controlsPanel.touchControls.visible = true;
    Laserpig.MainMenu.controlsPanel.keyboardControls.visible = false;
    Laserpig.MainMenu.controlsPanel.keyboardSelector.visible = false;
    Laserpig.MainMenu.controlsPanel.touchSelector.visible = true;
};

ControlsPanel.prototype.goBackClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.controlsPanel.hide();
    Laserpig.MainMenu.menuPanel.show();
};


ControlsPanel.prototype.show = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

ControlsPanel.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};