define(['configurationservice', 'handservice', 'dealershoeservice', 'uiservice', 'gambler', 'boardgame', 'options'], function (configurationService, handService, dealerShoeService, uiService, Gambler, boardGame, options) {

    var gamblers = boardGame.gamblers,
        dealer = boardGame.dealer,
        startBoardGame = function () {
            
            //load shuffled dealershoe
            dealerShoeService.loadDealerShoe();

            _createGamblers();

        },
        resetBoardGame = function () {
                        
            boardGame.reset();

        },        
        deal = function () {                
            
            _resetCards();

            //if the dealerShoe is empty then loadDealershoe again
            if (boardGame.dealerShoe.dealerShoe.length < ((options.numberOfPlayers + 1) * 2) ){

                _reShuffleCards();

            }

            //Deal initial gambler cards, calculate score and set playing status
            for (var indexGambler = 0; indexGambler < gamblers.length; indexGambler += 1) {

                for (var index = 0; index < 2; index += 1) {
                    gamblers[indexGambler].hand.cards[index] = dealerShoeService.deal();
                    gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.PLAYING;
                }

                handService.calculateScore(gamblers[indexGambler].hand);

            }

            //Deal initial dealer cards and calculate score
            for (var indexDealer = 0; indexDealer < 2; indexDealer += 1) {

                dealer.hand.cards[indexDealer] = dealerShoeService.deal();

            }

            handService.calculateScore(dealer.hand);

        },
        hit = function (player) {

            //if the dealerShoe is empty then loadDealershoe again
            if (boardGame.dealerShoe.dealerShoe.length === 0) {

                _reShuffleCards();

            }


            player.hand.cards[player.hand.cards.length] = dealerShoeService.deal();

            handService.calculateScore(player.hand);

            if (player.status && (player.hand.score > 21)) {

                player.status = configurationService.GAMBLERSTATUSMESSAGES.BUST;
            }
            
        },
        stand = function (gambler) {

            gambler.hasPlayed = true;

            if (!(gambler.status === configurationService.GAMBLERSTATUSMESSAGES.BUST)) {

                gambler.status = configurationService.GAMBLERSTATUSMESSAGES.PLAYED;

            }            

        },
        changeBet = function (amount, gambler) {

            gambler.bet += amount;

        },       
        isDealersTurn = function () {

            var result = true;

            for (var indexGambler = 0; indexGambler < gamblers.length; indexGambler++) {

                result = result && gamblers[indexGambler].hasPlayed;

            }

            return result;            

        },
        _createGamblers = function () {
                                   
            for (var index = 0; index < options.numberOfPlayers; index += 1) {

                gamblers.push(new Gambler(index, options, configurationService.GAMBLERSTATUSMESSAGES.PLACEYOURBETS));

            }

        },
        _resetCards = function () {

            //reset gambler hands
            for (var indexGambler = 0; indexGambler < gamblers.length; indexGambler += 1) {

                gamblers[indexGambler].reset();

            }

            //reset dealer hand
            dealer.hand.reset();
                       
        },
        playDealer = function () {

            var allGamblersBust = true, indexGambler = 0;            

            for (indexGambler = 0; indexGambler < gamblers.length; indexGambler++) {
                allGamblersBust = allGamblersBust && (gamblers[indexGambler].hand.score > 21);
            }

            if (allGamblersBust) {

                //Populate all gamblers with LOSER message
                for (indexGambler = 0; indexGambler < gamblers.length; indexGambler++) {

                    gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.LOSER;

                }
            }//blackJack consideration : Check if dealer has a natural blackjack. If another player has a natural blackjack then display Push(tie). Don't discount credits. If they don't then they lose
            else if (dealer.hand.score === 21 && dealer.hand.cards.length === 2) {

                for (indexGambler = 0; indexGambler < gamblers.length; indexGambler++) {

                    if (gamblers[indexGambler].hand.score === 21 && gamblers[indexGambler].hand.length === 2) {

                        gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.PUSH;

                    }
                    else {

                        gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.LOSER;

                    }
                }
            }
            else {

                //check if the score is Less than 17. If it is then hit until 17 or greater.
                while (dealer.hand.score < 17) {

                    hit(dealer);
                    uiService.addCard(dealer.hand.cards[dealer.hand.cards.length - 1]);
                    uiService.populateDealerSummary(dealer.hand.score);

                };

                for (indexGambler = 0; indexGambler < gamblers.length; indexGambler++) {


                    if (dealer.hand.score > 21) { //if the dealer is bust and a gambler is bust then the gambler loses

                        if (gamblers[indexGambler].hand.score > 21) {

                            gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.LOSER;
                        }
                        else {

                            gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.WINNER;
                        }

                    }
                    else if (gamblers[indexGambler].hand.score <= 21) { // if the Gabler is not bust and dealer not bust

                        if (gamblers[indexGambler].hand.score > dealer.hand.score) {

                            gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.WINNER;

                        }
                        else if (gamblers[indexGambler].hand.score === dealer.hand.score) {

                            gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.PUSH;

                        }
                        else {

                            gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.LOSER;

                        }
                    }
                    else { // if the Gabler is bust and dealer not bust

                        gamblers[indexGambler].status = configurationService.GAMBLERSTATUSMESSAGES.LOSER;

                    }

                }

            }
        },
        calculateCredits = function () {

            var indexGambler = 0;

            for (indexGambler = 0; indexGambler < gamblers.length; indexGambler++) {

                switch (gamblers[indexGambler].status) {

                    case configurationService.GAMBLERSTATUSMESSAGES.WINNER: gamblers[indexGambler].credits = gamblers[indexGambler].credits + gamblers[indexGambler].bet;
                        break;

                    case configurationService.GAMBLERSTATUSMESSAGES.LOSER: (gamblers[indexGambler].credits - gamblers[indexGambler].bet) < 0 ? gamblers[indexGambler].credits = 0 : gamblers[indexGambler].credits = (gamblers[indexGambler].credits - gamblers[indexGambler].bet);
                        break;

                    default: break;
                }

            }
        },
        _reShuffleCards = function () {

            var indexGambler = 0, indexCard = 0;

            dealerShoeService.loadDealerShoe();

            //remove any cards already dealt
            for (indexGambler = 0; indexGambler < gamblers.length; indexGambler++) {

                for (indexCard = 0; indexCard < gamblers[indexGambler].hand.cards.length; indexCard++) {
                    
                    dealerShoeService.removeCard(gamblers[indexGambler].hand.cards[indexCard]);
                }
            }

            for (indexCard = 0; indexCard < dealer.hand.cards.length; indexCard++) {
            
                if (dealer.hand.cards[indexCard] === card) {

                    dealerShoeService.removeCard(dealer.hand.cards[indexCard]);

                }
            }

        };

    return {

        startBoardGame: startBoardGame,
        resetBoardGame: resetBoardGame,
        deal: deal,
        hit: hit,
        stand: stand,
        changeBet: changeBet,
        isDealersTurn: isDealersTurn,
        playDealer: playDealer,
        calculateCredits: calculateCredits

    };

});