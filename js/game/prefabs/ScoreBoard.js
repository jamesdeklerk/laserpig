/*global Phaser, game, Laserpig, objectProperties, gameAudio */

var ScoreBoard = function (game) {
    "use strict";

    Phaser.Group.call(this, game);

    var gameCentreX = game.width / 2,
        dy = 5;

    this.y = -game.height;
    this.x = 0;

    this.height = 0;
    this.width = 0;

    this.pigSnort = game.add.audio('pig-snort');
    this.death = game.add.audio('death');

    this.TEXT_STYLES = {
        font: '24px Orbitron',
        fill: '#000000',
        align: 'center'
    };

    this.TEXT_STYLES_FOR_CREDITS = {
        font: '40px Orbitron',
        fill: '#ffffff',
        align: 'center'
    };

    this.TEXT_STYLES_FOR_SCORE = {
        font: '60px Orbitron',
        fill: '#000000',
        align: 'center'
    };

    this.TEXT_STYLES_FOR_NEW_HIGHSCORE = {
        font: '60px Orbitron',
        fill: '#590211',
        align: 'center'
    };

    this.clearSprite = game.add.sprite(0, 0);
    this.clearSprite.width = game.width;
    this.clearSprite.height = game.height;
    this.clearSprite.inputEnabled = true;
    this.clearSprite.events.onInputUp.add(function () {
        this.restartClicked();
    }, this);
    this.add(this.clearSprite);

    this.blankPanel = game.add.sprite(gameCentreX, 28, 'blank_panel_middle');
    this.blankPanel.anchor.setTo(0.5, 0);
    this.blankPanel.scale.setTo(1);
    this.add(this.blankPanel);

    this.hookPanel = game.add.sprite(gameCentreX, this.blankPanel.y - 30, 'blank_panel_top');
    this.hookPanel.anchor.setTo(0.5, 0);
    this.hookPanel.scale.setTo(1);
    this.add(this.hookPanel);

    this.hook1 = game.add.sprite(this.hookPanel.x + 180, this.hookPanel.y + 2, 'hook');
    this.hook1.anchor.setTo(0.5, 0.5);
    this.hook1.scale.setTo(1);
    this.add(this.hook1);

    this.hook2 = game.add.sprite(this.hookPanel.x - 180, this.hookPanel.y + 2, 'hook');
    this.hook2.anchor.setTo(0.5, 0.5);
    this.hook2.scale.setTo(1);
    this.add(this.hook2);

    this.blankPanel2 = game.add.sprite(gameCentreX, this.blankPanel.y + this.blankPanel.height - dy, 'blank_panel_middle');
    this.blankPanel2.anchor.setTo(0.5, 0);
    this.blankPanel2.scale.setTo(1);
    this.add(this.blankPanel2);

    this.blankPanel3 = game.add.sprite(gameCentreX, this.blankPanel2.y + this.blankPanel2.height - dy, 'blank_panel_middle');
    this.blankPanel3.anchor.setTo(0.5, 0);
    this.blankPanel3.scale.setTo(1);
    this.add(this.blankPanel3);

    this.blankPanel4 = game.add.sprite(gameCentreX, this.blankPanel3.y + this.blankPanel3.height - dy, 'blank_panel_middle');
    this.blankPanel4.anchor.setTo(0.5, 0);
    this.blankPanel4.scale.setTo(1);
    this.add(this.blankPanel4);

    this.blankPanel5 = game.add.sprite(gameCentreX, this.blankPanel4.y + this.blankPanel4.height - dy, 'blank_panel_middle');
    this.blankPanel5.anchor.setTo(0.5, 0);
    this.blankPanel5.scale.setTo(1);
    this.add(this.blankPanel5);

    this.blankPanel6 = game.add.sprite(gameCentreX, this.blankPanel5.y + this.blankPanel5.height - dy, 'blank_panel_bottom');
    this.blankPanel6.anchor.setTo(0.5, 0);
    this.blankPanel6.scale.setTo(1);
    this.add(this.blankPanel6);

    //    this.background = game.add.sprite(gameCentreX, 0, 'scoreboard');
    //    this.background.scale.setTo(1.5);
    //    this.background.anchor.setTo(0.5, 0);
    //    this.background.alpha = 0.9;
    //    this.add(this.background);

    this.metres = game.add.text(gameCentreX - 250, 45, 'Metres Travelled: ', this.TEXT_STYLES);
    this.add(this.metres);
    this.metresValue = game.add.text(gameCentreX + 250, 45, '', this.TEXT_STYLES);
    this.metresValue.anchor.setTo(1, 0);
    this.add(this.metresValue);

    this.totalPizzas = game.add.text(gameCentreX - 250, this.metres.y + 40, 'Pizzas collected: ', this.TEXT_STYLES);
    this.add(this.totalPizzas);
    this.totalPizzasValue = game.add.text(gameCentreX + 250, this.metresValue.y + 40, '', this.TEXT_STYLES);
    this.totalPizzasValue.anchor.setTo(1, 0);
    this.add(this.totalPizzasValue);

    this.totalBurgers = game.add.text(gameCentreX - 250, this.totalPizzas.y + 40, 'Burgers collected: ', this.TEXT_STYLES);
    this.add(this.totalBurgers);
    this.totalBurgersValue = game.add.text(gameCentreX + 250, this.totalPizzasValue.y + 40, '', this.TEXT_STYLES);
    this.totalBurgersValue.anchor.setTo(1, 0);
    this.add(this.totalBurgersValue);

    this.totalChocolates = game.add.text(gameCentreX - 250, this.totalBurgers.y + 40, 'Chocolates collected: ', this.TEXT_STYLES);
    this.add(this.totalChocolates);
    this.totalChocolatesValue = game.add.text(gameCentreX + 250, this.totalBurgersValue.y + 40, '', this.TEXT_STYLES);
    this.totalChocolatesValue.anchor.setTo(1, 0);
    this.add(this.totalChocolatesValue);

    this.totalLollipops = game.add.text(gameCentreX - 250, this.totalChocolates.y + 40, 'Lollipops collected: ', this.TEXT_STYLES);
    this.add(this.totalLollipops);
    this.totalLollipopsValue = game.add.text(gameCentreX + 250, this.totalChocolatesValue.y + 40, '', this.TEXT_STYLES);
    this.totalLollipopsValue.anchor.setTo(1, 0);
    this.add(this.totalLollipopsValue);

    this.totalCredits = game.add.text(gameCentreX - 250, this.totalLollipops.y + 40, 'Credits earned: ', this.TEXT_STYLES_FOR_CREDITS);
    this.add(this.totalCredits);
    this.totalCreditsValue = game.add.text(gameCentreX + 250, this.totalLollipopsValue.y + 40, '', this.TEXT_STYLES_FOR_CREDITS);
    this.totalCreditsValue.anchor.setTo(1, 0);
    this.add(this.totalCreditsValue);

    this.score = game.add.text(gameCentreX - 250, this.totalCredits.y + 50, 'Score: ', this.TEXT_STYLES_FOR_SCORE);
    this.add(this.score);
    this.scoreValue = game.add.text(gameCentreX + 250, this.totalCreditsValue.y + 50, '', this.TEXT_STYLES_FOR_SCORE);
    this.scoreValue.anchor.setTo(1, 0);
    this.add(this.scoreValue);

    // New high score 
    //    this.newHighScore = game.add.text(game.width + 300, this.score.y + 100, 'NEW HIGH SCORE!!!', this.TEXT_STYLES_FOR_NEW_HIGHSCORE);
    //    this.newHighScore.anchor.setTo(0.5, 0);
    //    this.newHighScore.angle = -15;
    this.newHighScore = game.add.sprite(gameCentreX, this.score.y + this.score.height + 40 + 35, 'new_high_score');
    this.newHighScore.anchor.setTo(0.5, 0.5);
    this.newHighScore.scale.setTo(7);
    this.newHighScore.angle = -10;
    this.add(this.newHighScore);
    this.newHighScore.visible = false;

    this.audio = {
        buttonClicked: game.add.audio('button_click_audio'),
        scoreboardMusic: game.add.audio('scoreboard_audio'),
        newHighscoreMusic: game.add.audio('newHighscore_audio')
    };

};

