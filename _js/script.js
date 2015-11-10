/*globals angular, console */

"use strict";

var bowlingGame = function () {
    this.rolls = [];
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

var app = angular.module('bowlApp', []);

app.controller('bowlController', ['$scope', function ($scope) {

    $scope.hideForm = false;

    var advanceTurn = function () {

    };

    var shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var nFrames = 10;
    var nRolls = 21;


    var blankRollsArray = function () {
        var aRolls = [];
        for (var i = 0; i < nRolls; i++) {
            aRolls.push(-1);
        };
        return aRolls;
    };

    var blankFramesArray = function () {
        var aFrames = [];
        for (var i = 0; i < nFrames; i++) {
            aFrames.push(-1);
        };
        return aFrames;
    };

    $scope.isDone = function (value) {
        if (value > -1) {
            return true;
        } else {
            return false;
        }
    };

    $scope.pushScore = function (value) {

        for (var i = 0; i < $scope.theWorld.aPlayers[0].scorecard.length; i++) {

            if ($scope.theWorld.aPlayers[0].scorecard[i] < 0) {
                $scope.theWorld.aPlayers[0].scorecard[i] = value;
                break;
            }



        }

    };

    var createWorld = function () {
        $scope.theWorld = {
            nPins: 10,
            nPlayers: 0,
            aPlayers: [],
            nRoll: 0,
            nUserInput: 0,
            nRollsPerFrame: 2,
            nRollsLastFrame: 3,
            aPinInfo: [{
                nVal: 0,
                sName: "Noooo!"
        }, {
                nVal: 1,
                sName: "One"
        }, {
                nVal: 2,
                sName: "Two"
        }, {
                nVal: 3,
                sName: "Three"
        }, {
                nVal: 4,
                sName: "Four"
        }, {
                nVal: 5,
                sName: "Five"
        }, {
                nVal: 6,
                sName: "Six"
        }, {
                nVal: 7,
                sName: "Seven"
        }, {
                nVal: 8,
                sName: "Eight"
        }, {
                nVal: 9,
                sName: "Nine"
        }, {
                nVal: 10,
                sName: "Tacos!"
        }]

        }
    };

    createWorld();


    $scope.master = {};

    $scope.userPush = function (user) {
        $scope.theWorld.aPlayers.push(user);
        $scope.reset();

        for (var i = 0; i < $scope.theWorld.aPlayers.length; i++) {

            $scope.theWorld.aPlayers[i].scorecard = blankRollsArray();
            $scope.theWorld.aPlayers[i].frames = blankFramesArray();
            $scope.theWorld.aPlayers[i].inputOrder = i + 1;

        }
    };

    $scope.reset = function () {
        $scope.user = {};
    };

    $scope.deleteAll = function () {
        $scope.reset();
        $scope.theWorld.aPlayers = [];

    };

    $scope.canStart = function () {
        if (!$scope.theWorld.aPlayers.length) {
            return true;
        } else {
            return false;
        }

    };

    $scope.startGame = function () {
        shuffle($scope.theWorld.aPlayers);
        for (var i = 0; i < $scope.theWorld.aPlayers.length; i++) {
            $scope.theWorld.aPlayers[i].playOrder = i + 1;

            $scope.hideForm = true;
        }
    };




            }]);