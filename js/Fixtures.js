var DMTool = new DMTool({
    Players:[
    {
        "RealName":'Albert',
        "CharacterName":'Pachuna',
        "Experience" : 8000,
        "Class":'Warlock',
        "Size":'M',
        "Alignment":'Unaligned',
        "Race":'Warforged',
        "Defenses" : [
            {"Name":'AC',"ArmorAbilityBonus":3},
            {"Name":'FORT'},
            {"Name":'REF',"ClassBonus":1},
            {"Name":'WILL',"ClassBonus":1,"Misc":[{"Score":1}]}
        ],
        "AbilityScores" : [
            {"Ability":"Strength","BaseScore":6,"Modifier":-1},
            {"Ability":"Constitution","BaseScore":12,"Modifier":5},
            {"Ability":"Dexterity","BaseScore":8,"Modifier":1},
            {"Ability":"Intelligence","BaseScore":7,"Modifier":0},
            {"Ability":"Wisdom","BaseScore":7,"Modifier":-1},
            {"Ability":"Charisma","BaseScore":9,"Modifier":2}
        ],
        "Skills" : [
            {"SkillName":'Acrobatics',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Arcana',"Trained":true,"ArmorPenalty":0},
            {"SkillName":'Athletics',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Bluff',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Diplomacy',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Dungeoneering',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Endurance',"Trained":false,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'Heal',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'History',"Trained":true,"ArmorPenalty":0},
            {"SkillName":'Insight',"Trained":true,"ArmorPenalty":0},
            {"SkillName":'Intimidate',"Trained":true,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'Nature',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Perception',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Religion',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Stealth',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Streetwise',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Thievery',"Trained":false,"ArmorPenalty":0}
        ]
    },
    {
        "RealName":'Steve',
        "CharacterName":'Mogadishu',
        "Experience" : 8000,
        "Class":'Warden',
        "Race":'Goliath',
        "Defenses" : [
            {"Name":'AC',"ArmorAbilityBonus":11},
            {"Name":'FORT'},
            {"Name":'REF',"ClassBonus":1},
            {"Name":'WILL',"ClassBonus":1,"Misc":[{"Score":1}]}
        ],
        "AbilityScores" : [
            {"Ability":"Strength","BaseScore":12,"Modifier":5},
            {"Ability":"Constitution","BaseScore":11,"Modifier":4},
            {"Ability":"Dexterity","BaseScore":7,"Modifier":0},
            {"Ability":"Intelligence","BaseScore":6,"Modifier":-1},
            {"Ability":"Wisdom","BaseScore":8,"Modifier":1},
            {"Ability":"Charisma","BaseScore":8,"Modifier":0}
        ],
        "Skills" : [
            {"SkillName":'Acrobatics',"Trained":false,"ArmorPenalty":-3},
            {"SkillName":'Arcana',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Athletics',"Trained":true,"ArmorPenalty":-1},
            {"SkillName":'Bluff',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Diplomacy',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Dungeoneering',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Endurance',"Trained":false,"ArmorPenalty":-3,"Misc":0},
            {"SkillName":'Heal',"Trained":true,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'History',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Insight',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Intimidate',"Trained":false,"ArmorPenalty":0,"Misc":0},
            {"SkillName":'Nature',"Trained":true,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'Perception',"Trained":true,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'Religion',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Stealth',"Trained":false,"ArmorPenalty":-3},
            {"SkillName":'Streetwise',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Thievery',"Trained":false,"ArmorPenalty":-3}
        ]
    },
    {
        "RealName":'Maddi',
        "CharacterName":'Scissors',
        "Experience" : 8000,
        "Class":'Fighter',
        "Race":'Dragonborn',
		"Initiative":new Initiative({"Misc":0}),		
        "Defenses" : [
            {"Name":'AC',"ArmorAbilityBonus":8,"Enh":2},
            {"Name":'FORT',"ArmorAbilityBonus":5,"ClassBonus":2},
            {"Name":'REF'},
            {"Name":'WILL'}
        ],
        "AbilityScores" : [
            {"Ability":"Strength","BaseScore":12,"Modifier":5},
            {"Ability":"Constitution","BaseScore":10,"Modifier":3},
            {"Ability":"Dexterity","BaseScore":8,"Modifier":0},
            {"Ability":"Intelligence","BaseScore":6,"Modifier":-1},
            {"Ability":"Wisdom","BaseScore":6,"Modifier":-1},
            {"Ability":"Charisma","BaseScore":7,"Modifier":0}
        ],
        "Skills" : [
            {"SkillName":'Acrobatics',"Trained":false,"ArmorPenalty":-2,"Misc":1},
            {"SkillName":'Arcana',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Athletics',"Trained":true,"ArmorPenalty":-2,"Misc":1},
            {"SkillName":'Bluff',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Diplomacy',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Dungeoneering',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Endurance',"Trained":true,"ArmorPenalty":-2},
            {"SkillName":'Heal',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'History',"Trained":false,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'Insight',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Intimidate',"Trained":true,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'Nature',"Trained":false,"ArmorPenalty":0,"Misc":0},
            {"SkillName":'Perception',"Trained":false,"ArmorPenalty":0,"Misc":0},
            {"SkillName":'Religion',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Stealth',"Trained":false,"ArmorPenalty":-2},
            {"SkillName":'Streetwise',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Thievery',"Trained":false,"ArmorPenalty":-2}
        ]
		
    },
    {
        "RealName":'Jeremy',
        "CharacterName":'Curby',
        "Experience" : 8000,
        "Class":'Ranger',
        "Race":'Wilden',
        "Initiative" : new Initiative({"Misc":2}),
        "Defenses" : [
            {"Name":'AC',"ArmorAbilityBonus":8,"Enh":1},
            {"Name":'FORT',"ClassBonus":1,"Enh":1},
            {"Name":'REF',"ClassBonus":1,"Enh":1,"Misc":[{"Score":1}]},
            {"Name":'WILL',"Enh":1}
        ],
        "AbilityScores" : [
            {"Ability":"Strength","BaseScore":9,"Modifier":1},
            {"Ability":"Constitution","BaseScore":9,"Modifier":2},
            {"Ability":"Dexterity","BaseScore":12,"Modifier":5},
            {"Ability":"Intelligence","BaseScore":7,"Modifier":0},
            {"Ability":"Wisdom","BaseScore":7,"Modifier":0},
            {"Ability":"Charisma","BaseScore":6,"Modifier":-1}
        ],
        "Skills" : [
            {"SkillName":'Acrobatics',"Trained":true,"ArmorPenalty":-1},
            {"SkillName":'Arcana',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Athletics',"Trained":true,"ArmorPenalty":-1},
            {"SkillName":'Bluff',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Diplomacy',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Dungeoneering',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Endurance',"Trained":true,"ArmorPenalty":-1},
            {"SkillName":'Heal',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'History',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Insight',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Intimidate',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Nature',"Trained":false,"ArmorPenalty":0,"Misc":2},
            {"SkillName":'Perception',"Trained":true,"ArmorPenalty":0},
            {"SkillName":'Religion',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Stealth',"Trained":true,"ArmorPenalty":-1,"Misc":2},
            {"SkillName":'Streetwise',"Trained":false,"ArmorPenalty":0},
            {"SkillName":'Thievery',"Trained":false,"ArmorPenalty":-1}
        ]
    },
    {"RealName":"Joe","CharacterName":"Izahah","Level":"6","Conditions":[],"HP":0,"Class":"Warlord","Race":"Dragonborn","Experience":8000,"Size":0,"Age":0,"Gender":0,"Height":0,"Weight":0,"Alignment":0,"Diety":0,"Party":0,"Initiative":{"Score":3,"Misc":0,"Roll":0,"Total":"4","defaults":{"Score":0,"Misc":0,"Roll":0,"Total":0}},"Defenses":[{"Name":"AC","Score":20,"TenPlusHalf":13,"ArmorAbilityBonus":"6","ClassBonus":0,"FeatBonus":"1","Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]},{"Name":"FORT","Score":15,"TenPlusHalf":13,"ArmorAbilityBonus":1,"ClassBonus":0,"FeatBonus":"1","Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]},{"Name":"REF","Score":14,"TenPlusHalf":13,"ArmorAbilityBonus":0,"ClassBonus":0,"FeatBonus":"1","Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]},{"Name":"WILL","Score":20,"TenPlusHalf":13,"ArmorAbilityBonus":"4","ClassBonus":"2","FeatBonus":"1","Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]}],"Skills":[{"Bonus":2,"SkillName":"Acrobatics","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":"-1","Misc":0},{"Bonus":8,"SkillName":"Arcana","ModifierPlusHalfLevel":3,"Trained":true,"ArmorPenalty":0,"Misc":0},{"Bonus":3,"SkillName":"Athletics","ModifierPlusHalfLevel":4,"Trained":false,"ArmorPenalty":"-1","Misc":0},{"Bonus":3,"SkillName":"Bluff","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":0,"Misc":0},{"Bonus":3,"SkillName":"Diplomacy","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":0,"Misc":0},{"Bonus":7,"SkillName":"Dungeoneering","ModifierPlusHalfLevel":7,"Trained":false,"ArmorPenalty":0,"Misc":0},{"Bonus":3,"SkillName":"Endurance","ModifierPlusHalfLevel":4,"Trained":false,"ArmorPenalty":"-1","Misc":0},{"Bonus":12,"SkillName":"Heal","ModifierPlusHalfLevel":7,"Trained":true,"ArmorPenalty":0,"Misc":0},{"Bonus":3,"SkillName":"History","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":0,"Misc":0},{"Bonus":12,"SkillName":"Insight","ModifierPlusHalfLevel":7,"Trained":true,"ArmorPenalty":0,"Misc":0},{"Bonus":3,"SkillName":"Intimidate","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":0,"Misc":0},{"Bonus":9,"SkillName":"Nature","ModifierPlusHalfLevel":7,"Trained":false,"ArmorPenalty":0,"Misc":"2"},{"Bonus":9,"SkillName":"Perception","ModifierPlusHalfLevel":7,"Trained":false,"ArmorPenalty":0,"Misc":"2"},{"Bonus":8,"SkillName":"Religion","ModifierPlusHalfLevel":3,"Trained":true,"ArmorPenalty":0,"Misc":0},{"Bonus":2,"SkillName":"Stealth","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":"-1","Misc":0},{"Bonus":3,"SkillName":"Streetwise","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":0,"Misc":0},{"Bonus":2,"SkillName":"Thievery","ModifierPlusHalfLevel":3,"Trained":false,"ArmorPenalty":"-1","Misc":0}],"AbilityScores":[{"Score":13,"BaseScore":9,"Ability":"Strength","Modifier":1,"ModifierPlusHalfLevel":4},{"Score":12,"BaseScore":"8","Ability":"Constitution","Modifier":"1","ModifierPlusHalfLevel":4},{"Score":10,"BaseScore":"7","Ability":"Dexterity","Modifier":0,"ModifierPlusHalfLevel":3},{"Score":10,"BaseScore":"7","Ability":"Intelligence","Modifier":0,"ModifierPlusHalfLevel":3},{"Score":18,"BaseScore":"11","Ability":"Wisdom","Modifier":"4","ModifierPlusHalfLevel":7},{"Score":11,"BaseScore":"8","Ability":"Charisma","Modifier":0,"ModifierPlusHalfLevel":3}],"PassivePerception":0,"PassiveInsight":0},
    {"RealName":"Ryan","CharacterName":"Morrighan","Level":"6","Conditions":[],"HP":0,"Class":"Wizard","Race":"Human","Experience":"8535","Size":0,"Age":0,"Gender":0,"Height":0,"Weight":0,"Alignment":0,"Diety":0,"Party":0,"Initiative":{"Score":8,"Misc":0,"Roll":0,"Total":0,"defaults":{"Score":0,"Misc":0,"Roll":0,"Total":0}},"Defenses":[{"Name":"AC","Score":21,"TenPlusHalf":13,"ArmorAbilityBonus":"8","ClassBonus":0,"FeatBonus":0,"Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]},{"Name":"FORT","Score":15,"TenPlusHalf":13,"ArmorAbilityBonus":"4","ClassBonus":"-2","FeatBonus":0,"Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]},{"Name":"REF","Score":19,"TenPlusHalf":13,"ArmorAbilityBonus":"8","ClassBonus":"-2","FeatBonus":0,"Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]},{"Name":"WILL","Score":18,"TenPlusHalf":13,"ArmorAbilityBonus":"5","ClassBonus":0,"FeatBonus":0,"Enh":0,"Misc":[{"Score":0,"LinkType":"","LinkId":null}]}],"Skills":[{"Bonus":5,"SkillName":"Acrobatics","ModifierPlusHalfLevel":8,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":16,"SkillName":"Arcana","ModifierPlusHalfLevel":11,"Trained":true,"ArmorPenalty":0,"Misc":0},{"Bonus":2,"SkillName":"Athletics","ModifierPlusHalfLevel":5,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":3,"SkillName":"Bluff","ModifierPlusHalfLevel":6,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":3,"SkillName":"Diplomacy","ModifierPlusHalfLevel":6,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":5,"SkillName":"Dungeoneering","ModifierPlusHalfLevel":8,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":4,"SkillName":"Endurance","ModifierPlusHalfLevel":7,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":5,"SkillName":"Heal","ModifierPlusHalfLevel":8,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":13,"SkillName":"History","ModifierPlusHalfLevel":11,"Trained":true,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":10,"SkillName":"Insight","ModifierPlusHalfLevel":8,"Trained":true,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":3,"SkillName":"Intimidate","ModifierPlusHalfLevel":6,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":10,"SkillName":"Nature","ModifierPlusHalfLevel":8,"Trained":true,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":5,"SkillName":"Perception","ModifierPlusHalfLevel":8,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":13,"SkillName":"Religion","ModifierPlusHalfLevel":11,"Trained":true,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":5,"SkillName":"Stealth","ModifierPlusHalfLevel":8,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":3,"SkillName":"Streetwise","ModifierPlusHalfLevel":6,"Trained":false,"ArmorPenalty":0,"Misc":"-3"},{"Bonus":5,"SkillName":"Thievery","ModifierPlusHalfLevel":8,"Trained":false,"ArmorPenalty":0,"Misc":"-3"}],"AbilityScores":[{"Score":8,"BaseScore":"3","Ability":"Strength","Modifier":"2","ModifierPlusHalfLevel":5},{"Score":12,"BaseScore":"5","Ability":"Constitution","Modifier":"4","ModifierPlusHalfLevel":7},{"Score":14,"BaseScore":"6","Ability":"Dexterity","Modifier":"5","ModifierPlusHalfLevel":8},{"Score":20,"BaseScore":"9","Ability":"Intelligence","Modifier":"8","ModifierPlusHalfLevel":11},{"Score":14,"BaseScore":"6","Ability":"Wisdom","Modifier":"5","ModifierPlusHalfLevel":8},{"Score":10,"BaseScore":"4","Ability":"Charisma","Modifier":"3","ModifierPlusHalfLevel":6}],"PassivePerception":0,"PassiveInsight":0}

    ],
    Mobs : [
        {
            "Label":"Trolls",
            "Enemies":[
                {"CharacterName":"Troll 1","HP":"100","Conditions":[],"XPValue":"400","PCFacingName":'Skeleton 1'},
                {"CharacterName":"Troll 2","HP":"100","Conditions":[],"XPValue":"400","PCFacingName":'Skeleton 2'},
                {"CharacterName":"Troll 3","HP":"100","Conditions":[],"XPValue":"400","PCFacingName":'Skeleton 3'}],
            "Initiative":{"Score":0,"Misc":0,"defaults":{"Score":0,"Misc":0}},
            "Page":"254"
        }
        ,{
            "Label":"Deathpriest",
            "Enemies":[{"CharacterName":"Deathpriest","HP":"80","Conditions":[],"PCFacingName":'Orc 1',"XPValue":"400",
                "Defenses" : [
                    {"Name":'AC',"Score":23},
                    {"Name":'REF',"Score":19}
                ]}],
            "Initiative":{"Score":0,"Misc":0,"defaults":{"Score":0,"Misc":0}},
            "Page":"210"
        },{
            "Label":"Worg",
            "Enemies":[{"CharacterName":"Worg","HP":"120","Conditions":[],"PCFacingName":'Giant Beast',"XPValue":"400"}],
            "Initiative":{"Score":0,"Misc":0,"defaults":{"Score":0,"Misc":0}},
            "Page":"265"
        },{
            "Label":"Snaketongue Assassin",
            "Enemies":[{"CharacterName":"Snaketongue Assassin","HP":"80","PCFacingName":'Munchkin',"Conditions":[],"XPValue":"400"}],
            "Initiative":{"Score":0,"Misc":0,"defaults":{"Score":0,"Misc":0}},
            "Page":"273"
        }
    ]
});
