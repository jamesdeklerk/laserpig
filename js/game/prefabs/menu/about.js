/*global Phaser, Laserpig */

var AboutPanel = function (game) {
    'use strict';

    var gameCentreX = game.width / 2,
        dy = 5;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.TEXT_STYLES = {
        font: '30px Orbitron',
        fill: '#000000',
        align: 'center'
    };

    this.aboutTitle = game.add.sprite(gameCentreX, 190, 'menu_about_title');
    this.aboutTitle.anchor.setTo(0.5, 1);
    this.aboutTitle.scale.setTo(0.6);
    this.add(this.aboutTitle);

    this.hookPanel = game.add.sprite(gameCentreX, this.aboutTitle.y + 30, 'blank_panel_top');
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

    this.blankPanel3 = game.add.sprite(gameCentreX, this.blankPanel2.y + this.blankPanel2.height - (dy * 10), 'blank_panel_bottom');
    this.blankPanel3.anchor.setTo(0.5, 0);
    this.blankPanel3.scale.setTo(0.8);
    this.add(this.blankPanel3);

    this.version = game.add.text(gameCentreX, this.hookPanel.y + 30, 'Version', this.TEXT_STYLES);
    this.version.anchor.setTo(0.5, 0);
    this.add(this.version);

    this.versionNumber = game.add.text(gameCentreX, this.version.y + 30, '1.0', this.TEXT_STYLES);
    this.versionNumber.anchor.setTo(0.5, 0);
    this.add(this.versionNumber);

    this.developer = game.add.text(gameCentreX, this.versionNumber.y + 55, 'Developed by', this.TEXT_STYLES);
    this.developer.anchor.setTo(0.5, 0);
    this.add(this.developer);

    this.gamenamix = game.add.sprite(gameCentreX, this.developer.y + 25, 'gamenamix');
    this.gamenamix.anchor.setTo(0.5, 0);
    this.gamenamix.scale.setTo(1);
    this.add(this.gamenamix);
    
    this.storyButton = game.add.button(gameCentreX, this.blankPanel2.y + this.blankPanel2.height - dy + this.blankPanel2.height + 35, 'menu_story_button', this.storyClicked, this, 0, 0, 1);
    this.storyButton.anchor.setTo(0.5, 0);
    this.storyButton.scale.setTo(1.4);
    this.add(this.storyButton);
    
    this.musicButton = game.add.button(gameCentreX, this.storyButton.y - this.storyButton.height - 2, 'menu_music_button', this.musicClicked, this, 0, 0, 1);
    this.musicButton.anchor.setTo(0.5, 0);
    this.musicButton.scale.setTo(1.4);
    this.add(this.musicButton);

    this.goBackButton = game.add.button(gameCentreX, this.storyButton.y + this.storyButton.height + 2, 'menu_go_back_button', this.goBackClicked, this, 0, 0, 1);
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

AboutPanel.prototype = Object.create(Phaser.Group.prototype);
AboutPanel.constructor = AboutPanel;


AboutPanel.prototype.goBackClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.aboutPanel.hide();
    Laserpig.MainMenu.menuPanel.show();
};

AboutPanel.prototype.musicClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.aboutPanel.hideToMenu();
    Laserpig.MainMenu.musicPanel.show();
};

AboutPanel.prototype.storyClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.aboutPanel.hideToMenu();
    Laserpig.MainMenu.storyPanel.show();
};

AboutPanel.prototype.show = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

AboutPanel.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

AboutPanel.prototype.hideToMenu = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: -this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};