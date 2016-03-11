/*global Phaser, Laserpig */

var ShopPanel = function (game) {
    'use strict';

    var gameCenterX = game.width / 2;

    // Super call to Phaser.Group
    Phaser.Group.call(this, game);

    this.shopTitle = game.add.sprite(gameCenterX, 50, 'menu_shop_title');
    this.shopTitle.anchor.setTo(0.5, 0);
    this.shopTitle.scale.setTo(1);
    this.add(this.shopTitle);

    this.buyButton = game.add.button(gameCenterX, 220 + 65 * 3, 'buy_button', this.buyClicked, null, 0, 0, 0);
    this.buyButton.anchor.setTo(0.5, 0);
    this.buyButton.scale.setTo(1);
    this.add(this.buyButton);

    this.goBackButton = game.add.button(gameCenterX, 220 + 65 * 5, 'menu_go_back_button', this.goBackClicked, null, 0, 0, 1);
    this.goBackButton.anchor.setTo(0.5, 0);
    this.goBackButton.scale.setTo(1.4);
    this.add(this.goBackButton);

    // Place it out of bounds
    this.x = this.game.width;
    this.y = 0;
};

ShopPanel.prototype = Object.create(Phaser.Group.prototype);
ShopPanel.constructor = ShopPanel;


ShopPanel.prototype.goBackClicked = function () {
    'use strict';

    Laserpig.MainMenu.shopPanel.hide();
    Laserpig.MainMenu.menuPanel.show();
};

ShopPanel.prototype.buyClicked = function () {
    'use strict';

    Laserpig.MainMenu.statsObject.credits = Laserpig.MainMenu.statsObject.credits + 1;
    Laserpig.MainMenu.save();
};


ShopPanel.prototype.show = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: 0
    }, 300, Phaser.Easing.Cubic.InOut, true);
};

ShopPanel.prototype.hide = function () {
    'use strict';

    this.game.add.tween(this).to({
        x: this.game.width
    }, 300, Phaser.Easing.Cubic.InOut, true);
};