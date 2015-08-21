define(['jquery', 'boardgame', 'options', 'card', 'configurationservice', 'gamblerService'], function ($, boardGame, options, Card, configurationservice, gamblerService) {

    var gamblers = boardGame.gamblers,
        dealer = boardGame.dealer,
        startingCredits = $("#startingCredits"),
        numberOfPlayers = $("#numPlayers"),
        maxBet = $("#maxBet"),
        minBet = $("#minBet"),
        numberOfDecks = $("#numberOfDecks"),
        addCard = function (card, indexGambler) {

            if (card) {
                if (indexGambler || indexGambler === 0) {

                    $("#playerCardsArea" + indexGambler).append('<img id="' + card.faceValue + '" src="images/' + card.faceValue + '.png" class="card">');

                }
                else {

                    $("#dealerCardsArea").append('<img id="' + card.faceValue + '" src="images/' + card.faceValue + '.png" class="card">');

                }
            }
        },
        removeDealerCardBack = function () {

            $("#cardback").remove();

        },
        resetCards = function () {

            $(".cardArea").empty();

        },
        populateGamblerSummary = function (indexGambler) {

            $("#playerScore" + indexGambler).text("Score: " + gamblers[indexGambler].hand.score);
            $("#playerBet" + indexGambler).text("Bet: " + gamblers[indexGambler].bet);
            $("#playerCredits" + indexGambler).text("Credits: " + gamblers[indexGambler].credits);
            $("#playerResult" + indexGambler).text(gamblers[indexGambler].status);

        },
        populateDealerSummary = function (score) {

            $("#dealerScore").text("Score: " + score);

        },
        initializePlayingFields = function () {

            //hide all gamblerfields
            for (var indexPlayerField = 0; indexPlayerField < 3; indexPlayerField++) {

                $("#playerField" + indexPlayerField).hide();

            }

            //show only gamblerfields for the number of players in options
            for (var indexGambler = 0; indexGambler < options.numberOfPlayers; indexGambler += 1) {

                $("#playerField" + indexGambler).show();

            }

        },
        getCustomOptions = function () {

            var customOptions = {
                numberOfPlayers: Number(numberOfPlayers.val()),
                startingCredits: Number(startingCredits.val()),
                maxBet: Number(maxBet.val()),
                minBet: Number(minBet.val()),
                numberOfDecks: Number(numberOfDecks.val())
            };

            return customOptions;

        },
        populateOptions = function () {

            numberOfPlayers.val(options.numberOfPlayers);
            startingCredits.val(options.startingCredits);
            maxBet.val(options.maxBet);
            minBet.val(options.minBet);
            numberOfDecks.val(options.numberOfDecks);

        },
        dealCards = function () {

            var indexGambler, indexGamblerCards;
            //show gambler initial cards
            for (indexGambler = 0; indexGambler < gamblers.length; indexGambler += 1) {

                for (indexGamblerCards = 0; indexGamblerCards < 2; indexGamblerCards += 1) {

                    addCard(gamblers[indexGambler].hand.cards[indexGamblerCards], indexGambler);

                }
            }

            //show dealer initial cards. Only show one card until it is the dealers turn
            addCard(dealer.hand.cards[0]);
            addCard(new Card(0, '', 'cardback'));

        },
        toggleButton = function (enable, button) {
            
            if (enable) {

                button.removeAttr('disabled');
            }
            else {
                if (button.attr('disabled') !== 'disabled') {
                    button.attr('disabled', 'disabled');
                }
            }
        },
        toggleAllGamblerButtons = function () {

            var indexGambler,
                btnPlayerIncreaseBet,
                btnPlayerDecreaseBet,
                btnPlayerHit,
                btnPlayerStand,
                canPlay,
                gambler;

            for (indexGambler = 0; indexGambler < options.numberOfPlayers; indexGambler += 1) {
                gambler = gamblers[indexGambler];
                canPlay = gamblerService.canPlay(gambler);

                btnPlayerDecreaseBet = $("#btnPlayerDecreaseBet" + indexGambler);
                btnPlayerIncreaseBet = $("#btnPlayerIncreaseBet" + indexGambler);
                btnPlayerHit = $("#btnPlayerHit" + indexGambler);
                btnPlayerStand = $("#btnPlayerStand" + indexGambler);

                
                toggleButton(gamblerService.canIncreaseBet(gambler), btnPlayerIncreaseBet);
                toggleButton(gamblerService.canDecreaseBet(gambler), btnPlayerDecreaseBet);
                toggleButton(canPlay, btnPlayerHit);
                toggleButton(canPlay, btnPlayerStand);

            }
        },
        toggleQuitDeal = function (enable) {

            var btnPlayerDeal,
                btnQuitGame;

            btnPlayerDeal = $("#btnPlayerDeal");
            btnQuitGame = $("#btnQuitGame");

            toggleButton(enable, btnPlayerDeal);
            toggleButton(enable, btnQuitGame);

        };

    return {

        addCard: addCard,
        resetCards: resetCards,
        removeDealerCardBack: removeDealerCardBack,
        populateGamblerSummary: populateGamblerSummary,
        populateDealerSummary: populateDealerSummary,
        initializePlayingFields: initializePlayingFields,
        getCustomOptions: getCustomOptions,
        populateOptions: populateOptions,
        dealCards: dealCards,
        toggleAllGamblerButtons: toggleAllGamblerButtons,
        toggleButton: toggleButton,
        toggleQuitDeal: toggleQuitDeal
    };

});