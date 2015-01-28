define([], function () {

    var calculateScore = function (hand) {

        var total = 0,
            index = 0,
            cards = hand.cards;


        for (index = 0; index < hand.cards.length; index += 1) {
            //if it is an ace
            if (cards[index].countValues.length > 1)

                total += 1;

            else {

                total += Number(cards[index].countValues[0]);
            }
        }

        // Change as many ace values to 11 as possible.
        for (index = 0; index < hand.cards.length; index += 1) {

            if (cards[index].countValues.length > 1 && total <= 11) {

                total += 10;

            }
        }

        hand.score = total;
    },
    resetHand = function (player) {

        player.hand.cards.length = 0;
        player.hand.score = 0;

    };

    return {

        calculateScore: calculateScore,
        resetHand: resetHand

    }

});