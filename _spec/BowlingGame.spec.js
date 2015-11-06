/*globals require, describe, it, expect, bowlingGame*/

describe('The Bowling Game', function () {

    var game;

    beforeEach(function () {
        game = new bowlingGame();
    });


    it('can roll gutter game', function () {
        rollMany(0, 20);
        expect(game.score()).toBe(0);
    });

    it('can roll all ones', function () {
        rollMany(1, 20);
        expect(game.score()).toBe(20);
    });

    it('can roll a spare', function () {
        game.roll(5);
        game.roll(5);
        game.roll(3);
        rollMany(0, 17);
        expect(game.score()).toBe(16);
    });

    it('can roll lots of spares', function () {
        game.roll(5);
        game.roll(5);
        //+11
        game.roll(1);
        game.roll(9);
        //+15
        //=26
        game.roll(5);
        game.roll(5);
        //+13
        //=39
        game.roll(3);
        //+3
        //=42
        rollMany(0, 13);
        expect(game.score()).toBe(42);
    });

    it('can roll spare strike spare', function () {
        game.roll(1);
        game.roll(9);
        //+20
        game.roll(10);
        //+20
        //=40
        game.roll(5);
        game.roll(5);
        //+13
        //=53
        game.roll(3);
        //+3
        //=56
        rollMany(0, 13);
        expect(game.score()).toBe(56);
    });

    it('can roll a strike', function () {
        game.roll(10);
        game.roll(3);
        game.roll(5);
        rollMany(0, 16);
        expect(game.score()).toBe(26);
    });

    it('can roll a perfect game', function () {
        rollMany(10, 12);
        expect(game.score()).toBe(300);
    });

    var rollMany = function (pins, rolls) {
        for (var i = 0; i < rolls; i++) {
            game.roll(pins);
        }
    };

});