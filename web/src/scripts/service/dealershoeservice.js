define(['configurationservice', 'options', 'dealershoe', 'card'], function (configurationService, options, dealerShoe, Card) {

    var shuffle = function () {

        var indexShuffle, indexDealerShoe, indexRandom, temp;

        // Shuffle
        for (indexShuffle = 0; indexShuffle < configurationService.NUMBEROFSHUFFLES; indexShuffle += 1) {

            for (indexDealerShoe = 0; indexDealerShoe < dealerShoe.dealerShoe.length; indexDealerShoe += 1) {

                indexRandom = Math.floor(Math.random() * dealerShoe.dealerShoe.length);
                temp = dealerShoe.dealerShoe[indexDealerShoe];
                dealerShoe.dealerShoe[indexDealerShoe] = dealerShoe.dealerShoe[indexRandom];
                dealerShoe.dealerShoe[indexRandom] = temp;

            }
        }

    },
        deal = function () {

            if (dealerShoe.dealerShoe.length > 0) {

                return dealerShoe.dealerShoe.shift();
            }
            else {
                return null;
            }

        },
        loadDealerShoe = function () {

            var indexNumDecks, indexCards;

            dealerShoe.dealerShoe.length = 0;

            for (var suit in configurationService.SUITS) {

                if (configurationService.SUITS.hasOwnProperty(suit)) {

                    for (indexCards = 2; indexCards <= 14; indexCards += 1) {

                        for (indexNumDecks = 0; indexNumDecks < options.numberOfDecks; indexNumDecks++) {

                            dealerShoe.dealerShoe.push(_createCard(indexCards, suit));

                        }
                    }
                }
            }

            shuffle();

        },
        _createCard = function (number, cardSuit) {

            var card = new Card();

            switch (number) {
                case 11: card.countValues.push(10);
                    card.faceValue = cardSuit + 'jack';
                    break;
                case 12: card.countValues.push(10);
                    card.faceValue = cardSuit + 'queen';
                    break;
                case 13: card.countValues.push(10);
                    card.faceValue = cardSuit + 'king';
                    break;
                case 14: card.countValues.push(1);
                    card.countValues.push(11);
                    card.faceValue = cardSuit + 'ace';
                    break;
                default: card.countValues.push(number);
                    card.faceValue = cardSuit + number.toString();
            }

            return card;
        },
        removeCard = function (card) {

            var indexCard = 0;

            for (indexCard = 0; indexCard < dealerShoe.dealerShoe.length; indexCard++) {

                dealerShoe.dealerShoe.splice(indexCard, 1);
            }
            

        };
        
    return {

        shuffle: shuffle,
        deal: deal,
        loadDealerShoe: loadDealerShoe,
        removeCard: removeCard

    };

});