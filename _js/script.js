/*globals angular, console */

"use strict";

var app = angular.module('bowlApp', []);

var nRolls = 21,
    nFrames = 10,
    nRollsPerFrame = 2,
    nRollsLastFrame = 3,
    aButtonText = [["Noooo!", 0], ["One", 1], ["Two", 2], ["Three", 3], ["Four", 4], ["Five", 5], ["Six", 6], ["Seven", 7], ["Eight", 8], ["Nine", 9], ["Tacos!", 10]];

function blankArray(value) {
    var aNegative = [];
    for (var i = 0; i < value; i++) {
        aNegative.push(-1);
    }
    return aNegative;
}

function createButtons() {
    var aTemp = [];
    for (var i = 0; i < aButtonText.length; i++) {
        aTemp.push({
            nVal: aButtonText[i][1],
            sName: aButtonText[i][0]
        });

    }
    return aTemp;
}

function createWorld() {
    var oWorld = {
        hideForm: false,
        nPlayers: function () {
            return this.aPlayers.length;
        },
        aPlayers: [],
        nRPF: nRollsPerFrame,
        nRLF: nRollsLastFrame,
        aButtonInfo: createButtons()
    };
    return oWorld;
}

var theWorld = createWorld();

//borrowed shuffle code, haven't followed it's logic, seems legit
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function displayValue(value) {
    if (value > -1 || value === "X" || value === "/") {
        return true;
    } else {
        return false;
    }
}

app.controller('GameController', ['$scope', function ($scope) {

    $scope.theWorld = theWorld;

    this.deleteAll = function () {
        theWorld.aPlayers = [];
    };

    this.userPush = function (user, players) {
        players.push(angular.copy(user));
        user = [];
    };

    this.startDisabled = function () {
        if (theWorld.nPlayers()) {
            return false;
        } else {
            return true;
        }
    };

    this.startGame = function () {
        for (var i = 0; i < theWorld.nPlayers(); i++) {
            var player = theWorld.aPlayers[i];
            player.rollcard = blankArray(nRolls);
            player.scorecard = blankArray(nRolls);
            player.frames = blankArray(nFrames);
            player.inputOrder = i + 1;
        }
        shuffle(theWorld.aPlayers);
        $scope.isHidden = true;
    };

    $scope.isHidden = false;

    $scope.gameLoop = function (pins) {
        /*      loop through player Array (find player who has frames remaining)
        if frame not done, request/accept roll value
              calculate frame (2 rolls or 10 pins)
              populate players frame data*/
        for (var i = 0; i < $scope.theWorld.nPlayers(); i++) {
            for (var j = 0; j < nRolls; j++) {
                if ($scope.theWorld.aPlayers[i].isTurn()) {
                    $scope.theWorld.aPlayers[i].rollcard[j] = pins;
                    break;
                }
            }
        }
    };

    /*    $scope.writeRolls = function (value) {
            for (var i = 0; i < $scope.theWorld.aPlayers[0].rollcard.length; i++) {
                if ($scope.theWorld.aPlayers[0].rollcard[i] === -1) {
                    if (value === 10) {
                        if (i >= $scope.theWorld.aPlayers[0].rollcard.length - 3) {
                            $scope.theWorld.aPlayers[0].scorecard[i] = "X";

                            $scope.theWorld.aPlayers[0].rollcard[i] = 10;
                            break;
                        } else if ((i + 1) % 2) {

                            $scope.theWorld.aPlayers[0].scorecard[i] = -2;
                            $scope.theWorld.aPlayers[0].scorecard[i + 1] = "X";
                            $scope.theWorld.aPlayers[0].rollcard[i] = -2;
                            $scope.theWorld.aPlayers[0].rollcard[i + 1] = 10;
                            break;
                        } else {
                            $scope.theWorld.aPlayers[0].scorecard[i] = "/";
                            $scope.theWorld.aPlayers[0].rollcard[i] = 10;
                        }
                    } else {
                        $scope.theWorld.aPlayers[0].rollcard[i] = value;
                        $scope.theWorld.aPlayers[0].scorecard[i] = value;
                        break;
                    }
                    break;
                }



            }
        };*/

    $scope.advanceTurn = function () {

    };

                }]);

/*app.controller('bowlController', ['$scope', function ($scope) {


            }]);*/