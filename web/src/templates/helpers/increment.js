define('templates/helpers/increment', ['hbs/handlebars'], function (handlebars) {
    function increment(index) {
        return index + 1;
    }

    handlebars.registerHelper("increment", increment);
    return increment;
});