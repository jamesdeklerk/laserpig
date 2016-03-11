/*global Phaser, objectProperties, currentGameSpeed */

var Burger = function (game, x, y, key, frame) {
    'use strict';
    
    key = 'burger';
    
    Phaser.Sprite.call(this, game, x, y, key, frame);
    
    this.scale.setTo(0.6);
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false; // so it doesn't fall
    
    // so the burgers aren't made out of the visible world
//    this.checkWorldBounds = true;
//    this.outOfBoundsKill = true;
    
    // reviving a sprite means the alive, exists and visible to false
    this.events.onKilled.add(this.onKilled, this);
    // reviving a sprite means the alive, exists and visible to true
    this.events.onRevived.add(this.onRevived, this);
};

// Standard js prototypical inheritance (from a super class)

Burger.prototype = Object.create(Phaser.Sprite.prototype);
Burger.prototype.constructor = Burger;

Burger.prototype.resetVelocity = function () {
    'use strict';
    
    this.body.velocity.x = objectProperties.groups.burgerGroup.velocity.x * currentGameSpeed;
};

Burger.prototype.onRevived = function () {
    'use strict';
    
    this.resetVelocity();
};

Burger.prototype.onKilled = function (burger) {
    'use strict';
    
    this.animations.frame = 0;
};