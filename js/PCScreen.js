/**
 * This script registers itself to receive messages from the EncounterWorker.js
 * web worker. It just renders a simple Player Character facing screen of the
 * current encounter information, including Initiative order, bloodied state of
 * enemies, and conditions.
 */
(function($){

    var worker = new SharedWorker('js/EncounterWorker.js'),
        encounter = false,
        PCScreen = this;

    PCScreen.Tmpl = {
        TmplCache : {},
        TmplList: {
            'PCScreen' : (function(result){

            })
        },
        LoadTemplates: (function(callback){
            $.each(this.TmplList, function(i){
                var ct = i;

                $.ajax({
                    url:'jqtmpl/'+ct+'.html',
                    cache:false,
                    type:'GET',
                    success:function(template){
                        $('head').append('<script type="text/x-jquery-tmpl" id="'+ct+'">'+template+'</script>');
                        PCScreen.Tmpl.TmplCache[ ct ] = template;
                        if(Util.GetObjectSize(PCScreen.Tmpl.TmplList) === Util.GetObjectSize(PCScreen.Tmpl.TmplCache)) callback();
                    }
                })
            })
        }),
        RenderTemplate: (function(TemplateName, Object, Callback, Params){
            var result = $.tmpl(this.TmplCache[ TemplateName ], Object);
            var postRenderCallback = this.TmplList[TemplateName]( result, Object, Params );
            if(Callback) Callback( result, postRenderCallback );
        })
    };

    PCScreen.View = {
        "PrepareNewEncounter" : (function(){
            $('#data').fadeOut('slow', View.StackPlayers)
        }),
        "EncounterUpdated" : (function(){
            var data = $('#data').empty();
            PCScreen.Tmpl.RenderTemplate('PCScreen',encounter, function(result, callback){
                data.append(result);
            });
        }),
        "StackPlayers" : (function(){
            //render the player initiative order out in a stack
            View.EncounterUpdated();
            $('#data').fadeIn('slow');
        })
    };

    PCScreen.initialize = (function(){
        worker.port.onmessage = function(e) {
            //Util.trace("Worker said:", e.data);
            if(e.data.Encounter)
            {
                if(!encounter)
                {
                    encounter = JSON.parse( e.data.Encounter );
                    //Util.trace( 'New Encounter ', encounter );
                    View.PrepareNewEncounter();
                }else{
                    Util.trace( 'Existing Encounter Updated', encounter );
                    encounter = JSON.parse( e.data.Encounter );
                    View.EncounterUpdated();
                }
            }
        };
        worker.port.start();
    })

    PCScreen.Tmpl.LoadTemplates(PCScreen.initialize);

})(jQuery)