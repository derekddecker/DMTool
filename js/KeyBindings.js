/**
 * Going to allow for key bindings to access common
 * functionality more quickly. Using 'Ctrl' + 'Shift' + letter for these mappings
 * so that standard functionality like CTRL+S isn't overwritten.
 *
 * Key-code map:
 * http://www.aspdotnetfaq.com/Faq/What-is-the-list-of-KeyCodes-for-JavaScript-KeyDown-KeyPress-and-KeyUp-events.aspx
 */
DMTool.controller.KeyBindings = {
    65 : DMTool.controller.ToggleAddCharacterForm, // Ctrl+Shift+A = Add Character
    80 : DMTool.controller.ToggleCharacterListVisibility, //Ctrl+Shift+P = Player List Toggle Visibility
    39 : DMTool.controller.Encounter.Next, //Ctrl+Shift+Right Arrow = Next Encounter Turn
    37 : DMTool.controller.Encounter.Previous, //Ctrl+Shift+Left Arrow = Previous Encounter Turn
    69 : DMTool.controller.LoadEncounterMenu, //Ctrl+Shift+E = Encounter Menu
    72 : (function(){ $('#attack').trigger('click') }) //Ctrl+Shift+H = Attack
}