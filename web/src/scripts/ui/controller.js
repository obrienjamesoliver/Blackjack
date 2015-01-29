define(['jquery', 'uiservice', 'boardgameservice', 'configurationservice', 'boardgame', 'options'], function ($,uiService, boardGameService, configurationService, boardGame, options) {

        var gamblers = boardGame.gamblers,
            dealer = boardGame.dealer,     
            saveOptions = function () {

                options.init(uiService.getCustomOptions());

            },
            populateOptions = function () {
               
                uiService.populateOptions();

            },
            playGame = function () {

                boardGameService.startBoardGame();

                uiService.initializePlayingFields();

                _populateAllGamblersSummaries();

                uiService.populateDealerSummary(0);

                uiService.enableGamblerBetButtons();

            },            
            quitGame = function () {

                //reset everything except options.
                boardGameService.resetBoardGame();
                uiService.clearPlayingFields();
                uiService.resetCards();

            },           
            deal = function () {

                //reset UI
                uiService.resetCards();                

                //deal cards
                boardGameService.deal();

                //show initial gambler and deal cards
                uiService.dealCards();

                _populateAllGamblersSummaries();
                uiService.populateDealerSummary(0);

                uiService.disableGamblerBetButtons();
            },
            changeBet = function (event) {

                var indexGambler = event.target.id.slice(-1);
                
                boardGameService.changeBet(event.data.amount, gamblers[indexGambler]);

                _populateGamblerSummary(indexGambler);

            },
            hit = function (event) {

                var indexGambler = event.currentTarget.id.slice(-1), gambler;

                gambler = gamblers[indexGambler];
                
                boardGameService.hit(gambler);

                uiService.addCard(gambler.hand.cards[gambler.hand.cards.length - 1], indexGambler);

                _populateGamblerSummary(indexGambler);

                if (gambler.hand.score > 21) //if gambler bust then stand
                {
                    stand(event);                    
                }

            },
            stand = function (event) {

                var indexGambler = event.currentTarget.id.slice(-1), gambler,
                    isDealersTurn = false;

                gambler = gamblers[indexGambler];
                    
                boardGameService.stand(gambler);

                _populateGamblerSummary(indexGambler);

                uiService.disableGamblerButtons(event);

                if (boardGameService.isDealersTurn()) {

                    playDealer();

                }

            },
            playDealer = function () {
               
                uiService.removeDealerCardBack(); // remove the card showing the back
                uiService.addCard(dealer.hand.cards[1]); //Display the hidden card for the dealer
                // display dealer score
                uiService.populateDealerSummary(dealer.hand.score);

                boardGameService.playDealer();
                                
                // Update Credits based on Results
                boardGameService.calculateCredits();

                _populateAllGamblersSummaries();
                uiService.populateDealerSummary(dealer.hand.score);
                    
            },
            _populateAllGamblersSummaries = function () {

                for (var indexGambler = 0; indexGambler < gamblers.length; indexGambler += 1) {
                     _populateGamblerSummary(indexGambler);
                }

             },
            _populateGamblerSummary = function (indexGambler) {

                uiService.populateGamblerSummary(indexGambler);
                
            };


        return {

            playGame: playGame,
            quitGame: quitGame,
            populateOptions: populateOptions,
            saveOptions: saveOptions,
            deal: deal,
            changeBet: changeBet,
            hit: hit,
            stand: stand

        };
    
});