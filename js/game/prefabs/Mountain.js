/*global Phaser, objectProperties, currentGameSpeed, getRandomInt, getRandomArbitrary, white: true */

var Mountain = function (game, x, y, key, frame) {
    'use strict';

    var mountainType = getRandomInt(0, 0),
        scale = getRandomArbitrary(0.5, 1);

    switch (mountainType) {
    case 0:
        key = 'mountain_1';
        break;
    case 1:
        key = 'mountain_2';
        break;
    }

    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(scale);
    this.anchor.x = 0;
    this.anchor.y = 1;

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false; // so it doesn't fall

    // so the coins aren't made out of the visible world
    //    this.checkWorldBounds = true;
    //    this.outOfBoundsKill = true;

    // reviving a sprite means the alive, exists and visible to false
    this.events.onKilled.add(this.onKilled, this);
    // reviving a sprite means the alive, exists and visible to true
    this.events.onRevived.add(this.onRevived, this);
};

// Standard js prototypical inheritance (from a super class)

Mountain.prototype = Object.create(Phaser.Sprite.prototype);
Mountain.prototype.constructor = Mountain;

Mountain.prototype.resetVelocity = function () {
    'use strict';

    this.body.velocity.x = objectProperties.groups.mountainsGroup.velocity.x * currentGameSpeed;
};

Mountain.prototype.onRevived = function () {
    'use strict';

    this.resetVelocity();
};

Mountain.prototype.onKilled = function (mountain) {
    'use strict';

    this.animations.frame = 0;
};