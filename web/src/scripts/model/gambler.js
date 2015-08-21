define(['configurationservice', 'player', 'hand'], function (configurationService, Player, Hand) {

    function Gambler(id, options, statusMessage) {

        var that = Player();

        that.hand = new Hand(),
        that.isDealer = false;
        that.bet = options.minBet || configurationService.DEFAULTOPTIONS.MINBET;
        that.credits = options.startingCredits || configurationService.DEFAULTOPTIONS.STARTINGCREDITS,
        that.hasPlayed = false,
        that.status = statusMessage || configurationService.GAMBLERSTATUSMESSAGES.PLACEYOURBETS,
        that.reset = function () {

            that.hand.reset();
            that.hasPlayed = false;
            that.status = configurationService.GAMBLERSTATUSMESSAGES.PLACEYOURBETS;

        };

        return that;
    }

    return Gambler;

});