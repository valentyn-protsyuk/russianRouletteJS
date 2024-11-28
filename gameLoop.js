var game_data;
var current_state;
var audioElement = document.createElement('audio');
var stim = 0;
var dope = 0;
var turns = 0;


$.getJSON( "data/game.json", function( data ) {
        game_data = data;
        //current_state = data['start_state'];
        $('#game_text').html( game_data['states'][ data['start_state'] ]['text'] );
        next_state('loading'); 

});
