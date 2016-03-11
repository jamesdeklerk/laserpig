/*global Phaser, objectProperties, currentGameSpeed */

var Chocolate = function (game, x, y, key, frame) {
    'use strict';
    
    key = 'chocolate_1';
    
    Phaser.Sprite.call(this, game, x, y, key, frame);
    
    this.scale.setTo(0.6);
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false; // so it doesn't fall
    
    // so the chocolates aren't made out of the visible world
//    this.checkWorldBounds = true;
//    this.outOfBoundsKill = true;
    
    // reviving a sprite means the alive, exists and visible to false
    this.events.onKilled.add(this.onKilled, this);
    // reviving a sprite means the alive, exists and visible to true
    this.events.onRevived.add(this.onRevived, this);
};

// Standard js prototypical inheritance (from a super class)

Chocolate.prototype = Object.create(Phaser.Sprite.prototype);
Chocolate.prototype.constructor = Chocolate;

Chocolate.prototype.resetVelocity = function () {
    'use strict';
    
    this.body.velocity.x = objectProperties.groups.chocolateGroup.velocity.x * currentGameSpeed;
};

Chocolate.prototype.onRevived = function () {
    'use strict';
    
    this.resetVelocity();
};

Chocolate.prototype.onKilled = function (chocolate) {
    'use strict';
    
    this.animations.frame = 0;
};