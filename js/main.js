/*global Phaser, Laserpig */

// the game is 700 pixels high, and the width is relative to that
var gameSize = {
        height: 700,
        width: Math.round(700 * (750 / 450)) // from #game-container div size (set in styles.css)
    },
    game;

// Create a new instance of the game
game = new Phaser.Game(gameSize.width, gameSize.height, Phaser.AUTO, 'game-container', null, false, true);

game.state.add('Boot', Laserpig.Boot);
game.state.add('Preload', Laserpig.Preload);
game.state.add('MainMenu', Laserpig.MainMenu);
game.state.add('Game', Laserpig.Game);

game.state.start('Boot');