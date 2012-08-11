/**
 * This is a shared web-worker which controller will post messages to
 * and any other scripts can poll it for updates on the game,
 * or they can register with the worker to receive pushed messages.
 * This provides an API for a front-end display to render encounter
 * data to a Player Character facing monitor, while the DM works
 * with the DM data available only to him.
 */

(function(s){

    var Encounter = {},
        connections = 0,
        ports = [],
        postMessageToAllPorts = (function(message){
            for(var i in ports)
            {
                ports[i].postMessage( message );
            }
        })

    s.addEventListener("connect", function (e) {
        var port = e.ports[0];
        ports.push( port );
        connections++;
        port.addEventListener("message", function (e) {
            port.postMessage("Hello " + e.data + " (port #" + connections + ")");
            postMessageToAllPorts( ' Welcome to new user #' + connections + "!" );
            if(e.data.Encounter)
            {
                port.postMessage("Encounter passed! " + e.data.Encounter.Name);
                Encounter = e.data.Encounter;
                postMessageToAllPorts( e.data );
            }
            s.postMessage('Done.')
        }, false);
        port.start();
    }, false);

})(self)