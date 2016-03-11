/*global module */

module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {

        },
        concat: {
            options: {
                separator: "\n\n"
            },
            dist: { // where we're getting the files from
                src: [
                    // libraries
                    "js/library/phaser.min.js",
                    
                    // game states
                    "js/game/states/boot.js",
                    "js/game/states/preload.js",
                    "js/game/states/main-menu.js",
                    "js/game/states/game.js",
                    
                    // prefabs
                    "js/game/prefabs/Cloud.js",
                    "js/game/prefabs/Mountain.js",
                    "js/game/prefabs/House.js",
                    "js/game/prefabs/Tree.js",
                    "js/game/prefabs/Pizza.js",
                    "js/game/prefabs/Burger.js",
                    "js/game/prefabs/Chocolate.js",
                    "js/game/prefabs/Lollipop.js",
                    "js/game/prefabs/Laser.js",
                    "js/game/prefabs/ScoreBoard.js",
                    "js/game/prefabs/RoadLine.js",
                    "js/game/prefabs/Tutorial.js",
                    
                    // menu prefabs
                    "js/game/prefabs/menu/menu.js",
                    "js/game/prefabs/menu/customize.js",
                    "js/game/prefabs/menu/level.js",
                    "js/game/prefabs/menu/pause.js",
                    "js/game/prefabs/menu/myScores.js",
                    "js/game/prefabs/menu/about.js",
                    "js/game/prefabs/menu/music.js",
                    "js/game/prefabs/menu/story.js",
                    "js/game/prefabs/menu/controls.js",
                    "js/game/prefabs/menu/shop.js"
                ], // array of source files
                dest: 'bin/<%= pkg.name %>.min.js' // <%= pkg.name %> is the name from package.js
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'bin/<%= pkg.name %>.min.js': ['bin/<%= pkg.name %>.min.js']
                }
            }
        }
    });

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // default task.
    grunt.registerTask('default', ['concat']);

};