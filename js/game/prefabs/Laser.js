/*global Phaser, objectProperties, currentGameSpeed, getRandomInt, getRandomArbitrary, calculateLength */

var LaserSet = function (game, x, y, key, frame) {
    'use strict';

    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.game = game;
    this.anchor.x = 0;
    this.anchor.y = 0;

    this.graphic = game.add.graphics(0, 0);
    this.addChild(this.graphic);

    this.set = this.generateLaserSet();

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false; // so it doesn't fall

    // reviving a sprite means the alive, exists and visible to false
    this.events.onKilled.add(this.onKilled, this);
    // reviving a sprite means the alive, exists and visible to true
    this.events.onRevived.add(this.onRevived, this);
};

// Standard js prototypical inheritance (from a super class)

LaserSet.prototype = Object.create(Phaser.Sprite.prototype);
LaserSet.prototype.constructor = LaserSet;

LaserSet.prototype.resetVelocity = function () {
    'use strict';

    this.body.velocity.x = objectProperties.groups.lasersGroup.velocity.x * currentGameSpeed;
};

LaserSet.prototype.generateLaserSet = function () {
    'use strict';

    var i,
        totalHeight = 610,
        pigHeight = 100,
        padding = 50,
        TwoLaserGapChoice = getRandomInt(1, 3),
        ThreeLaserGapChoice = getRandomInt(1, 4),

        //these values are for one laser
        randomPos1 = getRandomInt(0, 100),
        randomPos2 = getRandomInt(0, 500),
        randomPos3 = getRandomInt(0, 305),
        randomPos4 = getRandomInt(0, 100),
        randomPos5 = getRandomInt(100, 610),
        randomPos6 = getRandomInt(400, 610),

        //these values are for 2 lasers
        //        laserA1 = getRandomInt(0, 160),
        //        laserA2 = getRandomInt(250, 305),
        //        laserB1 = getRandomInt(305, 420),
        //        laserB2 = getRandomInt(480, 610),
        laserA1 = getRandomInt(0, 10),
        laserA2 = getRandomInt(295, 305),
        laserB1 = getRandomInt(305, 310),
        laserB2 = getRandomInt(600, 610),

        //these values are for 3 lasers
        laserC1 = getRandomInt(0, 10),
        laserC2 = getRandomInt(193, 203),
        laserD1 = getRandomInt(203, 213),
        laserD2 = getRandomInt(396, 406),
        laserE1 = getRandomInt(406, 416),
        laserE2 = getRandomInt(600, 610),

        //random x values
        X1 = getRandomInt(0, 100),
        X2 = getRandomInt(0, 100),

        numberOfLasers = getRandomInt(1, 3),
        game = this.game,
        gapProperties = {
            height: 120, // make varying based on number of lasers
            gaps: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 0,
                    y: 0
                }
            ]
        },
        laserProperties = {
            maxWidth: 100
        },
        laserSet = [];

    function randomBoolean() {
        return Math.random() < 0.5;
    }

    if (numberOfLasers === 1) {
        if (randomPos3 < (pigHeight + padding) && randomPos6 > (totalHeight - pigHeight - padding)) {
            if (randomBoolean() === true) {
                randomPos3 = randomPos3 + pigHeight + padding;
            } else {
                randomPos6 = randomPos6 - (pigHeight + padding);
            }
        }

    } else if (numberOfLasers === 2) {
        if (laserA1 < (pigHeight + padding) || laserB2 > (totalHeight - pigHeight - padding) || (laserB2 - laserA2) < (pigHeight + padding)) {
            switch (TwoLaserGapChoice) {
            case 1:
                laserA1 = laserA1 + pigHeight + padding;
                break;
            case 2:
                laserB2 = laserB2 - (pigHeight + padding);
                break;
            case 3:
                laserA2 = laserA2 - ((pigHeight + padding) / 2);
                laserB1 = laserB1 + ((pigHeight + padding) / 2);
                break;
            }
        }

    } else if (numberOfLasers === 3) {
        if (laserC1 < (pigHeight + padding) || laserE2 > (totalHeight - pigHeight - padding) || (laserD2 - laserC2) < (pigHeight + padding) || (laserE2 - laserD2) < (pigHeight + padding)) {
            switch (ThreeLaserGapChoice) {
            case 1:
                laserC1 = laserC1 + pigHeight + padding;
                break;
            case 2:
                laserE2 = laserE2 - (pigHeight + padding);
                break;
            case 3:
                laserC2 = laserC2 - ((pigHeight + padding) / 2);
                laserD1 = laserD1 + ((pigHeight + padding) / 2);
                break;
            case 4:
                laserD2 = laserD2 - ((pigHeight + padding) / 2);
                laserE1 = laserE1 + ((pigHeight + padding) / 2);
                break;
            }
        }

    }

    for (i = 0; i < numberOfLasers; i = i + 1) {

        if (numberOfLasers === 2) {
            randomPos3 = laserA1;
            randomPos6 = laserA2;

            if (i === 1) {
                randomPos3 = laserB1;
                randomPos6 = laserB2;
            }
        }

        if (numberOfLasers === 3) {
            randomPos3 = laserC1;
            randomPos6 = laserC2;

            if (i === 1) {
                randomPos3 = laserD1;
                randomPos6 = laserD2;
            }

            if (i === 2) {
                randomPos3 = laserE1;
                randomPos6 = laserE2;
            }
        }
        laserSet.push({
            start: {
                x: X1,
                y: randomPos3
            },
            end: {
                x: X2,
                y: randomPos6
            },
            rotate: {
                rotating: randomBoolean(),
                clockwise: randomBoolean()
            }
        });
    }


    return laserSet;
    
