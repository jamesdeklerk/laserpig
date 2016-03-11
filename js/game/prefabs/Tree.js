/*global Phaser, objectProperties, currentGameSpeed, getRandomArbitrary */

var Tree = function (game, x, y, key, frame) {
    'use strict';
    
    var scale = getRandomArbitrary(0.5, 1);
    
    key = 'tree_2';
    
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

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.resetVelocity = function () {
    'use strict';
    
    this.body.velocity.x = objectProperties.groups.treesGroup.velocity.x * currentGameSpeed;
};

Tree.prototype.onRevived = function () {
    'use strict';
    
    this.resetVelocity();
};

Tree.prototype.onKilled = function (tree) {
    'use strict';
    
    this.animations.frame = 0;
};