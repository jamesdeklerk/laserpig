/*global Phaser, objectProperties, currentGameSpeed, getRandomInt, getRandomArbitrary */

var Cloud = function (game, x, y, key, frame) {
    'use strict';
    
    var cloudType = getRandomInt(0, 1),
        scale = getRandomArbitrary(0.5, 0.9);
    
    switch (cloudType) {
    case 0:
        key = 'cloud_1';
        break;
    case 1:
        key = 'cloud_2';
        break;
    }
    
    Phaser.Sprite.call(this, game, x, y, key, frame);
    
    this.scale.setTo(scale);
    
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

Cloud.prototype = Object.create(Phaser.Sprite.prototype);
Cloud.prototype.constructor = Cloud;

Cloud.prototype.onRevived = function () {
    'use strict';
    
    this.body.velocity.x = objectProperties.groups.cloudsGroup.velocity.x * currentGameSpeed;
}; 

Cloud.prototype.onKilled = function (cloud) {
    'use strict';
    
    this.animations.frame = 0;
};