//    // test for vertical and horizontal lasers
//    [
//        {
//            start: {
//                x: 100,
//                y: 200
//            },
//            end: {
//                x: 100,
//                y: 400
//            },
//            rotate: {
//                rotating: false,
//                clockwise: false
//            }
//        },
//        {
//            start: {
//                x: 0,
//                y: 300
//            },
//            end: {
//                x: 200,
//                y: 300
//            },
//            rotate: {
//                rotating: false,
//                clockwise: false
//            }
//        }
//    ];
};


LaserSet.prototype.rotatePoint = function (point, rotationPoint, thetaIncrease) {
    'use strict';

    var xLength = point.x - rotationPoint.x,
        yLength = point.y - rotationPoint.y,
        theta = Math.atan(yLength / xLength),
        r = Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2)),
        returnPoint = {};

    if (xLength < 0 && yLength > 0) {
        theta = Math.PI + theta;
    } else if (xLength < 0 && yLength < 0) {
        theta = Math.PI + theta;
    } else if (xLength > 0 && yLength < 0) {
        theta = (2 * Math.PI) + theta;
    } else if (xLength > 0 && yLength === 0) {
        theta = 0;
    } else if (xLength === 0 && yLength > 0) {
        theta = Math.PI / 2;
    } else if (xLength < 0 && yLength === 0) {
        theta = Math.PI;
    } else if (xLength === 0 && yLength < 0) {
        theta = Math.PI + (Math.PI / 2);
    }

    theta = theta + thetaIncrease;

    returnPoint.x = (r * Math.cos(theta)) + rotationPoint.x;
    returnPoint.y = (r * Math.sin(theta)) + rotationPoint.y;

    return returnPoint;
};

LaserSet.prototype.rotateLaser = function (laser) {
    'use strict';

    var // find the center point of the current laser
        laserCenter = {
            x: (laser.start.x + laser.end.x) / 2,
            y: (laser.start.y + laser.end.y) / 2
        },
        rotatedPoint,
        returnLaser = {
            start: {},
            end: {},
            rotate: {
                rotating: laser.rotate.rotating,
                clockwise: laser.rotate.clockwise
            }
        },
        rotationDelta = Math.PI / Laserpig.MainMenu.LEVELS[objectProperties.game.LEVEL.KEY].LASER_SPEED;

    // speed with direction of rotation
    rotationDelta = laser.rotate.clockwise ? rotationDelta : -rotationDelta;

    // rotate laser start point about laser center
    rotatedPoint = this.rotatePoint({
        x: laser.start.x,
        y: laser.start.y
    }, {
        x: laserCenter.x,
        y: laserCenter.y
    }, rotationDelta);
    returnLaser.start.x = rotatedPoint.x;
    returnLaser.start.y = rotatedPoint.y;

    // rotate laser end point about laser center
    rotatedPoint = this.rotatePoint({
        x: laser.end.x,
        y: laser.end.y
    }, {
        x: laserCenter.x,
        y: laserCenter.y
    }, rotationDelta);
    returnLaser.end.x = rotatedPoint.x;
    returnLaser.end.y = rotatedPoint.y;

    return returnLaser;
};

// Automatically called by World.update
LaserSet.prototype.update = function () {
    'use strict';

    if (!this.alive) {
        this.graphic.clear();
    }

    if (this.alive && !objectProperties.game.paused) {
        var i;

        this.graphic.clear();

        // for each laser, update its position and then draw it
        for (i = 0; i < this.set.length; i = i + 1) {
            // rotate the laser is rotate === true
            if (this.set[i].rotate.rotating) {
                this.set[i] = this.rotateLaser(this.set[i]);
            }

            // draw the this.set[i] line
            this.graphic.lineStyle(5, 0xFF0000);
            this.graphic.moveTo(this.set[i].start.x, this.set[i].start.y);
            this.graphic.lineTo(this.set[i].end.x, this.set[i].end.y);
            this.graphic.endFill();

        }

        // Block
//        this.graphic.lineStyle(2, 0x0000FF, 1);
//        this.graphic.beginFill(0xFF0000, 0.5);
//        this.graphic.drawRect(0, 0, this.maxLaserSetWidth, this.game.height);

    }
};

LaserSet.prototype.onRevived = function () {
    'use strict';

    var i,
        currentLength,
        maxLength = 0,
        minX = Number.MAX_SAFE_INTEGER,
        bla = 0;

    // regenerate the laserSet
    this.set = this.generateLaserSet();

    // find the max width of the laser
    for (i = 0; i < this.set.length; i = i + 1) {

        currentLength = calculateLength(this.set[i].start, this.set[i].end);

        // get the maxLength
        maxLength = currentLength > maxLength ? currentLength : maxLength;
        minX = this.set[i].start.x < minX ? this.set[i].start.x : minX;
        minX = this.set[i].end.x < minX ? this.set[i].end.x : minX;
    }

    // set the maxLaserSetWidth to the max width for boundary collision detection
    // NOTE: you can't change the width or height without affecting the child sprites
    // https://github.com/photonstorm/phaser/issues/1632
    this.maxLaserSetWidth = maxLength + minX;

    this.resetVelocity();
};

LaserSet.prototype.onKilled = function () {
    'use strict';

    // clear anything that was drawn
    this.graphic.clear();

    this.animations.frame = 0;
};

function calculateLength(start, end) {
    'use strict';

    return Math.sqrt(Math.pow((start.x - end.x), 2) + Math.pow((start.y - end.y), 2));
}