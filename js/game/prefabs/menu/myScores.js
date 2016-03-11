/*global Phaser, Laserpig, Menu */

var ScoresPanel = function (game) {
    'use strict';

    var gameCentreX = game.width / 2,
        current,
        dy = 5,
        i;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.myScoresTitle = game.add.sprite(gameCentreX, 185, 'menu_scores_title');
    this.myScoresTitle.anchor.setTo(0.5, 1);
    this.myScoresTitle.scale.setTo(0.6);
    this.add(this.myScoresTitle);

    this.hookPanel = game.add.sprite(gameCentreX, this.myScoresTitle.y + 35, 'blank_panel_top');
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

    this.blankPanel4 = game.add.sprite(gameCentreX, this.blankPanel3.y + this.blankPanel3.height - dy - 25, 'blank_panel_bottom');
    this.blankPanel4.anchor.setTo(0.5, 0);
    this.blankPanel4.scale.setTo(0.8);
    this.add(this.blankPanel4);

    this.easyScoreButton = game.add.button(gameCentreX - 150, this.hookPanel.y + 40, 'menu_easy_title', this.easyClicked, this, 0, 0, 0);
    this.easyScoreButton.anchor.setTo(0.5, 0);
    this.easyScoreButton.scale.setTo(1);
    this.add(this.easyScoreButton);

    this.mediumScoreButton = game.add.button(gameCentreX, this.hookPanel.y + 40, 'menu_medium_title', this.mediumClicked, this, 0, 0, 0);
    this.mediumScoreButton.anchor.setTo(0.5, 0);
    this.mediumScoreButton.scale.setTo(1);
    this.add(this.mediumScoreButton);

    this.hardScoreButton = game.add.button(gameCentreX + 150, this.hookPanel.y + 40, 'menu_hard_title', this.hardClicked, this, 0, 0, 0);
    this.hardScoreButton.anchor.setTo(0.5, 0);
    this.hardScoreButton.scale.setTo(1);
    this.add(this.hardScoreButton);

    this.goBackButton = game.add.button(gameCentreX, this.blankPanel4.y + this.blankPanel4.height + 35, 'menu_go_back_button', this.goBackClicked, this, 0, 0, 1);
    this.goBackButton.anchor.setTo(0.5, 0);
    this.goBackButton.scale.setTo(1.4);
    this.add(this.goBackButton);

    this.selector = game.add.sprite(this.easyScoreButton.x, this.easyScoreButton.y + this.easyScoreButton.height, 'menu_selector');
    this.selector.anchor.setTo(0.5, 0);
    this.selector.scale.setTo(0.8);
    this.add(this.selector);

    this.selector2 = game.add.sprite(this.mediumScoreButton.x, this.mediumScoreButton.y + this.mediumScoreButton.height, 'menu_selector_medium');
    this.selector2.anchor.setTo(0.5, 0);
    this.selector2.scale.setTo(0.8);
    this.add(this.selector2);
    this.selector2.visible = false;

    //stats text variables
    this.TEXT_STYLES = {
        font: '24px Orbitron',
        fill: '#000000',
        align: 'center'
    };

    this.TEXT_DETAILS = [
        {
            TEXT: 'High Score: ',
            value: 342,
            X: this.easyScoreButton.x - (this.easyScoreButton.width / 2),
            Y: this.easyScoreButton.y + this.easyScoreButton.height + 20,
            KEY: 'highScore',
            VALUE_KEY: 'highScoreValue'
        },
        {
            TEXT: 'Furthest Distance: ',
            value: 342,
            X: this.easyScoreButton.x - (this.easyScoreButton.width / 2),
            Y: this.easyScoreButton.y + this.easyScoreButton.height + 20 + (30),
            KEY: 'furthestDistance',
            VALUE_KEY: 'furthestDistanceValue'
        },
        {
            TEXT: 'Total Distance: ',
            value: 342,
            X: this.easyScoreButton.x - (this.easyScoreButton.width / 2),
            Y: this.easyScoreButton.y + this.easyScoreButton.height + 20 + (30 * 2),
            KEY: 'totalDistance',
            VALUE_KEY: 'totalDistanceValue'
        },
        {
            TEXT: 'Total Pizzas: ',
            value: 342,
            X: this.easyScoreButton.x - (this.easyScoreButton.width / 2),
            Y: this.easyScoreButton.y + this.easyScoreButton.height + 20 + (30 * 3),
            KEY: 'totalPizzasCollected',
            VALUE_KEY: 'totalPizzasCollectedValue'
        },
        {
            TEXT: 'Total Burgers: ',
            value: 342,
            X: this.easyScoreButton.x - (this.easyScoreButton.width / 2),
            Y: this.easyScoreButton.y + this.easyScoreButton.height + 20 + (30 * 4),
            KEY: 'totalBurgersCollected',
            VALUE_KEY: 'totalBurgersCollectedValue'
        },
        {
            TEXT: 'Total Chocolates: ',
            value: 342,
            X: this.easyScoreButton.x - (this.easyScoreButton.width / 2),
            Y: this.easyScoreButton.y + this.easyScoreButton.height + 20 + (30 * 5),
            KEY: 'totalChocolatesCollected',
            VALUE_KEY: 'totalChocolatesCollectedValue'
        },
        {
            TEXT: 'Total Lollipops: ',
            value: 342,
            X: this.easyScoreButton.x - (this.easyScoreButton.width / 2),
            Y: this.easyScoreButton.y + this.easyScoreButton.height + 20 + (30 * 6),
            KEY: 'totalLollipopsCollected',
            VALUE_KEY: 'totalLollipopsCollectedValue'
        }
    ];

    // creating the text elements and placing them
    for (i = 0; i < this.TEXT_DETAILS.length; i = i + 1) {
        current = this.TEXT_DETAILS[i];

        this[current.KEY] = game.add.text(current.X, current.Y, current.TEXT, this.TEXT_STYLES);
        this.add(this[current.KEY]);

        this[current.VALUE_KEY] = game.add.text(this.hardScoreButton.x + (this.hardScoreButton.width / 2), current.Y, current.value, this.TEXT_STYLES);
        this[current.VALUE_KEY].anchor.setTo(1, 0);
        this.add(this[current.VALUE_KEY]);
    }

    this.x = this.game.width;
    this.y = 0;

    this.audio = {
        buttonClicked: game.add.audio('button_click_audio')
    };
};
ScoresPanel.prototype = Object.create(Phaser.Group.prototype);
ScoresPanel.constructor = ScoresPanel;

