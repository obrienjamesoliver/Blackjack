define(function () {

    function Hand() {

        var cards = [],
            score = 0,
            reset = function () {

                cards.length = 0;
                this.score = 0;

            };

        return {

            cards: cards,
            score: score,
            reset: reset

        };
    }

    return Hand;

});