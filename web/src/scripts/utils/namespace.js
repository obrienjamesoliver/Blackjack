// JavaScript Namespaces for BLACKJACK
// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
function extendNamespace(ns, namespace) {
    var parts = namespace.split('.'),
        parent = ns,
        pl,
        i;
    if (parts[0] == "BLACKJACK") {
        parts = parts.slice(1);

        pl = parts.length;
        for (i = 0; i < pl; i++) {
            //create a property if it doesnt exist
            if (typeof parent[parts[i]] == 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
    }
}

var BLACKJACK = BLACKJACK || {};
extendNamespace(BLACKJACK, 'BLACKJACK.ui')
extendNamespace(BLACKJACK, 'BLACKJACK.model');
extendNamespace(BLACKJACK, 'BLACKJACK.service');// The global object added to the window
                      // Put everything for this app under the BLACKJACK namespace

         

