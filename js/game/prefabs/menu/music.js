/*global Phaser, Laserpig */

var MusicPanel = function (game) {
    'use strict';

    var gameCentreX = game.width / 2,
        gameCentreY = game.height / 2,
        dy = 5,
        textdy = 0,
        textEnter = 20;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.musicTitle = game.add.sprite(gameCentreX, 205, 'menu_music_title');
    this.musicTitle.anchor.setTo(0.5, 1);
    this.musicTitle.scale.setTo(0.6);
    this.add(this.musicTitle);

    this.hookPanel = game.add.sprite(gameCentreX, this.musicTitle.y + 15, 'blank_panel_top');
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


    // Array of music (for attribution)
    this.musicAttributionArrayPos = 0;
    this.musicAttributionArray = [
        {
            musicTitle: 'Game Play Song',
            musicSongName: '"EDM Detection Mode"',
            musicArtistName: 'by Kevin MacLeod (incompetech.com)',
            musicLicenseIntro: 'Licensed under Creative Commons:',
            musicLicenseType: 'By Attribution 3.0',
            musicLicenseLink: 'http://creativecommons.org/licenses/by/3.0/'
        },
        {
            musicTitle: 'Menu Song',
            musicSongName: '"Blue Like Venus"',
            musicArtistName: 'by spinningmerkaba',
            musicLicenseIntro: 'Licensed under Creative Commons:',
            musicLicenseType: 'By Attribution 3.0',
            musicLicenseLink: 'http://creativecommons.org/licenses/by/3.0/'
        }
    ];


    this.musicTitle = '';
    this.musicTitleText = this.game.add.text(gameCentreX, this.hookPanel.y + 60, this.musicTitle, {
        font: '40px Orbitron',
        fill: '#000000',
        align: 'center'
    });
    this.musicTitleText.anchor.setTo(0.5, 0);
    this.add(this.musicTitleText);

    this.musicSongName = '';
    this.musicSongNameText = this.game.add.text(gameCentreX, this.musicTitleText.y + this.musicTitleText.height + textEnter, this.musicSongName, {
        font: '24px Orbitron',
        fill: '#000000',
        align: 'center'
    });
    this.musicSongNameText.anchor.setTo(0.5, 0);
    this.add(this.musicSongNameText);

    this.musicArtistName = '';
    this.musicArtistNameText = this.game.add.text(gameCentreX, this.musicSongNameText.y + this.musicSongNameText.height + textdy, this.musicArtistName, {
        font: '24px Orbitron',
        fill: '#000000',
        align: 'center'
    });
    this.musicArtistNameText.anchor.setTo(0.5, 0);
    this.add(this.musicArtistNameText);

    this.musicLicenseIntro = '';
    this.musicLicenseIntroText = this.game.add.text(gameCentreX, this.musicArtistNameText.y + this.musicArtistNameText.height + textEnter, this.musicLicenseIntro, {
        font: '16px Orbitron',
        fill: '#000000',
        align: 'center'
    });
    this.musicLicenseIntroText.anchor.setTo(0.5, 0);
    this.add(this.musicLicenseIntroText);

    this.musicLicenseType = '';
    this.musicLicenseTypeText = this.game.add.text(gameCentreX, this.musicLicenseIntroText.y + this.musicLicenseIntroText.height + textdy, this.musicLicenseType, {
        font: '16px Orbitron',
        fill: '#000000',
        align: 'center'
    });
    this.musicLicenseTypeText.anchor.setTo(0.5, 0);
    this.add(this.musicLicenseTypeText);

    this.musicLicenseLink = '';
    this.musicLicenseLinkText = this.game.add.text(gameCentreX, this.musicLicenseTypeText.y + this.musicLicenseTypeText.height + textdy, this.musicLicenseLink, {
        font: '16px Orbitron',
        fill: '#000000',
        align: 'center'
    });
    this.musicLicenseLinkText.anchor.setTo(0.5, 0);
    this.add(this.musicLicenseLinkText);
    
    this.updateText(this.musicAttributionArrayPos);


    this.nextArrowButton = game.add.button(this.blankPanel.x + (this.blankPanel.width / 2) + 35, gameCentreY, 'menu_next_arrow', this.nextSong, this, 0, 0, 0);
    this.nextArrowButton.anchor.setTo(0.5, 0.5);
    this.nextArrowButton.scale.setTo(1.2);
    this.add(this.nextArrowButton);

    this.previousArrowButton = game.add.button(this.blankPanel.x - (this.blankPanel.width / 2) - 35, gameCentreY, 'menu_next_arrow', this.previousSong, this, 0, 0, 0);
    this.previousArrowButton.anchor.setTo(0.5, 0.5);
    this.previousArrowButton.scale.setTo(1.2);
    this.previousArrowButton.angle = 180;
    this.add(this.previousArrowButton);


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

MusicPanel.prototype = Object.create(Phaser.Group.prototype);
MusicPanel.constructor = MusicPanel;

MusicPanel.prototype.nextSong = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    this.musicAttributionArrayPos = this.musicAttributionArrayPos + 1;

    // check if pos is out of bounds
    if (this.musicAttributionArrayPos > (this.musicAttributionArray.length - 1)) {
        this.musicAttributionArrayPos = 0;
    }

    this.updateText(this.musicAttributionArrayPos);
};

MusicPanel.prototype.previousSong = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    this.musicAttributionArrayPos = this.musicAttributionArrayPos - 1;

    // check if pos is out of bounds
    if (this.musicAttributionArrayPos < 0) {
        this.musicAttributionArrayPos = this.musicAttributionArray.length - 1;
    }
    
    this.updateText(this.musicAttributionArrayPos);
};

MusicPanel.prototype.updateText = function (pos) {
    'use strict';

    // update text
    this.musicTitleText.setText(this.musicAttributionArray[pos].musicTitle);
    this.musicSongNameText.setText(this.musicAttributionArray[pos].musicSongName);
    this.musicArtistNameText.setText(this.musicAttributionArray[pos].musicArtistName);
    this.musicLicenseIntroText.setText(this.musicAttributionArray[pos].musicLicenseIntro);
    this.musicLicenseTypeText.setText(this.musicAttributionArray[pos].musicLicenseType);
    this.musicLicenseLinkText.setText(this.musicAttributionArray[pos].musicLicenseLink);
};

MusicPanel.prototype.goBackClicked = function () {
    'use strict';

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.musicPanel.hide();
    Laserpig.MainMenu.aboutPanel.show();
};

MusicPanel.prototype.show = function () {
    'use strict';

    var game = this.game;
    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

MusicPanel.prototype.hide = function () {
    'use strict';

    var game = this.game;
    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};