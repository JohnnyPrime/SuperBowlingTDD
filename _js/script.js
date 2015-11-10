/*globals angular, console */

"use strict";

var app = angular.module('bowlApp', []);

app.controller('bowlController', ['$scope', function ($scope) {

    $scope.hideForm = false;

    //borrowed shuffle code, haven't followed it's logic, seems legit
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    var nRolls = 21,
        nFrames = 10,
        nRollsPerFrame = 2,
        nRollsLastFrame = 3,
        aButtonText = [["Noooo!", 0], ["One", 1], ["Two", 2], ["Three", 3], ["Four", 4], ["Five", 5], ["Six", 6], ["Seven", 7], ["Eight", 8], ["Nine", 9], ["Tacos", 10]],

        blankArray = function (value) {
            var aNegative = [];
            for (var i = 0; i < value; i++) {
                aNegative.push(-1);
            }
            return aNegative;
        },

        createWorld = function () {
            $scope.theWorld = {
                nPlayers: function () {
                    return this.aPlayers.length;
                },
                aPlayers: [],
                nRPF: nRollsPerFrame,
                nRLF: nRollsLastFrame,
                aButtonInfo: function () {
                    var aTemp = [];
                    for (var i = 0; i < aButtonText.length; i++) {
                        aTemp.push({
                            nVal: aButtonText[i][1],
                            sName: aButtonText[i][0]
                        });

                    }
                    return aTemp;
                }()

            };
        };

    createWorld();

    $scope.displayValue = function (value) {
        if (value > -1) {
            return true;
        } else {
            return false;
        }
    };

    $scope.writeRolls = function (value) {
        for (var i = 0; i < $scope.theWorld.aPlayers[0].rollcard.length; i++) {
            if ($scope.theWorld.aPlayers[0].rollcard[i] < 0) {
                $scope.theWorld.aPlayers[0].rollcard[i] = value;
                break;
            }
        }
    };

    $scope.userPush = function (user) {
        $scope.theWorld.aPlayers.push(user);
        $scope.reset();
        for (var i = 0; i < $scope.theWorld.nPlayers(); i++) {
            $scope.theWorld.aPlayers[i].rollcard = blankArray(nRolls);
            $scope.theWorld.aPlayers[i].frames = blankArray(nFrames);
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

    $scope.advanceTurn = function () {

    };
            }]);