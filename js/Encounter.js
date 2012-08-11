var Encounter = DataObject.extend({
    init : (function(hash){
        this._super( hash );
        this.Players = [];
        this.DeadMobs = [];
        this.EncounterPlayers = [];
        this.EncounterMobs = [];
        this.EncounterPCs = [];
    }),
    defaults:{
        "Players" : [], //this holds all players configured in the setup
        "EncounterPlayers" : [], //this holds the actual players involved in the encounter
        "EncounterMobs" : [],
        "EncounterPCs" : [],
        "InitiativeEntered" : false, //tracks whether initiative has been rolled
        "DeadMobs" : [],
        "XPValue" : 0
    },
    "setPlayers" : (function(players){
        for(var i in players)
            this.addPlayer(players[i]);
    }),
    "addPlayer" : (function(obj){
        var p = obj.clone();
        if(!p.hasOwnProperty('Label')) p.Label = p.CharacterName;
        this.Players.push(p);
        return this;
    }),
    "addPlayers" : (function(players){
        this.setPlayers(players);
    }),
    "revealEnemy" : (function(enemy){
        for(var i in this.EncounterMobs)
        {
            var m = this.EncounterMobs[i].Enemies;
            for(var j in m)
            {
                if(m[j] === enemy)
                {
                    m[j].TypeRevealed = true;
                    return;
                }
            }
        }
    }),
    "killPlayer" : (function(player){
        this.removeNestedObject(player, 'EncounterPlayers');
        for(var i in this.EncounterMobs)
        {
            this.EncounterMobs[i].removeNestedObject(player, 'Enemies');
            if(this.EncounterMobs[i].Enemies.length === 0)
            {
                this.killMob(this.EncounterMobs[i]);
            }
        }
    }),
    "killMob" : (function(mob){
        this.DeadMobs.push( mob );
        this.removeNestedObject(mob, 'EncounterMobs');
        this.removeNestedObject(mob, 'EncounterPlayers');
    }),
    "setRoll" : (function(roll){
        this.Roll = parseInt( roll );
    }),
    "initiativeSort" : (function(){
        this.EncounterPlayers.sort( function(a, b){ return parseInt(b.Initiative.Total) - parseInt(a.Initiative.Total); } );
    }),
    "Next" : (function(){
        this.EncounterPlayers.push( this.EncounterPlayers.shift() );
    }),
    "Previous" : (function(){
        this.EncounterPlayers.unshift( this.EncounterPlayers.pop() );
    }),
    "JumpToTurn" : (function(index){
        //just run Next() as many times as the index provided
        for(var i=0;i<index;i++) this.Next();
    }),
    "ValidateEncounterPlayers" : (function(){
        var havePlayer = false,
            haveEnemy = false;
        for(var i in this.Players)
        {
            var p = this.Players[i];
            if(p.EncounterPlayer && p.hasOwnProperty('RealName')) havePlayer = true;
            if(p.EncounterPlayer && p.hasOwnProperty('Enemies')) haveEnemy = true;
        }
        return (havePlayer && haveEnemy);
    }),
    "ValidateInitiativeRolls" : (function(){
        //return true (success) or false
        for(var i in this.Players)
        {
            var p = this.Players[i];
            if(p.EncounterPlayer && ( !p.Initiative.Total || isNaN( parseInt(p.Initiative.Total) ) || parseInt(p.Initiative.Total) < 1)) return false;
        }
        return true;
    }),
    "InitializePlayers" : (function(){
        //important to keep in mind that the objects in this.EncounterPCs, this.EncounterMobs, & this.EncounterPlayers
        //Are all references to the same objects, so if one gets changed, it is reflected in this.EncounterPlayers as well
        for(var i in this.Players)
        {
            var p = this.Players[i];
            if(p.EncounterPlayer) this.EncounterPlayers.push(p);
            if(p.EncounterPlayer && p.hasOwnProperty('RealName')) this.EncounterPCs.push(p);
            if(p.EncounterPlayer && p.hasOwnProperty('Enemies')){
                this.EncounterMobs.push(p);
                this.XPValue += parseInt( p.XPValue );
            }
        }

        //Sort based on initiative
        this.initiativeSort();
    })
});