var Enemy = DataObject.extend({
    init : (function(hash){
        this._super( hash );
        this.onChange();
        this.ClassName = 'Enemy';
    }),
    defaults:{
        "CharacterName" : 'Enemy',
        "PCFacingName" : '(ie: Skeleton 1)',
        "HP" : 0,
        "MaxHP" : 0,
        "Conditions" : [],
        "XPValue" : 0,
        "TypeRevealed" : false,
        "isBloodied" : false,
        "isDead" : false,
        "Defenses" : [
            {"Name":'AC'},
            {"Name":'FORT'},
            {"Name":'REF'},
            {"Name":'WILL'}
        ]
    },

    "addConditions" : (function(conditions){
        for(var i in conditions){
            this.addCondition(conditions[i]);
        }
    }),

    "addCondition" : (function(condition){
        var c = $.extend({},condition); //make sure it's a unique instance
        this.addNestedObject(c, 'Conditions', 'Name');
    }),

    "removeCondition" : (function(condition){
        this.removeNestedObject(condition, 'Conditions', 'Name');
    }),

    "removeConditionWithIndex" : (function(index){
        this.Conditions.splice(index,1);
    }),

    "setHP" : (function(val){
        if(!Util.Validate.PositiveNumber(val)){
            alert('Invalid HP entered! ' + val);
            return false;
        }
        this.HP = parseInt( val );
    }),

    "hit" : (function(damage){
        if($.trim(damage) === ''){ damage = 0; }
        this.HP = ( parseInt(this.HP) - parseInt(damage));
        if(parseInt(this.HP) <= (parseInt(this.MaxHP) / 2)) this.isBloodied = true;
        else this.isBloodied = false;
        if(parseInt(this.HP) <= 0) this.isDead = true;
        else this.isDead = false;
        this.onChange();
    }),

    "setXPValue" : (function(val){
        if(!Util.Validate.PositiveNumber(val)){
            alert('Invalid XP Value entered! ' + val);
            return false;
        }
        this.XPValue = parseInt( val );
    }),

    "addDefense" : (function(obj){
        var o = (obj instanceof window.Defense) ?
            obj : (typeof obj === 'object') ? new window.Defense(obj) : false;

        if(o) this.addNestedObject(o, 'Defenses', 'Name');
        return this;
    }),

    "setDefenses" : (function(array){
        for(var i in array){
            this.addDefense( array[i] );
        }
    }),

    "onChange" : (function(){
        if( this.MaxHP ==0 ) this.MaxHP = parseInt( this.HP );
        if(DMTool.controller)
        {
            DMTool.controller.EncounterWorker.postMessage();
        }
    })
});