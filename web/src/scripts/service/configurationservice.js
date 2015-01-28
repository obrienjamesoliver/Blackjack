define(function () {

    //VALIDATION
    var validation_message_max_players = "The maximum number of players is",
        validation_options_max_players = 3,
        validation_message_min_bet = "The minimum bet is",
        validation_options_min_bet = 1,
        validation_message_max_bet = "The maximum bet is",
        validation_options_max_bet = 20,
        validation_message_max_less_than_min = "The max bet cannot be less than the minimum bet.",
        validation_message_min_greater_than_max = "The minimum bet cannot be greater than the max bet.";

    return {

        GAMBLERSTATUSMESSAGES: {
            WINNER: 'Player wins',
            LOSER: 'Player loses',
            PUSH: 'Push',
            PLACEYOURBETS: 'Place your bets',
            PLAYING: 'Playing',
            PLAYED: 'Played',
            BUST: 'Bust'
        },
        NUMBEROFSHUFFLES: 10,
        SUITS: {
            SPADE: 'spade',
            CLUB: 'club',
            HEART: 'heart',
            DIAMOND: 'diamond'
        },
        DEFAULTOPTIONS: {
            STARTINGCREDITS: 100,
            NUMBEROFPLAYERS: 1,
            MAXPLAYERS: 3,
            MAXBET: 20,
            MINBET: 1,
            NUMBEROFDECKS: 1
        },
        VALIDATIONS: {
            BETS: {
                VALUES: {
                    MINBET: validation_message_min_bet,
                    MAXBET: validation_options_max_bet
                },
                MESSAGES: {
                    MINBET: validation_message_min_bet,
                    MAXBET: validation_message_max_bet,
                    MAXLESSMIN: validation_message_max_less_than_min,
                    MINGREATERMAX: validation_message_min_greater_than_max
                }
            },
            PLAYERS: {
                VALUES: {
                    MAXPLAYERS: validation_options_max_players
                },
                MESSAGES: {
                    MAXPLAYERS: validation_message_max_players

                }
            }
        }
    };


});