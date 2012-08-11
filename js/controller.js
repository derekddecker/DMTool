(function(w){
    w.add_new_player = (function(data){
        var controller = DMTool.controller,
            data = Util.GetHashFromSerializedArray(data),
            NewPlayer = new Player(data);
        DMTool.addPlayer(NewPlayer);
        controller.ToggleAddCharacterForm(); //close the form up
        $('#player-add-form').trigger('reset'); //clear the form up
    })
}(window));


DMTool.controller =
{
    CurrentPlayer : {},
    TmplCache : {},
    EncounterWorker : {
        "worker" : false,
        "init" : (function(){
            /**
             * Setup our web worker so any listening processes may observe our game
             */
            if(typeof SharedWorker !== 'undefined')
            {
                this.worker = new SharedWorker('js/EncounterWorker.js');
                this.worker.port.start();
            }
        }),
        "postMessage" : (function(message){
            if(this.worker && DMTool.controller.CurrentEncounter)
                this.worker.port.postMessage({"Encounter":DMTool.controller.CurrentEncounter.stringify()});
        })
    },

    ConfigKeyBindings : (function(){

        /**
         * This is pretty straight-forward... we're binding to the keydown event on the document.
         * Whenever this event fires, we will check DMTool.controller.KeyBindings against the
         * key that was pressed (in combination with 'Ctrl'+'Shift'), to fire the event that it's mapped to.
         */
        $(document).bind('keydown',(function (e) {
            if(e.shiftKey && e.ctrlKey) e.preventDefault();
            for(var i in DMTool.controller.KeyBindings){
                if(e.shiftKey && e.ctrlKey && e.which === parseInt(i)) DMTool.controller.KeyBindings[i]();
            }
        }));

    }),

    CreateDropDownFromObjectCollection: (function(select_id, collection, selected, context){
        var $select_box = $('#'+select_id, context),
            options = '',
            sel = (typeof selected === 'undefined') ? false : selected;

        $.each(collection,function(i){
            var selected = (collection[i] === sel) ? 'selected' : '';
            options += '<option value="'+collection[i]+'" '+selected+'>'+collection[i]+'</option>';
        });

        $select_box.append(options);
    }),

    BootStrap: (function(){

        /** Bind the event handlers for any buttons **/
        $('#add-character,#player-add-form button.close').on('click',this.ToggleAddCharacterForm);
        this.CreateDropDownFromObjectCollection('Race',PlayerUtil.ValidRaces);
        this.CreateDropDownFromObjectCollection('Class',PlayerUtil.ValidClasses);

        /** have 'close' buttons reset the form they are closing **/
        $('#tool').delegate('button.close','click',function(){
            $(this).parents('form:first').trigger('reset');
        })

        /** make sure form submissions don't double fire **/
        $('#tool').delegate('button','click',function(e){
            e.preventDefault();
        })

        /** make sure that <button/> elements work on all browsers. **/
        $('#tool').delegate('button.submit','click',function(){
            $(this).parents('form:first').trigger('submit');
            return false;
        })

        /**
         * Overwrite the default form submit handler.
         * Let javascript handle form submissions.
         *
         * If a 'callback' attribute is set on the form, then that function will be
         * called when the form is submitted. It must be a callback available in the
         * window (global) namespace as of now. It will pass in a serialized json object
         * of all the form fields.
         **/
        $('#tool').delegate('form','submit',function(){
            var $form = $(this),
                callback = $form.data('callback');
            if(callback && window[callback]) window[callback]( $form.serializeArray() );
            return false;
        })
        DMTool.controller.EncounterWorker.init();
    }),

    ToggleAddCharacterForm: (function(){
        if(!$('#player-add-form').is(':visible'))
            $('#player-add-form').slideDown().find('input:first').trigger('focus')
        else
            $('#player-add-form').slideUp()
    }),

    //key(template file name) => onLoadCallback function, passed the result of the template rendering (not yet applied to the DOM)
    //any return value will be executed after the template is rendered to the DOM
    TmplList: {
        'SkillTable' : (function(result){

        }),
        'CharacterList' : (function(result){

            var _c = DMTool.controller;

            result.find('li').each(function(){
                $(this).on('click',function(){
                    $('#character-list li').removeClass('selected');
                    $(this).addClass('selected');
                    switch($(this).data('type'))
                    {
                        case 'Mob':
                        {
                            _c.ToggleCharacterListVisibility(false);
                            $('#detailed-info').empty();
                            _c.LoadAddMobMenu( DMTool.Mobs[ $(this).attr('rel') ] )
                            break;
                        }
                        case 'Player':
                        {
                            _c.ToggleCharacterListVisibility(false);
                            _c.LoadCharacterMenu($(this).attr('rel'));
                            break;
                        }
                    }
                })
            })
            result.find('.delete-character').bind('click',function(){
                DMTool.removePlayer(DMTool.Players[$(this).parents('li:first').attr('rel')]);
            })
            result.find('.delete-mob').bind('click',function(){
                DMTool.removeMob(DMTool.Mobs[$(this).parents('li:first').attr('rel')]);
            })
        }),
        'AbilityScores' : (function(result){

        }),
        'DefenseTable' : (function(result){

        }),
        'CharacterInfo' : (function(result){
            DMTool.controller.CreateDropDownFromObjectCollection(
                'current-player-race',
                PlayerUtil.ValidRaces,
                DMTool.controller.CurrentPlayer.Race,
                result
            );
            DMTool.controller.CreateDropDownFromObjectCollection(
                'current-player-class',
                PlayerUtil.ValidClasses,
                DMTool.controller.CurrentPlayer.Class,
                result
            );
        }),
        /**
         * This template requires a parameter with a property "target".
         * Whenever the add button is clicked, the "target" function will be passed the
         * Condition object and the Player object. It can then do with it whatever it needs.
         */
        'AddConditions' : (function(result, object, params){
            $(result).find('#condition-list option').each(function(){
                $(this).data('condition', ConditionUtil.getConditionWithName( $(this).val() ))
            })
            $(result).find('#condition-list').bind('change keyup',function(){
                $(this).nextAll('#condition-description').html( $(this).find('option:selected').data('condition').Effect );
            });
            $(result).find('#add-condition').bind('click',function(){
                $('#condition-list option:selected').each(function(){
                    var condition = new Condition,
                        selectedPreset = ConditionUtil.getConditionWithName( $(this).val() );
                    var finalCondition = $.extend(condition, selectedPreset);
                    finalCondition.SaveEnds = $('#save-ends').is(':checked');
                    finalCondition.Ongoing = $('#ongoing').is(':checked');
                    finalCondition.Sustainable = $('#sustainable').is(':checked');
                    params.target(finalCondition, object);
                })
            })
            $(result).find('#close-condition-add').bind('click',function(){ $('#AddConditionsWrapper').empty(); })
            return (function(){ $('#condition-list').trigger('change') })
        }),
        'CharacterStats' : (function(result){
            //Fire all applicable template callbacks
            this.CharacterInfo(result);
            this.AbilityScores(result);
            this.SkillTable(result);
            this.DefenseTable(result);
            $('#detailed-info').empty();
        }),
        'EncounterPlayerTurn' : (function(result, Encounter){
            $(result).find('#attack').bind('click',function(){
                DMTool.controller.RenderTable(DMTool.controller.CurrentEncounter, 'EncounterAttackWorkspace', '#AttackWorkspace');
            })
        }),
        'EncounterAttackWorkspace' : (function(result){
            $(result).find('[name="HitCharacter"]').bind('change',function(){
                var DamageRow = $( '[rel="' + $(this).attr('id') + '"]' );
                if($(this).is(':checked')) DamageRow.removeClass('hidden');
                else DamageRow.addClass('hidden');
            }).each(function(){
                var player = Util.GetPropertyFromChain( DMTool.controller.CurrentEncounter.EncounterMobs, $(this).attr('id'));
                $(this).data('player', player);
            });

            $(result).find('#apply-damage').bind('click',function(){
                DMTool.controller.Encounter.ApplyDamageFromForm();
                DMTool.controller.RenderTable(DMTool.controller.CurrentEncounter, 'EncounterAttackWorkspace', '#AttackWorkspace');
                $('#AddConditionsWrapper').empty();
            });

            $(result).find('.add-conditions').bind('click',function(){
                $('#AddConditionsWrapper').empty();
                var _this = this;
                DMTool.controller.RenderTable(
                    $(this).parents('tr:first').prev().find('[name="HitCharacter"]').data('player'),
                    'AddConditions',
                    '#EncounterPlayerTurnWrapper',
                    {"target":(function(Condition, Player){
                        var ConditionList = $(_this).parents('td:first').find('.condition-list'),
                            tr = $('<tr></tr>'),
                            td = $('<td></td>');
                        $('tr', ConditionList).each(function(){
                            if($(this).data('condition').Name === Condition.Name)
                            {
                                $(this).remove();
                            }
                        })
                        Condition.CastBy = DMTool.controller.CurrentEncounter.EncounterPlayers[0];

                        td.append(Condition.Name);
                        if(Condition.SaveEnds) td.append(' [SE]');
                        if(Condition.Ongoing) td.append(' [O]');
                        if(Condition.Sustainable) td.append(' [S]');
                        tr.append(td).data('condition', Condition);
                        ConditionList.append(tr);
                    })}
                );
            })
        }),
        'EncounterMobTurn' : (function(result){
            $(result).find('.enemy-info-wrapper').each(function(index){
                $(this).data('player', DMTool.controller.CurrentEncounter.EncounterPlayers[0].Enemies[index]);
                $(this).find('.saved').each(function(){
                    $(this).parents('tr:first').data('condition', DMTool.controller.CurrentEncounter.EncounterPlayers[0].Enemies[index].Conditions[ parseInt( $(this).attr('rel') ) ]);
                })

            });

           $(result).find('.saved').bind('click',function(){
               $(this).parents('.enemy-info-wrapper:first').data('player').removeCondition( $(this).parents('tr:first').data('condition') );
               $(this).parents('tr:first').remove();
           });

            $(result).find('.deduct-hp').bind('click',function(){
                $(this).parents('.enemy-info-wrapper:first').data('player').hit( $(this).prevAll('.remove-hitpoints:first').val() );
                DMTool.controller.Encounter.Refresh();
            })

            $(result).find('.kill-enemy').bind('click',function(){
                DMTool.controller.CurrentEncounter.killPlayer( $(this).parents('.enemy-info-wrapper:first').data('player') );
                DMTool.controller.Encounter.Refresh();
            })

            $(result).find('.reveal').bind('click',function(){
                DMTool.controller.CurrentEncounter.revealEnemy( $(this).parents('.enemy-info-wrapper:first').data('player') );
                DMTool.controller.Encounter.Refresh();
            })
        }),
        'EncounterPlayerList' : (function(result){
            //bind direct turn loading via player menu on top
            $(result).find('#EncounterPlayersWrapper a').bind('click',DMTool.controller.Encounter.JumpToTurn)
        }),
        'EncounterTable' : (function(result, Encounter){
            //fire nested template callbacks
            this.EncounterPlayerList(result);
            if($(result).find('#EncounterMobTurnWrapper').length) this.EncounterMobTurn(result, Encounter);
            if($(result).find('#EncounterPlayerTurnWrapper').length) this.EncounterPlayerTurn(result, Encounter);

            //bind previous next buttons
            $(result).find('#previous-turn').bind('click',DMTool.controller.Encounter.Previous);
            $(result).find('#next-turn').bind('click',DMTool.controller.Encounter.Next);
        }),
        'EncounterInitiative' : (function(result){
            $(result).find('[name="EncounterPlayer"]').bind('change',function(){
                $(this).nextAll('input:first').trigger('focus')
            })
            $(result).find('[name="Total"]').bind('keyup',function(){
                var checkbox = $(this).prevAll('input:first');
                if($(this).val() !== '' && !checkbox.is(':checked')) checkbox.trigger('click');
                else if($(this).val() === '' && checkbox.is(':checked')) checkbox.trigger('click');
            })
            $(result).find('button').bind('click',function(){
                if(!DMTool.controller.CurrentEncounter.ValidateEncounterPlayers())
                {
                    alert('Must have at least 1 player and 1 enemy to begin an encounter.');
                    return false;
                }
                if(!DMTool.controller.CurrentEncounter.ValidateInitiativeRolls())
                {
                    alert('Invalid or null value entered for initiative Roll!');
                    return false;
                }

                DMTool.controller.CurrentEncounter.InitiativeEntered = true;
                DMTool.controller.CurrentEncounter.InitializePlayers();

                $('#EncounterInitiativeWrapper').css({'margin':'0 auto'}).animate({'width':0,'height':0,'opacity':0},function(){
                    DMTool.controller.Encounter.LoadEncounterTable();
                })

            })
        }),
        'EncounterMenu' : (function(result){
            //event bindings
            $(result).find('#add-mob').bind('click',function(){
                DMTool.controller.CurrentMob = new Mob({"Label":"Mob "+(DMTool.Mobs.length+1)})
                DMTool.addMob( DMTool.controller.CurrentMob )
                DMTool.controller.LoadAddMobMenu( DMTool.controller.CurrentMob );

            })
            $(result).find('#begin-encounter').bind('click',DMTool.controller.Encounter.Begin)
            $('#detailed-info').empty();
        }),
        'AddMob' : (function(result){
            $(result).find('#add-enemy').bind('click', function(){
                DMTool.controller.CurrentMob.Enemies.push(new Enemy({CharacterName:'Enemy '+(DMTool.controller.CurrentMob.Enemies.length+1)}));
                DMTool.controller.LoadAddMobMenu(DMTool.controller.CurrentMob);
                $('[name="CharacterName"]:last').trigger('focus').trigger('change');
            })
            $(result).find('.delete-enemy').bind('click',function(){
                DMTool.controller.CurrentMob.removeEnemy( DMTool.controller.CurrentMob.Enemies[ $(this).parents('tr:first').attr('rel') ] )
                DMTool.controller.LoadAddMobMenu( DMTool.controller.CurrentMob )
            })
            $(result).find('form').bind('submit',function(){
                Util.trace( DMTool.controller.CurrentMob );
            })
        }),
        'EnemyStatsInfo' : (function(result){

        })
    },

    LoadAddMobMenu : (function(mob){
        DMTool.controller.CurrentMob = mob;
        DMTool.controller.RenderTable(mob, 'AddMob', '#detailed-info');
        $('[name="Label"]').trigger('change');
    }),

    ToggleCharacterListVisibility : (function(type){

        switch(type)
        {
            case true:
            {
                $('#character-action-panel, #character-list').animate({'margin-left':'-195px'});
                $('#tool').animate({'margin-left':'10px'});
                break;
            }
            case false:
            {
                $('#character-action-panel, #character-list').animate({'margin-left':'0'});
                $('#tool').animate({'margin-left':'200px'});
                break;
            }
            default:
            {
                if($('#character-list').css('margin-left') === '0px')
                    DMTool.controller.ToggleCharacterListVisibility(true);
                else DMTool.controller.ToggleCharacterListVisibility(false);
                break
            }
        }
    }),

    'Encounter' : {
        'Begin' : (function(){
            if(!DMTool.controller.CurrentEncounter)
            {
                DMTool.controller.Encounter.StartNew();
            }else{
                if(confirm("Begin new Encounter? \n(Cancel will resume current encounter)")) DMTool.controller.Encounter.StartNew();
                //resume current encounter
                else DMTool.controller.Encounter.Resume();
            }
        }),
        'StartNew' : (function(){
            //gather up initiative rolls
            DMTool.controller.CurrentEncounter = false;
            var e = new Encounter();
            e.addPlayers(DMTool.Players);
            e.addPlayers(DMTool.Mobs);
            DMTool.controller.CurrentEncounter = e;
            DMTool.controller.Encounter.RollInitiative();
        }),
        'RollInitiative' : (function(){
            DMTool.controller.ToggleCharacterListVisibility(true);
            $('#detailed-info').empty();
            DMTool.controller.RenderTable(DMTool.controller.CurrentEncounter, 'EncounterInitiative', '#detailed-info');
        }),
        'LoadEncounterTable' : (function(){
            DMTool.controller.EncounterWorker.postMessage({"Encounter":DMTool.controller.CurrentEncounter.stringify()});
            DMTool.controller.ToggleCharacterListVisibility(true);
            //begin the actual encounter tracker
            $('#detailed-info').empty();
            DMTool.controller.RenderTable(DMTool.controller.CurrentEncounter, 'EncounterTable', '#detailed-info');
        }),
        'ApplyDamageFromForm' : (function(){
            $('#EncounterAttackWorkspaceWrapper').find('[name="HitCharacter"]:checked').each(function(){
                var damageDataRow = $( '[rel="' + $(this).attr('id') + '"]' ),
                    damageTaken = damageDataRow.find('.Damage').val(),
                    enemy = Util.GetPropertyFromChain(DMTool.controller.CurrentEncounter.EncounterMobs, $(this).attr('id')),
                    apply = true;

                if($.trim(damageTaken) === ''){ damageTaken = 0; }

                if(! Util.Validate.PositiveNumber( damageTaken ) && parseInt( damageTaken ) !== 0)
                {
                    alert( enemy.CharacterName + ' invalid damage entered: ' + damageTaken );
                    apply = false;
                }

                if(apply)
                {
                    var conditions = [];
                    $(this).parents('tr:first').next().find('tr').each(function(){
                        conditions.push( $(this).data('condition') );
                    })
                    enemy.hit( damageTaken );
                    enemy.addConditions( conditions );
                }
            })
        }),
        'Next' : (function(){
            DMTool.controller.CurrentEncounter.Next();
            DMTool.controller.Encounter.LoadEncounterTable();
        }),
        'Previous' : (function(){
            DMTool.controller.CurrentEncounter.Previous();
            DMTool.controller.Encounter.LoadEncounterTable();
        }),
        'Refresh' : (function(){
            DMTool.controller.Encounter.LoadEncounterTable();
        }),
        'JumpToTurn' : (function(){
            //'this' is the A which was clicked
            DMTool.controller.CurrentEncounter.JumpToTurn($(this).attr('rel'));
            DMTool.controller.Encounter.LoadEncounterTable();
        }),
        'Resume' : (function(){
            if(!DMTool.controller.CurrentEncounter.InitiativeEntered) DMTool.controller.Encounter.RollInitiative();
            else DMTool.controller.Encounter.LoadEncounterTable();
        }),
        'End' : (function(){
            DMTool.controller.CurrentEncounter = false;
        })
    },

    LoadEncounterMenu: (function(){
        DMTool.controller.RenderTable(DMTool, 'EncounterMenu', '#detailed-info');
    }),

    BindEditables: (function($jqo, currentState){
        var $jqo = ($jqo.hasClass('editableWrapper')) ? $jqo : $jqo.find('.editableWrapper'),
            _this = this;

        $jqo.each(function(){
            var $jqo = $(this);
            if(!currentState) _this.HideEditables($jqo);
            $jqo.data({'state':currentState})

            if($jqo.find('.editable').length)
            {
                var editableControl =
                    $('<div class="edit-control"><a href="javascript:;"><img src="images/edit_icon.gif" /></a></div>');

                editableControl
                    .find('a')
                    .on('click',(function(){
                        if($(this).parent().parent().data('state') == 'editing'){
                            _this.HideEditables($jqo);
                        }
                        else _this.ShowEditables($jqo);
                    }));
                $jqo.prepend(editableControl);
            };
        })
    }),

    HideEditables: (function($jqo){
        $jqo.data({'state':false}).find('.editable').each(function(){
            var $editable = $(this),
                $editableField = $editable.find('input,select'),
                fieldValue =
                    ($editableField.attr('type')=='checkbox') ?
                        $editableField.is(':checked') ?
                            'X' : ''
                    : $editableField.val();

            $editable.hide().parent().append('<div class="uneditable">'+fieldValue+'</div>');
        });
    }),

    ShowEditables: (function($jqo){
        $jqo.data({'state':'editing'}).find('.uneditable').remove();
        $jqo.find('.editable').each(function(){
            $(this).show();
        });
    }),

    TemplateRenderCallback: (function(template, currentState, object){
        this.BindFormControls($('#'+template+'Wrapper'), object);//global template load callback (applies to all template loads!)
        this.BindEditables($('#'+template+'Wrapper'), currentState);
    }),

    BindFormControls: (function($jqo, object){

        var _this = this,
            object = (object) ? object :
                        (rel = $(this).parents('form:first').attr('rel') && rel && w[rel]) ?
                        w[rel] : {};

        $jqo.find('.control').each(function(){

            var controller = $(this),
                controlled = controller.parents('td:first').find('[name="'+$(this).attr('rel')+'"]'),
                controlType = controller.data('control');

            if(controlled.length)
            {
                switch(controlType){
                    case 'increase':{
                        controller.on('click',function(){controlled.val(parseInt(controlled.val())+1).trigger('change')});
                        break;
                    }
                    case 'decrease':{
                        controller.on('click',function(){controlled.val(parseInt(controlled.val())-1).trigger('change')});
                        break;
                    }
                }
            }
        });

        //bind the json object to the form fields
        $jqo.find('input,select').each(function(){
            var $el = $(this),
                property = $el.attr('rel'),
                prop = Util.GetPropertyFromChain(object, property),
                propName = $el.attr('name'),
                inputType = $el.attr('type'),
                converter = {};

            if(inputType == 'checkbox')
            {
                converter[propName] = {
                    convert : (function(value, source, target){
                        target[propName] = $(source).is(':checked');
                    })
                }
            }

            $el.link(prop, converter);
        });

        if(object instanceof Player)
        {
            $jqo.find('input,select').on('change',function(){
                PlayerMediator.onPlayerChange(object);
            });
        }

        if(object instanceof Mob)
        {
            $jqo.find('input,select').on('change',function(){
                MobMediator.onPlayerChange(object);
            });
        }

        return;
    }),

    LoadTemplates: (function(callback){
        $.each(this.TmplList, function(i){
            var ct = i,
                _this = DMTool.controller;

            $.ajax({
                url:'jqtmpl/'+ct+'.html',
                cache:false,
                type:'GET',
                success:function(template){
                    $('head').append('<script type="text/x-jquery-tmpl" id="'+ct+'">'+template+'</script>');
                    DMTool.controller.TmplCache[ ct ] = template;
                    if(Util.GetObjectSize(_this.TmplList) === Util.GetObjectSize(_this.TmplCache)) callback();
                }
            })
        })
    }),

    /**
     * @param string TemplateName
     * @param object Object
     * @param function Callback
     */
    RenderTemplate: (function(TemplateName, Object, Callback, Params){
        var result = $.tmpl(this.TmplCache[ TemplateName ], Object);
        var postRenderCallback = this.TmplList[TemplateName]( result, Object, Params );
        if(Callback) Callback( result, postRenderCallback );
    }),

    /**
     * @param object Object
     * @param string Template
     * @param string0 Destination ID
     */
    RenderTable: (function(Object, Template, Destination, TemplateCallbackParams){
        var currentTableState = $('#'+Template+'Wrapper').data('state'),
            _this = DMTool.controller;

        this.RenderTemplate(Template, Object, function(result, postRenderCallback){
            if($(Destination).length)
            {
                if($(Destination).find('#'+Template+'Wrapper').length)
                {
                    $(Destination).find('#'+Template+'Wrapper').replaceWith(result);
                }
                else
                {
                    $(Destination).append(result);
                }
            }else{
                $('#'+Template+'Wrapper').replaceWith(result)
            }
            _this.TemplateRenderCallback(Template, currentTableState, Object);
            if(typeof postRenderCallback === 'function') postRenderCallback()
        }, TemplateCallbackParams);
    }),

    LoadCharacterMenu: (function(index){
        DMTool.controller.CurrentPlayer = DMTool.Players[index];
        this.RenderPlayerStatsMenu(DMTool.controller.CurrentPlayer);
    }),

    views : {
        dispatchChange : (function(type, object){
            Util.trace(type+' change dispatched!', object);
            var _this = DMTool.controller;
            $('[data-'+type.toLowerCase()+'-observer="true"]').each(function(){
                if($(this).is(':visible')){
                    _this.RenderTable( object, $(this).attr('id').replace("Wrapper", '') );
                }
            })
        })
    },

    RenderPlayerStatsMenu: (function(player){
        this.RenderTable(player, 'CharacterStats', '#detailed-info');
    }),

    onReady : (function(){
        DMTool.controller.RenderTable(DMTool, 'CharacterList', '#character-list');
        DMTool.controller.BootStrap();
        DMTool.controller.ConfigKeyBindings();
        DMTool.controller.loadStagingEnvironment();
        //DMTool.controller.LoadEncounterMenu();
    }),

    loadStagingEnvironment : (function(){
        var e = new Encounter();
        e.addPlayers(DMTool.Players);
        e.addPlayers(DMTool.Mobs);
        e.InitiativeEntered = true;
        for(var i in e.Players){
            e.Players[i].EncounterPlayer = i;
            e.Players[i].Initiative.Total = i;
        }
        e.Players[3].Initiative.Total = 50;
        e.InitializePlayers();
        DMTool.controller.CurrentEncounter = e;
        DMTool.controller.Encounter.Resume();
    })
}