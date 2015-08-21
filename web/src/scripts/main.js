require.config({
    baseUrl: 'scripts',
    paths: {

        'jquery': 'libraries/jquery-1.11.1.min',
        'configurationservice': 'service/configurationservice',
        'gamblerService' : 'service/gamblerservice',
        'card': 'model/card',
        'hand': 'model/hand',
        'dealershoe': 'model/dealerShoe',
        'player': 'model/player',
        'gambler': 'model/gambler',
        'boardgame': 'model/boardgame',
        'options': 'model/options',
        'handservice' : 'service/handservice',
        'dealershoeservice': 'service/dealershoeservice',
        'uiservice': 'service/uiservice',
        'boardgameservice': 'service/boardgameservice',
        'controller': 'ui/controller',
        'app': 'ui/app',
        'hbs': '../../build/node_modules/require-handlebars-plugin/hbs',
        'templates': '../templates'
    }
});

require(['app']);
