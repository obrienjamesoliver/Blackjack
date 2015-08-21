define(['configurationservice', 'options'], function (configurationservice, options) {

    var canIncreaseBet = function (gambler) {

        return gambler.bet < options.maxBet && gambler.bet < gambler.credits && _isReadyToBet(gambler);

        },
        canDecreaseBet = function (gambler) {

            return !(gambler.bet === options.minBet || gambler.credits <= 0 || !_isReadyToBet(gambler));

        },
        _isReadyToBet = function (gambler) {

        return gambler.status === configurationservice.GAMBLERSTATUSMESSAGES.PLACEYOURBETS || 
               gambler.status === configurationservice.GAMBLERSTATUSMESSAGES.PUSH ||
               gambler.status === configurationservice.GAMBLERSTATUSMESSAGES.LOSER || 
               gambler.status === configurationservice.GAMBLERSTATUSMESSAGES.WINNER;
               
        },
        canPlay = function (gambler) {

            return gambler.status === configurationservice.GAMBLERSTATUSMESSAGES.PLAYING;

        },
        resetGambler = function (gambler) {

            gambler.reset()

        };

    return {

        canIncreaseBet: canIncreaseBet,
        canDecreaseBet: canDecreaseBet,
        canPlay: canPlay,
        resetGambler: resetGambler

    }

});