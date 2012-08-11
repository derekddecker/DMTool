var Mob = DataObject.extend({
    init : (function(hash){
        this._super( hash );
        this.ClassName = 'Mob';
    }),
    defaults:{
        "Label" : '',
        "Enemies" : [],
        "Initiative" : new Initiative,
        "Page" : 0,
        "XPValue" : 0
    },

    addEnemy : (function(obj){
        var o = (obj instanceof Enemy) ?
            obj : (typeof obj === 'object') ? new Enemy(obj) : false;

        if(o)
        {
            this.addNestedObject(o, 'Enemies', 'CharacterName');
            this.XPValue += o.XPValue;
            MobMediator.onPlayerChange(this);
        }
        return this;
    }),

    setEnemies : (function(players){
        for(var i in players){
            this.addEnemy( players[i] );
        }
    }),

    removeEnemy : (function(enemy){
        this.removeNestedObject(enemy,  'Enemies', 'CharacterName');
        MobMediator.onPlayerChange(this);
    }),

    OnChange : (function(mob){
        for(var i in this.Enemies) this.Enemies[i].onChange();
    })
});