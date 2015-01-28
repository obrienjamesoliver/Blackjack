define(['hand'], function (Hand) {

    function Player(deals) {

        var hand = new Hand(),
            isDealer = deals || false;

        return {

            hand: hand,
            isDealer: isDealer

        };
    }

    return Player;
});







