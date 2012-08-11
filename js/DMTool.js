var DMTool = DataObject.extend({

    init: (function(hash){
        this._super( hash );
    }),
    defaults: {
        "Players" : [],
        "Mobs" : []
    },

    addPlayer : (function(obj){
        var o = (obj instanceof window.Player) ?
            obj : (typeof obj === 'object') ? new window.Player(obj) : false;

        if(o)
        {
            this.addNestedObject(o, 'Players', 'CharacterName');
            PlayerMediator.RegisterPlayer(o);
        }
        return this;
    }),

    setPlayers : (function(players){
        for(var i in players){
            this.addPlayer( players[i] );
        }
    }),

    removePlayer : (function(player){
        this.removeNestedObject(player,  'Players', 'CharacterName');
        PlayerMediator.RemovePlayer(player);
    }),

    addMob : (function(obj){

        var o = (obj instanceof Mob) ?
            obj : (typeof obj === 'object') ? new Mob(obj) : false;

        if(o)
        {
            MobMediator.RegisterPlayer(o);
            this.addNestedObject(o, 'Mobs');
        }
        return this;
    }),

    setMobs : (function(mobs){
        for(var i in mobs){
            this.addMob( mobs[i] );
        }
    }),

    removeMob : (function(mob){
        this.removeNestedObject(mob,  'Mobs');
        MobMediator.RemovePlayer(mob);
    }),

    getPlayerWithRealName : (function(name){
        for(var Player in this.Players) if(this.Players[Player].RealName == name) return this.Players[Player];
        return false;
    })

});