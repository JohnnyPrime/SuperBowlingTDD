"use strict";

var testHello = "what";

var bowlingGame = function (something) {
    this.rolls = something;
};

bowlingGame.prototype.roll = function (pins) {
    this.rolls.push(pins);
};

bowlingGame.prototype.score = function () {
    var result = 0,
        rollIndex = 0,
        game = this,
        frameIndex;

    function isSpare() {
        return game.rolls[rollIndex] + game.rolls[rollIndex + 1] === 10;
    }

    function isStrike() {
        return game.rolls[rollIndex] === 10;
    }

    function getNormalScore() {
        return game.rolls[rollIndex] + game.rolls[rollIndex + 1];
    }

    function getSpareScore() {
        return game.rolls[rollIndex] + game.rolls[rollIndex + 1] + game.rolls[rollIndex + 2];
    }

    function getStrikeScore() {
        return game.rolls[rollIndex] + game.rolls[rollIndex + 1] + game.rolls[rollIndex + 2];
    }

    for (frameIndex = 0; frameIndex < 10; frameIndex += 1) {
        if (isStrike()) {
            result += getStrikeScore();
            rollIndex += 1;
        } else if (isSpare()) {
            result += getSpareScore();
            rollIndex += 2;
        } else {
            result += getNormalScore();
            rollIndex += 2;
        }

    }

    return result;
};