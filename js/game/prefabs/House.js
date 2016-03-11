/*global Phaser, objectProperties, currentGameSpeed, getRandomInt, getRandomArbitrary */

var House = function (game, x, y, key, frame) {
    'use strict';

    var houseType = getRandomInt(0, 7),
        scale = getRandomArbitrary(0.3, 0.5);

    if (!key) {
        switch (houseType) {
        case 0:
            key = 'house_1';
            break;
        case 1:
            key = 'house_2';
            break;
        case 2:
            key = 'house_3';
            break;
        case 3:
            key = 'house_4';
            break;
        case 4:
            key = 'house_5';
            break;
        case 5:
            key = 'house_6';
            break;
        case 6:
            key = 'house_7';
            break;
        case 7:
            key = 'house_8';
            break;
        }
    }

    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(scale);
    this.anchor.x = 0;
    this.anchor.y = 1;

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false; // so it doesn't fall

    // so the houses aren't made out of the visible world
//    this.checkWorldBounds = true;
//    this.outOfBoundsKill = true;

    // reviving a sprite means the alive, exists and visible to false
    this.events.onKilled.add(this.onKilled, this);
    // reviving a sprite means the alive, exists and visible to true
    this.events.onRevived.add(this.onRevived, this);
};

// Standard js prototypical inheritance (from a super class)

House.prototype = Object.create(Phaser.Sprite.prototype);
House.prototype.constructor = House;

House.prototype.resetVelocity = function () {
    'use strict';
    
    this.body.velocity.x = objectProperties.groups.housesGroup.velocity.x * currentGameSpeed;
};

House.prototype.onRevived = function () {
    'use strict';
    
    this.resetVelocity();
};

House.prototype.onKilled = function (house) {
    'use strict';
    
    this.animations.frame = 0;
};