define(['dealershoe', 'player'], function (dealerShoe, Player) {

    
    var dealer = new Player(true),
        gamblers = [],
        reset = function () {

            dealerShoe.reset();
            dealer.hand.reset();
            gamblers.length = 0;

        };

    return {
        
        dealer: dealer,
        gamblers: gamblers,
        dealerShoe: dealerShoe,
        reset: reset

    };

});