ScoresPanel.prototype.changeCurrentScoreView = function (currentScoreView) {
    'use strict';

    var current,
        i;

    if (currentScoreView === Laserpig.MainMenu.LEVELS.EASY.KEY) {

        this.selector.visible = true;
        this.selector2.visible = false;
        this.selector.x = this.easyScoreButton.x;

    } else if (currentScoreView === Laserpig.MainMenu.LEVELS.MEDIUM.KEY) {

        this.selector.visible = false;
        this.selector2.visible = true;

    } else if (currentScoreView === Laserpig.MainMenu.LEVELS.HARD.KEY) {

        this.selector.visible = true;
        this.selector2.visible = false;
        this.selector.x = this.hardScoreButton.x;

    } else if (currentScoreView === Laserpig.MainMenu.LEVELS.FREE_FLY.KEY) {

    }

    for (i = 0; i < this.TEXT_DETAILS.length; i = i + 1) {
        current = this.TEXT_DETAILS[i];
        this[current.KEY].setText(current.TEXT);
        current.value = Laserpig.MainMenu.statsObject[currentScoreView][current.KEY];
        this[current.VALUE_KEY].setText(current.value);
    }
};

ScoresPanel.prototype.goBackClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.scoresPanel.hide();
    Laserpig.MainMenu.menuPanel.show();
};

ScoresPanel.prototype.easyClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.scoresPanel.changeCurrentScoreView(Laserpig.MainMenu.LEVELS.EASY.KEY);
};

ScoresPanel.prototype.mediumClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.scoresPanel.changeCurrentScoreView(Laserpig.MainMenu.LEVELS.MEDIUM.KEY);
};

ScoresPanel.prototype.hardClicked = function () {
    'use strict';
    
    this.audio.buttonClicked.play('', 0, gameAudio.game.volume, gameAudio.game.loopDefault);

    Laserpig.MainMenu.scoresPanel.changeCurrentScoreView(Laserpig.MainMenu.LEVELS.HARD.KEY);
};

ScoresPanel.prototype.show = function () {
    'use strict';

    var current,
        i;

    this.changeCurrentScoreView(Laserpig.MainMenu.gameOptions.LEVEL.KEY);

    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

ScoresPanel.prototype.hide = function () {
    'use strict';

    var game = this.game,
        current,
        i;

    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};