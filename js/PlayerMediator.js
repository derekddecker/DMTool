var Mediator = (function(type){

    var type = (type) ? type : 'Player';

    return {

        _type : type,

        Players : [],

        RegisterPlayer : (function(player){
            this.RemovePlayer(player);
            this.Players.push(player);
            if(DMTool.controller)
            {
                this.onPlayerChange(player)
                //DMTool.controller.views.dispatchChange(this._type+'s', DMTool);
            }
        }),

        /**
         * @return int The index within this.Players of the player, or -1
         */
        GetMatchingPlayer : (function(player){
            for(var p in this.Players){
                if( this.Players[p] === player ){
                    return p;
                }
            }
            return -1;
        }),

        RemovePlayer : (function(player){
            var playerIndex = this.GetMatchingPlayer(player),
                player = (playerIndex > -1) ? this.Players[playerIndex] : false;

            if(player)
            {
                this.Players.splice(player,1);

                //update to an available player
                if(DMTool.controller)
                {
                    DMTool.controller.CurrentPlayer = (DMTool.Players.length) ? DMTool.Players[0] : false;
                    this.DispatchChanges(DMTool.controller.CurrentPlayer);
                }
            }
            return;
        }),

        onPlayerChange : (function(player){
            var playerIndex = this.GetMatchingPlayer(player),
                player = (playerIndex > -1) ? this.Players[playerIndex] : false;
            if(player)
            {
                Util.trace(player, 'Just changed! Do some stuff!', this.Players);
                player.OnChange();
                this.DispatchChanges(player);
            }
        }),

        DispatchChanges : (function(player){
            if(DMTool.controller)
            {
                DMTool.controller.views.dispatchChange(this._type, player);
                DMTool.controller.views.dispatchChange(this._type+'s', DMTool);
            }
        })
    };

}),

    PlayerMediator = new Mediator('Player'),

    MobMediator = new Mediator('Mob');