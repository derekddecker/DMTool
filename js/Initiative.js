var Initiative = DataObject.extend({
    init : (function(hash){
        this._super( hash );
    }),
    defaults:{
        "Score" : 0,
        "Misc" : 0,
        "Roll" : 0,
        "Total" : 0
    }
});