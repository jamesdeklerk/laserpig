/*global Phaser, Laserpig */

var StoryPanel = function (game) {
    'use strict';

    var gameCentreX = game.width / 2,
        dy = 5;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);
    
    this.storyTitle = game.add.sprite(gameCentreX, 205, 'menu_story_title');
    this.storyTitle.anchor.setTo(0.5, 1);
    this.storyTitle.scale.setTo(0.6);
    this.add(this.storyTitle);
    
    this.hookPanel = game.add.sprite(gameCentreX, this.storyTitle.y + 15, 'blank_panel_top');
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
    
    this.blankPanel4 = game.add.sprite(gameCentreX, this.blankPanel3.y + this.blankPanel3.height - dy, 'blank_panel_bottom');
    this.blankPanel4.anchor.setTo(0.5, 0);
    this.blankPanel4.scale.setTo(0.8);
    this.add(this.blankPanel4);
    
    this.TEXT_STYLES = {
        font: '24px Orbitron',
        fill: '#000000',
        align: 'center'
    };
    
    this.storyText = "Timmy is no normal pig. \n He is a thrill-seeker. \n Together with his high \n tech jet packs he flies \n fast and lives free. \n Join him on his \n adventures as you \n both fly to the \n limit!";
    
    this.story = this.game.add.text(gameCentreX, this.hookPanel.y + 40, this.storyText, this.TEXT_STYLES);
    this.story.anchor.setTo(0.5, 0);
    this.add(this.story);
  
    this.goBackButton = game.add.button(gameCentreX, this.blankPanel4.y + this.blankPanel4.height + 35, 'menu_go_back_button', this.goBackClicked, this, 0, 0, 1);
    this.goBackButton.anchor.setTo(0.5, 0);
    this.goBackButton.scale.setTo(1.4);
    this.add(this.goBackButton);


    // Place it out of bounds
    this.x = game.width;
    this.y = 0;
    
    this.audio = {
        buttonClicked: game.add.audio('button_click_audio')
    };
};

StoryPanel.prototype = Object.create(Phaser.Group.prototype);
StoryPanel.constructor = StoryPanel;


StoryPanel.prototype.goBackClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.storyPanel.hide();
    Laserpig.MainMenu.aboutPanel.show();
};

StoryPanel.prototype.show = function () {
    'use strict';
    
    var game = this.game;
    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

StoryPanel.prototype.hide = function () {
    'use strict';
    
    var game = this.game;
    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};