ScoreBoard.prototype = Object.create(Phaser.Group.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;

ScoreBoard.prototype.show = function (score, distance, totalPizzasCollected, totalBurgersCollected, totalChocolatesCollected, totalLollipopsCollected, totalCredits) {
    "use strict";

    var delayTime = 0;

    this.y = -(this.blankPanel.height +
        this.hookPanel.height +
        this.blankPanel2.height +
        this.blankPanel3.height +
        this.blankPanel4.height +
        this.blankPanel5.height +
        this.blankPanel6.height);

    //hiding html elements
    Laserpig.Game.multiplierElement.style.display = "none";
    Laserpig.Game.scoreElement.style.display = 'none';
    Laserpig.Game.distanceElement.style.display = 'none';

    this.scoreValue.setText(score);
    this.metresValue.setText(distance);
    this.totalPizzasValue.setText(totalPizzasCollected);
    this.totalBurgersValue.setText(totalBurgersCollected);
    this.totalChocolatesValue.setText(totalChocolatesCollected);
    this.totalLollipopsValue.setText(totalLollipopsCollected);
    this.totalCreditsValue.setText(totalCredits);

    this.restartButton = game.add.button(game.width / 2, (this.blankPanel6.y + this.blankPanel6.height) + 35, 'menu_restart_button', this.restartClicked, this, 0, 0, 1);
    this.restartButton.anchor.setTo(0.5, 0.5);
    this.restartButton.scale.setTo(1.4);
    this.add(this.restartButton);

    this.quitButton = game.add.button(game.width / 2, (this.blankPanel6.y + this.blankPanel6.height) + this.restartButton.height + 40, 'menu_quit_button', this.quitClicked, this, 0, 0, 1);
    this.quitButton.anchor.setTo(0.5, 0.5);
    this.quitButton.scale.setTo(1.4);
    this.add(this.quitButton);

    this.audio.scoreboardMusic.play('', 0, gameAudio.game.scoreBoardMusic.volume, gameAudio.game.loopDefault);

    if (objectProperties.game.tempStats.isNewhigscore) {

        this.audio.scoreboardMusic.stop();
        this.audio.newHighscoreMusic.play('', 0, gameAudio.game.newHighsoreMusic.volume, gameAudio.game.loopDefault);

        setTimeout(function () {
            // Laserpig.Game.scoreBoard.death.play();
            Laserpig.Game.scoreBoard.newHighScore.visible = true;
            Laserpig.Game.scoreBoard.newHighscoreTween();
        }, delayTime * 6.5);

    }

    game.add.tween(this).to({
        y: 0
    }, 500, Phaser.Easing.Back.Out, true);


    //this.game.input.onDown.addOnce(this.menu, this);


};

ScoreBoard.prototype.newHighscoreTween = function () {
    "use strict";

    if (!this.game) {
        return;
    }
    this.game.add.tween(this.newHighScore.scale).to({
        x: 0.7,
        y: 0.7
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

ScoreBoard.prototype.quitClicked = function () {
    "use strict";

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
    this.audio.scoreboardMusic.stop();
    this.audio.newHighscoreMusic.stop();

    this.game.state.start('MainMenu');
};

ScoreBoard.prototype.restartClicked = function () {
    "use strict";
    //    Laserpig.Game.scoreBoard.score.visible = false;
    //    Laserpig.Game.scoreBoard.scoreValue.visible = false;
    //    Laserpig.Game.scoreBoard.metres.visible = false;
    //    Laserpig.Game.scoreBoard.metresValue.visible = false;
    //    Laserpig.Game.scoreBoard.totalPizzas.visible = false;
    //    Laserpig.Game.scoreBoard.totalPizzasValue.visible = false;
    //    Laserpig.Game.scoreBoard.totalBurgers.visible = false;
    //    Laserpig.Game.scoreBoard.totalBurgersValue.visible = false;
    //    Laserpig.Game.scoreBoard.totalChocolates.visible = false;
    //  Laserpig.Game.scoreBoard.totalChocolates.visible = false;
    // Laserpig.Game.scoreBoard.totalLollipops.visible = false;
    //    Laserpig.Game.scoreBoard.totalLollipopsValue.visible = false;
    //    Laserpig.Game.scoreBoard.newHighScore.visible = false;

    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);
    this.audio.scoreboardMusic.stop();
    this.audio.newHighscoreMusic.stop();

    var gameInfo = {
        gameOptions: {
            LEVEL: objectProperties.game.LEVEL,
            JETPACK: objectProperties.pig.jetpack
        },
        statsObject: objectProperties.game.stats
    };

    this.game.state.start('Game', true, false, gameInfo);

};