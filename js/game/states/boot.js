/*global console, Phaser */

var Laserpig = function () {
    'use strict';
};

Laserpig.Boot = {
    // preload - first thing to run when a state is instantiated
    // create - second thing that is run
    // update - RUN EVERY TICK of the game (check for collisions or update movement)
    // shutdown - run when a state is being left (for cleaning up memory etc.)
    preload: function () {
        'use strict';

        this.load.spritesheet('splash', 'assets/images/gamenamix.png', 508, 84);
        this.load.spritesheet('spinner', 'assets/images/spinner.png', 50, 50);
    },
    create: function () {
        'use strict';

        console.log('boot started');

        this.game.stage.backgroundColor = '#fff';

        // unless you are going to use multi-touch set this to 1
        //this.input.maxPointers = 2;
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Auto scale according to screen size
        //this.scale.forceLandscape = true;
        //this.scale.setScreenSize(true); // set the screensize to these dimensions as soon as you can
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        var scaleFactor = 450 / 700;
        this.game.scale.setUserScale(scaleFactor, scaleFactor, 0, 0);


        if (this.game.device.desktop) {
            // If you have any desktop specific settings, they can go in here

        } else {
            // Same goes for mobile settings here.

        }


        // By this point the preloader assets have loaded the the cache, we've set the game settings
        // So now let's start the real preloader going
        this.state.start('Preload');
    }
};