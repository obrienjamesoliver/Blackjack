define(['configurationservice'], function (configurationService) {

    var startingCredits = configurationService.DEFAULTOPTIONS.STARTINGCREDITS,
        numberOfPlayers = configurationService.DEFAULTOPTIONS.NUMBEROFPLAYERS,
        maxPlayers = configurationService.DEFAULTOPTIONS.MAXPLAYERS,
        maxBet = configurationService.DEFAULTOPTIONS.MAXBET,
        minBet = configurationService.DEFAULTOPTIONS.MINBET,
        numberOfDecks = configurationService.DEFAULTOPTIONS.NUMBEROFDECKS,
        init = function (opts) {

            this.startingCredits = opts.startingCredits || configurationService.DEFAULTOPTIONS.STARTINGCREDITS;
            this.numberOfPlayers = opts.numberOfPlayers || configurationService.DEFAULTOPTIONS.NUMBEROFPLAYERS;
            this.maxBet = opts.maxBet || configurationService.DEFAULTOPTIONS.MAXBET;
            this.minBet = opts.minBet || configurationService.DEFAULTOPTIONS.MINBET;
            this.numberOfDecks = opts.numberOfDecks || configurationService.DEFAULTOPTIONS.NUMBEROFDECKS;

        };

    return {

        startingCredits: startingCredits,
        numberOfPlayers: numberOfPlayers,
        maxBet: maxBet,
        minBet: minBet,
        numberOfDecks: numberOfDecks,
        init: init

    };

});