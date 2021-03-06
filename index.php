<!DOCTYPE html>
<html>
    <head>
        <title>DM Tools</title>
        <link href='http://fonts.googleapis.com/css?family=Shadows+Into+Light+Two' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/reset.css" media="screen" />
        <link rel="stylesheet" href="css/style.css" media="screen" />
        <script src="js/jquery.min.js" type="text/javascript"></script>
        <script src="js/jquery.link.js" type="text/javascript"></script>
        <script src="js/jquery.tmpl.min.js" type="text/javascript"></script>
        <script src="js/JSON.js" type="text/javascript"></script>
        <script src="js/Util.js" type="text/javascript"></script>
        <script src="js/Class.js" type="text/javascript"></script>
        <script src="js/DataObject.js" type="text/javascript"></script>
        <script src="js/PlayerUtil.js" type="text/javascript"></script>
        <script src="js/SkillUtil.js" type="text/javascript"></script>
        <script src="js/AbilityScoreUtil.js" type="text/javascript"></script>
        <script src="js/DefenseUtil.js" type="text/javascript"></script>
        <script src="js/ConditionUtil.js" type="text/javascript"></script>
        <script src="js/PlayerMediator.js" type="text/javascript"></script>
        <script src="js/DMTool.js" type="text/javascript"></script>
        <script src="js/Condition.js" type="text/javascript"></script>
        <script src="js/Skill.js" type="text/javascript"></script>
        <script src="js/Initiative.js" type="text/javascript"></script>
        <script src="js/AbilityScore.js" type="text/javascript"></script>
        <script src="js/Defense.js" type="text/javascript"></script>
        <script src="js/Player.js" type="text/javascript"></script>
        <script src="js/Enemy.js" type="text/javascript"></script>
        <script src="js/Mob.js" type="text/javascript"></script>
        <script src="js/Encounter.js" type="text/javascript"></script>
        <script src="js/Fixtures.js" type="text/javascript"></script>
        <script src="js/controller.js" type="text/javascript"></script>
        <script src="js/KeyBindings.js" type="text/javascript"></script>
        <script src="js/main.js" type="text/javascript"></script>
    </head>
    <body id="tool">
        <div id="action-set">
            <form action="javascript:;" method="post" id="player-add-form" data-callback="add_new_player">
                <div class="field"><label for="RealName">Player Name</label><input type="text" name="RealName" id="RealName" /></div>
                <div class="field"><label for="CharacterName">Character Name</label><input type="text" name="CharacterName" id="CharacterName" /></div>
                <div class="field"><label for="Experience">XP</label><input type="text" name="Experience" id="Experience" size="4" /></div>
                <div class="field"><label for="Race">Race</label><select name="Race" id="Race"></select></div>
                <div class="clear"></div>
                <div class="field"><label for="Class">Class</label><select name="Class" id="Class"></select></div>
                <button class="submit">Add Player</button>
                <button class="close">Close</button>
            </form>
        </div>

        <div id="character-action-panel">
            <a href="javascript:;" id="add-character" title="[ Ctrl+Shift+A ]"><img src="images/plus-icon.gif"/></a>
        </div>
        <div id="character-list"></div>

        <div id="detailed-info"></div>
    </body>
</html>