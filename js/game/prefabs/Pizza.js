/*global Phaser, objectProperties, currentGameSpeed */

var Pizza = function (game, x, y, key, frame) {
    'use strict';
    
    key = 'pizza';
    
    Phaser.Sprite.call(this, game, x, y, key, frame);
    
    this.scale.setTo(0.6);
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false; // so it doesn't fall
    
    // so the pizzas aren't made out of the visible world
//    this.checkWorldBounds = true;
//    this.outOfBoundsKill = true;
    
    // reviving a sprite means the alive, exists and visible to false
    this.events.onKilled.add(this.onKilled, this);
    // reviving a sprite means the alive, exists and visible to true
    this.events.onRevived.add(this.onRevived, this);
};

// Standard js prototypical inheritance (from a super class)

Pizza.prototype = Object.create(Phaser.Sprite.prototype);
Pizza.prototype.constructor = Pizza;

Pizza.prototype.resetVelocity = function () {
    'use strict';
    
    this.body.velocity.x = objectProperties.groups.pizzaGroup.velocity.x * currentGameSpeed;
};

Pizza.prototype.onRevived = function () {
    'use strict';
    
    this.resetVelocity();
};

Pizza.prototype.onKilled = function (pizza) {
    'use strict';
    
    this.animations.frame = 0;
};