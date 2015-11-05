/*globals angular, console */

"use strict";
var app = angular.module('bowlApp', []);

app.controller('bowlController', ['$scope', function ($scope) {

    var nFrames = 10,
        nPins = 10,
        nRolls = 21;

    $scope.superBowl = {
        nRoll: 0,
        nUserInput: 0,
        aScore: [],
        aFrames: [],
        aPinInfo: [{
            nVal: 0,
            sName: "Zero"
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
            sName: "Ten"
        }],
        nRollsPerFrame: 2,
        nRollsLastFrame: 3,

        rollAdd: function (val) {
            if (!this.aScore[this.nRoll] && this.nRoll < 21) {
                this.aScore[this.nRoll] = val;
                this.nUserInput = val;
                console.log("Pressed a button.");
            }
            this.nRoll += 1;
        },

        isDisabled: function (button) {
            if (this.nRoll % 2 && (button.nVal + this.nUserInput) > 10) {
                return true;
            } else {

                return false;
            }


        }
    };

    $scope.superBowl.aFrames.length = nFrames;
    $scope.superBowl.aScore.length = nRolls;


}]);